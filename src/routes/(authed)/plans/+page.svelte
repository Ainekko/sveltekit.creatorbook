<script lang="ts">
    import { goto } from '$app/navigation';
    import {get_user} from '$lib/check'
    let plan = 'free'; // default to free plan
  
    function selectPlan(selectedPlan: string) {
        plan = selectedPlan;
    }
  
    function submitSelection() {
        localStorage.setItem('plan', plan);
        if (plan === 'free') {
            goto('/dashboard');
        } else {
           async function to_start_the_checkout(){
            let userData = await get_user(); // Get the user. it uses the knox token to authenticate and retrieves the user

            // inside the userData i will have the userid, email and username returned from django.
            // i need now a function to return and redirect to the checkout URL
           }
        }
    }
</script>

<div class="h-screen w-full flex justify-center items-center">
    <div class="max-w-[1050px] w-full h-full flex flex-col justify-center items-center overflow-hidden text-center">
        <div class="card flex flex-col justify-center items-center w-full min-h-1/2 shadow-xl p-5 rounded-md ">
            <p class="text-lg text-zinc-200 font-semibold mb-6">Select Your Plan</p>
            <div class="flex flex-row justify-between items-center gap-4 p-4 w-full min-h-full">
                <div class="flex-1 h-72">
                    <button type="button" on:click={() => selectPlan('free')} 
                        class={`w-full p-6 h-full rounded-md border transition-all 
                        ${plan === 'free' ? 'border-white' : 'border-zinc-800 hover:border-zinc-500'}
                        focus:outline-none focus:border-white text-white`}>
                        <h3 class="text-xl font-semibold mb-2">Start for Free</h3>
                        <p class="text-zinc-400 text-xl mb-5">
                            $0/m
                        </p>
                        <p class="text-sm text-zinc-500">Get access to AI assistants and basic features.</p>
                    </button>
                </div>
                <div class="flex-1 h-72">
                    <button type="button" on:click={() => selectPlan('paid')} 
                        class={`w-full p-6 h-full rounded-md border transition-all 
                        ${plan === 'paid' ? 'border-gradient' : 'border-zinc-800 hover:border-zinc-500'}
                        focus:outline-none focus:border-white text-white`}>
                        <h3 class="text-xl font-semibold mb-2"><span class="bg-gradient-to-r from-violet-400 via-pink-500 to-violet-400 text-transparent bg-clip bg-clip-text text-2xl underline font-bold mb-2">Agency</span> Plan</h3>
                        <p class="text-zinc-400 text-xl mb-5">
                            $999/m
                        </p>
                        <p class="text-sm text-zinc-500">Access to our validation services plus AI assistants.</p>
                    </button>
                </div>
            </div>
            <button on:click={submitSelection} 
                class="mt-6 border border-zinc-700 hover:border-zinc-400 hover:bg-white text-white hover:text-black font-semibold py-2 px-4 rounded-full shadow-md transition-all">
                Next
            </button>
        </div>
    </div>
</div>

<style>
    .border-gradient {
        border: 1px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(90deg, #b363f1, #D1D5DB);
    }
</style>
