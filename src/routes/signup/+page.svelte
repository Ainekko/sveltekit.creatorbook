<script>
    import { goto } from '$app/navigation';
    let username = '';
    let email = '';
    let password = '';
    
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
  
  <div class="bg-inherit h-screen w-max[1440px] flex justify-center items-center">
    <div class="h-screen w-screen max-w-[1200px] flex justify-center items-center overflow-hidden">
      <div class="card bg-dark border flex justify-center items-center border-stone-900 w-80 rounded-[13px] font-mono">
        <p>Sign Up:</p>
        <form class="card-body " on:submit={submitForm}>
          <input type="username" placeholder="username" bind:value={username} class="input input-bordered border rounded-[5px]" />
          <input type="email" placeholder="email" bind:value={email} class="input input-bordered border rounded-[5px]" />
          <input type="password" placeholder="password" bind:value={password} class="input input-bordered border rounded-[5px]" />
          
          <div class="label cursor-pointer">
            already a user?
            <a href="/" type="checkbox" class="link" >Sign in</a>
          </div>
  
          
          
          <input type="submit" value="Sign Up" class="btn btn-neutral rounded-[5px]" />
        </form>
      </div>
    </div>
  </div>