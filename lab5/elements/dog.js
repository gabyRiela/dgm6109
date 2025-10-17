"use strict";

/**
 * Sujan pokhrel-drawing#16-bulldog
 * @param {object} svg - D3 SVG drawing area
 * @param {number} x - horizontal center
 * @param {number} y - vertical center
 * @param {boolean} showOrigin - show pink origin dot if true
 */
function dog(svg, x, y, showOrigin) {

  // Head
  svg.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 80)
    .attr("fill", "#654321")
    .attr("stroke", "black");

  // Ears
  svg.append("polygon")
    .attr("points", `${x - 60},${y - 50} ${x - 120},${y} ${x - 100},${y - 100}`)
    .attr("fill", "#A67C52")
    .attr("stroke", "black");

  svg.append("polygon")
    .attr("points", `${x + 75},${y - 100} ${x + 120},${y - 20} ${x + 60},${y - 50}`)
    .attr("fill", "#A67C52")
    .attr("stroke", "black");

  // Eyes
  svg.append("circle")
    .attr("cx", x - 50)
    .attr("cy", y - 30)
    .attr("r", 10)
    .attr("fill", "black");
  svg.append("circle")
    .attr("cx", x + 50)
    .attr("cy", y - 30)
    .attr("r", 10)
    .attr("fill", "black");

  // Eyebrows
  svg.append("line")
    .attr("x1", x - 20).attr("y1", y - 80)
    .attr("x2", x).attr("y2", y - 50)
    .attr("stroke", "black").attr("stroke-width", 3);
  svg.append("line")
    .attr("x1", x + 40).attr("y1", y - 80)
    .attr("x2", x + 20).attr("y2", y - 50)
    .attr("stroke", "black").attr("stroke-width", 3);

  // Nose
  svg.append("circle")
    .attr("cx", x)
    .attr("cy", y + 15)
    .attr("r", 18)
    .attr("fill", "black");

  // Cheeks
  svg.append("circle")
    .attr("cx", x - 80)
    .attr("cy", y + 60)
    .attr("r", 40)
    .attr("fill", "#A67C52");

  svg.append("circle")
    .attr("cx", x + 60)
    .attr("cy", y + 61)
    .attr("r", 40)
    .attr("fill", "#A67C52");

  // Mouth
  svg.append("rect")
    .attr("x", x - 80)
    .attr("y", y + 20)
    .attr("width", 140)
    .attr("height", 80)
    .attr("fill", "#E5A552")
    .attr("stroke", "black");

  // Simple small white triangle teeth
  svg.append("polygon")
    .attr("points", `${x - 40},${y + 60} ${x - 20},${y + 60} ${x - 30},${y + 80}`)
    .attr("fill", "white")
    .attr("stroke", "black");

  svg.append("polygon")
    .attr("points", `${x + 40},${y + 60} ${x + 20},${y + 60} ${x + 30},${y + 80}`)
    .attr("fill", "white")
    .attr("stroke", "black");

  // Optional pink origin dot
  if (showOrigin) {
    svg.append("circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 3)
      .attr("fill", "deeppink");
  }

  return svg;
}
