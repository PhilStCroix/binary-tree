import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TreeVisuals = ({ treeData }) => {
  const ref = useRef();

  useEffect(() => {
    if (!treeData) return;

    const drawTree = (data) => {
      // Set the dimensions and margins of the diagram
      const margin = {top: 20, right: 90, bottom: 30, left: 90},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      // Clear the existing SVG
      d3.select(ref.current).selectAll("*").remove();

      const svg = d3.select(ref.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("
              + margin.left + "," + margin.top + ")");

      // Declares a tree layout and assigns the size
      const treemap = d3.tree().size([height, width]);

      // Assigns parent, children, height, depth
      const root = d3.hierarchy(data, d => { return d.children; });
      root.x0 = height / 2;
      root.y0 = 0;

      // Collapse after the second level
      root.children && root.children.forEach(collapse);

      update(root);

      // Collapse the node and all it's children
      function collapse(d) {
        if(d.children) {
          d._children = d.children
          d._children.forEach(collapse)
          d.children = null
        }
      }

      function update(source) {
        // Assigns the x and y position for the nodes
        const treeData = treemap(root);

        // Compute the new tree layout.
        const nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach((d) => { d.y = d.depth * 180 });

        // Nodes section
        const node = svg.selectAll('g.node')
          .data(nodes, function(d) {return d.id || (d.id = ++i); });

        // Enter any new modes at the parent's previous position.
        const nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
          });

        // Add Circle for the nodes
        nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', 10)
          .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
          });

        // Add labels for the nodes
        nodeEnter.append('text')
          .attr("dy", ".35em")
          .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
          })
          .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
          })
          .text(function(d) { return d.data.name; });

        // UPDATE
        const nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
          .duration(750)
          .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")";
          });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
          .attr('r', 10)
          .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
          })
          .attr('cursor', 'pointer');

        // Remove any exiting nodes
        const nodeExit = node.exit().transition()
          .duration(750)
          .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
          .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
          .style('fill-opacity', 1e-6);

        // Links section (joining nodes)
        const link = svg.selectAll('path.link')
          .data(links, function(d) { return d.id; });

        // Enter any new links at the parent's previous position.
        const linkEnter = link.enter().insert('path', "g")
          .attr("class", "link")
          .attr('d', function(d){
            const o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
          });

        // UPDATE
        const linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
          .duration(750)
          .attr('d', function(d){ return diagonal(d, d.parent) });

        // Remove any exiting links
        const linkExit = link.exit().transition()
          .duration(750)
          .attr('d', function(d) {
            const o = {x: source.x, y: source.y}
            return diagonal(o, o)
          })
          .remove();

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {
          path = `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`

          return path
        }

        // Toggle children on click.
        function click(d) {
          if (d.children) {
              d._children = d.children;
              d.children = null;
            } else {
              d.children = d._children;
              d._children = null;
            }
          update(d);
        }
      }
    };

    drawTree(treeData);
  }, [treeData]);  // Redraw tree when data changes

  return (
    <svg ref={ref} width="960" height="500" />
  );
};

export default TreeVisuals;


