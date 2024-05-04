<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
  
    // Define the metrics for the original dataset
    let metrics = [
      { axis: "Pre-Orders", value: 120 },
      { axis: "Emails Collected", value: 80 },
      { axis: "CAC", value: 30 }
    ];
  
    // Define the metrics for the new dataset
    let newMetrics = [
      { axis: "", value: 50 },
      { axis: "", value: 60 },
      { axis: "", value: 70 },
    ];
  
    // Define the colors for the datasets
    let datasetColor = "orange";
    let newDatasetColor = "green";
  
    // Dimensions for the SVG
    const width = 400;
    const height = 400;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const radius = Math.min(width, height) / 2 - Math.max(...Object.values(margin));
  
    // Scales for the radar chart
    const rScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, radius]);
  
    const angleSlice = Math.PI * 2 / metrics.length;
  
    // Function to calculate the line points
    const radarLine = d3.lineRadial()
      .radius((/** @type {{ value: any; }} */ d) => rScale(d.value))
      .angle((/** @type {any} */ d, /** @type {number} */ i) => i * angleSlice)
      .curve(d3.curveCatmullRomClosed);
  
    onMount(() => {
      // Select the SVG element
      const svg = d3.select('#radar-chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left + (width - margin.left - margin.right) / 2}, ${margin.top + (height - margin.top - margin.bottom) / 2})`);
  
      // Create circular grid lines
      const gridLevels = 5;
      for (let level = 0; level < gridLevels; level++) {
        const radiusLevel = radius / gridLevels * (level + 1);
        svg.append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', radiusLevel)
          .style('fill', 'none')
          .style('stroke', 'grey')
          .style('stroke-dasharray', '10,10')
          .style('stroke-width', '0.4px');
      }
  
      // Append the radar area for the original metrics
      svg.append('path')
        .datum(metrics)
        .attr('class', 'radar-area')
        .attr('d', radarLine)
        .style('fill', datasetColor)
        .style('fill-opacity', 0.3)
        .style('stroke', d3.rgb(datasetColor).darker());
  
      // Append the radar area for the new metrics
      svg.append('path')
        .datum(newMetrics)
        .attr('class', 'radar-area')
        .attr('d', radarLine)
        .style('fill', newDatasetColor)
        .style('fill-opacity', 0.3)
        .style('stroke', d3.rgb(newDatasetColor).darker());
  
      // Add the axis labels for the original metrics
      svg.selectAll('.axis-label')
        .data(metrics)
        .enter().append('text')
        .attr('class', 'axis-label')
        .attr('x', (/** @type {{ axis: string; value: number; }} */ d) => rScale(100) * Math.cos(angleSlice * metrics.indexOf(d) - Math.PI / 2))
        .attr('y', (/** @type {{ axis: string; value: number; }} */ d) => rScale(100) * Math.sin(angleSlice * metrics.indexOf(d) - Math.PI / 2))
        .text((/** @type {{ axis: any; }} */ d) => d.axis)
        .style('font-size', '10px')
        .style('fill', 'white')
        .attr('text-anchor', 'middle');
  
      // Add the axis labels for the new metrics
      svg.selectAll('.axis-label-new')
        .data(newMetrics)
        .enter().append('text')
        .attr('class', 'axis-label')
        .attr('x', (/** @type {{ axis: string; value: number; }} */ d) => rScale(100) * Math.cos(angleSlice * newMetrics.indexOf(d) - Math.PI / 2))
        .attr('y', (/** @type {{ axis: string; value: number; }} */ d) => rScale(100) * Math.sin(angleSlice * newMetrics.indexOf(d) - Math.PI / 2))
        .text((/** @type {{ axis: any; }} */ d) => d.axis)
        .style('font-size', '10px')
        .style('fill', 'white')
        .attr('text-anchor', 'middle');
    });
  </script>
  
  <svg id="radar-chart"></svg>
  
  <style>
    .radar-area {
      stroke-width: 2px;
    }
  
    .axis-label {
      font-size: 11px;
      text-anchor: middle;
    }
  </style>
  