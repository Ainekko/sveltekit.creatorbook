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


  <div class="flex flex-col justify-center items-center  md:block text-base font-medium max-w-80 p-5">
    <a href="/signup" class="third-text-element bg-black text-white md:bg-black border w-52  md:h-20 border-zinc-900 rounded-full p-4 text-sm   flex flex-row justify-evenly items-center  shadow-  shadow-2xl shadow-yellow-200/20 bg-yellow-   hover:bg-slate-300 hover:text-black z-50 ">
      <div class="w-2 h-2 bg-black rounded-full bg-yellow-400 animate-pulse"></div>
      
    </a>
      
      
  </div>   
      
     