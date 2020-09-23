//  Jake Wood   8/28/15
//  D3 Force diagram used by "visual thesaurus.html"
import json from "../json/synonyms.json";
import * as d3 from "d3";
export default function Chart(word, body) {
  console.log("to dentro do chart");
  let newHead = word;

  let width = 960,
    height = 500;

  //generates new force diagram by re-filtering synonym data
  function newJson(word) {
    let big_word = word.toUpperCase() + ".";
    let headGroup;
    let synGroup;
    json.nodes.filter(function(d) {
      if (d.name == word) {
        synGroup = d.group;
      } else if (d.name == big_word) {
        headGroup = d.group;
      }
    });
    //clears svg of content
    d3.select("#body")
      .selectAll("svg > *")
      .remove();

    if (headGroup != undefined) {
      update(json, headGroup);
    } else {
      update(json, synGroup);
    }
  }

  //updates force diagram filtered with new group/tag number
  function update(graph, group_tag) {
    //selects only the nodes/links we want to see
    let graphNodes = graph.nodes.filter((d) => d.group == group_tag);
    let graphLinks = graph.links.filter((d) => d.tag == group_tag);

    //code snippet taken from D3 tips-and-tricks, indexes links from names instead of numbers
    let nodeMap = {};
    graphNodes.forEach((x) => (nodeMap[x.name] = x));
    graphLinks = graphLinks.map((x) => {
      return {
        source: nodeMap[x.source],
        target: nodeMap[x.target],
        tag: x.tag,
      };
    });

    force
      .nodes(graphNodes)
      .links(graphLinks)
      .on("tick", tick)
      .start();

    let link = svg
      .selectAll(".link")
      .data(graphLinks)
      .enter()
      .append("g")
      .attr("class", "link");

    link.append("line").style("stroke-width", 5);

    let node = svg
      .selectAll(".node")
      .data(graphNodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .on("click", click)
      .on("dblclick", dblclick)
      .call(force.drag);

    node
      .append("circle")
      .attr("r", function(d) {
        if (d.head) {
          return 35;
        } else {
          return 25;
        }
      })
      .style("fill", "green");

    node
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.name;
      });

    function tick() {
      link
        .selectAll("line")
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

      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }
  }

  newJson(newHead); //initial entry

  //reloads/updates graph if child node clicked
  function dblclick(d) {
    if (!d.head) {
      newJson(d.name);
    }
  }

  //shows definition of clicked node
  function click(d) {
    document.getElementById("myText").value = d.name;
    // displayDefinition();
  }
}
