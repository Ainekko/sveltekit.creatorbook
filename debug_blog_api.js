const API_BASE = 'https://api.flowjoy.online/orion/blog';
const API_KEY = '5MB81_gTNfI5LzHPnw05zBixlAowAgGlFU4BuykP3twCuWDfUO62Oe9qcnDv7mnP';
const PROJECT_ID = '7784468c-c94f-4462-a1b8-d5a76db01a49';

async function getPosts() {
    const params = new URLSearchParams({
        page: '1',
        limit: '3',
        project_id: PROJECT_ID
    });

    const url = `${API_BASE}/posts/list_posts/?${params.toString()}`;
    console.log('Fetching:', url);

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Response not OK:', response.status, response.statusText);
            const text = await response.text();
            console.error('Body:', text);
            return;
        }

        const data = await response.json();
        console.log('Success!');
        console.log('Posts count:', data.posts ? data.posts.length : 0);
        if (data.posts && data.posts.length > 0) {
            console.log('First post title:', data.posts[0].title);
        } else {
            console.log('No posts found in response.');
            console.log('Full response:', JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

getPosts();
