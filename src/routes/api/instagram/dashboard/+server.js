export async function GET() {
    try {
        const response = await fetch('http://127.0.0.1:8000/app/instagram/dashboard', {
            
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
            error: 'Failed to fetch dashboard data',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}



