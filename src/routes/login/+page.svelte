<script>
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let token = localStorage.getItem('token') || '';
  let loading = false; // Add loading state

  if (token) {
    goto('/dashboard');
  }

  const twitter_auth_url = 'https://api.s-tierproject.online/o/login/twitter';

  const handle_twitter_login = () => {
    window.location.href = twitter_auth_url; 
  };

  async function log_in(event) {
    event.preventDefault();
    loading = true; // Start loading

    const user_data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('https://api.s-tierproject.online/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_data),
      });

      if (response.status === 200) {
        const res_data = await response.json();
        token = res_data.token;
        console.log("Token:", res_data.token);
        document.cookie = `auth_token=${token}; path=/`;
        localStorage.setItem('token', token);
        goto('/dashboard');
      } else {
        console.error("Login failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      loading = false; // Stop loading
    }
  }
</script>

<div class="bg- h-screen w-max[1440px] flex justify-center items-center">
  <div class="h-screen w-screen max-w-[1050px] flex justify-center items-center overflow-hidden text-">
    <div class="card bg-dark flex justify-center items-center md:w-1/2 shadow-xl p-5 rounded-md">
      <p class="font-normal text-lg text-zinc-200">Log in:</p>
      <form class="card-body w-full" on:submit={log_in}>
        <input type="email" placeholder="email" bind:value={email} class="input input-bordered bg-zinc-900 border border-zinc-950 rounded-xl text-white py-7 mb-2" required />
        <input type="password" placeholder="password" bind:value={password} class="input input-bordered bg-zinc-900 border border-zinc-950 rounded-xl text-white py-7 mb-2" required />
        
        <input type="submit" value="Log in" class="btn btn-neutral flex flex-row text-center justify-center items-center rounded-xl bg-white text-black p-0 h-14 text-base shadow-xl shadow-violet-300/40 mt-4" />
        
        {#if loading}
          <span class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <span class="loading loading-ring loading-md"></span>
          </span>
        {/if}
        
        <div class="label cursor-pointer mt-5">
          Not a user? 
          <a href="/signup" class="link bg-gradient-to-r from-violet-600 via-pink-500 to-violet-500 text-transparent bg-clip bg-clip-text text-xl underline mb-2 link">Sign up</a>
        </div>
        <div class="label cursor-pointer">
          <a href="/" class="link">Reset password</a>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  .btn-primary {
    background-color: #6366F1; /* Tailwind's indigo-500 */
    color: white;
  }

  .btn {
    transition: background-color 0.3s;
  }

  .bg-gray-300 {
    background-color: #D1D5DB; /* Tailwind's gray-300 */
  }

  .link {
    color: #6366F1; /* Tailwind's indigo-500 */
  }

  .link:hover {
    text-decoration: underline;
  }
</style>
