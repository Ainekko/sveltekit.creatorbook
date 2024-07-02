// src/routes/api/create-checkout.ts

import { json } from '@sveltejs/kit';
import { createCheckout, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

import 'dotenv/config'

//node20x

// Configure the SDK with your API key
lemonSqueezySetup({
  apiKey: process.env.LEMON_TEST_APIKEY || '', // Ensure your API key is set
});

export async function POST({ request }) {
  try {
    const { userEmail, userName, userID } = await request.json();

    console.log(userEmail, userID)
    
    const storeId = process.env.LEMON_STORE_ID;
    const variantId = 428733;

    const newCheckout = {
      productOptions: {
        name: 'Paid Plan Subscription',
        description: 'Subscription for the paid plan',
      },
      checkoutOptions: {
        embed: false,
        media: true,
        logo: true,
      },
      checkoutData: {
        // custom: {

        //   user_id: userID,

        // },
        email: userEmail,
        "custom": {
          "user_id": "123"
        }
        // name: userName,
       
      },
      expiresAt: null,
      preview: false,
      testMode: true,
    };


    console.log('New Checkout Object:', newCheckout);

    // Creating the checkout session
    const { statusCode, error, data } = await createCheckout(storeId, variantId, newCheckout);

    // Log the response for debugging
    console.log('Checkout response:', { statusCode, error, data });

    if (statusCode === 201 && data) {
      // Successfully created the checkout, return the URL for the checkout page
      return json({ url: data.data.attributes.url });
    } else {
      // Log error details if creation failed
      console.error('Error creating checkout:', error);
      return json({ error: 'Failed to create checkout' }, { status: 500 });
    }
  } catch (error) {
    console.error('Exception while creating checkout:', error);
    return json({ error: error.message }, { status: 500 });
  }
}
