"use strict"

document.getElementById("action").addEventListener("click", processForm);

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = svg.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");
// let xInput, yInput, choice; 

function processForm() {
    let originElephantx = Number(document.getElementById("xInput").value);
    let originElephanty = Number(document.getElementById("yInput").value);
    let glassesChoice = document.getElementById("glassesChoice").value;

    let originChoice = document.getElementById("originChoice").value;
    let showOrigin = (originChoice == "on");

    svg.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    //drawImage();

    elephant(svg, originElephantx, originElephanty, showOrigin, glassesChoice);
}






