"use strict"

let svgWidth = 1200
let svgHeight = 800


let margin = {
    top: 50,
    right: 200,
    bottom: 90,
    left: 80
}

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")

/* Global Variables 
data: will store the loaded Json
xScale, yScale: for the axes (x:Date y:Kcal)
rSacle: for darius/size (Duration)
colorScale: forr the color (Max Heart Rate)
*/

let data, xScale, yScale, rScale, colorScale


(async function () {
    data = await d3.json("workout-data.json").then(buildVisualization)
})();


function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);

    //This allows us to draw within a proper chart area 
    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    drawVisualization(renderData, chartGroup);
    return data;
}

/*
    This function cleans the data, parses dates, and calculates derived values
*/
function organizeData(data) {
    let cleanData = [];

    // I use d3.timeParse because the JSON date format is "YYYY-MM-DD"
    let processDate = d3.timeParse("%Y-%m-%d");

    // Loop through each workout entry in the raw data
    for (let i = 0; i < data.length; i++) {

        // Calculate Energy Change: Post-Workout - Morning Energy 
        let energyChangeCalc = data[i].energyAfter - data[i].energyMorn;

        /* Creating a clean object with types converted (strings to numbers/dates) */
        let processedItem = {
            date: processDate(data[i].date),// Convert string to Date object
            activeKcal: +data[i].activeKcal, // Convert to number using '+'
            duration: +data[i].duration,  // Duration in minutes
            maxHRate: +data[i].maxHRate,   // Max Heart Rate in BPM
            energyChange: energyChangeCalc   // Calculated energy difference
        };
        cleanData.push(processedItem); //puts the clean data inside the empty array 
    }

    /* Sort data chronologically by date */
    cleanData.sort(function (a, b) {
        return a.date - b.date;
    });

    return cleanData;
}

/*
    This function defines the domains and ranges for X, Y, Size, and Color scales.
*/
function buildScales(data) {
    // Calculate the actual drawing area (subtract margins from total size)
    let innerWidth = svgWidth - margin.left - margin.right;
    let innerHeight = svgHeight - margin.top - margin.bottom;

    // Calculate Min/Max values using d3.min/max 
    let minKcal = d3.min(data, function (value) { return value.activeKcal; });
    let maxKcal = d3.max(data, function (value) { return value.activeKcal; });

    let minDur = d3.min(data, function (value) { return value.duration; });
    let maxDur = d3.max(data, function (value) { return value.duration; });

    let lowHR = d3.min(data, function (value) { return value.maxHRate; });
    let highHR = d3.max(data, function (value) { return value.maxHRate; });

    // X Scale for date
    xScale = d3.scaleLinear()
        .domain([-1, data.length - 1])
        .range([0, innerWidth]);

    /*      Y Scale Calories 
         Added padding (+50) so points don't hit the top border */
    yScale = d3.scaleLinear()
        .domain([minKcal - 50, maxKcal + 50])
        .range([innerHeight, 0]);

    /* Radius Scale: Duration
 scaleSqrt is used because visual size perception is based on area */
    rScale = d3.scaleSqrt()
        .domain([minDur, maxDur])
        .range([8, 25]); // Size range in pixels

    // Color Scale: Quantize Scale divides values into 5 discrete color buckets
    colorScale = d3.scaleQuantize()
        .domain([lowHR, highHR])
        .range(["#1b5e20", "#66bb6a", "#fdd835", "#ff9800", "#d32f2fff"])

}

/*
  This function handles the actual DOM manipulation to draw the chart.
 */
function drawVisualization(data, group) {

    // Calculate the actual drawing area (subtract margins from total size)
    let innerWidth = svgWidth - margin.left - margin.right;
    let innerHeight = svgHeight - margin.top - margin.bottom;


    // X Axis: Time scale formatted to show Month Day
    let xAxis = d3.axisBottom(xScale)
        .ticks(25)
        .tickFormat(function (i) {
            if (Number.isInteger(i) && data[i]) {
                return d3.timeFormat("%b %d")(data[i].date);
            }
            return "";
        });
    // Append X Axis group and rotate text for readability
    group.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis) //we literally call the axis to draw everything automatically(ticks and dates)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");

    // Y Axis: Linear scale for Calories
    let yAxis = d3.axisLeft(yScale);

    group.append("g")
        .call(yAxis);

    // Axis Labels
    group.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (innerHeight / 2))
        .style("text-anchor", "middle")
        .text("Active Kilocalories (kcal)");

    group.append("text")
        .attr("y", innerHeight + margin.bottom - 20)
        .attr("x", innerWidth / 2)
        .style("text-anchor", "middle")
        .text("Workout Date");

    /* Define a symbol generator helper 
    with the help of Ai i learn to use d3.symbol ,Used because standard methods didn't handle mixed shapes + rotation efficiently
    */
    let symbolGenerator = d3.symbol();

    group.selectAll("path.glyph")
        .data(data)
        .join("path")
        .attr("class", "glyph")

        /* DEFINE THE SHAPE (The 'd' attribute) 
        d3.symbol() creates the path string for us.*/
        .attr("d", function (value) {
            /* Determine the Shape Type
              Default is Circle (No change) */
            let shapeType = d3.symbolCircle;
            // If energy change is no equal to 0 use a triangle
            if (value.energyChange != 0) {
                shapeType = d3.symbolTriangle;
            }

            let size = rScale(value.duration);
            let area = Math.PI * (size * size);

            // Configure the generator and return the path string
            symbolGenerator
                .type(shapeType)
                .size(area);

            return symbolGenerator();
        })

        /* Position and rotate
        Since d3.symbol draws at (0,0), we must move (translate) it 
        to the correct position on the chart.
        */
        .attr("transform", function (value, i) {
            let x = xScale(i);
            let y = yScale(value.activeKcal);

            // If energy was lost (negative), we rotate it 180 degrees to point Down
            let rotation = 0;
            if (value.energyChange < 0) { //if eneregy change is less than 
                rotation = 180;
            }

            // Return the SVG command Move to X,Y then Rotate
            return `translate(${x}, ${y}) rotate(${rotation})`;
        })

        .attr("fill", function (value) {
            return colorScale(value.maxHRate);
        })
        .attr("opacity", 0.6);

    /* Legends */

    let legendX = innerWidth + 60;
    let legendY = 0;

    // Energy Change Legend 
    group.append("text")
        .attr("x", legendX)
        .attr("y", legendY)
        .text("Energy Change")
        .style("font-weight", "bold");

    /* Configuration Array for the Legend:
       We explicitly define the label, the D3 symbol type, and the rotation needed.
    */
    let legendEnergy = [
        { label: "Gain (+)", type: d3.symbolTriangle, rotate: 0 }, // Triangle Up
        { label: "Loss (-)", type: d3.symbolTriangle, rotate: 180 }, // Triangle Down
        { label: "No Change", type: d3.symbolCircle, rotate: 0 }  // Circle
    ];

    // Loop through our configuration array
    for (let i = 0; i < legendEnergy.length; i++) {
        let item = legendEnergy[i];
        let yPos = legendY + 25 + (i * 30);

        /* Draw the Icon using d3.symbol 
        */
        group.append("path")
            .attr("d", d3.symbol().type(item.type).size(100)) // Size 100 is roughly a 6px radius
            .attr("fill", "#989898ff")

            // We use transform here to Position and Rotate the icon
            // We add +10 to legendX to center the icon
            .attr("transform", `translate(${legendX + 10}, ${yPos}) rotate(${item.rotate})`);

        /* Draw the Label Text 
        */
        group.append("text")
            .attr("x", legendX + 30)
            .attr("y", yPos + 5)
            .text(item.label)
            .style("font-size", "12px");
    }

    // Color Legend (Heart Rate)
    let colorLegendY = 130;
    group.append("text")
        .attr("x", legendX)
        .attr("y", colorLegendY)
        .text("Max HR (BPM)")
        .style("font-weight", "bold");

    let colors = colorScale.range();
    for (let i = 0; i < colors.length; i++) {
        let color = colors[i];

        /* Ask D3 Where does this color go from?
      This returns an array of two numbers Start, End */
        let range = colorScale.invertExtent(color);

        //round it off to make it neat
        let start = Math.round(range[0]);
        let end = Math.round(range[1]);

        let yPos = colorLegendY + 20 + (i * 25);

        group.append("rect")
            .attr("x", legendX)
            .attr("y", yPos)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", color)
            .attr("opacity", .6)

        group.append("text")
            .attr("x", legendX + 25)
            .attr("y", yPos + 15)
            .text(start + " - " + end)
            .style("font-size", "12px");
    }
    // Size Legend (Duration)
    let sizeLegendY = 300;

    group.append("text")
        .attr("x", legendX)
        .attr("y", sizeLegendY)
        .text("Duration (min)")
        .style("font-weight", "bold");

    let durValues = rScale.domain();
    let midDur = (durValues[0] + durValues[1]) / 2;
    let sizeSamples = [durValues[0], midDur, durValues[1]];
    let sizeText = ["Low", "Med", "High"];

    for (let i = 0; i < 3; i++) {
        let yPos = sizeLegendY + 30 + (i * 45);
        let r = rScale(sizeSamples[i]);

        group.append("circle")
            .attr("cx", legendX + 10)
            .attr("cy", yPos)
            .attr("r", r)
            .attr("fill", "#989898ff")

        group.append("text")
            .attr("x", legendX + 35)
            .attr("y", yPos + 5)
            .text(Math.round(sizeSamples[i]) + " min (" + sizeText[i] + ")")
            .style("font-size", "12px");
    }
}