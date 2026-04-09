// =============================================================
// CASE STUDIES CMS — add new case studies here, they auto-appear
// =============================================================

export interface CaseStudyScreenshot {
    src: string;
    alt: string;
    caption: string;
}

export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    client: string;
    industry: string;
    accentColor: string; // tailwind color token e.g. 'blue' | 'orange' | 'violet'
    services: string[];
    heroImage: string;
    screenshots: CaseStudyScreenshot[];
    demoVideoUrl?: string;
    shortDescription: string;
    challenge: string;
    solution: string;
    results: string;
    features: { icon: string; title: string; desc: string }[];
    metrics: { value: string; label: string }[];
    quote?: { text: string; author: string; role: string };
    tags: string[];
    cta: { label: string; href: string };
    published: boolean;
    featured: boolean;
    publishedAt: string;
}

export const caseStudies: CaseStudy[] = [
    // ─── Nai — SEO Content Engine ────────────────────────────────────────────
    {
        id: 'nai',
        slug: 'nai-seo-agent',
        title: 'Nai — AI SEO Content Engine',
        client: 'Flowjoy',
        industry: 'SaaS / Content Marketing',
        accentColor: 'blue',
        services: ['AI Product Design', 'Full-Stack Dev', 'NLP / LLM Integration', 'Auto-Publish Pipeline'],
        heroImage: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/NewAssets/Nai-workflow.jpg',
        screenshots: [
            {
                src: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/NewAssets/Nai-workflow.jpg',
                alt: 'Nai visual workflow interface',
                caption: 'Visual Workflow'
            },
            {
                src: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/NewAssets/Screenshot+2025-12-01+152134.jpg',
                alt: 'Nai keyword and competitor analysis',
                caption: 'Deep Research'
            },
            {
                src: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/NewAssets/Nai-Outlines.jpg',
                alt: 'Nai SEO outline generator',
                caption: 'Smart Outlines'
            }
        ],
        demoVideoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Nai+Demo.mp4',
        shortDescription:
            "We built Nai — an AI agent that replaces a full-time SEO content team. It researches keywords, analyzes competitors, writes SEO-optimized articles, and auto-publishes to WordPress. All in one flow.",
        challenge:
            "Founders and small teams were spending 10+ hours a week on manual SEO research, writing briefs, and fighting writer's block — only to produce content that barely moved the needle.",
        solution:
            "Nai is a modular AI pipeline: keyword discovery → competitor analysis → structured outlining → full article generation → one-click WordPress publish. Stop at any step or let it run all the way.",
        results:
            "Users go from zero to published SEO article in under 10 minutes. Teams report 8–12 hours saved per week. Content velocity increased 4x for early customers.",
        features: [
            { icon: 'search', title: 'Find Winning Keywords', desc: 'Instantly spot high-volume, low-competition terms you can actually rank for.' },
            { icon: 'trending-up', title: 'Steal Competitor Strategy', desc: "See exactly why they rank #1 and reverse-engineer their approach to beat them." },
            { icon: 'file-text', title: "Banish Writer's Block", desc: 'Get structured, SEO-perfect outlines in seconds. Never start from scratch again.' },
            { icon: 'pen-tool', title: 'Write Like an Expert', desc: 'Deep, researched articles that drive traffic — you control the voice and length.' },
            { icon: 'zap', title: 'Publish While You Sleep', desc: 'Auto-post to WordPress or your CMS. Scale your content without the grind.' }
        ],
        metrics: [
            { value: '10 min', label: 'Zero to published article' },
            { value: '8–12h', label: 'Saved per user per week' },
            { value: '4x', label: 'Content velocity increase' },
            { value: '98/100', label: 'Avg SEO score' }
        ],
        tags: ['SEO', 'AI Agent', 'Content', 'WordPress', 'LLM'],
        cta: { label: 'Try Nai for free →', href: '/signup' },
        published: true,
        featured: true,
        publishedAt: '2024-10-01'
    },

    // ─── Elio — Reddit Lead Intelligence ────────────────────────────────────
    {
        id: 'elio',
        slug: 'elio-reddit-agent',
        title: 'Elio — Reddit Lead Intelligence Agent',
        client: 'Flowjoy',
        industry: 'SaaS / B2B Lead Generation',
        accentColor: 'orange',
        services: ['AI Product Design', 'Reddit API Integration', 'Lead Scanning Engine', 'Dashboard Dev'],
        heroImage: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg',
        screenshots: [
            {
                src: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/flowjoy/og.jpg',
                alt: 'Elio Reddit scanner dashboard',
                caption: 'Lead Scanner Dashboard'
            }
        ],
        demoVideoUrl: 'https://rechatcreatorbook.s3.us-west-2.amazonaws.com/s-teir/Elio+Demo.mp4',
        shortDescription:
            "We built Elio — an AI agent that monitors Reddit 24/7 for high-intent leads, competitor churn, and brand mentions. It surfaces the conversations that matter and drafts authentic, non-spammy replies ready to send.",
        challenge:
            "Reddit has millions of daily conversations where people are actively asking for solutions, complaining about competitors, or looking for exactly what your product does — but manually monitoring it is a full-time job nobody has time for.",
        solution:
            "Elio continuously scans configured subreddits for your keywords. It scores each post by intent, filters out noise, and presents only high-value opportunities with AI-drafted reply suggestions that feel human, not promotional.",
        results:
            "Teams using Elio report finding 15–30 qualified lead opportunities per week on autopilot. Average response to a hot lead dropped from days to minutes. Competitor churn alerts let users swoop in at exactly the right moment.",
        features: [
            { icon: 'target', title: 'Spot High-Intent Buyers', desc: "Find users asking for your exact solution or complaining about a competitor right now." },
            { icon: 'alert-circle', title: 'Catch Competitor Churn', desc: 'Alerts you the moment users vent about your rivals so you can swoop in and offer the alternative.' },
            { icon: 'message-circle', title: 'Engage Authentically', desc: 'AI-drafted replies that are helpful, value-first, and non-salesy — builds trust, not spam flags.' },
            { icon: 'filter', title: 'Skip the Noise', desc: 'Intent scoring filters out irrelevant posts. You only see high-signal conversations worth acting on.' },
            { icon: 'shield', title: 'Protect Your Brand', desc: 'Catch negative brand mentions early and control the narrative before it spirals.' }
        ],
        metrics: [
            { value: '24/7', label: 'Continuous Reddit monitoring' },
            { value: '15–30', label: 'Qualified leads found/week' },
            { value: '< 5 min', label: 'Alert to response time' },
            { value: '∞', label: 'Subreddits monitored' }
        ],
        quote: {
            text: "I was manually checking Reddit every day for mentions and it was killing my mornings. Elio just does it — and the leads it surfaces are actually good.",
            author: 'Early Adopter',
            role: 'SaaS Founder'
        },
        tags: ['Reddit', 'Lead Gen', 'AI Agent', 'B2B', 'Monitoring'],
        cta: { label: 'Try Elio for free →', href: '/signup' },
        published: true,
        featured: true,
        publishedAt: '2024-11-01'
    }

    // ─── ADD MORE CASE STUDIES BELOW ────────────────────────────────────────
    // {
    //   id: '3',
    //   slug: 'your-project-slug',
    //   title: 'Project Title',
    //   client: 'Client Name',
    //   ...
    // }
];

export const getFeaturedCaseStudies = () => caseStudies.filter((cs) => cs.featured && cs.published);
export const getPublishedCaseStudies = () => caseStudies.filter((cs) => cs.published);
export const getCaseStudyBySlug = (slug: string) => caseStudies.find((cs) => cs.slug === slug);
