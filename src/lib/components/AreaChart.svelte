<script>
  import { onMount } from 'svelte';
  import { scaleLinear, scaleTime, extent, line, scaleSequential, interpolateRgb, timeFormat } from 'd3';
  import * as d3 from "d3"

  let data = [
    { date: new Date('2024-04-27'), value: 10 },
    { date: new Date('2024-04-28'), value: 20 },
    { date: new Date('2024-04-29'), value: 15 },
    { date: new Date('2024-04-30'), value: 25 },
    { date: new Date('2024-05-01'), value: 18 },
    { date: new Date('2024-05-02'), value: 19 },
    { date: new Date('2024-05-03'), value: 21 },
    { date: new Date('2024-05-04'), value: 25 },
    { date: new Date('2024-05-05'), value: 32 },
    { date: new Date('2024-05-06'), value: 60 }
  ];

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 550 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  onMount(() => {
    drawChart();
  });

  function drawChart() {
    const x = scaleTime()
      .domain(extent(data, (/** @type {{ date: any; }} */ d) => d.date))
      .range([0, width]);

    const maxDataValue = Math.max(...data.map(d => d.value));
    const yTickCount = 5; // Number of ticks on y-axis
    const y = scaleLinear()
      .domain([0, Math.ceil(maxDataValue / yTickCount) * yTickCount]) // Ensure even split
      .range([height, 0]);

    const svg = d3.select('.chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const colorScale = scaleSequential(interpolateRgb("#FF00FF", "#00FFFF")) // Gradient colors: purple to cyan
      .domain([0, data.length]);

    const lineGenerator = line()
      .x((/** @type {{ date: any; }} */ d) => x(d.date))
      .y((/** @type {{ value: any; }} */ d) => y(d.value))
      .curve(d3.curveBasis); // Smooth line

    // Add filter for neon glow effect
    svg.append('filter')
      .attr('id', 'glow')
      .append('feGaussianBlur')
      .attr('stdDeviation', '20') //blur effect
      .attr('result', 'coloredBlur');

    svg.select('#glow')
      .append('feMerge')
      .append('feMergeNode')
      .attr('in', 'coloredBlur');

    svg.select('#glow feMerge')
      .append('feMergeNode')
      .attr('in', 'SourceGraphic');

    svg.append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0).attr('y1', y(0))
      .attr('x2', 0).attr('y2', y(30)) // adjust to fit your data range
      .selectAll('stop')
      .data(data)
      .enter().append('stop')
      .attr('offset', (/** @type {any} */ _, /** @type {number} */ i) => (i / (data.length - 1)) * 100 + '%')
      .attr('stop-color', (/** @type {{ date: Date; value: number; }} */ d) => colorScale(data.indexOf(d)));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 1) // Increase stroke width for better glow effect
      .attr('d', lineGenerator) // Draw smooth line
      .style('filter', 'url(#glow)'); // Apply neon glow filter

    // Append circle at the end of the line
    const circleGradient = svg.append('defs').append('radialGradient')
      .attr('id', 'circle-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    
    circleGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FF00FF'); // Purple
    circleGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#00FFFF'); // Cyan

    svg.append('circle')
      .attr('cx', x(data[data.length - 1].date)) // x-coordinate of the last data point
      .attr('cy', y(data[data.length - 1].value)) // y-coordinate of the last data point
      .attr('r', 4) // radius of the circle
      .style('fill', 'url(#circle-gradient)') // Apply gradient fill
      .style('filter', 'url(#glow)'); // Apply neon glow filter

    // Add text labels for x-axis (dates)
    svg.selectAll('.x-label')
      .data(data)
      .enter().append('text')
      .attr('class', 'x-label')
      .attr('x', (/** @type {{ date: any; }} */ d) => x(d.date))
      .attr('y', height + 20) // Adjust vertical position as needed
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgb(113,113,122)') // Change text color to white
      .attr('font-size', '10px')
      .text((/** @type {{ date: any; }} */ d) => timeFormat("%m/%d")(d.date));

    // Add text labels for y-axis (values)
    svg.selectAll('.y-label')
      .data(y.ticks(yTickCount))
      .enter().append('text')
      .attr('class', 'y-label')
      .attr('x', -10) // Adjust horizontal position as needed
      .attr('y', (/** @type {any} */ d) => y(d))
      .attr('text-anchor', 'end')
      .attr('fill', 'rgb(113,113,122)') // Change text color to white
      .attr('font-size', '10px')
      .text((/** @type {any} */ d) => d);
  }
</script>

<style>
  
</style>

<div class="chart-container"></div>
