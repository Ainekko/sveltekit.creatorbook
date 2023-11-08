<script lang="ts">
  
	import NavBar from "$lib/components/NavBar.svelte";
	import { onMount } from 'svelte';

	import { gsap } from "gsap/dist/gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


	onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.text-element').forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.9,
		stagger: 0.5,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'center center',
          toggleActions: 'play none none reverse',
          delay: index * 0.5, // Calculate delay based on the index
        },
      });
    });

	
	

    gsap.utils.toArray('.second-text-element').forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.9,
		delay: 0.2,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'center center',
          toggleActions: 'play none none reverse',
          delay: 0.9, // Calculate delay based on the index
        },
      });
    });

	gsap.utils.toArray('.third-text-element').forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.9,
		delay: 0.3,
        scrollTrigger: {
			stagger: 0.5,
          trigger: element,
          start: 'top bottom',
          end: 'center center',
          toggleActions: 'play none none reverse',
          delay: 0.9, // Calculate delay based on the index
        },
      });
    });

  });




	
	
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

	.marquee {
    white-space: nowrap;
    overflow: hidden;
    animation: marquee 15s linear infinite;
}
 

@keyframes marquee {
    0% { transform: translateX(100%); } /* Move text to the right */
    100% { transform: translateX(-100%); } /* Move text to the left */
}
  </style>
  
  <main class="">
	<NavBar />
	<!-- <div class="max-w-[480px] flex flex-row fixed">
	  <div class="w-3 h-3 bg-teal-400 blur-sm rounded-full " > <h1>hdg</h1></div>
	  <p class="font-mono font-thin">Alpha launch!</p>
	</div> -->
	

	
<section class="hero min-h-[90vh]">
	<div class="container relative">
		<div class="w-full h-full -z-10  flex items-center justify-center  -mt-10 absolute">
			<img src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/65294c89ce2e4b9e38d0f9eb_Creatorbook%20logo%20black.png" alt="" class="absolute -z-10  object-cover opacity-50">

		</div>
		<div class="w-full flex justify-center items-center flex-col pt-16">
			<h1 class="text-element font-normal text-6xl md:text-8xl text-center text-white mb-5">
				Take your ideas to new heights.
			</h1>
			<p class="second-text-element mt-3 text-lg text-center mb-5">
				Validate and grow your ideas the right way <span class="text-white">effortlessly</span> 
			</p>
			<div class="flex flex-col md:flex-row justify-center items-center gap-4">
				<button class="flex justify-center items-center third-text-element border w-32 h-10 md:h-20 border-zinc-700 rounded-full p-4 text-sm hidden ">
					Contact us
				</button>
				<a href="https://www.creatorbook.tech/signup" class="third-text-element flex justify-center items-center  bg-zinc-950 text-white shadow shadow-indigo-500/50 w-36 h-36 border-zinc-700 rounded-full p-4 text-sm hover:bg- hover:shadow-indigo-300 ">
					sign up
				</a>
				<button class="third-text-element border w-32 h-10 md:h-20 border-zinc-700 rounded-full p-4 text-sm hidden ">
					See plans
				</button>
			</div>
			

		</div>
		
		<!-- <div class="second-text-element font-medium text-xl h-10 w-60 bg-orange-500 rounded-md flex justify-center items-center text-black p-2 shadow-lg shadow-red-500/50 mt-10">
			
			<p>
				Marketing & validation
			</p>
		</div>
		<div class="third-text-element font-medium text-xl h-10 w-40 bg-indigo-400 rounded-md flex justify-center items-center text-black p-2 shadow- shadow-violet-100/30 blur-0 mt-3 -ml-5">
			<p class="box">
				Ai_assistants
			</p>
		</div> -->

	</div>
</section>

<section class="mb bg-white w-full min-h-screen pt-10 rounded-t-md">
	<div class="container flex flex-col ">
		<div class="flex justify-start items-center gap-2">
			<div class="h-4 w-1 rounded-full bg-[#fdc4ff]shadow-xl shadow-indigo-950"></div>
			<h2 class="text-xl font-normal text-black">
				Our mission
			</h2>
		</div>

		<div class="w-full h-full flex flex-col md:flex-row p-3 text-black font-normal text-2xl md:text-4xl  mt-10">
				<div class="flex flex-col max-w-xl mb-5">
					
					<p class="text-element md:mb-5">
					 	We help start up founders avoid wasting time, money, and effort on ideas with limited potential,
						feel more confident about their decisions, and stay ahead of the game.
					</p>
					<p class="text-element mb-8">
						
				   </p>

				   <div class="second-text-element font-medium text-xl h-10 w-60 bg-orange-500 rounded-md flex justify-center items-center text-black p-2 shadow-lg shadow-red-500/50 mt-10">
			
					<p>
						Marketing & validation
					</p>
				</div>
				<div class="third-text-element font-medium text-xl h-10 w-40  bg-zinc-900 rounded-md  text-white flex justify-center items-center p-2 shadow-lg shadow-indigo-500/50  mt-3 -ml-5">
					<p class="box">
						Ai_assistants
					</p>
				</div>


				</div>

				
				<div class="w-full flex justify-center items-center">

					<a href="https://www.creatorbook.tech/signup" class="third-text-element flex justify-center items-center  bg-zinc-950 text-white shadow-lg shadow-indigo-500/50 w-36 h-36 border-zinc-700 rounded-full p-4 text-sm hover:shadow-indigo-200 hover:-translate-y-1  hover:bg-zinc-900  ">
						sign up
					</a>

				</div>
				
			</div>

		
		

	</div>
</section>

<div class="w-screen h-72 md:h-96 flex justify-center items-center text-xl md:text-5xl font-mono text-zinc-700 p-5">
    <h1 class="text-element">
		Explore all of your ideas and only keep the best.
    </h1>
</div>
<section class="bg-white w-full min-h-screen pt-10 rounded-t-md">
	<div class="container flex flex-col ">
		<div class="flex justify-start items-center gap-2">
			<div class="h-4 w-1 rounded-full bg-[#fdc4ff]shadow-xl shadow-indigo-950"></div>
			<h2 class="text-xl font-normal text-black">
				Data_driven validation
			</h2>
		</div>

		<div class="w-full h-full flex flex-col md:flex-row p-3 text-black font-normal text-3xl md:text-4xl  mt-10">
				<div class="flex flex-col max-w-xl">
					<!-- <p class="text-element mb-11 text-3xl font-light">
						Explore all of your ideas and only keep the best.
					</p>
					
					 -->
					
					<p class="third-text-element mb-8">
						You get <span class="tracking-wider font-light bg-zinc-700 rounded-md px-2 text-white">unlimited</span>landing pages designed for your projects
					</p>

					

					<p class="third-text-element mb-8">
						We run and manage social media ads, optimizing to target your ideal audience
					</p>

					<p class="third-text-element mb-8">
						Get to know your audience, from where they hang out to who they are
					</p>

			
				</div>

				<div class="w-full flex justify-center items-center">

					<a href="https://marketing.creatorbook.tech/contact-us" class="third-text-element flex justify-center items-center border border-zinc-300  hover:bg-zinc-950 hover:text-white hover:shadow-2xl  hover:translate-y-4 shadow-indigo-500/50 w-36 h-36  rounded-full p-4 text-sm ">
						Contact us
					</a>

				</div>
			</div>
		

	</div>
</section>

<div class="w-screen h-72 md:h-96 flex justify-center items-center text-xl md:text-5xl font-mono text-zinc-700 p-5">
    <h1 class="text-element">
		Take full advatage of the power of ai
    </h1>
</div>



<section class="mb bg-white w-full min-h-screen pt-10 rounded-t-md">
	<div class="container flex flex-col ">
		<div class="flex justify-start items-center gap-2">
			<div class="h-4 w-1 rounded-full bg-[#fdc4ff]shadow-xl shadow-indigo-950"></div>
			<h2 class="text-xl font-normal text-black">
				Ai_assistants
			</h2>
		</div>

		

		<div class="w-full h-full flex  flex-col md:flex-row p-3 text-black font-normal text-3xl md:text-4xl  mt-10">
				<div class="flex flex-col max-w-xl">
					<!-- <p class="text-element mb-11 text-3xl font-light">
						Explore all of your ideas and only keep the best.
					</p>
					
					 -->
					
					<p class="text-element mb-8">
						Use our <span class="tracking-wider font-light bg-zinc-700 rounded-md px-2 text-white">ai_</span>to brainstorm and come up with new ideas
					</p>

					

					<p class="third-text-element mb-8">
						Write better content, build and engage your audience in social media
					</p>

					<p class="third-text-element mb-8">
						Come up with marketing strategies that are relevant to solo founders
					</p>


					

			
				</div>

				<div class="third-text-element w-full flex flex-col justify-center items-center p-4 ">

					<div class="rounded-xl overflow-hidden mb-5 hidden md:block">
						<video autoplay loop muted playsinline class="object-cover  h-full">
							<source src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/rechat.mp4" type="video/mp4">
							Your browser does not support the video tag.
						</video>
					</div>

					<a href="https://www.creatorbook.tech/signup" class="third-text-element flex justify-center items-center border border-zinc-300  hover:bg-zinc-950 hover:text-white hover:shadow-2xl  hover:translate-y-4 shadow-indigo-500/50 w-36 h-36  rounded-full p-4 text-sm  ">
						Try it!
					</a>

				</div>
			</div>
		
			

	</div>

	<!-- <div class="rounded-xl overflow-hidden mb-5 md:hidden">
		<video autoplay loop muted playsinline class="object-cover  h-full">
			<source src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/rechat.mp4" type="video/mp4">
			Your browser does not support the video tag.
		</video>

		
	</div> -->

	
</section>

<div class="w-screen h-72 md:h-96 flex justify-center items-center text-xl md:text-5xl font-mono text-zinc-700 p-5">
    <h1 class="text-element">
		Let's make your time count
    </h1>
</div>

<section class="pricing bg-white min-h-screen h-auto py-10">

	<div class="w-full flex justify-center items-center p-5 md:pt-10 hover:text-black">
		<h1 class="md:text-3xl">
			One monthly fee! no hidden charges
		</h1>
	</div>

	<div class="container flex flex-col md:flex-row justify-center items-center min-h-screen h-auto gap-5 ">

		


		<div class="card card-compact  border-white md:w-96 bg-base-100 max-h-[500px] md:max-h-[700px] shadow-xl rounded-md bg-none ">
			
			<div class="card-body md:min-h-[450px] h-[600px] justify-evenly bg-white text-zinc-900 ">
			  <h2 class="card-title">Free!</h2>
			  <p>Access our marketing resources with chat assistant </p>

			  <div class="h-full md:min-h-[200px] flex flex-col justify-center items-center text-2xl text-black font-bold border-t-2">
				<div class="text-center">
					<h1>0$/mo</h1>
					<p class="text-xs font-medium text-zinc-500">pause or cancel anytime</p>
				</div>
				
			  </div>

			  <div class="pt-10">
				<div class="flex justify-center items-center gap-4 text-base">
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Free resources</p>
	
				  </div>
	
				  <div  class="flex justify-center items-center gap-4 text-base" >
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Re_chat assistant</p>
					
				  </div>
			  </div>

			  <div class="card-actions w-full mt-5">
				<button class="btn  w-full bg-zinc-900 shadow-lg shadow-indigo-900 rounded-full">Get Started</button>
			  </div>
			</div>
		  </div>

		  <div class="card card-compact  border-white md:w-96 bg-base-100 max-h-[500px] md:max-h-[700px] shadow-xl rounded-md bg-none">
			
			<div class="card-body md:min-h-[450px] h-[600px] justify-evenly bg-white text-zinc-900 py-4">
			  <h2 class="card-title">Basic</h2>
			  <p>Access all of creatorbook assistants and tools</p>

			  <div class="h-full md:min-h-[200px] flex flex-col justify-center items-center text-2xl text-black font-bold border-t-2">
				<div class="text-center">
					<h1>89$/mo</h1>
					<p class="text-xs font-medium text-zinc-500">pause or cancel anytime</p>
				</div>
				
			  </div>

			  <div class="pt-10">
				<div class="flex justify-center items-center gap-4 text-base">
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Free resources</p>
	
				  </div>
	
				  <div  class="flex justify-center items-center gap-4 text-base" >
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Re_chat assistant</p>
					
				  </div>
	
				  <div  class="flex justify-center items-center gap-4 text-base" >
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>CB social media automation</p>
					
				  </div>
	
				  
			  </div>

			  <div class="card-actions w-full mt-5 flex flex-col gap-3">
				<button class="btn  w-full bg-zinc-900 shadow-lg shadow-indigo-900 rounded-full">Get Started</button>

				<a href="https://cbook.lemonsqueezy.com/checkout/buy/9e63f10b-1522-4c12-a771-49932ecc9366?embed=1" class="lemonsqueezy-button btn rounded-full  bg-transparent px-4 md:p-2 w-full text-black hover:bg-zinc-950 hover:text-white ">Life time subscription <span class="font-mono  text-sm">392$</span></a><script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>

			  </div>
			</div>
		  </div>

		  <div class="card card-compact  border-white md:w-96 bg-base-100 max-h-[500px] md:max-h-[700px] shadow-xl rounded-md bg-none shadow-indigo-950">
			
			<div class="card-body md:min-h-[450px] h-[600px] justify-evenly bg-white text-zinc-900 py-4">
			  <h2 class="card-title">Agency</h2>
			  <p>Get unlimited landing pages and social media ads</p>

			  <div class="h-full md:min-h-[200px] flex flex-col justify-center items-center text-2xl text-black font-bold border-t-2">
				<div class="text-center">
					<h1>699$/mo</h1>
					<p class="text-xs font-medium text-zinc-500">pause or cancel anytime</p>
				</div>
				
			  </div>

			  <div class="md:pt-10">
				<div class="flex justify-center items-center gap-4 text-base">
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Free resources</p>
	
				  </div>
	
				  <div  class="flex justify-center items-center gap-4 text-base" >
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Re_chat assistant</p>
					
				  </div>
	
				  <div  class="flex justify-center items-center gap-4 text-base" >
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>CB social media automation</p>
					
				  </div>
	
				  <div  class="flex justify-center items-center gap-4 text-base" >
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Unlimited landing pages</p>
					
				  </div>
	
				  <div  class="flex justify-center items-center gap-4 text-base" >
					<img class="h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/654aa7138e7024b15cc50576_system-solid-31-check.gif" alt="">
					<p>Social media ads</p>
					
				  </div>
			  </div>

			  <div class="card-actions w-full mt-5">
				<button class="btn  w-full bg-zinc-900 shadow-lg shadow-indigo-900 rounded-full">Get Started</button>
			  </div>
			</div>
		  </div>
		
	</div>

	<div class="h-52">
		
		<div class="w-full flex justify-center items-center  border-black h-full  ">

			<a href="https://marketing.creatorbook.tech/contact-us" class="third-text-element flex justify-center items-center border text-black border-zinc-300  hover:bg-zinc-950 hover:text-white hover:shadow-2xl  hover:translate-y-4 shadow-indigo-500/50 w-36 h-36  rounded-full p-4 text-sm ">
				Contact us
			</a>

		</div>
	  </div>

</section>

	
</main>
  
  
  
  