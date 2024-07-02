// Import the SDK
import { type NewCheckout, type Checkout, createCheckout, lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

import 'dotenv/config'


// Configure the SDK with your API key
lemonSqueezySetup({
  apiKey: process.env.LEMON_TEST_APIKEY ||'',
});

const storeId = process.env.LEMON_STORE_ID;
const variantId = process.env.LEMON_VARIANT_ID;
const newCheckout: NewCheckout = {
	productOptions: {
		name: 'New Checkout Test',
		description: 'a new checkout test',
	},
	checkoutOptions: {
		embed: true,
		media: true,
		logo: true,
	},
	checkoutData: {
		email: 'tita0x00@gmail.com',
		name: 'Lemon Squeezy Test',
	},
	expiresAt: null,
	preview: true,
	testMode: true,
};
const { statusCode, error, data } = await createCheckout(storeId, variantId, newCheckout);