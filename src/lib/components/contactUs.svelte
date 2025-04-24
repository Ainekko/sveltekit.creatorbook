<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    
    // Form data interface
    interface FormData {
        name: string;
        email: string;
        company: string;
        message: string;
    }
    
    // Form states
    let formData: FormData = {
        name: '',
        email: '',
        company: '',
        message: ''
    };
    let loading = false;
    let formSubmitted = false;
    let formError = '';
    
    // Form validation states
    let nameValid = true;
    let emailValid = true;
    let messageValid = true;
    
    // Tech stack with proper typing
    interface TechItem {
        name: string;
        icon: string;
        color: string;
    }
    
    const techStack: TechItem[] = [
        { name: "OpenAI", icon: "fa-brain", color: "text-green-400" },
        { name: "Langchain", icon: "fa-link", color: "text-yellow-400" },
        { name: "LangGraph", icon: "fa-project-diagram", color: "text-blue-400" },
        { name: "Anthropic", icon: "fa-robot", color: "text-purple-400" },
        { name: "Vector DB", icon: "fa-database", color: "text-pink-400" },
        { name: "Python", icon: "fa-python", color: "text-blue-400" }
    ];
    
    // Features with proper typing
    interface Feature {
        title: string;
        description: string;
        icon: string;
        bgColor: string;
        borderColor: string;
        iconColor: string;
    }
    
    const features: Feature[] = [
        {
            title: "High Performance",
            description: "Our agents process information at lightning speed with superior accuracy",
            icon: "fa-bolt",
            bgColor: "bg-indigo-900/30",
            borderColor: "border-indigo-700/50",
            iconColor: "text-indigo-400"
        },
        {
            title: "Custom Built",
            description: "Tailored specifically for your industry and business requirements",
            icon: "fa-fingerprint",
            bgColor: "bg-purple-900/30",
            borderColor: "border-purple-700/50",
            iconColor: "text-purple-400"
        },
        {
            title: "Enterprise Security",
            description: "Bank-level encryption and data protection for peace of mind",
            icon: "fa-shield-alt",
            bgColor: "bg-pink-900/30",
            borderColor: "border-pink-700/50",
            iconColor: "text-pink-400"
        }
    ];
    
    // Statistics with proper typing
    interface Stat {
        value: string;
        label: string;
        gradient: string;
    }
    
    const stats: Stat[] = [
        {
            value: "97%",
            label: "Customer satisfaction rate",
            gradient: "from-indigo-400 to-purple-400"
        },
        {
            value: "24/7",
            label: "Support availability",
            gradient: "from-purple-400 to-pink-400"
        }
    ];
    
    // Validate the form
    function validateForm(): boolean {
        nameValid = formData.name.trim().length > 0;
        emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        messageValid = formData.message.trim().length >= 10;
        
        return nameValid && emailValid && messageValid;
    }
    
    // Submit the form
    async function submitForm(event: Event): Promise<void> {
        event.preventDefault();
        
        if (!validateForm()) {
            formError = 'Please check the form for errors';
            return;
        }
        
        loading = true;
        formError = '';
        
        try {
            const response = await fetch('https://api.s-tierproject.online/contact/s/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include CSRF token if necessary
                    // 'X-CSRFToken': getCsrfToken(),
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            
            formSubmitted = true;
        } catch (error) {
            console.error('Error submitting form:', error);
            formError = error instanceof Error ? error.message : 'Network error. Please try again.';
        } finally {
            loading = false;
        }
    }
    
    // Reset the form
    function resetForm(): void {
        formSubmitted = false;
        formData = {
            name: '',
            email: '',
            company: '',
            message: ''
        };
    }
    
    onMount(() => {
        // Any initialization code here
    });
</script>



<style>
    
    
    .tech-icon {
        transition: all 0.3s ease;
    }
    
    .tech-icon:hover {
        transform: translateY(-5px);
    }
    
    
</style>

<div class="text-zinc-200 min-h-screen">
    <div class="container mx-auto px-4 py-16">
        <!-- Header Section -->
        <div class="flex flex-col items-center justify-center mb-12" in:fade={{ duration: 300, delay: 100 }}>
            <div class="inline-flex items-center rounded-full px-4 py-1.5 font-medium text-sm border border-zinc-700 bg-zinc-800/50 text-zinc-200 mb-4">
                <div class="mr-2 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>Contact Us
            </div>
            <h1 class="text-center font-medium text-4xl text-white tracking-tight lg:text-5xl mb-3">Get in touch</h1>
            <p class="text-center text-lg text-zinc-400 max-w-xl">Let's discuss how our intelligent AI agents can transform your business operations</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            <!-- Contact Form Section -->
            <div class="lg:col-span-7" in:fly={{ y: 20, duration: 400, delay: 200 }}>
                <div class="gradient-border glow-effect  p-8">
                    <h2 class="text-2xl font-bold text-white mb-6">Send us a message</h2>
                    
                    {#if !formSubmitted}
                        {#if formError}
                            <div class="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm" transition:fade={{ duration: 300 }}>
                                {formError}
                            </div>
                        {/if}
                        
                        <form class="space-y-6" on:submit={submitForm}>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Full Name <span class="text-pink-500">*</span></label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        bind:value={formData.name}
                                        class="w-full bg-zinc-900  text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 input-focus-effect transition-all duration-200 {!nameValid && formData.name ? 'ring-1 ring-red-500' : ''}" 
                                        placeholder="John Doe"
                                        required
                                    >
                                    {#if !nameValid && formData.name}
                                        <p class="text-red-400 text-xs mt-1">Please enter your name</p>
                                    {/if}
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email Address <span class="text-pink-500">*</span></label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        bind:value={formData.email}
                                        class="w-full bg-zinc-900  text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 input-focus-effect transition-all duration-200 {!emailValid && formData.email ? 'ring-1 ring-red-500' : ''}" 
                                        placeholder="your@email.com"
                                        required
                                    >
                                    {#if !emailValid && formData.email}
                                        <p class="text-red-400 text-xs mt-1">Please enter a valid email address</p>
                                    {/if}
                                </div>
                            </div>
                            
                            
                            
                            <div>
                                <label for="message" class="block text-sm font-medium text-zinc-300 mb-2">Your Message <span class="text-pink-500">*</span></label>
                                <textarea 
                                    id="message" 
                                    rows="5" 
                                    bind:value={formData.message}
                                    class="w-full bg-zinc-900  text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 input-focus-effect transition-all duration-200 resize-none {!messageValid && formData.message ? 'ring-1 ring-red-500' : ''}" 
                                    placeholder="Tell us about your project and requirements..."
                                    required
                                ></textarea>
                                {#if !messageValid && formData.message}
                                    <p class="text-red-400 text-xs mt-1">Please provide more details about your request (minimum 10 characters)</p>
                                {/if}
                            </div>
                            
                            <div>
                                <button 
                                    type="submit" 
                                    class="w-full  border border-zinc-800 hover:bg-zinc-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    {:else}
                        <div in:fade class="text-center py-12">
                            <div class="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-700">
                                <i class="fas fa-check text-green-500 text-2xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-white mb-2">Thank You!</h3>
                            <p class="text-gray-400 mb-6">Your message has been sent successfully. We'll be in touch soon.</p>
                            <button 
                                on:click={resetForm}
                                class="px-6 py-2 bg-zinc-900  text-white font-medium rounded-xl hover:bg-zinc-700 transition-color border border-zinc-900"
                            >
                                Send Another Message
                            </button>
                        </div>
                    {/if}
                    
                    <!-- Direct Contact Info -->
                    <div class="mt-8 pt-6 border-t border-zinc-700/50">
                        <h3 class="text-lg font-medium text-white mb-4">Or reach us directly:</h3>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                
                                <a href="mailto:hi@s-tierproject.online" class="text-zinc-400 hover:text-indigo-300 transition-colors">hi@s-tierproject.online</a>
                            </div>
                            
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Section with Tech Stack and Benefits -->
            <div class="lg:col-span-5 space-y-6">
                <!-- Tech Stack Section -->
                <div class="gradient-border glow-effect bg-zinc-900 p-8" in:fly={{ y: 20, duration: 400, delay: 300 }}>
                    <h3 class="text-xl font-bold text-white mb-6">Our Technology Stack</h3>
                    
                    <div class="grid grid-cols-3 gap-4">
                        {#each techStack as tech}
                            <div class="tech-icon flex flex-col items-center justify-center p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                                <div class="w-12 h-12 flex items-center justify-center mb-3">
                                    <i class="fas {tech.icon} text-3xl {tech.color}"></i>
                                </div>
                                <span class="text-sm text-center text-gray-300">{tech.name}</span>
                            </div>
                        {/each}
                    </div>
                </div>
                
                
                <!-- Stats Section -->
                
            </div>
        </div>
    </div>
    
    {#if loading}
        <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50" transition:fade={{ duration: 200 }}>
            <div class="p-6 rounded-xl bg-zinc-900 shadow-xl border border-zinc-700 flex flex-col items-center">
                <div class="w-12 h-12 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-zinc-600 border-l-zinc-600 animate-spin"></div>
                <p class="mt-4 text-gray-300">Sending your message...</p>
            </div>
        </div>
    {/if}
</div>