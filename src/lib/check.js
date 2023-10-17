// retrieve user data
import { goto } from '$app/navigation';
export async function checkAndDeleteToken() {
    
    const token = localStorage.getItem('token');
    //const token = '123343134565778976'; // Get the token from local storage
  
    if (token) {
      // Token exists, send a request to your Django endpoint to check its validity
      const response = await fetch('https://api.creatorbook.tech/users/check/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
  
      if (response.status !== 200) {
        // Token is not valid, delete it from local storage
        console.log('not valid')
        localStorage.removeItem('token');
        goto('/login');

       

      }else{return token}
    }
  }
  
  // const tokenCheckInterval = 24 * 60 * 60 * 1000; // 24 hours

// // Set up the interval to call the token check function
// setInterval(checkAndDeleteToken, tokenCheckInterval);

  

export async function get_token() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      const response = await fetch('https://api.creatorbook.tech/users/get_token/', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const fetchedToken = data.token;
        localStorage.setItem('token', fetchedToken);

        const user = data.user;
        const username = user.username;
        console.log(user)
        console.log(username)

        // Return the user data and token
        return { user };
      } else {
        // Handle error if the token couldn't be fetched
        console.error('Failed to fetch token:', response.status);
      }
    }
  } catch (error) {
    console.error('Error while fetching token:', error);
  }
}



 




export async function get_docs() {
  
  const response = await fetch('https://api.creatorbook.tech/ai_chat/get_docs/', {
    method: 'GET',
    headers: {
      //'Authorization': `Token ${token}`,
    },
  });

  
    

  if (response.status === 200) {
    const data = await response.json(); // Assuming the response is JSON
    let cnt  = data.db_content
    console.log(cnt)
    return data.db_content; // Return the content from the endpoint
  } else {
    console.log('Request failed');
    return null; // Handle the error as needed
  }
}