<script lang="ts">
  
	import NavBar from "$lib/components/NavBar.svelte";
	import { onMount } from 'svelte';

	import { gsap } from "gsap/dist/gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import Pricing from "$lib/components/Pricing.svelte";
	import ContactUs from "$lib/components/ContactUs.svelte";
	import Faq from "$lib/components/Faq.svelte";
	import Weird from "$lib/components/Weird.svelte";


	onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.text-element').forEach((element:any, index:any) => {
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

	
	

    gsap.utils.toArray('.second-text-element').forEach((element: any, index:any) => {
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

	gsap.utils.toArray('.fourth-text-element').forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.9,
		delay: 0.4,
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

<svelte:head>
	<title>Validation as a service for upcoming tech startups</title>
	<meta name="description" content="Get top-tier validation services for your startup. Focus on building while we handle the validation process for you.">
	<meta property="og:title" content="Validation as a service for upcoming startups">
	<meta property="og:description" content="Get top-tier validation services for your startup. Focus on building while we handle the validation process for you.">
	<meta property="og:image" content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/createrbook+final/new+cb+assets/Home.jpg">
	<meta property="og:type" content="website">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Validation as a service for upcoming startups">
	<meta name="twitter:description" content="Get top-tier validation services for your startup. Focus on building while we handle the validation process for you.">
	<meta name="twitter:image" content="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/createrbook+final/new+cb+assets/Home.jpg">
  </svelte:head>
  
  <style>

@keyframes slide {
            0% { background-position-x: 0%; }
            100% { background-position-x: 100%; }
        }
        .animate-slide {
            animation: slide 10s linear infinite; /* Adjust the duration and timing function as needed */
        }

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

.custom-box {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            height: 200px; /* Set the height of each box */
            background-size: cover;
            background-position: center;
        }

        .custom-box:hover .overlay {
            opacity: 1;
            transform: translateY(0);
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: all 0.3s ease;
            transform: translateY(100%);
            z-index: 1; /* Ensure the overlay is above the black layer */
        }

        .overlay h2,
        .overlay p {
            color: white;
            text-align: left; /* Align text to the left */
            padding: 0 10px; /* Add padding to make text consistent */
        }

        .overlay a {
            background-color: #4c51bf;
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }

        .overlay a:hover {
            background-color: #4338ca;
        }

        /* Black layer */
        .custom-box::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /* background-color: rgba(0.5, 0, 0, 0); */
            backdrop-filter: blur(0px); /* Add blur effect */
            z-index: 0; /* Ensure the black layer is behind everything */
        }

		.neon-circle {
            width: 100px;
            height: 100px;
            background-color: #FFA500; /* Neon orange color */
            border-radius: 50%;
            box-shadow: 0 0 10px #FFA500, 0 0 20px #FFA500, 0 0 30px #FFA500;
        }
  </style>
  
  <main class="">
	<NavBar />
	<!-- <div class="max-w-[480px] flex flex-row fixed">
	  <div class="w-3 h-3 bg-teal-400 blur-sm rounded-full " > <h1>hdg</h1></div>
	  <p class="font-mono font-thin">Alpha launch!</p>
	</div> -->
	

	
	<section class="hero min-h-[92vh]" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/DallE+3/background-+2.jpg'); background-size:cover; background-position:right md:background-position: right;">
		<div class="grid grid-cols-2 h-full p-4">
			<div class="container flex col-span-2">
				<div class="w-full flex justify-center items-start flex-col pt- ">
					<div class="w-32 md:w-full flex flex-row justify- gap-5 md:gap-10  font-thin ">
						<div class="w-auto pl-1 h-16 flex flex-row justify-center items-center gap-2 bg-transparent b border-transparent border-r-zinc-900 shadow-sm  rounded-br-3sxl  p-">
							<div class="w-2 h-2 bg-[#fdc4ff] rounded-full border border-stone-900"></div>
							<p >
								Research
							</p>
						</div>
						<div class="w-auto pl-1 h-16 flex flex-row justify-center items-center gap-2 bg-transparent border border-transparent border-b-zinc-900 shadow-sm  rounded-br-3sxl  p-">
						<div class="w-2 h-2 bg-[#fdc4ff] rounded-full border border-stone-900"></div>
							<p>
								Validate
							</p>
						</div>
						<div class="w-auto pl-1 h-16 flex flex-row justify-center items-center gap-2 bg-transparent border border-transparent border-t-zinc-900 shadow-sm  rounded-br-3sxl  p-">
							<div class="w-2 h-2 bg-[#fdc4ff] rounded-full border border-stone-900"></div>
							<p>
								Market
							</p>
						</div>
					</div>
					<h1 class="text-element font-light text-5xl  md:text-9xl text-left text-white mb-5 md:mb-10 flex flex-col">
						S-tier project validation
					</h1>
					<div class="p-4 shadow shadow-xl shadow-black">
						<p class="third-text-element font-thin text-xl md:max-w-[600px] md:text-xl text-left text-zinc-400  pb-5 md:pb-10  z-1000 shadow shadow-xl shadow-black">
							Validation as a service for tech startups. Landing page design, Marketing Plan and key insights to make <span class="fourth-text-element text-white">data driven decisions</span>
						</p>
					</div>
					<div class="flex flex-col md:flex-row justify-center md:items-center gap-4 p-4">
						<a href="/signup" class="third-text-element bg-black md:bg-transparent border w-52  md:h-20 border-zinc-900 rounded-full p-4 text-sm   flex flex-row justify-evenly items-center  shadow-  shadow-2xl shadow-yellow-200/20 bg-yellow-   hover:bg-slate-300 hover:text-black z-50 ">
							<div class="w-2 h-2 bg-[#fffbbd] rounded-full bg-yellow-400 animate-pulse"></div>
							Get FREE Demo
						</a>
						<a href="/#pricing" class="third-text-element border w-auto px-10  md:h-20 border-zinc-800 rounded-full p-4 text-sm   flex flex-row justify-evenly items-center bg-black  shadow-  shadow-2xl shadow-yellow-200/20 bg-yellow-   hover:bg-slate-300 hover:text-black z-50 ">
							
							See Pricing
						</a>
					</div>
				</div>
			</div>
		</div>
		
		
	</section>


<section class="new-hero min-h-screen hidden">
	<div class="grid grid-cols-2 min-h-screen">

		<div class="min-w-full min-h-full col-span-1 rounded-r-xl p-10 bg-white justify-between items-center">
			<h1 class="text-7xl text-black font-bold">
				S-tier project validation
			</h1>

			<div class="p- ">
				<p class="third-text-element font-extralight text-sm md:max-w-[800px] md:text-xl text-left  pb-5 md:pb-10  z-1000 text-black">
					Validation as a service for tech startups. Landing page design, Marketing Plan and key insights to make <span class="fourth-text-element text-black">data driven decisions</span>
				</p>
			</div>
			<div class="flex flex-col md:flex-row justify-center md:items-center gap-4 p-4">
				<a href="/signup" class="third-text-element bg-black md:bg-transparent border w-52  md:h-20 border-zinc-900 rounded-full p-4 text-sm   flex flex-row justify-evenly items-center  shadow-  shadow-2xl shadow-yellow-200/20 bg-yellow-   hover:bg-slate-300 hover:text-black z-50 ">
					<div class="w-2 h-2 bg-[#fffbbd] rounded-full bg-yellow-400 animate-pulse"></div>
					Get Started - It's Free!
				</a>
				<a href="/#pricing" class="third-text-element border w-auto px-10  md:h-20 border-zinc-800 rounded-full p-4 text-sm   flex flex-row justify-evenly items-center bg-black  shadow-  shadow-2xl shadow-yellow-200/20 bg-yellow-   hover:bg-slate-300 hover:text-black z-50 ">
					
					See pricing
				</a>
			</div>

		</div>

	</div>
</section>
	



<section class=" bg-white text-black max-w-screen flex justify-center items-center md:min-h-screen p-0 min-h py-10 rounded-t-md rounded-b-md">
	<div class="w-full max-w-[1450px] flex flex-col ">

		<div class="flex justify-start items-center gap-2">
			<div class="h-4 w-1 rounded-full bg-[#fdc4ff]shadow-xl shadow-indigo-950"></div>
			<h2 class="text-xl font-normal text-black">
				Our mission
			</h2>
		</div>
		

		<div class="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-2 p-2 font-normal text-2xl md:text-4xl  mt-10 ">
			<!-- Left Column -->
			<div class="w-full col-span-1 flex flex-col md:flex- justify-between gap-5">
				<p class="text-element max-w-xl">
					We help startup founders avoid wasting time, money, and effort on ideas with limited potential,
					feel more confident about their decisions, and stay ahead of the game.
				</p>
		
				<Weird />
			</div>
		
			<!-- Right Column (Video takes both rows) -->
			<div class="row-span-2 h- col-span-2 max-h-full col-span- flex justify-center items-center shadow shadow-2xl rounded-md">
				<video class="w-full h-full object-cover" autoplay loop muted>
					<source src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/stier+vd+1+edt+1+comp.mp4" type="video/mp4">
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
		
				
		

		
		

	</div>
</section>

<section class="mb bg-black text-black w-full flex justify-center items-center min-h-screen pt-10 rounded-t-md font-mono font-thin hidden" >
	<div class="container flex flex-col">
		<h1 class="text-4xl text-purple-200 mb-5 font-thin  max-w-[600px]">
			Generate Ideas, Validate Quickly, and <span class="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500  text-transparent bg-clip bg-clip-text">Launch with Confidence</span>
		</h1>

		<div class="w-full flex justify-center items-center">
			<div class="w-full border-white h-full grid grid-cols-1 gap-1 text-xs text-white md:grid-cols-2 lg:grid-cols-3">
			  <!-- Box 1 -->
			  <div class="relative third-text-element bg-transparent border border-zinc-700 rounded-md min-h-full shadow-md p-6 custom-box group overflow-hidden">
				<!-- Glowing effect div -->
				<div class="absolute bottom-2 left-1/2 transform -translate-x-1/1 w-2/6 h-2/3 bg-purple-500 blur-[100px] opacity-60 rounded-full z-0"></div>
				<div class="relative flex flex-col justify-between gap-10 z-10">
				  <div>
					<h1 class="text-5xl text-purple-400">01 - </h1>
					<h2 class="text-2xl font-semibold mb-2 text-purple-200">Start a project</h2>
					<p class="text-purple-100">Tell us about your project idea or use AI-powered tools designed to spark your creativity and get Inspiration.</p>
				  </div>
				  <img class="w-full m-auto rounded-xl mt-24 fourth-text-element" src="./src/lib/images/Genx.jpg" alt="">
				</div>
				<!-- Hover Overlay -->
				<div class="absolute inset-0 bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 flex justify-center items-center group-hover:opacity-100 z-20">
				  <a href="#" class="text-white text-lg font-semibold">Learn More</a>
				</div>
			  </div>
		  
			  <!-- Box 2 -->
			  <div class="relative third-text-element bg-transparent border border-zinc-700 rounded-lg shadow-md p-10 custom-box group overflow-hidden">
				<!-- Glowing effect div -->
				<div class="absolute bottom-2 left-1/2 transform -translate-x-1/1 w-2/6 h-2/3 bg-green-500 blur-[100px] opacity-60 rounded-full z-0"></div>
				<div class="relative z-10">
				  <h1 class="text-5xl text-green-300">02 - </h1>
				  <h2 class="text-2xl font-semibold mb-2 text-green-200">Get a Landing Page</h2>
				  <p class="text-green-100">With just one click, receive a beautifully designed landing page tailored for your project within two business days.</p>
				</div>
				<!-- Hover Overlay -->
				<div class="absolute inset-0 bg-black bg-opacity-70 opacity-0 transition-opacity duration-300 flex justify-center items-center group-hover:opacity-100 z-20">
				  <a href="#" class="text-white text-lg font-semibold">Explore</a>
				</div>
			  </div>
		  
			  <!-- Box 3 -->
			  <div class="relative third-text-element bg-transparent border border-zinc-700 rounded-lg shadow-md p-6 custom-box group overflow-hidden">
				<!-- Glowing effect div -->
				<div class="absolute bottom-2 left-1/2 transform -translate-x-1/1 w-2/6 h-2/3 bg-orange-400 blur-[100px] opacity-60 rounded-full z-0"></div>
				<div class="relative z-10">
				  <h1 class="text-5xl text-pink-300">03 - </h1>    
				  <h2 class="text-2xl font-semibold mb-2 text-pink-200">Boost Your Marketing</h2>
				  <p class="text-pink-100">Utilize our expert marketing strategies to effectively engage your target audience and grow your brand presence.</p>
				</div>
				<!-- Hover Overlay -->
				<div class="absolute inset-0 bg-zinc-900 bg-opacity-70 opacity-0 transition-opacity duration-300 flex justify-center items-center group-hover:opacity-100 z-20">
				  <a href="#" class="text-white text-lg font-semibold">Learn More</a>
				</div>
			  </div>
		  
			  <!-- Box 4 -->
			  <div class="relative third-text-element bg-gradien-to-br from-violet-900 to-purple-300 text-purple-200 rounded-lg shadow-md p-8 custom-box col-span-1 md:col-span-2 lg:col-span-3">
				<!-- No additional glowing effect needed here -->
				<div class="relative z-10">
				  <h2 class="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500 text-transparent bg-clip-text text-2xl mb-2">Get Started Today</h2>
				  <p class="max-w-[500px] mb-5">Join us now to start validating your ideas with our efficient and easy-to-follow 3-step process designed for quick success.</p>
				  <a href="/signup" class="third-text-element border w-52 h-10 md:h-16 border-zinc-900 rounded-full p-4 text-sm flex flex-row justify-evenly items-center shadow-2xl shadow-yellow-200/10 bg-yellow- hover:bg-slate-300 hover:text-black z-50">
					<div class="w-2 h-2 bg-[#fffbbd] rounded-full bg-yellow-400 animate-pulse"></div>
					Get Started
				  </a>
				</div>
			  </div>
			</div>
		  </div>
		  
</section>



<section class="h-auto w-screen flex flex-col  justify-center items-start px-10 pt-32 pt-10 rounded-lg  ">
	<h1 class="text-4xl third-text-element text-purple-200 mb-10 font-thin  max-w-[600px]">
		Start a project, Validate Quickly, and <span class="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500 fourth-text-element text-transparent bg-clip bg-clip-text">Launch with Confidence</span>
	</h1>
	<div class=" grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-3  min-h-[700px] max-w-[]">

		<div class="relative min-h-[400px]  md:col-span-2 md:row-span-2  third-text-element bg-transparent border border-zinc-700 rounded-md md:min-h-[700px] shadow-md p-6 custom-box  group md:overflow-hidden">
			<!-- Glowing effect div -->
			<div class="absolute bottom-2 left-1/2 transform -translate-x-1/1 w-2/6 h-2/3 bg-purple-500 blur-[100px] opacity-60 rounded-full z-0"></div>
			<div class="relative flex flex-col justify-between gap-5 md:gap-10 z-10">
				<div class="max-w-[700px]">
					<h1 class="text-5xl text-purple-400">01 - </h1>
					<h2 class="text-2xl font-semibold mb-2 text-purple-200">Start a project</h2>
					<p class="text-purple-100">Tell us about your idea or use our AI-powered tools to spark some ideas and start the validation process.</p>
				</div>
				<img class="w-full  m-auto rounded-xl mt-5 fourth-text-element" src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/createrbook+final/new+cb+assets/Genx.jpg" alt="">
			</div>
			
		</div>


		<div class="relative min-h-full third-text-element bg-transparent border border-zinc-700 rounded-lg shadow-md p-10 custom-box group overflow-hidden" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/DallE+3/background-+2.jpg'); background-size:cover; background-position:right md:background-position: center;" >
			<!-- Glowing effect div -->
			<div class="absolute bottom-2 left-1/5 transform -translate-x-1/2 w-2/6 h-2/3 bg-green-500 blur-[100px] opacity-20 rounded-full z-0"></div>
			<div class="relative  z-10">
				<h1 class="text-5xl text-green-300">02 - </h1>
				<h2 class="text-2xl font-semibold mb-2 text-green-200">Get a Landing Page</h2>
				<p class="text-green-100">We start the validation by delivering a landing page designed to validate your project. With just one click, receive a beautifully designed landing page within two business days.</p>
			</div>
			
		</div>

		<div class="relative min-h-[300px] third-text-element bg-transparent border border-zinc-700 rounded-lg shadow-md p-6 md:row-span-1 md:col-span-1 md:min-h-full custom-box group overflow-hidden">
			<!-- Glowing effect div -->
			<div class="absolute bottom-2 left-1/2 transform -translate-x-1/1 w-2/6 h-2/3 bg-orange-400 blur-[100px] opacity-60 rounded-full z-0"></div>
			<div class="relative z-10">
				<h1 class="text-5xl text-pink-300">03 - </h1>	
				<h2 class="text-2xl font-semibold mb-2 text-pink-200">Reach Your Audience</h2>
				<p class="text-pink-100">We put in the time and effort to organically offer value and engage your target audience aiming to collect emails, sign ups and pre-orders.</p>
			</div>

			
			
		</div>

		<div class="relative min-h-[300px] third-text-element bg-transparent border border-zinc-700 rounded-lg shadow-md p-6 md:row-span- md:col-span-3 md:min-h-[700px] custom-box group md:overflow-hidden">
			<!-- Glowing effect div -->
			<div class="absolute bottom-2 left-1/2 transform -translate-x-1/1 w-2/6 h-2/3 bg-orange-400 blur-[100px] opacity-60 rounded-full z-0"></div>
			<div class="relative z-10 ">
				<h1 class="text-5xl text-pink-300">04 - </h1>	
				<h2 class="text-2xl font-semibold mb-2 text-pink-200">Decide the winner</h2>
				<p class="text-pink-100 max-w-[700px]">See and track each of your project's data and progress to confidently make data driven decisions</p>
				<video src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/createrbook+final/dashboard+vd1.mp4" autoplay></video>

			</div>

			
			
		</div>
		

		

	</div>

	<div class=" pb-56 third-text-element bg-gradien-to-br from-violet-900 to-purple-300 text-purple-200 rounded-lg shadow-md p-2 md:p-8 custom-box col-span-2 md:col-span-2">
		<!-- No additional glowing effect needed here -->
		<div class="relative z-10">
			<h2 class="bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500  text-transparent bg-clip bg-clip-text text-2xl mb-2 ">Get Started Today</h2>
			<p class="max-w-[500px] mb-5">Join us now to start validating your ideas with our efficient and easy-to-follow 3-step process designed for quick success.</p>
			<!-- <button class="bg-violet-900 text-white py-2 px-4 rounded-md mt-4">Get Started</button> -->
			<a href="/signup" class="third-text-element border w-52 md:h-16 border-zinc-900 rounded-full p-4 text-sm   flex flex-row justify-evenly items-center  shadow-  shadow-2xl shadow-yellow-200/10 bg-yellow-   hover:bg-slate-300 hover:text-black z-50 ">
				<div class="w-2 h-2 bg-[#fffbbd] rounded-full bg-yellow-400 animate-pulse"></div>
				Get Started
			</a>
		</div>
	</div>


</section>  
  
  
  
<section id="pricing" class="pricing min-h-screen  flex flex-col justify-center items-center">
	<Pricing />
</section>

<!-- <section id="contactus" class="contactus  min-h-auto  flex flex-col justify-center items-center mb-20">
    <ContactUs /> 
</section> -->



<section class="contactus  min-h-auto  flex flex-col justify-center items-center">
    <Faq />
</section>


  
  


<div class="w-screen h-72 md:h-96 flex justify-center items-center text-xl md:text-5xl font-mono text-zinc-700 p-5">
    <h1 class="text-element">
		Explore all of your ideas and only keep the best.
    </h1>
</div>
<section class="bg-white w-full min-h-screen pt-10 rounded-t-md hidden">
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

<div class="w-screen h-72 md:h-96 flex justify-center items-center text-xl md:text-5xl font-mono text-zinc-700 p-5 hidden">
    <h1 class="text-element">
		Take full advatage of the power of ai
    </h1>
</div>



<section class="mb bg-white w-full min-h-screen pt-10 rounded-t-md hidden">
	<div class="container flex flex-col ">
		<div class="flex justify-start items-center gap-2">
			<div class="h-4 w-1 rounded-full bg-[#fdc4ff]shadow-xl shadow-indigo-950"></div>
			<h2 class="text-xl font-normal text-black">
				Ai_assistants
			</h2>
		</div>

		

		<div class="w-full h-full flex  flex-col md:flex-row p-3 text-black font-normal text-3xl md:text-4xl  mt-10 ">
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

<div class="w-screen h-72 md:h-96 flex justify-center items-center text-xl md:text-5xl font-mono text-zinc-700 p-5 hidden">
    <h1 class="text-element">
		Let's make your time count
    </h1>
</div>

<section class="pricing bg-white min-h-screen h-auto py-10 hidden">

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
				<a href="/signup" class="btn  w-full bg-zinc-900 shadow-lg shadow-indigo-900 rounded-full">Get Started</a>
			  </div>
			</div>
		  </div>

		  <div class="card card-compact  border-white md:w-96 bg-base-100 max-h-[500px] md:max-h-[700px] shadow-xl rounded-md bg-none">
			
			<div class="card-body md:min-h-[450px] h-[600px] justify-evenly bg-white text-zinc-900">
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
				<!-- <a href="https://cbook.lemonsqueezy.com/checkout/buy/45b8a90e-9e99-4957-b63f-01d7d6cfb070" class="btn  w-full bg-zinc-900 shadow-lg shadow-indigo-900 rounded-full">Get Started</a> -->
				<div class="third-text-element w-full flex justify-center gap-2 items-center text-base font-mono">
					<div class="p-1 rounded-full bg-indigo-950 shadow-md shadow-indigo-700">

					</div>
					<h1>Coming soon</h1>

				</div>
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
				<a href="https://cbook.lemonsqueezy.com/checkout/buy/fa1a928b-7c83-434f-9ace-6710dd6a6e97" class="btn  w-full bg-zinc-900 shadow-lg shadow-indigo-900 rounded-full">Get Started</a>
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


  
  
  
  