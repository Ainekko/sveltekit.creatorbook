// src/routes/api/facebook/exchange/+server.ts
import { json } from '@sveltejs/kit';

const APP_ID = '629361013543191';
const APP_SECRET = '9824e0cb8606d8b4237554f092d2cb52';

export async function GET({ url }) {
	const shortLivedToken = url.searchParams.get('token');
	if (!shortLivedToken) {
		return json({ error: 'Missing token' }, { status: 400 });
	}

	const exchangeUrl = `https://graph.facebook.com/v23.0/oauth/access_token` +
		`?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${shortLivedToken}`;

	const res = await fetch(exchangeUrl);
	const data = await res.json();

	if (!res.ok) {
		return json({ error: 'Failed to exchange token', details: data }, { status: 400 });
	}

	return json(data); // contains long-lived token
}