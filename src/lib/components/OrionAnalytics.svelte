<!-- $lib/components/OrionAnalytics.svelte -->
<script>
    import { afterUpdate } from 'svelte';
    import Chart from 'chart.js/auto';
  
    export let seoData = {};
    export let keywordsTrend = [];
    export let outlinesTrend = [];
    export let rankingTrend = [];
    export let trafficTrend = [];
    export let aiSummary = '';
  
    let keywordsChart;
    let outlinesChart;
    let rankingChart;
    let trafficChart;
  
    function createChart(ctx, data, label) {
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map((_, i) => `P${i+1}`),
          datasets: [{
            label,
            data,
            borderColor: 'rgb(16, 185, 129)',
            tension: 0.1,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { display: false },
            y: { display: false }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  
    afterUpdate(() => {
      if (!keywordsChart) keywordsChart = createChart(document.getElementById('keywordsChart'), keywordsTrend, 'Keywords');
      if (!outlinesChart) outlinesChart = createChart(document.getElementById('outlinesChart'), outlinesTrend, 'Outlines');
      if (!rankingChart) rankingChart = createChart(document.getElementById('rankingChart'), rankingTrend, 'Ranking');
      if (!trafficChart) trafficChart = createChart(document.getElementById('trafficChart'), trafficTrend, 'Traffic');
    });
  </script>
  
  <div class="space-y-6">
    <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
      <h2 class="text-xl font-bold text-white mb-4">SEO Metrics Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="flex items-center justify-between space-x-4">
          <div>
            <div class="text-2xl font-bold">{seoData.metrics.keywords.value}</div>
            <div class="text-zinc-400">{seoData.metrics.keywords.label}</div>
            <div class="text-emerald-400 text-sm">{seoData.metrics.keywords.trend}</div>
          </div>
          <div class="w-32 h-16">
            <canvas id="keywordsChart"></canvas>
          </div>
        </div>
        <div class="flex items-center justify-between space-x-4">
          <div>
            <div class="text-2xl font-bold">{seoData.metrics.outlines.value}</div>
            <div class="text-zinc-400">{seoData.metrics.outlines.label}</div>
            <div class="text-emerald-400 text-sm">{seoData.metrics.outlines.trend}</div>
          </div>
          <div class="w-32 h-16">
            <canvas id="outlinesChart"></canvas>
          </div>
        </div>
        <div class="flex items-center justify-between space-x-4">
          <div>
            <div class="text-2xl font-bold">{seoData.metrics.ranking.value}</div>
            <div class="text-zinc-400">{seoData.metrics.ranking.label}</div>
            <div class="text-emerald-400 text-sm">{seoData.metrics.ranking.trend}</div>
          </div>
          <div class="w-32 h-16">
            <canvas id="rankingChart"></canvas>
          </div>
        </div>
        <div class="flex items-center justify-between space-x-4">
          <div>
            <div class="text-2xl font-bold">{seoData.metrics.traffic.value}</div>
            <div class="text-zinc-400">{seoData.metrics.traffic.label}</div>
            <div class="text-emerald-400 text-sm">{seoData.metrics.traffic.trend}</div>
          </div>
          <div class="w-32 h-16">
            <canvas id="trafficChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  
    <!-- AI Summary Section -->
    <div class="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
      <h2 class="text-xl font-bold text-white mb-4">AI Performance Summary</h2>
      <p class="text-zinc-300">{aiSummary}</p>
    </div>
  </div>