// src/routes/[...path]/+server.ts

import type { RequestHandler } from './$types';

// Determine the correct PostHog regional data ingestion URL
// IMPORTANT: Change this to 'https://eu.i.posthog.com' if your PostHog project is in the EU
const POSTHOG_DATA_HOST = 'https://us.i.posthog.com';

const getPostHogUrl = (proxiedPath: string, searchParams: URLSearchParams): string => {
    let actualPostHogPath = proxiedPath;

    // The client is configured with api_host: '.../ingest', so SvelteKit's params.path
    // will start with 'ingest/'. We need to remove this prefix.
    if (proxiedPath.startsWith('ingest/')) {
        actualPostHogPath = proxiedPath.substring('ingest/'.length);
    } else if (proxiedPath === 'ingest') {
        // Handle case where path is just 'ingest'
        actualPostHogPath = '';
    } else {
        console.warn(`PostHog Proxy: Path "${proxiedPath}" did not start with "ingest/". Using path as is: "${actualPostHogPath}"`);
    }

    // Handle different PostHog endpoints
    if (actualPostHogPath === 's' || actualPostHogPath === 's/') {
        return `${POSTHOG_DATA_HOST}/s/?${searchParams.toString()}`;
    }
    if (actualPostHogPath === 'e' || actualPostHogPath === 'e/' || actualPostHogPath === '') {
        return `${POSTHOG_DATA_HOST}/e/?${searchParams.toString()}`;
    }
    if (actualPostHogPath.startsWith('i/v0/e')) {
        return `${POSTHOG_DATA_HOST}/i/v0/e?${searchParams.toString()}`;
    }
    if (actualPostHogPath === 'decide' || actualPostHogPath === 'decide/') {
        return `${POSTHOG_DATA_HOST}/decide/?${searchParams.toString()}`;
    }
    if (actualPostHogPath.startsWith('static/') || actualPostHogPath.endsWith('.js')) {
        return `${POSTHOG_DATA_HOST}/${actualPostHogPath}?${searchParams.toString()}`;
    }

    // Fallback
    console.warn(`PostHog Proxy: Unhandled path "${actualPostHogPath}". Routing to ${POSTHOG_DATA_HOST}.`);
    return `${POSTHOG_DATA_HOST}/${actualPostHogPath}?${searchParams.toString()}`;
};

const COMMON_CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-PostHog-Session-Id, Range, Accept-Encoding',
};

export const POST: RequestHandler = async ({ request, params, url }) => {
    const path = params.path || '';
    const posthogUrl = getPostHogUrl(path, url.searchParams);
    
    console.log(`PostHog Proxy POST: ${path} -> ${posthogUrl}`);
    
    try {
        // Get the request body as raw bytes to preserve any compression
        const requestBody = await request.arrayBuffer();
        
        // Prepare headers for the PostHog request
        const forwardHeaders: Record<string, string> = {};
        
        // Forward important headers
        const contentType = request.headers.get('Content-Type');
        if (contentType) {
            forwardHeaders['Content-Type'] = contentType;
        }
        
        const contentEncoding = request.headers.get('Content-Encoding');
        if (contentEncoding) {
            forwardHeaders['Content-Encoding'] = contentEncoding;
        }
        
        const userAgent = request.headers.get('User-Agent');
        if (userAgent) {
            forwardHeaders['User-Agent'] = userAgent;
        }

        console.log('Request headers:', Object.fromEntries(request.headers.entries()));
        console.log('Forward headers:', forwardHeaders);
        console.log('Request body size:', requestBody.byteLength);

        const response = await fetch(posthogUrl, {
            method: 'POST',
            headers: forwardHeaders,
            body: requestBody
        });

        const responseText = await response.text();
        console.log('PostHog response:', response.status, responseText.substring(0, 200));

        const responseHeaders = { ...COMMON_CORS_HEADERS };
        const upstreamContentType = response.headers.get('Content-Type');
        if (upstreamContentType) {
            responseHeaders['Content-Type'] = upstreamContentType;
        }

        return new Response(responseText, {
            status: response.status,
            headers: responseHeaders
        });
    } catch (e: any) {
        console.error(`PostHog Proxy POST Error for ${posthogUrl}:`, e);
        return new Response(JSON.stringify({ 
            error: 'Proxy error', 
            details: e.message,
            url: posthogUrl 
        }), {
            status: 502,
            headers: { ...COMMON_CORS_HEADERS, 'Content-Type': 'application/json' }
        });
    }
};

export const GET: RequestHandler = async ({ params, url, request }) => {
    const path = params.path || '';
    const posthogUrl = getPostHogUrl(path, url.searchParams);
    
    console.log(`PostHog Proxy GET: ${path} -> ${posthogUrl}`);

    try {
        const response = await fetch(posthogUrl, {
            method: 'GET',
            headers: {
                'User-Agent': request.headers.get('User-Agent') || 'SvelteKit PostHog Proxy'
            }
        });

        const responseBody = await response.arrayBuffer();
        
        const responseHeaders = { ...COMMON_CORS_HEADERS };
        
        // Forward important response headers
        ['Content-Type', 'Cache-Control', 'ETag'].forEach(header => {
            const value = response.headers.get(header);
            if (value) {
                responseHeaders[header] = value;
            }
        });

        return new Response(responseBody, {
            status: response.status,
            headers: responseHeaders
        });
    } catch (e: any) {
        console.error(`PostHog Proxy GET Error for ${posthogUrl}:`, e);
        return new Response(JSON.stringify({ 
            error: 'Proxy error', 
            details: e.message,
            url: posthogUrl 
        }), {
            status: 502,
            headers: { ...COMMON_CORS_HEADERS, 'Content-Type': 'application/json' }
        });
    }
};

export const OPTIONS: RequestHandler = async () => {
    return new Response(null, {
        status: 204,
        headers: COMMON_CORS_HEADERS
    });
};