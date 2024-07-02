// src/lib/db.ts
export async function submitWIPIdea(token: string | null, idea: any) {

    function show(){
        let sidea= JSON.stringify(idea)
        console.log(`sibmiting ${sidea}`)
    }

    show()
    
    const response = await fetch('https://api.creatorbook.tech/ideas/submit-wip-idea/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(idea)
    });

    if (!response.ok) {
        throw new Error('Failed to submit WIP idea');
    }

    return response.json();
}

export async function submitFavedIdea(token: string | null, idea: any) {
    const response = await fetch('https://api.creatorbook.tech/ideas/submit-faved-idea/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(idea)
    });

    if (!response.ok) {
        throw new Error('Failed to submit Faved idea');
    }

    return response.json();
}


export async function fetchWIPIdeas(token: string | null) {
    const response = await fetch('https://api.creatorbook.tech/ideas/wip-ideas/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch WIP ideas');
    }

    return response.json();
}
