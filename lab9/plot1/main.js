"use strict"

/* Configuration variables: drawing */
let svgWidth = 900;
let svgHeight = 600;
/* Configuration variables: margins */
let leftMargin = 100
let rightMargin = 200
let topMargin = 40
let bottomMargin = 120

d3.select("#container")
    .style("width", String(svgWidth) + "px");

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* WorkoutData - Data processed namually
X-Axis: Date
Y-Axis: Morning Energy
Radius: Active Kcal
color: Energy Change (energyAfter-energyEnd)*/


let dataset = [
    { date: "2025-09-29", activeKcal: 378, energyEnd: 3, energyMorning: 2, energyAfter: 4 },
    { date: "2025-09-30", activeKcal: 313, energyEnd: 4, energyMorning: 3, energyAfter: 2 },
    { date: "2025-10-01", activeKcal: 352, energyEnd: 3, energyMorning: 2, energyAfter: 2 },
    { date: "2025-10-02", activeKcal: 312, energyEnd: 4, energyMorning: 3, energyAfter: 1 },
    { date: "2025-10-03", activeKcal: 386, energyEnd: 2, energyMorning: 1, energyAfter: 3 },
    { date: "2025-10-06", activeKcal: 381, energyEnd: 2, energyMorning: 1, energyAfter: 2 },
    { date: "2025-10-07", activeKcal: 285, energyEnd: 2, energyMorning: 1, energyAfter: 3 },
    { date: "2025-10-08", activeKcal: 465, energyEnd: 3, energyMorning: 1, energyAfter: 2 },
    { date: "2025-10-09", activeKcal: 382, energyEnd: 4, energyMorning: 3, energyAfter: 2 },
    { date: "2025-10-10", activeKcal: 416, energyEnd: 3, energyMorning: 3, energyAfter: 2 },
    { date: "2025-10-13", activeKcal: 406, energyEnd: 2, energyMorning: 5, energyAfter: 5 },
    { date: "2025-10-14", activeKcal: 289, energyEnd: 2, energyMorning: 2, energyAfter: 2 },
    { date: "2025-10-15", activeKcal: 359, energyEnd: 1, energyMorning: 3, energyAfter: 2 },
    { date: "2025-10-16", activeKcal: 328, energyEnd: 2, energyMorning: 1, energyAfter: 2 },
    { date: "2025-10-17", activeKcal: 489, energyEnd: 4, energyMorning: 3, energyAfter: 4 },
    { date: "2025-10-20", activeKcal: 414, energyEnd: 4, energyMorning: 4, energyAfter: 4 },
    { date: "2025-10-23", activeKcal: 392, energyEnd: 2, energyMorning: 1, energyAfter: 2 },
    { date: "2025-10-24", activeKcal: 445, energyEnd: 2, energyMorning: 1, energyAfter: 1 },
    { date: "2025-10-27", activeKcal: 345, energyEnd: 2, energyMorning: 2, energyAfter: 2 },
    { date: "2025-10-28", activeKcal: 257, energyEnd: 2, energyMorning: 1, energyAfter: 1 },
    { date: "2025-10-29", activeKcal: 356, energyEnd: 4, energyMorning: 3, energyAfter: 3 },
    { date: "2025-10-30", activeKcal: 313, energyEnd: 5, energyMorning: 4, energyAfter: 5 },
    { date: "2025-10-31", activeKcal: 409, energyEnd: 4, energyMorning: 3, energyAfter: 4 },
    { date: "2025-11-03", activeKcal: 366, energyEnd: 4, energyMorning: 5, energyAfter: 5 },
    { date: "2025-11-04", activeKcal: 290, energyEnd: 4, energyMorning: 3, energyAfter: 4 },
    { date: "2025-11-05", activeKcal: 355, energyEnd: 3, energyMorning: 2, energyAfter: 3 },
    { date: "2025-11-06", activeKcal: 323, energyEnd: 2, energyMorning: 2, energyAfter: 2 },
    { date: "2025-11-07", activeKcal: 430, energyEnd: 3, energyMorning: 2, energyAfter: 3 }
];


/* for loop with energy change from after workout to end oof day. so we can get a positive(energy increased) o negative(energy decreased) result, and use of new Date for thee date to change them to object   */
for (let i = 0; i < dataset.length; i++) {
    dataset[i].energyCange = dataset[i].energyEnd - dataset[i].energyAfter;
    dataset[i].dateObject = new Date(dataset[i].date);
}

/* sort dates following the logic we saw in class*/
dataset.sort(function (a, b) {
    return a.dateObject - b.dateObject;
});

/* we get the min and max values from Kcal so if we add more data we dont need to change it manualy, I use the logic we saw in class */
let minKcal = d3.min(dataset, function (value) {
    return value.activeKcal;
});

let maxKcal = d3.max(dataset, function (value) {
    return value.activeKcal;
});

/* Define X and Y scales */
let xScale = d3.scaleLinear()
    .domain([0, dataset.length - 1]) //dates
    .range([leftMargin, svgWidth - rightMargin]);

let yScale = d3.scaleLinear()
    .domain([0, 5])//Range of energy 1-5
    .range([svgHeight - bottomMargin, topMargin]);


/* Scale for circle based on maximum heart rate */
let rScale = d3.scaleSqrt()
    .domain([minKcal, maxKcal]) //Range of kcal using min and max
    .range([6, 20]);

/* we made a variable for the color insted of the if else */
let colorScale = d3.scaleLinear()
    .domain([-3, 0, 3])
    .range(["#d32f2f", "#f5db90ff", "#3448a4ff"])

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", function (value) {
    return rScale(value.activeKcal);
})
    .attr("cx", function (value, index) { //is index of thee value
        return xScale(index);
    })
    .attr("cy", function (value) {
        return yScale(value.energyMorning);
    })
    .attr("fill", function (value) {
        return colorScale(value.energyCange);
    })
    .attr("opacity", .8);


/* draw X-axis line */
svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(dataset.length - 1))
    .attr("y2", yScale(0))
    .attr("stroke", "black");

/* draw Y-axis line */
svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(0))
    .attr("y2", yScale(5))
    .attr("stroke", "black");

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - bottomMargin / 4)
    .attr("text-anchor", "middle")
    .text("Workout Date");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", leftMargin / 4)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Morning Energy (1-Exhausted to 5-Fully Energized)")
    .attr("transform", "rotate(-90)");

/* Label for value of the Y-Axis and X-Axis */
/* Label for the X-Axis */

/* use of AI to display date label,  because i was traing to use timeParse (we saw in class), it didn't work, 
gemini explain that it only worrks for read no to display so thats why i'm using utcFormat, also because there was a 
discrepancy of one day    */
let formatDate = d3.utcFormat("%d %b");
for (let i = 0; i < dataset.length; i++) {
    let xValueLabel = formatDate(dataset[i].dateObject);

    svg.append("text")
        .attr("x", xScale(i))
        .attr("y", svgHeight - bottomMargin + 15)
        .attr("text-anchor", "end")
        .attr("transform", `rotate(-65 ${xScale(i)} ${svgHeight - bottomMargin + 15})`)
        .text(xValueLabel);
};
/* Label for the Y-Axis */
for (let i = 1; i <= 5; i++) {
    svg.append("text")
        .attr("x", leftMargin - 15)
        .attr("y", yScale(i))
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "middle")
        .text(i);
};

/* Label 1 radius */
/* Box label Kcal */
svg.append("rect")
    .attr("x", svgWidth - rightMargin + 20)
    .attr("y", topMargin)
    .attr("width", 170)
    .attr("height", 150)
    .attr("fill", "none")
    .attr("stroke", "black");

/* Title for the label Kcal  */
svg.append("text")
    .attr("x", svgWidth - rightMargin + 100)
    .attr("y", topMargin + 20)
    .attr("text-anchor", "middle")
    .text("Workout Intensity");

/* Label 2 Color */
/* Box label Energy Cahnge  */
svg.append("rect")
    .attr("x", svgWidth - rightMargin + 20)
    .attr("y", topMargin + 160)
    .attr("width", 170)
    .attr("height", 160)
    .attr("fill", "none")
    .attr("stroke", "black");

/* Title for the label Energy Cahnge   */
svg.append("text")
    .attr("x", svgWidth - rightMargin + 100)
    .attr("y", topMargin + 180)
    .attr("text-anchor", "middle")
    .text("Energy Change");

/* sub-Title for the label Energy Cahnge  */
svg.append("text")
    .attr("x", svgWidth - rightMargin + 100)
    .attr("y", topMargin + 200)
    .attr("text-anchor", "middle")
    .text("End - After");

/* For loop to display the circles, low, med, high kcal were taken and placed in the array, as well as for the text explaining the circle size.
Also colors for the change energy */
let SizeValues = [minKcal, (minKcal + maxKcal) / 2, maxKcal];
let SizeLabels = [minKcal + " Kcal (low)", (minKcal + maxKcal) / 2 + " Kcal (med)", maxKcal + " Kcal (high)"];
let ColorLabel = [-2, 0, 2];
let TextLabel = ["Dropped 2+ levels", "Stayed same", "Increased 2+ levels"];

/* circle for each kcal value */
for (let i = 0; i < 3; i++) {
    svg.append("circle")
        .attr("r", rScale(SizeValues[i]))
        .attr("cx", svgWidth - rightMargin + 45)
        .attr("cy", topMargin + 45 + i * 40)
        .attr("fill", "black")
        .attr("opacity", .5);

    /* Text label next to each circle  */
    svg.append("text")
        .attr("x", svgWidth - rightMargin + 70)
        .attr("y", topMargin + 45 + i * 40)
        .attr("alignment-baseline", "middle")
        .text(SizeLabels[i]);
};

/* circle for each change energy value */
for (let i = 0; i < 3; i++) {
    svg.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", svgWidth - rightMargin + 30)
        .attr("y", topMargin + 220 + i * 35)
        .attr("fill", colorScale(ColorLabel[i]))
        .attr("opacity", .8);

    /* Text label next to each circle  */
    svg.append("text")
        .attr("x", svgWidth - rightMargin + 55)
        .attr("y", topMargin + 230 + i * 35)
        .attr("alignment-baseline", "middle")
        .text(TextLabel[i]);
};