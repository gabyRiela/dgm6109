"use strict"

/* Configuration variables: drawing */
let svgWidth = 600;
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
Y-Axis: Energy level end of day*/

let dataset = [{ activeKcal: 378, energyEnd: 3 },
{ activeKcal: 313, energyEnd: 4 },
{ activeKcal: 352, energyEnd: 3 },
{ activeKcal: 312, energyEnd: 4 },
{ activeKcal: 386, energyEnd: 2 },
{ activeKcal: 381, energyEnd: 2 },
{ activeKcal: 385, energyEnd: 2 },
{ activeKcal: 465, energyEnd: 3 },
{ activeKcal: 382, energyEnd: 4 },
{ activeKcal: 416, energyEnd: 3 },
{ activeKcal: 406, energyEnd: 2 },
{ activeKcal: 289, energyEnd: 2 },
{ activeKcal: 359, energyEnd: 1 },
{ activeKcal: 328, energyEnd: 2 },
{ activeKcal: 489, energyEnd: 4 },
{ activeKcal: 414, energyEnd: 4 },
/* { activeKcal: 343, energyEnd: undefined}, */ /* end of day enery not defined */
{ activeKcal: 392, energyEnd: 2 },
{ activeKcal: 445, energyEnd: 2 },
];

/* Define X and Y scales */
let xScale = d3.scaleLinear()
    .domain([280, 500]) //Range of activeKcal (285-498)
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, 5]) //Range of energy scale 0-5 (1-Exhausted to 5-Fully Energized)
    .range([svgHeight - margin, margin]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", 10)
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
    .text("0,280");

/* Label for the maximum value of the X-Axis */
let xMaxLabel = svg.append("text")
    .attr("x", xScale(500))
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .text("500");

    /* Label for the Mid value of the X-Axis */
let xMidLabel = svg.append("text")
    .attr("x", xScale(390))
    .attr("y", svgHeight - (margin / 1.5))
    .attr("text-anchor", "middle")
    .text("390");

/* Label for the maximum value of the Y-Axis */
let yMaxLabel = svg.append("text")
    .attr("x", margin - (margin / 5))
    .attr("y", yScale(5))
    .attr("text-anchor", "middle")
    .text("5");

/* Label for the range 1 to 4 of the Y-Axis */
svg.append("text")
    .attr("x", margin - (margin / 5))
    .attr("y", yScale(1))
    .attr("text-anchor", "middle")
    .text("1");

svg.append("text")
    .attr("x", margin - (margin / 5))
    .attr("y", yScale(2))
    .attr("text-anchor", "middle")
    .text("2");

svg.append("text")
    .attr("x", margin - (margin / 5))
    .attr("y", yScale(3))
    .attr("text-anchor", "middle")
    .text("3");

svg.append("text")
    .attr("x", margin - (margin / 5))
    .attr("y", yScale(4))
    .attr("text-anchor", "middle")
    .text("4");