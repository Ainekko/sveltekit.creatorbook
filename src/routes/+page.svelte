<script lang="ts">
  
	import NavBar from "$lib/components/NavBar.svelte";
  
	
	
  </script>
  
  <style>
	/* Container styles */
	.container {
	  max-width: 1200px; /* Adjust the maximum width as needed */
	  margin: 0 auto; /* Center the container horizontally */
	  padding: 0 20px; /* Optional padding to create spacing from the edges */
	}
	.main {
	  max-width: 1550px; /* Adjust the maximum width as needed */
	  margin: 0 auto; /* Center the container horizontally */
	  padding: 0 ; /* Optional padding to create spacing from the edges */
	}
  </style>
  
  <main class="container ">
	<NavBar />
	<div class="max-w-[480px] flex flex-row fixed">
	  <div class="w-3 h-3 bg-teal-400 blur-sm rounded-full " > <h1>hdg</h1></div>
	  <p class="font-mono font-thin">Alpha launch!</p>
	</div>
	
	<!-- <iframe src='https://my.spline.design/jetpackprojectionmapping-042c9aa87525200b759588267a51650b/' frameborder='0' width='100%' height='100%'></iframe> -->
	
	<div class=" py-10 flex flex-col min-w-full">
	  <div class="flex">
		<p class="font-mono" />
		<div class="w-[100%] flex items-center justify-center flex-col md:flex-row-reverse">
	
		  <div class="max-w-[480px] ">
			<h1 class="text-3xl text-center md:text-left md:text-5xl font-medium md:font-medium mb-5">
			  The most exciting ecosystem for solo creators
			</h1>
		  </div>
	
		  <svg class=" hidden md:block"
			width="159"
			height="359"
			viewBox="0 0 159 359"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		  >
			<path
			  d="M158 358L80.9028 358L80.9028 278.531L119.729 278.531L119.729 248.146L119.729 206.074L21 206.074L21 132.448L80.9028 132.448L80.9028 74.0152L158 74.0152L158 5.98846e-06"
			  stroke="#64FFDA"
			  stroke-width="2"
			/>
			<rect
			  x="41"
			  y="77"
			  width="203"
			  height="41"
			  transform="rotate(90 41 77)"
			  fill="black"
			/>
		  </svg>
	
		  <a href="/login"
			class="btn rounded-[13px] fill-none border-stone-300 mt-5 w-30 h-30 md:w-40 md:h-40 font-mono"
			>explore</a
		  >
		  
		  
		</div>
	  </div>
	</div>
	
	<div class="w-[100%] flex justify-end">
	  <div class="max-w-[350px]">
		<p class=" md:font-medium font-mono md:text-xl">
		  we link your data in a way that makes sense
		  <span class="font-mono text-stone-500 font-thin md:text-base">
			offering unlimited validation this includes landing pages and social
			media ads we save all the data - then we offer an army of Ai assitants
			to engage your customores delegate tasks and take your business to the
			next level
		  </span>
		</p>
	  </div>
	</div>
	
	<section class="w-full md:max-w-2xl flex flex-row justify-between  md:justify-evenly items-center min-w-full text-xs font-semibold gap-2 text-stone-600 hover:text-white pt-16">
	  <div class="w-[25%] max-w-[80px] h-14 p-2 border flex justify-center items-center rounded-xl border-stone-800">
		<p>Ai</p>
	  </div>
	  <div class="w-[25%] max-w-[80px] h-14 p-2 border flex justify-center items-center rounded-xl border-stone-800">
		<p>Freebies</p>
	  </div>
	  <div class="w-[25%] max-w-[80px] h-14 p-2 border flex justify-center items-center rounded-xl border-stone-800">
		<p>Marketing</p>
	  </div>
	  <div class="w-[25%] max-w-[80px] h-14 p-2 border flex justify-center items-center rounded-xl border-stone-800">
		<p>Newsletter</p>
	  </div>
	  
	</section>
	
	  <!-- <section class="min-w-full flex justify-center items-center pt-10"> -->
		<!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-ful">
		  <div
			class="card bg-dark border flex justify-center items-center border-stone-900  rounded-[13px] font-mono md:min-w-[300px] m-2"
		  > -->
			<!-- <div class="card-body rounded-xl gap-5 flex justify-center items-center">
			  <p class="font-mono text-stone-500 font-thin text-base">
				Free resources + Ai chat
			  </p> -->
			  <!-- <img
				class="rounded-xl"
				src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg"
				alt=""
			  /> -->
			  <!-- <button
				class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
				>Learn more</button
			  >
			</div>
		  </div> -->
	
		  <!-- <div
			class="card bg-dark border flex justify-center items-center border-stone-900 rounded-[13px] font-mono min-w-[300px] m-2"
		  > -->
			<!-- <div class="card-body rounded-xl gap-5 flex justify-center items-center">
			  <p class="font-mono text-stone-500 font-thin text-base">
				Marketing and validation
			  </p> -->
			  <!-- <img
				class="rounded-xl"
				src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg"
				alt=""
			  /> -->
			  <!-- <button
				class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
				>Learn more</button
			  >
			</div>
		  </div> -->
	
		  <!-- <div
			class="card bg-dark border flex justify-center items-center border-stone-900 rounded-[13px] font-mono min-w-[300px] m-2"
		  > -->
			<!-- <div class="card-body rounded-xl gap-5 flex justify-center items-center">
			  <p class="font-mono text-stone-500 font-thin text-base">Ai assitants</p> -->
			  <!-- <img
				class="rounded-xl"
				src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg"
				alt=""
			  /> -->
			  <!-- <button
				class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
				>Learn more</button
			  > -->
			<!-- </div>
		  </div>
	
		  <div
			class="card bg-dark border flex justify-center items-center border-stone-900  rounded-[13px] font-mono min-w-[300px] m-2"
		  >
			<div class="card-body rounded-xl gap-5 flex justify-center items-center">
			  <p class="font-mono text-stone-500 font-thin text-base">Newsletter</p> -->
			  <!-- <img
				class="rounded-xl"
				src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg"
				alt=""
			  /> -->
			  <!-- <button
				class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
				>Learn more</button
			  > -->
			<!-- </div>
		  </div>
		</div>
	  </section> -->
	
	<section class=" min-h-screen pt-11 md:pt-40 md:flex justify-between">
	  <div class="max-w-[480px] mb-3">
		<h2 class="font-mono text-4xl font-bold mb-3 max-w-[250px]">
		  Data <span class="text-stone-500">driven validation</span>
		</h2>
		<span class="font-mono font-thin">
		  research - validation - aquisation - engaging
		</span>
	  </div>
	
	  <div class="">
		<div
		  class="card bg-dark border flex justify-center items-center border-stone-900 rounded-[13px]  max-w-3xl mb-3 font-mono md:min-w-[600px]"
		>
	
		  <div class="card-body rounded-xl gap-5 flex justify-center items-center ">
			<img
			  class="rounded-xl"
			  src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/64b4190130ae58c2d4e7a68a_LastBF.jpg"
			  alt=""
			/>
			<button
			  class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
			  >Learn more</button
			>
		  </div>
		</div>
	
		<div class="w-[100%] flex justify-end">
		  <div class="max-w-[350px]">
			<p class=" md:font-medium font-mono md:text-xl">
			  we link your data in a way that makes sense
			  <span class="font-mono text-stone-500 font-thin md:text-base">
				offering unlimited validation this includes landing pages and social
				media ads we save all the data - then we offer an army of Ai assitants
				to engage your customores delegate tasks and take your business to the
				next level
			  </span>
			</p>
		  </div>
		</div>
	
	  </div>
	</section>
	
	<section class=" min-h-screen pt-11 md:pt-40 md:flex justify-between">
	  <div class="max-w-[480px] mb-3">
		<h2 class="font-mono text-4xl font-bold mb-3 max-w-[250px]">
		  Ai_Powered <span class="text-stone-500">free resources</span>
		</h2>
		<span class="font-mono font-thin">
		  research - validation - aquisation - engaging
		</span>
	  </div>
	
	  <div class="">
		<div
		  class="card bg-dark border flex justify-center items-center border-stone-900 rounded-[13px]  max-w-3xl mb-3 font-mono md:min-w-[600px]"
		>
	
		  <div class="card-body rounded-xl gap-5 flex justify-center items-center ">
			<img
			  class="rounded-xl"
			  src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/651877e75771c327f9ecbfdf_Assist.jpg"
			  alt=""
			/>
			<button
			  class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
			  >Learn more</button
			>
		  </div>
		</div>
	
		<div class="w-[100%] flex justify-end">
		  <div class="max-w-[350px]">
			<p class=" md:font-medium font-mono md:text-xl">
			  we link your data in a way that makes sense
			  <span class="font-mono text-stone-500 font-thin md:text-base">
				offering unlimited validation this includes landing pages and social
				media ads we save all the data - then we offer an army of Ai assitants
				to engage your customores delegate tasks and take your business to the
				next level
			  </span>
			</p>
		  </div>
		</div>
	
	  </div>
	</section>
	
	<section class=" min-h-screen pt-11 md:pt-40 md:flex justify-between">
	  <div class="max-w-[480px] mb-3">
		<h2 class="font-mono text-4xl font-bold mb-3 max-w-[250px]">
		  Ai_Assitants <span class="text-stone-500"></span>
		</h2>
		<span class="font-mono font-thin">
		  research - SEO - Generation - automation
		</span>
	  </div>
	
	  <div class="">
		<div
		  class="card bg-dark border flex justify-center items-center border-stone-900 rounded-[13px]  max-w-3xl mb-3 font-mono md:min-w-[600px]"
		>
	
		  <div class="card-body rounded-xl gap-5 flex justify-center items-center ">
			<img
			  class="rounded-xl"
			  src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/651877e75771c327f9ecbfdf_Assist.jpg"
			  alt=""
			/>
			<button
			  class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
			  >Learn more</button
			>
		  </div>
		</div>
	
		<div class="w-[100%] flex justify-end">
		  <div class="max-w-[350px]">
			<p class=" md:font-medium font-mono md:text-xl">
			  we link your data in a way that makes sense
			  <span class="font-mono text-stone-500 font-thin md:text-base">
				offering unlimited validation this includes landing pages and social
				media ads we save all the data - then we offer an army of Ai assitants
				to engage your customores delegate tasks and take your business to the
				next level
			  </span>
			</p>
		  </div>
		</div>
	
	  </div>
	</section>
	
	<section class=" min-h-screen pt-11 md:pt-40 md:flex justify-between">
	  <div class="max-w-[480px] mb-3">
		<h2 class="font-mono text-4xl font-bold mb-3 max-w-[250px]">
		  Ai_Powered <span class="text-stone-500">Newsletter</span>
		</h2>
		<span class="font-mono font-thin">
		  research - marketing - offers - engaging
		</span>
	  </div>
	
	  <div class="">
		<div
		  class="card bg-dark border flex justify-center items-center border-stone-900 rounded-[13px]  max-w-3xl mb-3 font-mono md:min-w-[600px]"
		>
	
		  <div class="card-body rounded-xl gap-5 flex justify-center items-center ">
			<img
			  class="rounded-xl"
			  src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/651877e75771c327f9ecbfdf_Assist.jpg"
			  alt=""
			/>
			<button
			  class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
			  >Learn more</button
			>
		  </div>
		</div>
	
		<div class="w-[100%] flex justify-end">
		  <div class="max-w-[350px]">
			<p class=" md:font-medium font-mono md:text-xl">
			  we link your data in a way that makes sense
			  <span class="font-mono text-stone-500 font-thin md:text-base">
				offering unlimited validation this includes landing pages and social
				media ads we save all the data - then we offer an army of Ai assitants
				to engage your customores delegate tasks and take your business to the
				next level
			  </span>
			</p>
		  </div>
		</div>
	
	  </div>
	</section>
  </main>
  
  
  
  