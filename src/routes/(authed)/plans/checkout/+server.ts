// src/routes/plans/checkout/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const TEST_CREEM_API_KEY = 'creem_test_5RIzwbOSqJn6pryQrrKzpO';
const PROD_CREEM_API_KEY = 'creem_4asli88Y5vYQqQWWi49gF';

const USE_TEST_MODE = true; // Toggle this for production
const CREEM_API_KEY = USE_TEST_MODE ? TEST_CREEM_API_KEY : PROD_CREEM_API_KEY;

const CREEM_PROD_BASE_URL = "https://api.creem.io/v1";
const CREEM_TEST_URL = "https://test-api.creem.io/v1"

const CREEM_BASE_URL = USE_TEST_MODE ? CREEM_TEST_URL : CREEM_PROD_BASE_URL

// Map your tiers to Creem product/price IDs
const PRICE_IDS = {
    starter: {
        monthly: 'prod_56GlbmLiyyo6kUxnbClgA4', // Replace with actual IDs from Creem dashboard
        annual: 'prod_2uh4uCyMVYIgpw3GkXE9uw'
    },
    pro: {
        monthly: 'prod_4A98VMLVnVyhUwcEj9YqZo',
        annual: 'prod_6qSq9YW4m0DYFgYyczCZXB'
    }
};

export const POST: RequestHandler = async ({ request, url }) => {
    console.log('SERVER: Checkout API route called.');

    if (!CREEM_API_KEY) {
        console.error('SERVER CRITICAL: CREEM_API_KEY is not configured.');
        return json(
            { source: 'server_config_error', error: 'Internal server configuration error regarding API key.' },
            { status: 500 }
        );
    }
    
    try {
        const body = await request.json();
        console.log('SERVER: Request body received:', body);
        
        const { userEmail, userID, tier, billingPeriod } = body;
        
        // Validation
        if (!userEmail || (userID === null || userID === undefined)) {
            console.warn('SERVER: Missing user data from client:', { userEmail, userID });
            return json(
                { source: 'server_validation_error', error: 'Missing user email or ID.', received: { userEmail, userID } },
                { status: 400 }
            );
        }

        if (!tier || !billingPeriod) {
            console.warn('SERVER: Missing tier or billing period:', { tier, billingPeriod });
            return json(
                { source: 'server_validation_error', error: 'Missing tier or billing period.' },
                { status: 400 }
            );
        }

        // Get the correct price ID based on tier and billing period
        const priceId = PRICE_IDS[tier as keyof typeof PRICE_IDS]?.[billingPeriod as 'monthly' | 'annual'];
        
        if (!priceId) {
            console.error('SERVER: Invalid tier/billing combination:', { tier, billingPeriod });
            return json(
                { source: 'server_validation_error', error: 'Invalid plan configuration.' },
                { status: 400 }
            );
        }
        
        const success_url = 'http://localhost:5173/projects?checkout=success';
        const cancel_url = `${url.origin}/plans?checkout=cancelled`;

        const checkoutData = {
            product_id: priceId, // Your test product ID
          
            metadata: {
                user_id: String(userID),
                user_email: String(userEmail),
                tier: tier,
                billing_period: billingPeriod
            }
        };
        
        console.log('SERVER: Sending data to Creem:', JSON.stringify(checkoutData, null, 2));
        
        const creemResponse = await fetch(`${CREEM_BASE_URL}/checkouts`, {
            method: 'POST',
            headers: {
                'x-api-key': CREEM_API_KEY, // ✅ Fixed
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(checkoutData)
        });
        
        const creemResponseText = await creemResponse.text();
        console.log('SERVER: Creem response status:', creemResponse.status);
        console.log('SERVER: Creem response body:', creemResponseText);
        
        if (creemResponse.ok) {
            const checkoutSession = JSON.parse(creemResponseText); 
            console.log('SERVER: Creem response data parsed (OK):', checkoutSession);
            return json({
                source: 'creem_success',
                url: checkoutSession.checkout_url,
                session_id: checkoutSession.id
            });
        } else {
            console.error('SERVER: Creem API error. Status:', creemResponse.status, 'Body:', creemResponseText);
            return json({ 
                source: 'creem_api_error',
                error: `Failed to create checkout session with Creem. Status: ${creemResponse.status}`,
                creem_status: creemResponse.status,
                creem_details: creemResponseText,
            }, { status: creemResponse.status }); 
        }
        
    } catch (error: any) {
        console.error('SERVER: Unhandled error in POST /plans/checkout:', error);
        let errorMessage = 'Unknown internal server error.';
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }
        
        return json(
            { source: 'server_catch_block', error: 'Internal server error during checkout process.', details: errorMessage, stack: error?.stack },
            { status: 500 }
        );
    }
};

export const GET: RequestHandler = async () => {
    console.log('SERVER: GET request to /plans/checkout');
    if (!CREEM_API_KEY) {
        return json({ message: 'Checkout endpoint is working, but API Key is NOT configured on server.' }, {status: 500});
    }
    return json({ 
        message: 'Checkout endpoint is working (GET). Please use POST to create a session.', 
        api_key_configured: true,
        test_mode: USE_TEST_MODE 
    });
};