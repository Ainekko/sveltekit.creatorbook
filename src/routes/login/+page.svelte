<script>
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let token = localStorage.getItem('token') || '';

  if (token){
      goto('/dashboard');
  }

  const twitter_auth_url = 'https://api.creatorbook.tech/o/login/twitter';

  const handle_twitter_login = () => {
      window.location.href = twitter_auth_url;
  };

  /**
	 * @param {{ preventDefault: () => void; }} event
	 */
  async function log_in(event) {
      event.preventDefault();
      
      const user_data = {
          email: email,
          password: password,
      };

      try {
          const response = await fetch('http://127.0.0.1:8000/users/login/', {
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
      }
  }
</script>

<div class="bg-white h-screen w-max[1440px] flex flex-col md:flex-row gap-5 md:gap-10 justify-center md:justify-evenly items-center w-full pt-10 md:pt-0">
  <div class="h-screen w-screen max-w-[1200px] flex justify-center items-center overflow-hidden text-black">
      <div class="card bg-dark flex justify-center items-center w-80 shadow-xl p-5">
          <p class="font-bold">Log in:</p>
          <form class="card-body" on:submit={log_in}>
              <input type="email" placeholder="email" bind:value={email} class="input input-bordered border rounded-full text-white" required />
              <input type="password" placeholder="password" bind:value={password} class="input input-bordered border rounded-full text-white" required />
              <div class="label cursor-pointer">
                  Not a user? <a href="/signup" class="link">Sign up</a>
              </div>
              <div class="label cursor-pointer">
                  <a href="/" class="link">Reset password</a>
              </div>
              <input type="submit" value="Log in" class="btn btn-neutral rounded-full bg-zinc-950 shadow-xl" />
          </form>
      </div>
  </div>
</div>
