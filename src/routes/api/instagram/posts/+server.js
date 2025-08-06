export async function GET({ url }) {
        try {
            const limit = url.searchParams.get('limit') || '25';
            
            const response = await fetch(`http://127.0.0.1:8000/app/instagram/posts/?limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            return new Response(JSON.stringify({ 
                error: 'Failed to fetch posts data',
                details: error.message 
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
    