
<div class="container max-w-[1200px] min-h-full flex flex-col justify-center items-center ">

    <h1 class="text-3xl font-light text-zinc-200">
        Contact Us
    </h1>

    <form action="#" method="POST" class=" w-1/2  shadow-md rounded-md px-8 pt-6 pb-8 mb-4 font-extralight text-sm">
        <div class="mb-2">
            <label for="name" class="block text-transparent font-thin mb-0 ">Name</label>
            <input type="text" id="name" name="name" class="w-full px-3 py-2 placeholder-zinc-400 border border-zinc-800 rounded-md focus:outline-none focus:border-blue-500" placeholder="Name" required>
        </div>
        <div class="mb-2">
            <label for="email" class="block text-transparent font-thin mb-0">Email</label>
            <input type="email" id="email" name="email" class="w-full px-3 py-2 placeholder-zinc-400 border border-zinc-800 rounded-md focus:outline-none focus:border-blue-500" placeholder="Email" required>
        </div>
        <div class="mb-4">
            <label for="message" class="block text-transparent font-thin mb-0">Message</label>
            <textarea id="message" name="message" rows="4" class="w-full px-3 py-2 placeholder-zinc-400 border border-zinc-800 rounded-md focus:outline-none focus:border-blue-500" placeholder="Message" required></textarea>
        </div>
        <div class="flex items-center justify-between">
            <button type="submit" class="bg-zinc-900 text-white font-thin py-2 px-4 rounded-md hover:bg-zinc-200 hover:text-zinc-900 shadow-md shadow-cyan-300/40 focus:outline-none focus:bg-gray-700">Submit</button>
        </div>
    </form>
    
    

</div>