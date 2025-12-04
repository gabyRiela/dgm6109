"use strict"

let svgWidth = 1200
let svgHeight = 900


let margin = {
    top: 50,
    right: 200,
    bottom: 100,
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
    console.log("here")
})();


function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);

    //    this allows us to draw within a proper chart area 
    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    drawVisualization(renderData, chartGroup);
    return data;
}

/*
    This function cleans the data, parses dates, and calculates derived values
*/
function organizeData(data) {
    let organized = [];

    // I use d3.timeParse because the JSON date format is "YYYY-MM-DD"
    let processData = d3.timeParse("%Y-%m-%d");

    // Loop through each workout entry in the raw data
    for (let i = 0; i < data.length; i++) {
        let value = data[i];

        // Calculate Energy Change: Post-Workout - Morning Energy 
        let energyChangeCalc = value.energyAfter - value.energyMorn;

        /* Creating a clean object with types converted (strings to numbers/dates) */
        let processedItem = {
            date: processData(value.date),// Convert string to Date object
            dateStr: value.date,  // Keep original string for tooltips
            activeKcal: +value.activeKcal, // Convert to number using '+'
            duration: +value.duration,  // Duration in minutes
            maxHRate: +value.maxHRate,   // Max Heart Rate in BPM
            energyChange: energyChangeCalc   // Calculated energy difference
        };
        organized.push(processedItem);
    }

    /* Sort data chronologically by date */
    organized.sort(function (a, b) {
        return a.date - b.date;
    });

    return organized;
}

/*
    This function defines the domains and ranges for X, Y, Size, and Color scales.
*/
function buildScales(data) {
    // Calculate the actual drawing area (subtract margins from total size)
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    // Calculate Min/Max values using d3.min/max as requested 
    let minKcal = d3.min(data, function (value) { return value.activeKcal; });
    let maxKcal = d3.max(data, function (value) { return value.activeKcal; });

    let minDur = d3.min(data, function (value) { return value.duration; });
    let maxDur = d3.max(data, function (value) { return value.duration; });

    let minHR = d3.min(data, function (value) { return value.maxHRate; });
    let maxHR = d3.max(data, function (value) { return value.maxHRate; });

    // X Scale: Time Scale 
    xScale = d3.scaleTime()
        .domain(d3.extent(data, function (value) { return value.date; }))
        .range([0, width]);

    /*      Y Scale: Linear Scale for Calories 
         Added padding (+50) so points don't hit the top border */
    yScale = d3.scaleLinear()
        .domain([minKcal - 50, maxKcal + 50])
        .range([height, 0]);

    /*      Radius Scale: Duration
         scaleSqrt is used because visual size perception is based on area */
    rScale = d3.scaleSqrt()
        .domain([minDur, maxDur])
        .range([8, 25]); // Size range in pixels

    // Color Scale: Quantize Scale for Max Heart Rate 
    colorScale = d3.scaleQuantize()
        .domain([minHR, maxHR])
        .range(["#fff5f0", "#fcbba1", "#fb6a4a", "#cb181d", "#67000d"]);
}

/*
   This is a NEW function created to handle the geometry.
   Instead of just returning a list of points (like for a polyline),
   it returns a "path data string" (d attribute).
   
   Why? Because <polyline> can only draw straight lines. 
   To draw a Circle (curved lines) AND Triangles (straight lines) 
   in the same visualization, must use the <path> element.
*/
function getShapePath(cx, cy, r, direction) {
    //  Create a "path context". This works like a pen drawing on paper.
    let context = d3.path();

    if (direction === 0) {
        /*     Neutral Energy (Draw a Circle)
           context.arc(centerX, centerY, radius, startAngle, endAngle)
        Math.PI * 2 represents a full 360-degree circle. */
        context.arc(cx, cy, r, 0, Math.PI * 2);
    } else {
        // Energy Gain/Loss (Draw a Triangle)

        // Calculate the tip of the triangle based on direction (1 for up, -1 for down)
        let topY = cy - (r * direction);

        // Calculate the base points (left and right)
        let baseLeftX = cx - r;
        let baseRightX = cx + r;
        let baseY = cy + (r * direction * 0.5);

        // Draw the lines connecting these points
        context.moveTo(cx, topY);          // move to the top tip
        context.lineTo(baseRightX, baseY); // Draw line to bottom-right
        context.lineTo(baseLeftX, baseY);  // Draw line to bottom-left
        context.closePath();               // Draw line back to the start (closes the shape)
    }

/*     Convert the drawing commands into a string (e.g., "M 10 10 L 20 20...")
 This string is what the SVG <path> element needs to know what to draw. */
    return context.toString();
}


/*
  This function handles the actual DOM manipulation to draw the chart.
 */
function drawVisualization(data, group) {

    // Calculate internal width/height respecting margins
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;


    // X Axis: Time scale formatted to show "Month Day"
    let xAxis = d3.axisBottom(xScale)
        .ticks(15)
        .tickFormat(d3.timeFormat("%b %d"));

    // Append X Axis group and rotate text for readability
    group.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    // Y Axis: Linear scale for Calories
    let yAxis = d3.axisLeft(yScale);

    group.append("g")
        .call(yAxis);

    // Axis Labels
    group.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Active Kilocalories (kcal)");

    group.append("text")
        .attr("y", height + margin.bottom - 20)
        .attr("x", width / 2)
        .style("text-anchor", "middle")
        .text("Date (2025)");

    /*      Select "path" instead of "circle" or "polyline"
     add the class .glyph to make it specific to our data points. */
    group.selectAll("path.glyph")
        .data(data)
        .join("path")
        .attr("class", "glyph")

/*        The 'd' attribute defines the shape. 
         call our helper function getShapePath() here. */
        .attr("d", function (value) {
            // Get the calculated positions from our scales
            let x = xScale(value.date);
            let y = yScale(value.activeKcal);
            let size = rScale(value.duration);

            // Determine direction for the triangle (or 0 for circle)
            let direction = 0;
            if (value.energyChange > 0) { direction = 1; }
            if (value.energyChange < 0) { direction = -1; }

            // Generate the path string (Triangle or Circle)
            return getShapePath(x, y, size, direction);
        })
        //  Set Color based on Heart Rate
        .attr("fill", function (value) {
            return colorScale(value.maxHRate);
        })
        //  Styling (stroke, opacity)
        .attr("stroke", "#333")
        .attr("stroke-width", 1)
        .attr("opacity", 0.9)
        // Tooltip
        .append("title")
        .text(function (value) {
            return `Date: ${value.dateStr}\nKcal: ${value.activeKcal}\nHR: ${value.maxHRate}`;
        });


    /*  Legends */

    let legendX = width + 40;
    let legendY = 0;

    // Shape Legend (Energy Change) 
    group.append("text")
        .attr("x", legendX)
        .attr("y", legendY)
        .text("Energy Change")
        .style("font-weight", "bold");

    let shapeLabels = ["Gain (+)", "Loss (-)", "Neutral"];
    let shapeDirs = [1, -1, 0]; // 0 will automatically trigger the Circle logic in getShapePath

    for (let i = 0; i < shapeLabels.length; i++) {
        let yPos = legendY + 25 + (i * 30);

   /*  Use the same getShapePath function to draw the legend icons.
        This ensures the legend looks exactly like the data points. */
        group.append("path")
            .attr("d", getShapePath(legendX + 10, yPos, 10, shapeDirs[i]))
            .attr("fill", "#999")
            .attr("stroke", "black");

        group.append("text")
            .attr("x", legendX + 30)
            .attr("y", yPos + 5)
            .text(shapeLabels[i])
            .style("font-size", "12px");
    }

    // Color Legend (Heart Rate)
    let colorLegendY = 130;
    group.append("text")
        .attr("x", legendX)
        .attr("y", colorLegendY)
        .text("Max HR (BPM)")
        .style("font-weight", "bold");

    let colors = ["#fff5f0", "#fcbba1", "#fb6a4a", "#cb181d", "#67000d"];
    let hrValues = colorScale.domain();
    let step = (hrValues[1] - hrValues[0]) / 4;

    for (let i = 0; i < 5; i++) {
        let val = hrValues[0] + (step * i);
        let yPos = colorLegendY + 25 + (i * 25);

        group.append("rect")
            .attr("x", legendX)
            .attr("y", yPos)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", colors[i])
            .attr("stroke", "#ccc");

        group.append("text")
            .attr("x", legendX + 25)
            .attr("y", yPos + 15)
            .text(Math.round(val))
            .style("font-size", "12px");
    }

    // Size Legend (Duration)
    let sizeLegendY = 290;
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
        let yPos = sizeLegendY + 40 + (i * 40);
        let r = rScale(sizeSamples[i]);

      /*   pass '0' as direction here.
     This forces getShapePath to draw a CIRCLE, which is standard for size legends. */
        group.append("path")
            .attr("d", getShapePath(legendX + 10, yPos, r, 0))
            .attr("fill", "none")
            .attr("stroke", "black");

        group.append("text")
            .attr("x", legendX + 35)
            .attr("y", yPos + 5)
            .text(Math.round(sizeSamples[i]) + " min (" + sizeText[i] + ")")
            .style("font-size", "12px");
    }
}