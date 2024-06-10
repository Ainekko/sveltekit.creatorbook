<script>
  export let areaChartData;
  export let dataAvailable;

  import { onMount } from 'svelte';
  import { scaleLinear, scaleTime, extent, line, scaleSequential, interpolateRgb, timeFormat } from 'd3';
  import * as d3 from "d3";

  let data = areaChartData;

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 550 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  onMount(() => {
    drawChart();
  });

  function drawChart() {
    const x = scaleTime()
      .domain(extent(data, (d) => d.date))
      .range([0, width]);

    const maxDataValue = Math.max(...data.map(d => d.value));
    const yTickCount = 5;
    const y = scaleLinear()
      .domain([0, Math.ceil(maxDataValue / yTickCount) * yTickCount])
      .range([height, 0]);

    const svg = d3.select('.chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const colorScale = scaleSequential(interpolateRgb("#FF00FF", "#00FFFF"))
      .domain([0, data.length]);

    const lineGenerator = line()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(d3.curveBasis);

    svg.append('filter')
      .attr('id', 'glow')
      .append('feGaussianBlur')
      .attr('stdDeviation', '20')
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
      .attr('x2', 0).attr('y2', y(30))
      .selectAll('stop')
      .data(data)
      .enter().append('stop')
      .attr('offset', (_, i) => (i / (data.length - 1)) * 100 + '%')
      .attr('stop-color', (d) => colorScale(data.indexOf(d)));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 1)
      .attr('d', lineGenerator)
      .style('filter', 'url(#glow)');

    const circleGradient = svg.append('defs').append('radialGradient')
      .attr('id', 'circle-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    circleGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#FF00FF');
    circleGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#00FFFF');

    svg.append('circle')
      .attr('cx', x(data[data.length - 1].date))
      .attr('cy', y(data[data.length - 1].value))
      .attr('r', 4)
      .style('fill', 'url(#circle-gradient)')
      .style('filter', 'url(#glow)');

    svg.selectAll('.x-label')
      .data(data)
      .enter().append('text')
      .attr('class', 'x-label')
      .attr('x', (d) => x(d.date))
      .attr('y', height + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgb(113,113,122)')
      .attr('font-size', '10px')
      .text((d) => timeFormat("%m/%d")(d.date));

    svg.selectAll('.y-label')
      .data(y.ticks(yTickCount))
      .enter().append('text')
      .attr('class', 'y-label')
      .attr('x', -10)
      .attr('y', (d) => y(d))
      .attr('text-anchor', 'end')
      .attr('fill', 'rgb(113,113,122)')
      .attr('font-size', '10px')
      .text((d) => d);
  }
</script>

<style>
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.5rem;
    z-index: 10;
  }
</style>

<div class="chart-container" style="position: relative;">
  {#if !dataAvailable}
    <div class="overlay">No data yet</div>
  {/if}
</div>
