"use strict"

/* Configuration variables: drawing */
let svgWidth = 900;
let svgHeight = 400;
let margin = 65;

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
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/* WorkoutData - Data processed namually
X-Axis: Active Kilocalories
Y-Axis: Energy level end of day
Radius: Duration in min*/

let dataset = [{ activeKcal: 378, energyEnd: 3, duration: 107 },
{ activeKcal: 313, energyEnd: 4, duration: 93 },
{ activeKcal: 352, energyEnd: 3, duration: 108 },
{ activeKcal: 312, energyEnd: 4, duration: 105 },
{ activeKcal: 386, energyEnd: 2, duration: 86 },
{ activeKcal: 381, energyEnd: 2, duration: 106 },
{ activeKcal: 385, energyEnd: 2, duration: 96 },
{ activeKcal: 465, energyEnd: 3, duration: 118 },
{ activeKcal: 382, energyEnd: 4, duration: 134 },
{ activeKcal: 416, energyEnd: 3, duration: 86 },
{ activeKcal: 406, energyEnd: 2, duration: 109 },
{ activeKcal: 289, energyEnd: 2, duration: 105 },
{ activeKcal: 359, energyEnd: 1, duration: 106 },
{ activeKcal: 328, energyEnd: 2, duration: 114 },
{ activeKcal: 489, energyEnd: 4, duration: 101 },
{ activeKcal: 414, energyEnd: 4, duration: 111 },
/* { activeKcal: 343, energyEnd: undefined}, */ /* end of day enery not defined */
{ activeKcal: 392, energyEnd: 2, duration: 120 },
{ activeKcal: 445, energyEnd: 2, duration: 111 },
{ activeKcal: 345, energyEnd: 2, duration: 107 },
{ activeKcal: 257, energyEnd: 2, duration: 95 },
{ activeKcal: 356, energyEnd: 4, duration: 94 },
{ activeKcal: 313, energyEnd: 5, duration: 118 },
{ activeKcal: 409, energyEnd: 4, duration: 82 },
];

/* Define X and Y scales */
let xScale = d3.scaleLinear()
    .domain([250, 500]) //Range of activeKcal (257-498)
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 5]) //Range of energy scale 0-5 (1-Exhausted to 5-Fully Energized)
    .range([svgHeight - margin, margin]);

    /* Scale for circle based on workout duration */
let rScale = d3.scaleLinear()
    .domain([80, 135]) //Range of duration in min ((82-134))
    .range([5, 15]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", function (value) {
    return rScale(value.duration);
})
    .attr("cx", function (value) {
        return xScale(value.activeKcal);
    })
    .attr("cy", function (value) {
        return yScale(value.energyEnd);
    })
    .attr("opacity", .5);

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 3))
    .attr("text-anchor", "middle")
    .text("Workout complexity - Active Kcal");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("End of day energy - 1=Exhausted to 5=Fully energized")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/
/* Label for the minimum value of the Y-Axis and X-Axis */
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .text("0,250");

/* Label for the maximum value of the X-Axis */
let xMaxLabel = svg.append("text")
    .attr("x", xScale(500))
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .text("500");

/* Label for the Mid value of the X-Axis */
let xMidLabel = svg.append("text")
    .attr("x", xScale(375))
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .text("375");

/* Switch to for loop to display Y-axis */
let yValueLabel = [];

for (let i = 1; i <= 5; i++) {
    yValueLabel[i] = svg.append("text")
        .attr("x", margin - (margin / 5))
        .attr("y", yScale(i))
        .attr("text-anchor", "middle")
        .text(i);
};

/* Title for the labels  */
svg.append("text")
    .attr("x", margin + 65)
    .attr("y", margin + 15)
    .attr("text-anchor", "middle")
    .text("Workout Duration");

/* For loop to display the circles, the shortest, medium, and longest durations were taken and placed in the array, as well as for the text explaining the circle size. */
let labelDuration = [82, 108, 134];
let labelText = ["82 min", "108 min", "134 min"];

/* circle for each duration value */
for (let i = 0; i < 3; i++) {
    svg.append("circle")
        .attr("r", rScale(labelDuration[i]))
        .attr("cx", margin + 20)
        .attr("cy", margin + 35 + i * 30)
        .attr("fill", "black")

        /* Text label next to each circle  */
    svg.append("text")
        .attr("x", margin + 40)
        .attr("y", margin + 35 + i * 30)
        .attr("alignment-baseline", "middle")
        .text(labelText[i]);
};
