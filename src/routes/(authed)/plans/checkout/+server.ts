// src/routes/plans/checkout/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const TEST_CREEM_API_KEY = 'creem_test_46rGPJyfeQBvM4KzICWyOp';
const CREEM_API_KEY = 'creem_4asli88Y5vYQqQWWi49gF';

const CREEM_BASE_URL = "https://api.creem.io/v1";
const TEST_PRODUCT_ID = "prod_4AZzFkSopL1wVy1yc6VceC";
const PRODUCT_ID = "prod_4nd93GEVK8yp1prgLVKL0s"
export const POST: RequestHandler = async ({ request, url }) => {
    console.log('SERVER: Checkout API route called.');

    if (!CREEM_API_KEY) {
        console.error('SERVER CRITICAL: CREEM_API_KEY is not configured or not loaded from .env. Check .env file and server restart.');
        return json(
            { source: 'server_config_error', error: 'Internal server configuration error regarding API key.' },
            { status: 500 }
        );
    }
    
    try {
        const body = await request.json();
        console.log('SERVER: Request body received:', body);
        
        const { userEmail, userID } = body;
        
        // More explicit check for userID, ensuring it's not null or undefined
        if (!userEmail || (userID === null || userID === undefined)) {
            console.warn('SERVER: Missing user data from client:', { userEmail, userID });
            return json(
                { source: 'server_validation_error', error: 'Missing user email or ID.', received: { userEmail, userID } },
                { status: 400 }
            );
        }
        
        const success_url = `${url.origin}/dashboard`;
        const cancel_url = `${url.origin}/plans`;

        const checkoutData = {
            product_id: PRODUCT_ID,
          
            metadata: { // Ensure metadata keys and values are strings if required by Creem
                user_id: String(userID),
                user_email: String(userEmail) // Ensure email is also string
            }
        };
        
        console.log('SERVER: Sending data to Creem:', JSON.stringify(checkoutData, null, 2));
        
        const creemResponse = await fetch('https://api.creem.io/v1/checkouts', {
            method: 'POST',
            headers: {
                'x-api-key': `${CREEM_API_KEY}` || "",
                'Content-Type': 'application/json',
                'Accept': 'application/json' // Often good to specify accept header
            },
            body: JSON.stringify(checkoutData)
        });
        
        // Always get the text of the response to log it, regardless of status
        const creemResponseText = await creemResponse.text();
        console.log('SERVER: Creem response status:', creemResponse.status);
        console.log('SERVER: Creem response body:', creemResponseText);
        
        if (creemResponse.ok) {
            // Attempt to parse only if response.ok, otherwise creemResponseText is the error detail
            const checkoutSession = JSON.parse(creemResponseText); 
            console.log('SERVER: Creem response data parsed (OK):', checkoutSession);
            return json({
                source: 'creem_success',
                url: checkoutSession.checkout_url,
                session_id: checkoutSession.id
            });
        } else {
            // Creem returned an error (4xx or 5xx)
            console.error('SERVER: Creem API error. Status:', creemResponse.status, 'Body:', creemResponseText);
            // The HTTP status of THIS server's response to the client will be Creem's error status
            return json({ 
                source: 'creem_api_error',
                error: `Failed to create checkout session with Creem. Status: ${creemResponse.status}`,
                creem_status: creemResponse.status,
                creem_details: creemResponseText, // This is the raw error body from Creem
            }, { status: creemResponse.status }); 
        }
        
    } catch (error: any) {
        // This block catches errors from request.json(), JSON.stringify, fetch itself (network errors), or JSON.parse if response.ok but body is not JSON
        console.error('SERVER: Unhandled error in POST /plans/checkout:', error);
        let errorMessage = 'Unknown internal server error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        
        return json(
            { source: 'server_catch_block', error: 'Internal server error during checkout process.', details: errorMessage, stack: error?.stack },
            { status: 500 } // This is where the 500 from your server originates
        );
    }
};

// Optional: Add GET handler for basic testing of the endpoint itself
export const GET: RequestHandler = async () => {
    console.log('SERVER: GET request to /plans/checkout');
    if (!CREEM_API_KEY) {
        return json({ message: 'Checkout endpoint is working, but API Key is NOT configured on server.' }, {status: 500});
    }
    return json({ message: 'Checkout endpoint is working (GET). Please use POST to create a session. API Key is configured.' });
};