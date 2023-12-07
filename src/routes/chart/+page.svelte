<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.async = true;
      script.onload = () => {
        // Now that Chart.js is loaded, you can create your pie chart
        const ctx = document.getElementById('myChart').getContext('2d');
  
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Category A', 'Category B', 'Category C'],
            datasets: [{
              data: [30, 40, 30],
              backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      };
  
      // Append the script tag to the document body
      document.body.appendChild(script);
  
      // Cleanup on component destruction
      return () => {
        // Remove the script tag when the component is destroyed
        document.body.removeChild(script);
      };
    });
  </script>
  
  <style>
    /* Add your custom styles here if needed */
  </style>

  
<div class="w-full h-screen flex justify-center items-center  ">
  <div class="w-auto ">
    <h1 class="text-6xl font-medium bg-gradient-to-r from-violet-400 via-purple-100 to-violet-300  text-transparent bg-clip bg-clip-text">
      Next time don't do it
    </h1>
  </div>
  
</div>
  
  <!-- <div class="max-w-xs">

   
    <canvas id="myChart" width="400" height="200"></canvas>
  </div> -->
  