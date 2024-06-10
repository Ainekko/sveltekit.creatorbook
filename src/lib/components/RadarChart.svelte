<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let metrics = [
    { axis: "Pre-Orders", value: 120 },
    { axis: "Emails Collected", value: 80 },
    { axis: "CAC", value: 30 }
  ];

  export let newMetrics = [
    { axis: "Quality", value: 50 },
    { axis: "Speed", value: 60 },
    { axis: "Reliability", value: 70 }
  ];

  export let dataAvailable = true;

  const width = 300;
  const height = 300;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const radius = Math.min(width, height) / 2 - Math.max(...Object.values(margin));
  const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);
  const angleSlice = Math.PI * 2 / metrics.length;

  const radarLine = d3.lineRadial()
    .radius((d: { value: any; }) => rScale(d.value))
    .angle((d: any, i: number) => i * angleSlice)
    .curve(d3.curveCatmullRomClosed);

  onMount(() => {
    const svg = d3.select('#radar-chart')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left + (width - margin.left - margin.right) / 2}, ${margin.top + (height - margin.top - margin.bottom) / 2})`);

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

    if (dataAvailable) {
      svg.append('path')
        .datum(metrics)
        .attr('class', 'radar-area')
        .attr('d', radarLine)
        .style('fill', 'orange')
        .style('fill-opacity', 0.3)
        .style('stroke', d3.rgb('orange').darker());

      svg.append('path')
        .datum(newMetrics)
        .attr('class', 'radar-area')
        .attr('d', radarLine)
        .style('fill', 'green')
        .style('fill-opacity', 0.3)
        .style('stroke', d3.rgb('green').darker());

      svg.selectAll('.axis-label')
        .data(metrics)
        .enter().append('text')
        .attr('class', 'axis-label')
        .attr('x', (d: { axis: string; value: number; }) => rScale(100) * Math.cos(angleSlice * metrics.indexOf(d) - Math.PI / 2))
        .attr('y', (d: { axis: string; value: number; }) => rScale(100) * Math.sin(angleSlice * metrics.indexOf(d) - Math.PI / 2))
        .text((d: { axis: any; }) => d.axis)
        .style('font-size', '10px')
        .style('fill', 'white')
        .attr('text-anchor', 'middle');
    }
  });
</script>

<div class="radar-chart-container" style="position: relative;">
  <svg id="radar-chart"></svg>
  {#if !dataAvailable}
    <div class="no-data-overlay">
      <p>No data yet</p>
    </div>
  {/if}
</div>

<style>
  .radar-area {
    stroke-width: 2px;
  }

  .axis-label {
    font-size: 11px;
    text-anchor: middle;
  }

  .radar-chart-container {
    width: 300px;
    height: 300px;
  }

  .no-data-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
  }
</style>
