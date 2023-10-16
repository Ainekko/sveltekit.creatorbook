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
  
  export async function fetch_token() {
    try {
      const response = await fetch('https://api.creatorbook.tech/users/otoken/', {
        method: 'GET',
        
      });
  
      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
  
        localStorage.setItem('auth_token', token);
      } else {
        console.error('Failed to fetch the token:', response.status);
      }
    } catch (error) {
      console.error('Error fetching the token:', error);
    }
  }
  
 

// const tokenCheckInterval = 24 * 60 * 60 * 1000; // 24 hours

// // Set up the interval to call the token check function
// setInterval(checkAndDeleteToken, tokenCheckInterval);



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