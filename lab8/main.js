"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 600;
/* Configuration variables: margins */
let leftMargin = 100
let rightMargin = 180
let topMargin = 40
let bottomMargin = 80

/* Resize  div to match width of visualization. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border*/
/*  svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);  */

/* WorkoutData - Data processed namually
X-Axis: Active Kilocalories
Y-Axis: Duration (min)
Radius: Maximum Heart Rate (BPM)
color: Energy level After Workout*/


let dataset = [
    { activeKcal: 378, duration: 107, maxHR: 165, energyAfter: 4 },
    { activeKcal: 313, duration: 93, maxHR: 162, energyAfter: 2 },
    { activeKcal: 352, duration: 108, maxHR: 165, energyAfter: 2 },
    { activeKcal: 312, duration: 105, maxHR: 156, energyAfter: 1 },
    { activeKcal: 386, duration: 86, maxHR: 175, energyAfter: 3 },
    { activeKcal: 381, duration: 106, maxHR: 168, energyAfter: 2 },
    { activeKcal: 285, duration: 96, maxHR: 144, energyAfter: 3 },
    { activeKcal: 465, duration: 118, maxHR: 175, energyAfter: 2 },
    { activeKcal: 382, duration: 134, maxHR: 160, energyAfter: 2 },
    { activeKcal: 416, duration: 86, maxHR: 175, energyAfter: 2 },
    { activeKcal: 406, duration: 109, maxHR: 172, energyAfter: 5 },
    { activeKcal: 289, duration: 105, maxHR: 148, energyAfter: 2 },
    { activeKcal: 359, duration: 106, maxHR: 162, energyAfter: 2 },
    { activeKcal: 328, duration: 114, maxHR: 149, energyAfter: 2 },
    { activeKcal: 489, duration: 101, maxHR: 178, energyAfter: 4 },
    { activeKcal: 414, duration: 111, maxHR: 175, energyAfter: 4 },
    { activeKcal: 392, duration: 120, maxHR: 166, energyAfter: 2 },
    { activeKcal: 445, duration: 111, maxHR: 162, energyAfter: 1 },
    { activeKcal: 345, duration: 107, maxHR: 169, energyAfter: 2 },
    { activeKcal: 257, duration: 95, maxHR: 144, energyAfter: 1 },
    { activeKcal: 356, duration: 94, maxHR: 168, energyAfter: 3 },
    { activeKcal: 313, duration: 118, maxHR: 146, energyAfter: 5 },
    { activeKcal: 409, duration: 82, maxHR: 167, energyAfter: 4 }
];

/* sort data so. big circlees. arre drwan first for the maxHR */
dataset.sort(function (a, b) {
    return b.maxHR - a.maxHR;
});

/* Define X and Y scales */
let xScale = d3.scaleLinear()
    .domain([250, 500]) //Range of activeKcal (257-498)
    .range([leftMargin, svgWidth - rightMargin])

let yScale = d3.scaleLinear()
    .domain([80, 140])//Range of duration (82-134)
    .range([svgHeight - bottomMargin, topMargin])


/* Scale for circle based on maximum heart rate */
let rScale = d3.scaleSqrt()
    .domain([140, 180]) //Range of maxHR (144-178)
    .range([6, 22]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

//  //Range of energy scale 0-5 (1-Exhausted to 5-Fully Energized)
circles.attr("r", function (value) {
    return rScale(value.maxHR);
})
    .attr("cx", function (value) {
        return xScale(value.activeKcal);
    })
    .attr("cy", function (value) {
        return yScale(value.duration);
    })
    .attr("fill", function (value) {
        if (value.energyAfter == 1) {
            return "#d32f2f";
        };
        if (value.energyAfter == 2) {
            return "#ff9800";
        };
        if (value.energyAfter == 3) {
            return "#fdd835";
        };
        if (value.energyAfter == 4) {
            return "#66bb6a";
        };
        return "#1b5e20";
    })
    .attr("opacity", .5);


/* draw X-axis line */
svg.append("line")
    .attr("x1", xScale(250))
    .attr("y1", yScale(80))
    .attr("x2", xScale(500))
    .attr("y2", yScale(80))
    .attr("stroke", "black");

/* draw Y-axis line */
svg.append("line")
    .attr("x1", xScale(250))
    .attr("y1", yScale(80))
    .attr("x2", xScale(250))
    .attr("y2", yScale(140))
    .attr("stroke", "black");

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - bottomMargin / 4)
    .attr("text-anchor", "middle")
    .text("Workout complexity - Active Kcal");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", leftMargin / 4)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Workout Duration (minutes)")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
/* Label for value of the Y-Axis and X-Axis */

/* Label for the X-Axis */
let xValueLabel = [250, 300, 350, 400, 450, 500];
for (let i = 0; i < 6; i++) {
    svg.append("text")
        .attr("x", xScale(xValueLabel[i]))
        .attr("y", svgHeight - bottomMargin + 20)
        .attr("text-anchor", "middle")
        .text(xValueLabel[i]);
};
/* Label for the Y-Axis */
let yValueLabel = [80, 90, 100, 110, 120, 130, 140];

for (let i = 0; i < 7; i++) {
    yValueLabel[i] = svg.append("text")
        .attr("x", leftMargin - 15)
        .attr("y", yScale(yValueLabel[i]))
        .attr("text-anchor", "middle")
        .text(yValueLabel[i]);
};

/* Label radius */
/* Box label MaxHR */
svg.append("rect")
    .attr("x", svgWidth - rightMargin + 10)
    .attr("y", topMargin)
    .attr("width", 160)
    .attr("height", 150)
    .attr("fill", "none")
    .attr("stroke", "black");

/* Title for the label MaxHR  */
svg.append("text")
    .attr("x", svgWidth - rightMargin + 90)
    .attr("y", topMargin + 20)
    .attr("text-anchor", "middle")
    .text("Max Heart Rrate");

/* Label Color */
/* Box label EnergyLevel After Workout */
svg.append("rect")
    .attr("x", svgWidth - rightMargin + 10)
    .attr("y", topMargin + 160)
    .attr("width", 160)
    .attr("height", 180)
    .attr("fill", "none")
    .attr("stroke", "black");

/* Title for the label MaxHR  */
svg.append("text")
    .attr("x", svgWidth - rightMargin + 90)
    .attr("y", topMargin + 180)
    .attr("text-anchor", "middle")
    .text("Energy After Workout");

/* For loop to display the circles, low, med, high Heart Rate were taken and placed in the array, as well as for the text explaining the circle size.
Also colors for the energy level  */
let maxHRSizeValues = [144, 161, 178];
let maxHRSizeLabels = ["144 BMP(low)", "161 BPM (med)", "178 BPM (high)"];
let energyColorLabel = ["#d32f2f", "#ff9800", "#fdd835", "#66bb6a", "#1b5e20"];
let energyTextLabel = ["Exhausted", "Tired", "Ok", "Energectic", "Fully Energized"];

/* circle for each maxHR value */
for (let i = 0; i < 3; i++) {
    svg.append("circle")
        .attr("r", rScale(maxHRSizeValues[i]))
        .attr("cx", svgWidth - rightMargin + 35)
        .attr("cy", topMargin + 45 + i * 40)
        .attr("fill", "black")
        .attr("opacity", .5);

    /* Text label next to each circle  */
    svg.append("text")
        .attr("x", svgWidth - rightMargin + 60)
        .attr("y", topMargin + 45 + i * 40)
        .attr("alignment-baseline", "middle")
        .text(maxHRSizeLabels[i]);
};

/* circle for each eneryLevel value */
for (let i = 0; i < 5; i++) {
    svg.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", svgWidth - rightMargin + 20)
        .attr("y", topMargin + 190 + i * 30)
        .attr("fill", energyColorLabel[i])
        .attr("opacity", .5);

    /* Text label next to each circle  */
    svg.append("text")
        .attr("x", svgWidth - rightMargin + 45)
        .attr("y", topMargin + 200 + i * 30)
        .attr("alignment-baseline", "middle")
        .text(energyTextLabel[i]);
};




