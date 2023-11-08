<script>
    import { goto } from '$app/navigation';
    let username = '';
    let email = '';
    let password = '';

    const twitter_auth_url = 'https://api.creatorbook.tech/o/login/twitter'

    const handle_twitter_login = () => {
    // Redirect the user to the Google OAuth provider's authorization URL
    window.location.href = twitter_auth_url;
  };
    
    let token = localStorage.getItem('token') ||'';
    // 
    if (token){
      goto('/dashboard');
    }
  
    async function submitForm() {
      const userData = {
        username,
        email,
        password,
      };
  
      try {
        const response = await fetch("https://api.creatorbook.tech/users/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        if (response.status === 201) {
          const responseData = await response.json();
          const token = responseData.token
          localStorage.setItem('token', token)
          document.cookie = `auth_token=${token}; path=/`;
          console.log("Token:", responseData.token); // Log the token
          goto('/dashboard')
  
          // You can also redirect the user to another page or perform other actions here.
        } else {
          console.error("Registration failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  </script>

  
  <div class="bg-white h-screen w-max[1440px] flex justify-center items-center">
    
    <div class="h-screen w-screen max-w-[1200px] flex justify-center items-center overflow-hidden text-black ">
      <div class="card bg-dark  flex justify-center items-center w-80 shadow-xl p-5 ">
        <p class="font-bold">Sign Up:</p>
        <form class="card-body " on:submit={submitForm}>
          <input type="username" placeholder="username" bind:value={username} class="input input-bordered border rounded-full text-white" />
          <input type="email" placeholder="email" bind:value={email} class="input input-bordered border rounded-full text-white" />
          <input type="password" placeholder="password" bind:value={password} class="input input-bordered border rounded-full text-white" />
          
          <div class="label cursor-pointer mt-5">
            already a user?
            <a href="/login" type="checkbox" class="link" >Log in</a>
          </div>
  
          
          
          <input type="submit" value="Sign Up" class="btn btn-neutral rounded-full bg-zinc-950 shadow-xl shadow-indigo-900" />
        </form>

        <button class=" btn rounded-xl p-4 shadow shadow-violet-200  hover:shadow-xl border-none text-white text-sans flex flex-row gap-4 border overflow-hidden w-auto min-w-[200px] flex-row-reverse shadow-md shadow-black" on:click={handle_twitter_login}>
          Sign in with twitter
          <svg class="max-h-5 max-w-xs" version="1.1" id="Logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 248 204" style="enable-background:new 0 0 248 204;" xml:space="preserve">
        <style type="text/css">
          .st0{fill:#FFFFFF;}
        </style>
        <g id="Logo_1_">
          <path id="white_background" class="st0" d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
            C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
            c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
            c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
            c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
            c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"/>
        </g>
        </svg>
      </button>
      </div>
    </div>
  </div>