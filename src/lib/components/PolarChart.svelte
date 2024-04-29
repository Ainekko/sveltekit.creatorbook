<script>
    import { PolarArea } from 'svelte-chartjs';
    import {data} from '$lib/utils/LineData.mjs'
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      RadialLinearScale,
    } from 'chart.js';
  
    ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);
  </script>
  <div class="max-h-96 bg-white">
    <PolarArea {data} options={{ responsive: true }} />
  </div>
  