import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TreeVisuals = ({ serializedTreeStructure }) => {
  const ref = useRef();

  useEffect(() => {
    console.log(serializedTreeStructure);
    if (!serializedTreeStructure || !serializedTreeStructure.treeStructure) return;

    let treeData;
    try {
      // Assuming treeStructure is a JSON string that needs parsing
      treeData = JSON.parse(serializedTreeStructure.treeStructure);
      console.log("Parsed tree data:", treeData);
    } catch (error) {
      console.error("Error parsing tree structure:", error);
      return;
    }

    const drawTree = (data) => {
      console.log("Drawing tree with data:", data);
      const margin = { top: 20, right: 90, bottom: 30, left: 90 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      // Clear the existing SVG
      d3.select(ref.current).selectAll("*").remove();

      const svg = d3.select(ref.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const treemap = d3.tree().size([height, width]);
      const root = d3.hierarchy(data, d => d.children);
      root.x0 = height / 2;
      root.y0 = 0;

      root.children && root.children.forEach(collapse);

      let i = 0;
      update(root);

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      function update(source) {
        const treeData = treemap(root);
        const nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);

        nodes.forEach(d => d.y = d.depth * 180);

        const node = svg.selectAll('g.node')
          .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr("transform", d => `translate(${source.y0},${source.x0})`);

        nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', 10)
          .style("fill", d => d._children ? "lightsteelblue" : "#fff");

        nodeEnter.append('text')
          .attr("dy", ".35em")
          .attr("x", d => d.children || d._children ? -13 : 13)
          .attr("text-anchor", d => d.children || d._children ? "end" : "start")
          .text(d => d.data.name);

        const nodeUpdate = nodeEnter.merge(node);
        nodeUpdate.transition()
          .duration(750)
          .attr("transform", d => `translate(${d.y},${d.x})`);

        nodeUpdate.select('circle.node')
          .attr('r', 10)
          .style("fill", d => d._children ? "lightsteelblue" : "#fff")
          .attr('cursor', 'pointer');

        const nodeExit = node.exit().transition()
          .duration(750)
          .attr("transform", d => `translate(${source.y},${source.x})`)
          .remove();

        nodeExit.select('circle').attr('r', 1e-6);
        nodeExit.select('text').style('fill-opacity', 1e-6);

        const link = svg.selectAll('path.link')
          .data(links, d => d.id);

        const linkEnter = link.enter().insert('path', "g")
          .attr("class", "link")
          .attr('d', d => diagonal({x: source.x0, y: source.y0}, {x: source.x0, y: source.y0}));

        const linkUpdate = linkEnter.merge(link);
        linkUpdate.transition()
          .duration(750)
          .attr('d', d => diagonal(d, d.parent));

        const linkExit = link.exit().transition()
          .duration(750)
          .attr('d', d => diagonal({x: source.x, y: source.y}, {x: source.x, y: source.y}))
          .remove();

        function diagonal(s, d) {
          return `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`;
        }

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
  }, [serializedTreeStructure]);

  return (
    <svg ref={ref} width="960" height="500"></svg>
  );
};

export default TreeVisuals;
