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
	
	<iframe src='https://my.spline.design/jetpackprojectionmapping-042c9aa87525200b759588267a51650b/' frameborder='0' width='100%' height='100%' class="md:display-none"></iframe> 
	
	<div class=" py-10 flex flex-col min-w-full">
	  <div class="flex">
		<p class="font-mono" />
		<div class="w-[100%] flex items-center justify-center flex-col">

			<!-- <a href="/login"
			class="btn rounded-[13px] fill-none border-stone-300 mt-5 w-30 h-30 md:w-40 md:h-40 font-mono"
			>explore</a
		  > -->
	
		  <div class="max-w-[700px] ">
			
			<div class="flex flex-row w-[50%] pt-2 justify-between">
		 	<div class="w-2 h-2 bg-[#fdc4ff] rounded-full border border-stone-900 blur-sm"></div>
			
			</div>
			<h1 class="text-3xl  text-left md:text-6xl font-light md:font-light mb-5">
			  The most exciting ecosystem for solo creators
			</h1>

			<!-- <button class="btn w-[200px] h-[60px] bg-[#fdc4ff] shadow-lg shadow-indigo-500/50 rounded-xl">
				

				Sign up
			
			</button> -->
			<div class="flex justify-between gap-2">
				<div class="w-[5px] h-[100px] bg-[#fdc4ff] shadow-3xl shadow-white rounded-full  "></div>

				<!-- <iframe src='https://my.spline.design/jetpackprojectionmapping-042c9aa87525200b759588267a51650b/' frameborder='0' width='100%' height='100%' class=" display-none md:display-block"></iframe> -->
				
				<!-- <div class="flex flex-col gap-4 max-w-[50%] ">
					<div class=" h-14 p-4 border flex justify-center items-center rounded-xl border-stone-800">
						<p>Ai</p>
					  </div>
					  <div class=" h-14 p-4 border flex justify-center items-center rounded-xl border-stone-800">
						<p>Freebies</p>
					  </div>
					  <div class=" h-14 p-4 border flex justify-center items-center rounded-xl border-stone-800">
						<p>Marketing</p>
					  </div>
					  <div class="h-14 p-4 border flex justify-center items-center rounded-xl border-stone-800">
						<p>Newsletter</p>
					  </div>
				</div> -->

			<div class="max-w-[350px]">
				<p class=" md:font-medium font-mono md:text-xl">
				  designed to make the most out of your data as a start up founder
				  <span class="font-mono text-stone-500 font-thin md:text-xl">
					quickly validate your projects with unlimited landing pages and social
					media ads. enjoy our free resources and Ai assistants to take your projects to the next level
				  </span>
				</p>
				<button class="btn w-[120px] h-[60px] mt-3 bg-[#fdc4ff] text-slate-900 shadow-lg shadow-indigo-500/50 rounded-xl">
				

				Sign up
			
				</button>
			  </div>
			</div>
			

		  </div>
		  
		  

		  <!-- <svg class=" hidden md:block"
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
	 -->
		  
		  
		  
		</div>
	  </div>
	</div>
	
	<!-- <div class="w-[100%] flex justify-end">
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
	</div> -->
	
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
		  class="card bg-dark flex justify-center items-center border-stone-900 rounded-[13px]  max-w-3xl mb-3 font-mono md:min-w-[600px]"
		>
	
		  <div class="card-body rounded-xl gap-5 flex justify-center items-center p-0">
			<img
			  class="rounded-xl"
			  src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/65285b1858160bda3b05eb0f_Test%20countless%20ideas.jpg"
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
		  Free_Resources <span class="text-stone-500"></span>
		</h2>
		<span class="font-mono font-thin">
		  chat - marketing - guides - frameworks
		</span>
	  </div>
	
	  <div class="">
		<div
		  class="card bg-dark flex justify-center items-center border-stone-900 rounded-[13px]  max-w-3xl mb-3 font-mono md:min-w-[600px]"
		>
	
		  <div class="card-body rounded-xl gap-5 flex justify-center items-center p-0">
			<div class="rounded-xl overflow-hidden">
				<video autoplay loop muted playsinline class="object-cover  h-full">
					<source src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/rechat.mp4" type="video/mp4">
					Your browser does not support the video tag.
				</video>
			</div>
			

			<button
			  class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black"
			  >Try it</button
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

<section class=" min-h-screen pt-11 md:pt-40 md:flex-col justify-between">
	<div class="max-w-[480px] mb-3">
	  <h2 class="font-mono text-4xl font-bold mb-3 max-w-[250px]">
		Ai_Assitants <span class="text-stone-500"></span>
	  </h2>
	  <span class="font-mono font-thin">
		chat - automation - delegation - generation
	  </span>
	</div>
	<div class="flex flex-row p-2 justify-center items-center gap-2">
		<div class="bg-purple-300 w-5 h-5 rounded-full">

		</div>
		<p class="text-sm text-purple-300 font-mono uppercase my-10 ">
			Re_chat
		</p>
	</div>
	

	<p class="text-4xl text-purple-300 font-bold uppercase my-10 ">
		You don't need to learn prompting, our assistant is designed to help and assist solo founders
	</p>
	
	<div class="flex flex-col w-full md:flex-row md:gap-4">
	  <div
		class="card bg-dark flex  justify-center items-center border-stone-900 rounded-[13px]  max-w-3xl mb-3 font-mono md:min-w-[600px] w-full"
	  >
  
		<div class="card-body rounded-xl gap-5 flex justify-center items-center h-full w-full p-0">
			<h1>ChatGpt</h1>
		  <div class="rounded-xl overflow-hidden w-full">
			  <video autoplay loop muted playsinline class="object-cover  h-full">
				  <source src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/GPT.mp4" type="video/mp4">
				  Your browser does not support the video tag.
			  </video>
		  </div>
		  

		  <p>
			Q: write me a short paragraph how can i start marketing as a solo founder
		  </p>

		  <p class="font-thin text-sm text-zinc-500 ">
			As a solo founder looking to start marketing your venture, it's essential to begin with a solid foundation. 
			Start by defining your target audience and creating a detailed buyer persona to understand their needs and preferences. 
			Next, establish an online presence through a professional website and active social media profiles. Content marketing can be a cost-effective way to reach your 
			audience, so create valuable blog posts, videos, or infographics that address their pain points. Leverage email marketing to build and nurture a subscriber list, 
			and consider partnerships or collaborations with complementary businesses to expand your reach. Continuous learning and adaptability are key, so monitor your 
			analytics, stay updated on marketing trends, and be open to adjusting your strategy as you learn more about what works best for your business. Building a personal 
			brand and networking within your industry can also be invaluable for a solo founder's marketing efforts.
		  </p>
		</div>
	  </div>

	  <div class="card bg-dark flex justify-center items-start border-stone-900 rounded-[13px] max-w-3xl mb-3 font-mono md:min-w-[600px]">
		<div class="card-body rounded-xl gap-5 flex justify-center items-center h-full p-0">
			<h1>Re_chat</h1>
			<div class="rounded-xl overflow-hidden">
				<video autoplay loop muted playsinline class="object-cover h-full">
					<source src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/rechat.mp4" type="video/mp4">
					Your browser does not support the video tag.
				</video>
			</div>
			<p>
				Q: write me a short paragraph how can i start marketing as a solo founder
			</p>
			<p class="font-thin text-sm text-zinc-500">
				As a solo founder, starting your marketing journey begins with sharing your story, no matter how humble your beginnings might be. 
				Offer valuable insights, tips, or lessons you're learning along the way to engage with other like-minded solo founders and potential customers. 
				By organically evolving your marketing strategy alongside your venture, you create a solid foundation for future growth. This article will guide you from not even having an 
				idea to setting up a successful product hunt launch, gathering information from other solo founders and observing what's out there. Let me know if 
				you want to learn more!
			</p>

			<button class="btn max-w-[100px] rounded-xl hover:bg-white hover:text-black">Try it</button>


		</div>
	</div>
	  </div>
  
	  
  
	  <div class="flex flex-row p-2 justify-center items-center gap-2">
		<div class="bg-[#fdc4ff] w-5 h-5 rounded-full">

		</div>
		<p class="text-sm text-[#fdc4ff] font-mono uppercase my-10 ">
			nai
		</p>
	</div>

	<p class="text-4xl text-[#fdc4ff] font-bold uppercase my-10 ">
		nai is our second ai assitant made to help solo founders
	</p>
	<div class="w-full flex justify-start">
		<div class="flex flex-row  justify-center items-center gap-10 p-28 ">
			<div class="bg-[#fdc4ff] w-20 h-20  rounded-full">
	
			</div>
			<p class="text-lg text-[#fdc4ff] font-mono uppercase my-10 ">
				coming soon ...
			</p>
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
  
  
  
  