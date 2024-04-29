<!-- LineChart.svelte -->
<script>
  import * as Plot from "@observablehq/plot";
  // import * as d3 from 'd3';

  // Hard-coded sales data
  const sales = [
    { units: 10, fruit: 'fig' },
    { units: 20, fruit: 'date' },
    { units: 40, fruit: 'plum' },
    { units: 30, fruit: 'plum' }, // Duplicate entry for demonstration
  ];

  // Define the plot options
  const lineChartOptions = {
    marks: [
      Plot.dot(sales, { x: 'units', y: 'fruit', fill: 'steelblue' }) // Customize line color
    ],
    // Other plot configuration options...
  };
</script>

<div>
  <Plot.plot {...lineChartOptions} />
</div>
