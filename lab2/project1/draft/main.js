"use strict"

let redBoxWidth = 500;
let redBoxHeight = 500;

/*Variable to control with shape move relative to a pair of variables*/
let elephantx = redBoxWidth - 280; //trunk base original 110 so to put in orriginal position 500-110 so 390
let elephanty = redBoxHeight - 220;  //trunk base original 160 so to put in orriginal position 500-160 so 340

/* Since I used the trunk as my main to move everything, the center of my illustration is slightly 
offset since the rectangle doesn't have its center in the middle like the circle, but in the corner. 
Therefore, for the illustration to be right in the center of the canvas, they  need to be elephantx 280 and elephanty 220. */

let elephantHeadcx = elephantx; //start of trunk to center head left original 110
let elephantHeadcy = elephanty - 85; // center head left to top of trunk 85


/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", redBoxWidth)
    .attr("height", redBoxHeight);

/* A variable was assigned to have the ability to change it later. */
let border = drawing.append("rect")
    .attr("width", redBoxWidth)
    .attr("height", redBoxHeight)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

/*Elephnat Ears*/
/*Elephnat Ears top part*/
let elephantEarsTopLeft = drawing.append("circle")
.attr("cx", elephantHeadcx- 65) //original 45.5
.attr("cy", elephantHeadcy - 5) //original 70.5
.attr("r", 35.5)
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#DBDBDB");

let elephantEarsTopRight = drawing.append("circle")
.attr("cx", elephantHeadcx + 115) //original 225.5
.attr("cy", elephantHeadcy -  5) //original 70 .5
.attr("r", 35.5)
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#DBDBDB");

/*Elephnat Ears bottom part*/
let elephantEarsBottomLeft  = drawing.append("polyline")
.attr("points", closedPolygon(elephantHeadcx-100,elephantHeadcy+5,
                            elephantHeadcx-50,elephantHeadcy-35,
                            elephantHeadcx-50,elephantHeadcy+85)) // original 10, 80, 60,40, 60,160
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#DBDBDB");

let elephantEarsBottomRight  = drawing.append("polyline")
.attr("points", closedPolygon(elephantHeadcx+150,elephantHeadcy+5,
                           elephantHeadcx+100,elephantHeadcy-35,
                            elephantHeadcx+100,elephantHeadcy+85)) // original 260,80,210,40,210,160
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#DBDBDB");

/*Elephant fangs*/
let elephantFangsLeft  = drawing.append("polyline")
.attr("points", closedPolygon(elephantHeadcx-50,elephantHeadcy+30,
                            elephantHeadcx-25,elephantHeadcy+45,
                           elephantHeadcx-25,elephantHeadcy+85)) //original 60,105,85,120,85,160
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#E6E6B8");

let elephantFangsRight  = drawing.append("polyline")
.attr("points", closedPolygon(elephantHeadcx+100,elephantHeadcy+30,
                            elephantHeadcx+75,elephantHeadcy+45,
                           elephantHeadcx+75,elephantHeadcy+85)) //original 210, 105, 185, 120, 185,160
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#E6E6B8");

/* Elephant head */
/* Elephant head top */
let elephantHeadLeft = drawing.append("circle")
.attr("cx", elephantHeadcx-10) //original 100
.attr("cy", elephantHeadcy) //original 75
.attr("r", 50)
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#A1A1A1");

let elephantHeadRight = drawing.append("circle")
.attr("cx", elephantHeadcx + 60) //original 170
.attr("cy", elephantHeadcy) //original 75
.attr("r", 50)
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#A1A1A1");

/* Elephant head bottom */
let elephantHeadBottom = drawing.append("polyline")
.attr("points", closedPolygon(elephantHeadcx-60,elephantHeadcy,
                            elephantHeadcx+110,elephantHeadcy,
                            elephantHeadcx+25,elephantHeadcy+120)) //original 50,75,220,75,135,195
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "#A1A1A1");

/* Elephant eyes */
/* Elephant eyes out */
let elephantEyeOutLeft = drawing.append("ellipse")
.attr("cx", elephantHeadcx-5) // original 105
.attr("cy", elephantHeadcy+5) //original 80.5
.attr("rx", 15) // original 15
.attr("ry", 25) //original 25
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "white");

let elephantEyeOutRight = drawing.append("ellipse")
.attr("cx", elephantHeadcx+55) // original 165
.attr("cy", elephantHeadcy+5) //original. 80.5
.attr("rx", 15) //original 15
.attr("ry", 25) //original 25
///.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "white");

/* Elephant eyes in or pupil*/
let elephantEyeInLeft = drawing.append("circle")
.attr("cx",elephantHeadcx-5) //original 105
.attr("cy", elephantHeadcy+15) //original 90
.attr("r", 10) 
///.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "black");

let elephantEyeInRight = drawing.append("circle")
.attr("cx", elephantHeadcx+55) //original 165
.attr("cy", elephantHeadcy+15) //original 90
.attr("r", 10)
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill",  "black");

/* Elephant Trunk */
/* Elephant Trunk Base */
let elephantTrunkBase = drawing.append("rect")
.attr("x",  elephantx) //110 original 
.attr("y", elephanty) //160 original
.attr("width", 50)
.attr("height", 75)
//.attr("stroke", "black") // uncomment to see stroke
//.attr("stroke-weight", 1) // uncomment to see stroke
.attr("fill", "#A1A1A1");

/* Elephant Trunk Wrinkles */
let elephantTrunk1Wrinkle = drawing.append("line")
.attr("x1", elephantHeadcx) //original 110
.attr("x2", elephantHeadcx+50) //original 160
.attr("y1", elephantHeadcy+90) //original 165
.attr("y2", elephantHeadcy+100) //original 175
.attr("stroke", "black")
.attr("stroke-weight", 1);

let elephantTrunk2Wrinkle = drawing.append("line")
.attr("x1", elephantHeadcx) //original 110
.attr("x2", elephantHeadcx+50) //original 160
.attr("y1", elephantHeadcy+115) //original 190
.attr("y2", elephantHeadcy+115) //original 190
.attr("stroke", "black")
.attr("stroke-weight", 1);

let elephantTrunk3Wrinkle = drawing.append("line")
.attr("x1", elephantHeadcx) //original 110
.attr("x2", elephantHeadcx+50) //original 160
.attr("y1", elephantHeadcy+140) //original 215
.attr("y2", elephantHeadcy+130) //original 205
.attr("stroke", "black")
.attr("stroke-weight", 1);

/*for headcx is minus 110 because that was the original position of the trunk */
/*for headcy is minus 75 because the original. was 160 minus de 85 from the top of the trunk  */
