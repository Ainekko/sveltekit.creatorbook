

<script lang="ts">
   
   export let bg:string = ""

   let textColor = "text-zinc-950"
   let textHover = "text-zinc-900"
   let borderColor = "border-zinc-400"
   let bgHover = "bg-zinc-50"

   if (bg == "black") {
    textColor = "text-zinc-300"
    textHover = "text-white"
    borderColor = "border-zinc-500"
    bgHover = ""
   }
</script>

<a href="/contact-us" class="{textColor} hover:${textHover} text-sm transition flex items-center justify-center gap-2 border {borderColor} rounded-xl px-4 py-2 hover:{bgHover} hover:border-pink-500/50 group whitespace-nowrap">
    <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 group-hover:bg-pink-300"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-pink-500 group-hover:bg-pink-400"></span>
    </span>
    <span>Get your custom AI Agent</span>
</a>