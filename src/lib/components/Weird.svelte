<!-- <script lang="ts">
  
	
	import { onMount } from 'svelte';

	import { gsap } from "gsap/dist/gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	


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

 

	
	
  </script> -->


<div class="flex flex-col hidden md:block">
    <div class="second-text-element font-medium text-base md:text-xl h- md:h-10 w-60 bg-orange-500 rounded-md flex justify-center items-center text-black p-2 shadow-lg shadow-red-500/50 mt-10">
				
        <p>
            Marketing & validation
        </p>
    
    </div>
    
    
    
    
    
    <div class="third-text-element font-medium text-base md:text-xl h- md:h-10 w-40  bg-violet-300  rounded-md   text-black flex justify-center items-center p-2 shadow-lg shadow-indigo-500/50 text-black  mt-3 -ml-5">
        <p class="box">
            Data & Insights
        </p>
    </div>
    
    <div class="third-text-element font-medium text-base md:text-xl h- md:h-10 w-40  bg-violet-200 rounded-md  flex justify-center items-center p-2 shadow-lg shadow-indigo-500/50 text-black  mt-3 -ml-5">
        <p class="box">
            Ai_assistants
        </p>
    </div>
</div>