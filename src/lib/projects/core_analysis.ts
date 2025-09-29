// $lib/core_analysis.ts

const DEVURL = 'http://127.0.0.1:8000/cry_praw'
const PRODURL = 'https://praw-hell-cry.vercel.app/cry_praw'
const BASEURL  = PRODURL 

export interface WebsiteAnalysis {
    business_name: string;
    target_audience: string;
    description: string;
    tone: string;
    industry: string;
}

/**
 * Analyzes a website URL using AI to extract business information
 * @param url - The website URL to analyze
 * @param token - Authentication token
 * @returns Promise<WebsiteAnalysis> - The analyzed website data
 */
export async function analyzeWebsite(url: string, token: string): Promise<WebsiteAnalysis> {
    if (!url || !url.includes('://')) {
        throw new Error('Please provide a valid URL');
    }

    if (!token) {
        throw new Error('Authentication token is required');
    }

    try {
        const response = await fetch(`${BASEURL}/analyze/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data: WebsiteAnalysis = await response.json();
        
        // Validate that we received all expected fields
        const requiredFields = ['business_name', 'target_audience', 'description', 'tone', 'industry'];
        const missingFields = requiredFields.filter(field => !data[field as keyof WebsiteAnalysis]);
        
        if (missingFields.length > 0) {
            console.warn(`Missing fields in API response: ${missingFields.join(', ')}`);
        }

        return {
            business_name: data.business_name || '',
            target_audience: data.target_audience || '',
            description: data.description || '',
            tone: data.tone || '',
            industry: data.industry || ''
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to analyze website: ${error.message}`);
        }
        throw new Error('An unexpected error occurred while analyzing the website');
    }
}

//TODO function to get core anlysis when they're in db