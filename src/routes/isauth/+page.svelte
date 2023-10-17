<script>
    let loginStatus = '';
  
    async function checkUserLogin() {
      try {
        const response = await fetch('https://api.creatorbook.tech/users/check_user/', {
          method: 'GET',
          credentials: 'include', // Include cookies for session
        });
  
        if (response.ok) {
          const data = await response.json();
          loginStatus = data.message;
        } else {
          loginStatus = 'User is not logged in';
        }
      } catch (error) {
        loginStatus = 'Error checking login status';
      }
    }
  </script>
  
  <main>
    <h1>Check User Login Status</h1>
    <button on:click={checkUserLogin}>Check Login</button>
    <p>{loginStatus}</p>
  </main>
  