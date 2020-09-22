import * as d3 from "d3";

export default function makeChart(nodesData, linksData) {
  d3.selectAll("svg > *").remove();
  // create somewhere to put the force directed graph
  let svg = d3.select("svg");
  let width = +svg.attr("width");
  let height = +svg.attr("height");

  const radius = 15;
  console.log(nodesData);
  console.log(linksData);

  // set up the simulation and add forces

  let simulation = d3.forceSimulation().nodes(nodesData);

  let linkForce = d3.forceLink(linksData).id(function(d) {
    return d.word;
  });

  let chargeForce = d3.forceManyBody().strength(-100);

  let centerForce = d3.forceCenter(width / 2, height / 2);

  simulation
    .force("chargeForce", chargeForce)
    .force("centerForce", centerForce)
    .force("links", linkForce);

  // add tick instructions:
  simulation.on("tick", tickActions);

  // add encompassing group for the zoom
  let g = svg.append("g").attr("class", "everything");

  // draw lines for the links
  let link = g
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(linksData)
    .enter()
    .append("line")
    .attr("stroke-width", 2)
    .style("stroke", (d) => linkColour(d));

  // draw circles for the nodes
  let node = g
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodesData)
    .enter()
    .append("circle")
    .text((d) => d.word)
    .attr("r", radius)
    .attr("fill", (d) => circleColour(d));

  // add drag capabilities
  let dragHandler = d3
    .drag()
    .on("start", dragStart)
    .on("drag", dragDrag)
    .on("end", dragEnd);

  dragHandler(node);

  // add zoom capabilities
  let zoomHandler = d3.zoom().on("zoom", zoomActions);

  zoomHandler(svg);

  /** Functions **/

  // Function to choose what color circle we have
  // Let's return blue for males and red for females
  function circleColour(d) {
    let color;
    switch (d.pos) {
      case "adj":
        color = "green";
        break;
      case "adv":
        color = "purple";
        break;
      case "verb":
        color = "brown";
        break;
      case "noun":
        color = "pink";
        break;
      default:
        color = "purple";
    }
    return color;
    // switch (d.pos) {
    //   case "adj":
    //     color = "#02c39a";
    //     break;
    //   case "adv":
    //     color = "#4361ee";
    //     break;
    //   case "verb":
    //     color = "#3a0ca3";
    //     break;
    //   case "noun":
    //     color = "#ff5d8f";
    //     break;
    //   default:
    //     color = "#05668d";
    // }
    // return color;
  }

  // Function to choose the line colour and thickness
  // If the link type is 'A' return green
  // If the link type is 'E' return red
  function linkColour(d) {
    if (d.type === "synonym") {
      return "green";
    } else {
      return "red";
    }
  }

  // Drag functions
  // d is the node
  function dragStart(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  // make sure you can't drag the circle outside the box
  function dragDrag(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnd(event, d) {
    if (event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  // Zoom functions
  function zoomActions(event) {
    g.attr("transform", event.transform);
  }

  function tickActions() {
    // update circle positions each tick of the simulation
    node
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });

    // update link positions
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });
  }
}
