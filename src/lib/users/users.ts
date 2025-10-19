import { goto } from '$app/navigation';

import { API_BASE_URL } from '$lib/config';

export async function checkAndDeleteToken(token : string) {
    

    // const token = localStorage.getItem('token');
    console.log(token)
   // const token = '123343134565778976'; // Get the token from local storage
  
    if (token) {
      // Token exists, send a request to your Django endpoint to check its validity

      console.log('Token exists, Running check')
      const response = await fetch(`${API_BASE_URL}/users/check/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
  
      if (response.status !== 200) {
        // Token is not valid, delete it from local storage
        console.log('not valid')
        localStorage.removeItem('token');
        goto('/');

       

      }else{return token}
    }
  }
  