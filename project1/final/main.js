"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);

    /*Note You have to press Draw again after changing the glasses option to enable it.*/
    choice = document.getElementById("choice").value;

    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

/* set up the drawing canvas - Be sure not to copy this code from your draft project! */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*
The function below is called when the user presses the "Draw!" button and is where you will put most of your drawing code. Please follow the instructions in the homework PDF for this step.
*/

function drawImage() {

    /* I used the trunk as my main to move everything, the origin is the corner witch the rectangle is drawn, so 110 for x and 160 for y  */

    let elephantx = xInput;
    let elephanty = yInput;

    let elephantHeadcx = elephantx;
    let elephantHeadcy = elephanty - 85;


    /*Drawing Elephant*/
    /*Elephnat Ears*/
    /*Elephnat Ears top part*/
    let elephantEarsTopLeft = drawing.append("circle")
        .attr("cx", elephantHeadcx - 65)
        .attr("cy", elephantHeadcy - 5)
        .attr("r", 35.5)
        .attr("fill", "#DBDBDB");

    let elephantEarsTopRight = drawing.append("circle")
        .attr("cx", elephantHeadcx + 115)
        .attr("cy", elephantHeadcy - 5)
        .attr("r", 35.5)
        .attr("fill", "#DBDBDB");

    /*Elephnat Ears bottom part*/
    let elephantEarsBottomLeft = drawing.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx - 100, elephantHeadcy + 5,
            elephantHeadcx - 50, elephantHeadcy - 35,
            elephantHeadcx - 50, elephantHeadcy + 85))
        .attr("fill", "#DBDBDB");

    let elephantEarsBottomRight = drawing.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx + 150, elephantHeadcy + 5,
            elephantHeadcx + 100, elephantHeadcy - 35,
            elephantHeadcx + 100, elephantHeadcy + 85))
        .attr("fill", "#DBDBDB");

    /*Elephant fangs*/
    let elephantFangsLeft = drawing.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx - 50, elephantHeadcy + 30,
            elephantHeadcx - 25, elephantHeadcy + 45,
            elephantHeadcx - 25, elephantHeadcy + 85))
        .attr("fill", "#E6E6B8");

    let elephantFangsRight = drawing.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx + 100, elephantHeadcy + 30,
            elephantHeadcx + 75, elephantHeadcy + 45,
            elephantHeadcx + 75, elephantHeadcy + 85))
        .attr("fill", "#E6E6B8");

    /* Elephant head */
    /* Elephant head top */
    let elephantHeadLeft = drawing.append("circle")
        .attr("cx", elephantHeadcx - 10)
        .attr("cy", elephantHeadcy)
        .attr("r", 50)
        .attr("fill", "#A1A1A1");

    let elephantHeadRight = drawing.append("circle")
        .attr("cx", elephantHeadcx + 60)
        .attr("cy", elephantHeadcy)
        .attr("r", 50)
        .attr("fill", "#A1A1A1");

    /* Elephant head bottom */
    let elephantHeadBottom = drawing.append("polyline")
        .attr("points", closedPolygon(elephantHeadcx - 60, elephantHeadcy,
            elephantHeadcx + 110, elephantHeadcy,
            elephantHeadcx + 25, elephantHeadcy + 120))
        .attr("fill", "#A1A1A1");

    /* Elephant eyes */
    /* Elephant eyes out */
    let elephantEyeOutLeft = drawing.append("ellipse")
        .attr("cx", elephantHeadcx - 5)
        .attr("cy", elephantHeadcy + 5)
        .attr("rx", 15)
        .attr("ry", 25)
        .attr("fill", "white");

    let elephantEyeOutRight = drawing.append("ellipse")
        .attr("cx", elephantHeadcx + 55)
        .attr("cy", elephantHeadcy + 5)
        .attr("rx", 15)
        .attr("ry", 25)
        .attr("fill", "white");

    /* Elephant eyes in or pupil*/
    let elephantEyeInLeft = drawing.append("circle")
        .attr("cx", elephantHeadcx - 5)
        .attr("cy", elephantHeadcy + 15)
        .attr("r", 10)
        .attr("fill", "black");

    let elephantEyeInRight = drawing.append("circle")
        .attr("cx", elephantHeadcx + 55)
        .attr("cy", elephantHeadcy + 15)
        .attr("r", 10)
        .attr("fill", "black");

    /* Elephant Trunk */
    /* Elephant Trunk Base */
    let elephantTrunkBase = drawing.append("rect")
        .attr("x", elephantx)
        .attr("y", elephanty)
        .attr("width", 50)
        .attr("height", 75)
        .attr("fill", "#A1A1A1");

    /* Elephant Trunk Wrinkles */
    let elephantTrunk1Wrinkle = drawing.append("line")
        .attr("x1", elephantHeadcx)
        .attr("x2", elephantHeadcx + 50)
        .attr("y1", elephantHeadcy + 90)
        .attr("y2", elephantHeadcy + 100)
        .attr("stroke", "black")
        .attr("stroke-weight", 1);

    let elephantTrunk2Wrinkle = drawing.append("line")
        .attr("x1", elephantHeadcx)
        .attr("x2", elephantHeadcx + 50)
        .attr("y1", elephantHeadcy + 115)
        .attr("y2", elephantHeadcy + 115)
        .attr("stroke", "black")
        .attr("stroke-weight", 1);

    let elephantTrunk3Wrinkle = drawing.append("line")
        .attr("x1", elephantHeadcx)
        .attr("x2", elephantHeadcx + 50)
        .attr("y1", elephantHeadcy + 140)
        .attr("y2", elephantHeadcy + 130)
        .attr("stroke", "black")
        .attr("stroke-weight", 1);

    //with this when you select yes for glasses they appear and when you put no they disappear
    if (choice == "on") {
        // Sunglasses Middle
        let sunglassesMiddle = drawing.append("line")
            .attr("x1", elephantHeadcx + 15)
            .attr("y1", elephantHeadcy + 15)
            .attr("x2", elephantHeadcx + 35)
            .attr("y2", elephantHeadcy + 15)
            .attr("stroke", "black")
            .attr("stroke-width", 5);

        // Sunglasses Left Leg
        let sunglassesLegLeft = drawing.append("line")
            .attr("x1", elephantHeadcx - 60)
            .attr("y1", elephantHeadcy + 5)
            .attr("x2", elephantHeadcx - 35)
            .attr("y2", elephantHeadcy + 15)
            .attr("stroke", "black")
            .attr("stroke-width", 5);

        // Sunglasses Right Leg
        let sunglassesLegRight = drawing.append("line")
            .attr("x1", elephantHeadcx + 85)
            .attr("y1", elephantHeadcy + 15)
            .attr("x2", elephantHeadcx + 110)
            .attr("y2", elephantHeadcy + 5)
            .attr("stroke", "black")
            .attr("stroke-width", 5);

        // Sunglasses Middle Left
        let sunglassesLeft = drawing.append("circle")
            .attr("cx", elephantHeadcx - 10)
            .attr("cy", elephantHeadcy + 15)
            .attr("r", 25)
            .attr("opacity", 0.5)
            .attr("fill", "#a85817ff");

        // Sunglasses Right
        let sunglassesRight = drawing.append("circle")
            .attr("cx", elephantHeadcx + 60)
            .attr("cy", elephantHeadcy + 15)
            .attr("r", 25)
            .attr("opacity", 0.5)
            .attr("fill", "#a85817ff");
    }

    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
