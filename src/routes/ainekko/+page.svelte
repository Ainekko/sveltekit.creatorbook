<html lang="en">
<head>


    <style>
        /* Additional Custom Styles */
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
            background-color: rgba(0.5, 0, 0, 0);
            backdrop-filter: blur(0px); /* Add blur effect */
            z-index: 0; /* Ensure the black layer is behind everything */
        }

        .stat-container {
            display: flex;
            flex-direction: column;
            max-width: 300px;
            margin: 20px;
        }
        .stat-bar {
            background-color: #ddd;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        .stat-fill {
            height: 20px;
            border-radius: 5px;
            transition: width 2s ease-in-out;
        }
        .strength { background-color: #4CAF50; } /* Green color for strengths */
        .weakness { background-color: #f44336; } /* Red color for weaknesses */

        .neon-violet { 
            background: linear-gradient(90deg, rgba(143,0,255,1) 0%, rgba(124,77,255,1) 100%);
            box-shadow: 0 0 10px rgba(143,0,255,0.5), 0 0 20px rgba(143,0,255,0.5), 0 0 30px rgba(143,0,255,0.5);
        }
        .neon-blue { 
            background: linear-gradient(90deg, rgba(0,210,255,1) 0%, rgba(58,123,213,1) 100%);
            box-shadow: 0 0 10px rgba(0,210,255,0.5), 0 0 20px rgba(0,210,255,0.5), 0 0 30px rgba(0,210,255,0.5);
        }
        .neon-green { 
            background: linear-gradient(90deg, rgba(0,255,146,1) 0%, rgba(58,213,123,1) 100%);
            box-shadow: 0 0 10px rgba(0,255,146,0.5), 0 0 20px rgba(0,255,146,0.5), 0 0 30px rgba(0,255,146,0.5);
        }

        .neon-orange { 
            background: linear-gradient(90deg, rgba(255,165,0,1) 0%, rgba(255,140,0,1) 100%);
             box-shadow: 0 0 10px rgba(255,165,0,0.5), 0 0 20px rgba(255,165,0,0.5), 0 0 30px rgba(255,165,0,0.5);
                    }

        
                
    </style>

</head>

<script>
    window.onload = function() {
      var bars = document.querySelectorAll('.stat-fill');
      bars.forEach(function(bar) {
        var strength = bar.getAttribute('data-strength');
        var weakness = bar.getAttribute('data-weakness');
        if (strength) {
          bar.style.width = strength + '%';
        }
        if (weakness) {
          bar.style.width = weakness + '%';
        }
      });
    };
</script>

<body>
            

    <section class="hero min-h-[92vh]" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/web/bg4.jpg'); background-size:cover; background-position:right md:background-position: center;">
        
        <div class="grid grid-cols-2 h-full w-full p-4">
            <div class="container flex col-span-2">
                <div class="w-full flex justify-start items-start flex-col">
                    
                        <!-- <h1 class="text-element font-light text-xl md:text-xl text-left text-white ">
                            Ainekko
                        </h1> -->

                        <div class="h-full flex flex-col justify-center items-start px-10">
                            <!-- Character Image and Description -->
                            
                            <p class="font- text-white uppercase text-xl mb-5">
                                .\ This is Ainekko, she is a demon cat.
                                
                            </p>
                            <p class="font-extralight text-xs max-w-sm">
                                As any demon, she doesn't have a heart, she has nine of them like Meliodas.
                            </p>
                        
                            <!-- Stats Container -->
                            <div class="stat-container w-full h-auto font-mono text-sm  flex flex-col gap-2">
                                <!-- Emotions -->
                                <h3 class="">Emotions</h3>
                                <div class="stat-bar h-2 flex justify-start items-center">
                                    <div class="stat-fill neon-violet" style="width: 0%;" data-weakness="30"></div>
                                </div>
                        
                                <!-- Humor -->
                                <h3>Humor</h3>
                                <div class="stat-bar h-2 flex justify-start items-center">
                                    <div class="stat-fill neon-green" style="width: 0%;" data-weakness="80"></div>
                                </div>
                        
                                <!-- Additional Traits -->
                                <!-- Intelligence -->
                                <!-- <h3>Intelligence</h3>
                                <div class="stat-bar h-2 flex justify-start items-center">
                                    <div class="stat-fill strength" style="width: 0%;" data-strength="70"></div>
                                </div> -->
                        
                                
                        
                                
                        
                                <!-- Wisdom -->
                                <h3>Wisdom</h3>
                                <div class="stat-bar h-2 flex justify-start items-center">
                                    <div class="stat-fill neon-blue" style="width: 0%;" data-strength="3"></div>
                                </div>
                            </div>
                        </div>

                    
                </div>

                
            </div>
        </div>
                    
    </section>

      
    

    <section>

        <div class="container mx-auto max-w-5xl  p-4">
            <header class="text-left mb-8">
                <h1 class="text-4xl font-semibold">Pick your favorite</h1>
                <p class="text-gray-300"></p>
            </header>

            <!-- Enhanced Feature Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Box 1 -->
                <div class="bg-violet-700 rounded-lg shadow-md p-6 custom-box md:col-span-2 relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/_142c935e-9d69-43c4-8cd1-8300b2fb703e.jpeg');">
                    <div class="absolute top-0 left-0 w-3/4 h-3/4 bg-black opacity-60 blur-2xl"></div>
                    <div class="overlay">
                        <a href="/" class="mt-2">Explore</a>
                    </div>
                    <div class="relative z-10">
                        <h2 class="text-2xl font-semibold mb-2">The Bad Ass</h2>
                        <p class="text-gray-200">Psycho.</p>
                    </div>
                </div>

                <!-- Box 2 -->
                <div class="bg-violet-800 rounded-lg shadow-md p-10 custom-box relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/_e361cd98-b37f-48be-8002-85a62ca9cf25.jpeg');">
                    <div class="absolute top-0 left-0 w-3/4 h-3/4 bg-black opacity-50 blur-2xl"></div>
                    <div class="overlay">
                        <a href="/" class="mt-2">Explore</a>
                    </div>
                    <div class="relative z-10">
                        <h2 class="text-2xl font-semibold mb-2">The Sweet</h2>
                        <p class="text-gray-200">Sweet.</p>
                    </div>
                </div>

                <!-- Box 3 -->
                <div class="bg-violet-600 rounded-lg shadow-md p-6 custom-box relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/_0c791ddc-7188-4d81-97bb-73676da96907.jpeg');">
                    <div class="absolute top-0 left-0 w-3/4 h-3/4 bg-black opacity-50 blur-2xl"></div>
                    <div class="overlay">
                        <a href="/" class="mt-2">Explore</a>
                    </div>
                    <div class="relative z-10">
                        <h2 class="text-2xl font-semibold mb-2">The gorgeous</h2>
                        <p class="text-gray-200">Beauty.</p>
                    </div>
                </div>

                <!-- Box 4 -->
                <div class="bg-violet-700 rounded-lg shadow-md p-8 custom-box col-span-1 md:col-span-2 relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/end+2.jpg');">
                
                    <div class="relative z-10">
                        <!-- <h2 class="text-2xl font-semibold mb-2">Interactive Constellations</h2>
                        <p class="text-gray-200">Arrange NFTs into personalized cosmic tapestries.</p>
                        <button class="bg-violet-900 text-white py-2 px-4 rounded-md mt-4">Get Started</button> -->
                    </div>
                </div>


            </div>
        </div>
   

    </section>

    <section>
        <div class="min-h-screen w-screen flex flex-col justify-start">

            <div class="w-[100vw] h-[] flex flex-col md:flex-row justify-between items-center md:p-10 p-5">

                <div class="flex flex-col justify-center text-left items-start md:p-5 text-base uppercase font-thin">
                    <h1 class="px-5 mb-2 text-white text-2xl font-normal">./ The Bad Ass</h1>
                    <p class="px-10 max-w-md lowercase">
                        This is the most prominent personality as it makes sense Demons are Bad ass. You never know when she'll start bullying you. be careful!
                    </p>

                    <!-- Stats Container -->
                    <div class="stat-container w-full h-auto font-mono text-sm  flex flex-col gap-2 pl-9">
                        <!-- Emotions -->
                        <h3 class="">Emotions</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-violet" style="width: 0%;" data-weakness="30"></div>
                        </div>
                
                        <!-- Humor -->
                        <h3>Humor (Bullying)</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-green" style="width: 0%;" data-weakness="80"></div>
                        </div>
                
                        <!-- Additional Traits -->
                        <!-- Intelligence -->
                        <!-- <h3>Intelligence</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill strength" style="width: 0%;" data-strength="70"></div>
                        </div> -->
                
                        
                
                        
                
                        <!-- Wisdom -->
                        <h3>Wisdom</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-blue" style="width: 0%;" data-strength="3"></div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <img class="md:w-auto md:h-96" src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/_142c935e-9d69-43c4-8cd1-8300b2fb703e.jpeg" alt="">

                </div>

            </div>

            <div class="w-[100vw] h-[] flex flex-col md:flex-row-reverse justify-between items-center p-5 md:p-10">

                <div class="flex flex-col justify-center text-left items-start md:p-5 text-base uppercase font-thin">
                    <h1 class="px-5 mb-2 text-white text-2xl font-normal">./ The Sweet One</h1>
                    <p class="px-10 max-w-md lowercase">
                        This personality doesn't show up that often, it doesn't make any sense anyway for demons 
                        But we know it's  there 
                    </p>

                    <!-- Stats Container -->
                    <div class="stat-container w-full h-auto font-mono text-sm  flex flex-col gap-2 pl-9">
                        <!-- Emotions -->
                        <h3 class="">Emotions</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-violet" style="width: 0%;" data-weakness="90"></div>
                        </div>
                
                        <!-- Humor -->
                        <h3>Humor</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-green" style="width: 0%;" data-weakness="80"></div>
                        </div>
                
                        <!-- Additional Traits -->
                        <!-- Intelligence -->
                        <!-- <h3>Intelligence</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill strength" style="width: 0%;" data-strength="70"></div>
                        </div> -->
                
                        
                
                        
                
                        <!-- Wisdom -->
                        <h3>Wisdom</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-blue" style="width: 0%;" data-strength="3"></div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <img class="md:w-auto md:h-96" src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/_3ecbcf17-e57c-42e5-84c0-6fda8905e45f.jpeg" alt="">

                </div>

            </div>

            <div class="w-[100vw] h-[] flex flex-col md:flex-row justify-between items-center md:p-10 p-5">

                <div class="flex flex-col justify-center text-left items-start md:p-5 text-base uppercase font-thin">
                    <h1 class="px-5 mb-2 text-white text-2xl font-normal">./ The gorgeous</h1>
                    <p class="px-10 max-w-md lowercase">

                        You should have seen this coming cause what's more gorgeous than a cat? A demon cat of course
                    </p>

                    <!-- Stats Container -->
                    <div class="stat-container w-full h-auto font-mono text-sm  flex flex-col gap-2 pl-9">
                        <!-- Emotions -->
                        <h3 class="">Emotions</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-violet" style="width: 0%;" data-weakness="60"></div>
                        </div>
                
                        <!-- Humor -->
                        <h3>Beauty </h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-orange" style="width: 0%;" data-weakness="200"></div>
                        </div>
                
                        <!-- Additional Traits -->
                        <!-- Intelligence -->
                        <!-- <h3>Intelligence</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill strength" style="width: 0%;" data-strength="70"></div>
                        </div> -->
                
                        
                
                        
                
                        <!-- Wisdom -->
                        <h3>Wisdom</h3>
                        <div class="stat-bar h-2 flex justify-start items-center">
                            <div class="stat-fill neon-blue" style="width: 0%;" data-strength="3"></div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <img class="md:w-auto md:h-96" src="https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/_0c791ddc-7188-4d81-97bb-73676da96907.jpeg" alt="">

                </div>

            </div>

        </div>


    </section>

    <section class="hero min-h-[92vh]" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/Ainekko/end1.jpg'); background-size:cover; background-position:right md:background-position: center;">
        
        <div class="grid grid-cols-2 h-full w-full p-4">
            <div class="container flex col-span-2">
                <div class="w-full flex justify-start items-start flex-col">
                    
                        <!-- <h1 class="text-element font-light text-xl md:text-xl text-left text-white ">
                            Ainekko
                        </h1> -->

                        <div class="h-full flex flex-col justify-center items-start md:px-10">
                            <header class="text-left mb-8">
                                <h1 class="text-4xl font-semibold">We love <span class="text- font-light">Ainekko</span></h1>
                                <p class="text-gray-300 font-light text-xl mt-5">April 2024?</p>
                            </header>
                            
                        </div>

                    
                </div>

                
            </div>
        </div>
                    
    </section>
            

                



 </body>

</html>