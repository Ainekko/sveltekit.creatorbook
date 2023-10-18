<div class="navbar bg-base-10 ">
    <div class="navbar-start">
      <div class="dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a href="/">Free Resources</a></li>
          <li>
            <a href="/">Servicest</a>
            <ul class="p-2">
              <li><a href="https://marketing.creatorbook.com">Validation</a></li>
              <!-- <li><a href="/">This 2</a></li> -->
            </ul>
          </li>
          <li><a href="/re_chat">AI-Assitants</a></li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl text-stone-700 hover:text-gray-50 " href="/"><img class=" max-w-5 object-contain	max-h-6 hover:h-5" src="https://uploads-ssl.webflow.com/638ca0b6c42934441d908d49/65294c89ce2e4b9e38d0f9eb_Creatorbook%20logo%20black.png" alt=""></a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/">Free Resources</a></li>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <li tabindex="0">
          <details>
            <summary>Services</summary>
            <ul class="p-2">
              <li><a href="/">Validation</a></li>
              <!-- <li><a href="/">Submenu 2</a></li> -->
            </ul>
          </details>
        </li>
        <li><a href="/">AI-Assitants</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a href="/login" class="px-4">Log in</a>
      <a class="btn rounded-xl bg-zinc-900 text-white hover:bg-slate-300 hover:text-black" href="/signup">Sign up</a>
      
    </div>
  </div>
  