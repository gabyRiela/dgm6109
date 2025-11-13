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
Y-Axis: Kcal
Radius: Maximum Heart Rate (BPM)
color: Energy level After Workout*/


let dataset = [
    { date: "2025-09-29", activeKcal: 378, energyAfter: 4, maxHRate: 165 },
    { date: "2025-09-30", activeKcal: 313, energyAfter: 2, maxHRate: 162 },
    { date: "2025-10-01", activeKcal: 352, energyAfter: 2, maxHRate: 165 },
    { date: "2025-10-02", activeKcal: 312, energyAfter: 1, maxHRate: 156 },
    { date: "2025-10-03", activeKcal: 386, energyAfter: 3, maxHRate: 175 },
    { date: "2025-10-06", activeKcal: 381, energyAfter: 2, maxHRate: 168 },
    { date: "2025-10-07", activeKcal: 285, energyAfter: 3, maxHRate: 144 },
    { date: "2025-10-08", activeKcal: 465, energyAfter: 2, maxHRate: 175 },
    { date: "2025-10-09", activeKcal: 382, energyAfter: 2, maxHRate: 160 },
    { date: "2025-10-10", activeKcal: 416, energyAfter: 2, maxHRate: 175 },
    { date: "2025-10-13", activeKcal: 406, energyAfter: 5, maxHRate: 172 },
    { date: "2025-10-14", activeKcal: 289, energyAfter: 2, maxHRate: 148 },
    { date: "2025-10-15", activeKcal: 359, energyAfter: 2, maxHRate: 162 },
    { date: "2025-10-16", activeKcal: 328, energyAfter: 2, maxHRate: 149 },
    { date: "2025-10-17", activeKcal: 489, energyAfter: 4, maxHRate: 178 },
    { date: "2025-10-20", activeKcal: 414, energyAfter: 4, maxHRate: 175 },
    { date: "2025-10-23", activeKcal: 392, energyAfter: 2, maxHRate: 166 },
    { date: "2025-10-24", activeKcal: 445, energyAfter: 1, maxHRate: 162 },
    { date: "2025-10-27", activeKcal: 345, energyAfter: 2, maxHRate: 169 },
    { date: "2025-10-28", activeKcal: 257, energyAfter: 1, maxHRate: 144 },
    { date: "2025-10-29", activeKcal: 356, energyAfter: 3, maxHRate: 168 },
    { date: "2025-10-30", activeKcal: 313, energyAfter: 5, maxHRate: 146 },
    { date: "2025-10-31", activeKcal: 409, energyAfter: 4, maxHRate: 167 },
    { date: "2025-11-03", activeKcal: 366, energyAfter: 5, maxHRate: 164 },
    { date: "2025-11-04", activeKcal: 290, energyAfter: 4, maxHRate: 158 },
    { date: "2025-11-05", activeKcal: 355, energyAfter: 3, maxHRate: 171 },
    { date: "2025-11-06", activeKcal: 323, energyAfter: 2, maxHRate: 147 },
    { date: "2025-11-07", activeKcal: 430, energyAfter: 3, maxHRate: 173 }
];

/* Convert date strings to Date objects for proper sorting, new Date as we saw in class */
for (let i = 0; i < dataset.length; i++) {
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

/* we get the min and max values from HR so if we add more data we dont need to change it manualy, I use the logic we saw in class */
let minHR = d3.min(dataset, function (value) {
    return value.maxHRate;
});

let maxHR = d3.max(dataset, function (value) {
    return value.maxHRate;
});

/* Define X and Y scales */
let xScale = d3.scaleLinear()
    .domain([0, dataset.length - 1]) //dates
    .range([leftMargin, svgWidth - rightMargin]);

let yScale = d3.scaleLinear()
    .domain([minKcal - 25, maxKcal + 25])//Range of kcal using min/max
    .range([svgHeight - bottomMargin, topMargin])


/* Scale for circle based on maximum heart rate */
let rScale = d3.scaleSqrt()
    .domain([minHR, maxHR]) //Range of maxHR using min/max
    .range([6, 22]);

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

//  //Range of energy scale 0-5 (1-Exhausted to 5-Fully Energized)
circles.attr("r", function (value) {
    return rScale(value.maxHRate);
})
    .attr("cx", function (value, index) {
        return xScale(index);
    })
    .attr("cy", function (value) {
        return yScale(value.activeKcal);
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
    .attr("x1", leftMargin)
    .attr("y1", svgHeight - bottomMargin)
    .attr("x2", svgWidth - rightMargin)
    .attr("y2", svgHeight - bottomMargin)
    .attr("stroke", "black");

/* draw Y-axis line */
svg.append("line")
    .attr("x1", leftMargin)
    .attr("y1", svgHeight - bottomMargin)
    .attr("x2", leftMargin)
    .attr("y2", topMargin)
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
    .text("Workout Intensity -Active Kcal")
    .attr("transform", "rotate(-90)");

/**** label key graph coordinates ****/

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
let yValueLabel = [250, 300, 350, 400, 450, 500];

for (let i = 0; i < 6; i++) {
    yValueLabel[i] = svg.append("text")
        .attr("x", leftMargin - 15)
        .attr("y", yScale(yValueLabel[i]))
        .attr("text-anchor", "middle")
        .text(yValueLabel[i]);
};

/* Label radius */
/* Box label MaxHR */
svg.append("rect")
    .attr("x", svgWidth - rightMargin + 30)
    .attr("y", topMargin)
    .attr("width", 160)
    .attr("height", 150)
    .attr("fill", "none")
    .attr("stroke", "black");

/* Title for the label MaxHR  */
svg.append("text")
    .attr("x", svgWidth - rightMargin + 110)
    .attr("y", topMargin + 20)
    .attr("text-anchor", "middle")
    .text("Max Heart Rrate");

/* Label Color */
/* Box label EnergyLevel After Workout */
svg.append("rect")
    .attr("x", svgWidth - rightMargin + 30)
    .attr("y", topMargin + 160)
    .attr("width", 160)
    .attr("height", 180)
    .attr("fill", "none")
    .attr("stroke", "black");

/* Title for the label MaxHR  */
svg.append("text")
    .attr("x", svgWidth - rightMargin + 110)
    .attr("y", topMargin + 180)
    .attr("text-anchor", "middle")
    .text("Energy After Workout");

/* For loop to display the circles, low, med, high Heart Rate were taken and placed in the array, as well as for the text explaining the circle size.
Also colors for the energy level  */
let SizeValues = [minHR, (minHR + maxHR) / 2, maxHR];
let SizeLabels = [minHR + " BMP(low)", (minHR + maxHR) / 2 + " BPM (med)", maxHR + " BPM (high)"];
let energyColorLabel = ["#d32f2f", "#ff9800", "#fdd835", "#66bb6a", "#1b5e20"];
let energyTextLabel = ["Exhausted", "Tired", "Ok", "Energectic", "Fully Energized"];

/* circle for each maxHR value */
for (let i = 0; i < 3; i++) {
    svg.append("circle")
        .attr("r", rScale(SizeValues[i]))
        .attr("cx", svgWidth - rightMargin + 55)
        .attr("cy", topMargin + 45 + i * 40)
        .attr("fill", "black")
        .attr("opacity", .5);

    /* Text label next to each circle  */
    svg.append("text")
        .attr("x", svgWidth - rightMargin + 80)
        .attr("y", topMargin + 45 + i * 40)
        .attr("alignment-baseline", "middle")
        .text(SizeLabels[i]);
};

/* circle for each eneryLevel value */
for (let i = 0; i < 5; i++) {
    svg.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", svgWidth - rightMargin + 40)
        .attr("y", topMargin + 190 + i * 30)
        .attr("fill", energyColorLabel[i])
        .attr("opacity", .5);

    /* Text label next to each circle  */
    svg.append("text")
        .attr("x", svgWidth - rightMargin + 65)
        .attr("y", topMargin + 200 + i * 30)
        .attr("alignment-baseline", "middle")
        .text(energyTextLabel[i]);
};

