<script>
	import LightNav from '$lib/components/LightNav.svelte';
    import NavBar from '$lib/components/LightNav.svelte'

</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <title>Violet Nebulae NFT Project</title>
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
    </style>
    
</head>

<nav>
    <LightNav />
</nav>


<body class="bg-violet-900 text-white">
    
    <div class="container mx-auto max-w-5xl p-4">
        <header class="text-left mb-8">
            <h1 class="text-4xl font-semibold">Violet Nebulae</h1>
            <p class="text-gray-300">Own a piece of the cosmos through digital art.</p>
        </header>

        <!-- Enhanced Feature Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Box 1 -->
        <div class="bg-violet-700 rounded-lg shadow-md p-6 custom-box md:col-span-2 relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/DallE+3/_4fa7d8e7-309f-4716-b785-2479d554837a.jpeg');">
            <div class="absolute top-0 left-0 w-3/4 h-3/4 bg-black opacity-60 blur-2xl"></div>
            <div class="overlay">
                <a href="#" class="mt-2">Learn More</a>
            </div>
            <div class="relative z-10">
                <h2 class="text-2xl font-semibold mb-2">Nebulae Portraits</h2>
                <p class="text-gray-200">Capture cosmic essence with unique designs.</p>
            </div>
        </div>

        <!-- Box 2 -->
        <div class="bg-violet-800 rounded-lg shadow-md p-10 custom-box relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/DallE+3/_31bcf3ab-f1ea-4da6-8c57-9e81319248c8.jpeg');">
            <div class="absolute top-0 left-0 w-3/4 h-3/4 bg-black opacity-50 blur-2xl"></div>
            <div class="overlay">
                <a href="#" class="mt-2">Explore</a>
            </div>
            <div class="relative z-10">
                <h2 class="text-2xl font-semibold mb-2">Dynamic Animations</h2>
                <p class="text-gray-200">Watch your NFTs evolve like real nebulae.</p>
            </div>
        </div>

        <!-- Box 3 -->
        <div class="bg-violet-600 rounded-lg shadow-md p-6 custom-box relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/DallE+3/_245c1a75-03fa-4a2a-8e7f-ddc1f12b7b90.jpeg');">
            <div class="absolute top-0 left-0 w-3/4 h-3/4 bg-black opacity-50 blur-2xl"></div>
            <div class="overlay">
                <a href="#" class="mt-2">Unlock Now</a>
            </div>
            <div class="relative z-10">
                <h2 class="text-2xl font-semibold mb-2">Unlockable Content</h2>
                <p class="text-gray-200">Discover hidden cosmic secrets.</p>
            </div>
        </div>

        <!-- Box 4 -->
    <div class="bg-violet-700 rounded-lg shadow-md p-8 custom-box col-span-1 md:col-span-2 relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/DallE+3/_0196f90a-2393-4680-adfd-2dc919477ea.jpeg');">
        
        <div class="relative z-10">
            <h2 class="text-2xl font-semibold mb-2">Interactive Constellations</h2>
            <p class="text-gray-200">Arrange NFTs into personalized cosmic tapestries.</p>
            <button class="bg-violet-900 text-white py-2 px-4 rounded-md mt-4">Get Started</button>
        </div>
    </div>

</div>

<!-- Box 5 -->
<div class="bg-violet-800 rounded-lg shadow-md p-6 custom-box mt-4 relative" style="background-image: url('https://rechatcreatorbook.s3.us-west-2.amazonaws.com/DallE+3/_21dc8f2e-83eb-449c-9cc9-518bd148c693.jpeg');">
    <div class="absolute top-0 left-0 w-3/4 h-3/4 bg-black opacity-50 blur-2xl"></div>
    <div class="overlay">
        <a href="#" class="mt-2">View Collection</a>
    </div>
    <div class="relative z-10">
        <h2 class="text-2xl font-semibold mb-2">Limited Editions</h2>
        <p class="text-gray-200">Rarity and exclusivity for collectors.</p>
    </div>
</div>


        <footer class="text-center mt-8">
            <p class="text-gray-400">© 2024 Violet Nebulae. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
