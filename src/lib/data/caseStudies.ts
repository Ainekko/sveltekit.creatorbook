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
    coverImage?: string; // local static image used as hero background in cards & case study header
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
    techLogos?: { src: string; label: string }[]; // small tech/platform logos shown on card & detail page
    tags: string[];
    cta: { label: string; href: string };
    published: boolean;
    featured: boolean;
    publishedAt: string;
}

export const caseStudies: CaseStudy[] = [
    // ─── Front Desk Assistant ────────────────────────────────────────────────
    {
        id: 'front-desk-assistant',
        slug: 'front-desk-assistant',
        title: 'AI Front Desk Assistant',
        client: 'Client Project',
        industry: 'Small Business / Service Industry',
        accentColor: 'blue',
        coverImage: '/flowjoy/front_desk_assistant.jpg',
        techLogos: [
            { src: '/flowjoy/retell.svg', label: 'Retell AI' },
            { src: '/flowjoy/clickup.svg', label: 'ClickUp' },
            { src: '/flowjoy/make.svg', label: 'Make' }
        ],
        services: ['Voice AI', 'Calendar Automation', 'CRM Integration', 'SMS & Email Workflows'],
        heroImage: '/flowjoy/front_desk_assistant.jpg',
        screenshots: [],
        shortDescription:
            "Every missed call is a missed sale. We built an AI voice assistant that picks up every call, has a real conversation with the lead, books them straight into the calendar, and notifies the business — automatically.",
        challenge:
            "The client was missing calls while on the job, at lunch, or after hours. Those missed calls were going to voicemail — and most callers never called back. Leads were disappearing silently, and there was no way to track how many were being lost.",
        solution:
            "We built an AI front desk that never sleeps. It picks up every call, introduces itself, and has a natural two-way conversation with the lead. If they're ready to book, it checks the client's calendar in real time and locks in the appointment. The lead gets a confirmation SMS. The client gets an email summary with the lead's name, what they need, and the booked time slot. Everything syncs to ClickUp so nothing ever falls through the cracks.",
        results:
            "The client stopped losing leads to missed calls entirely. Bookings started coming in overnight, on weekends, and during busy periods — times when they would have gone to voicemail before. The ClickUp CRM gives a live view of every lead and booking, so the client always knows what's coming.",
        features: [
            { icon: '', title: 'Answers Every Call', desc: '' },
            { icon: '', title: 'Books Meetings', desc: '' },
            { icon: '', title: 'SMS Confirmation', desc: '' },
            { icon: '', title: 'ClickUp CRM', desc: '' }
        ],
        metrics: [
            { value: '0', label: 'Missed calls go unanswered' },
            { value: '24/7', label: 'Always-on front desk' },
            { value: 'Instant', label: 'SMS + email after every booking' },
            { value: '100%', label: 'Leads logged in ClickUp CRM' }
        ],
        quote: {
            text: "I was losing jobs just because I couldn't answer the phone on a busy day. Now the AI handles it, books them in, and I get an email summary. I've had bookings come in at 11pm that I would have completely missed.",
            author: 'Business Owner',
            role: 'Home Services'
        },
        tags: ['Voice AI', 'Automation', 'Lead Capture', 'Booking', 'CRM'],
        cta: { label: 'Build something like this →', href: '/#case-studies' },
        published: true,
        featured: true,
        publishedAt: '2025-02-01'
    },

    // ─── SMS Management Platform ─────────────────────────────────────────────
    {
        id: 'sms-platform',
        slug: 'sms-management-platform',
        title: 'SMS Management Platform',
        client: 'Client Project',
        industry: 'Small Business / Marketing',
        accentColor: 'violet',
        coverImage: '/flowjoy/sms_app.jpg',
        techLogos: [
            { src: '/flowjoy/Vercel_Logo_0.svg', label: 'Vercel' },
            { src: '/flowjoy/Render_id1Uv7v4QJ_0.svg', label: 'Render' }
        ],
        services: ['Product Design', 'Full-Stack Dashboard', 'SMS Automation', 'Multi-brand System'],
        heroImage: '/flowjoy/case_studies_screenshots/sms app/stats_screenshot.jpg',
        screenshots: [
            {
                src: '/flowjoy/case_studies_screenshots/sms app/campain_page.jpg',
                alt: 'SMS campaigns dashboard',
                caption: 'Campaign Manager'
            },
            {
                src: '/flowjoy/case_studies_screenshots/sms app/texting_page.jpg',
                alt: 'SMS conversation view',
                caption: 'Two-way Messaging'
            },
            {
                src: '/flowjoy/case_studies_screenshots/sms app/stats_screenshot.jpg',
                alt: 'SMS analytics and stats',
                caption: 'Live Stats'
            }
        ],
        shortDescription:
            "We built a complete SMS management platform for a small business owner managing multiple brands. One dashboard to text customers, run campaigns, schedule follow-ups, and keep everything organised — no technical knowledge needed.",
        challenge:
            "The client was juggling multiple brands, manually texting customers one by one, and losing track of who replied and who didn't. Campaigns were disorganised, follow-ups were forgotten, and there was no way to see what was actually working.",
        solution:
            "We built a clean, easy-to-use SMS dashboard with everything in one place. Switch between brands in one click, import your contact list, and send to hundreds at once. The AI automatically builds and maintains a Do Not Contact (DNC) list — anyone who opts out gets flagged instantly and is permanently excluded from all future campaigns and follow-ups. No manual list management, no compliance headaches, no accidental re-contact.",
        results:
            "The client went from spending 2+ hours a day manually texting to running bulk campaigns in minutes. Response rates improved because follow-ups actually happen. The AI-powered DNC list means no contact is ever messaged after opting out — protecting the business and keeping customers happy. Managing multiple brands no longer means multiple headaches.",
        features: [
            { icon: '', title: 'Multi-brand', desc: '' },
            { icon: '', title: 'Bulk SMS', desc: '' },
            { icon: '', title: 'AI DNC List', desc: '' },
            { icon: '', title: 'Follow-ups', desc: '' }
        ],
        metrics: [
            { value: '3+', label: 'Brands in one login' },
            { value: '1000s', label: 'Messages per campaign' },
            { value: '2h/day', label: 'Time saved on manual texting' },
            { value: 'AI', label: 'Automated DNC list — zero re-contacts' }
        ],
        quote: {
            text: "Before this I was texting people one by one from my phone. Now I send to my whole list in two minutes and I can actually see who opened it. It's changed how I run my business.",
            author: 'Business Owner',
            role: 'Multi-brand Retailer'
        },
        tags: ['SMS', 'Marketing', 'Automation', 'Multi-brand', 'Small Business'],
        cta: { label: 'Build something like this →', href: '/#case-studies' },
        published: true,
        featured: true,
        publishedAt: '2025-01-01'
    },

    // ─── Nai — SEO Content Engine ────────────────────────────────────────────
    {
        id: 'nai',
        slug: 'nai-seo-agent',
        title: 'Nai — AI SEO Content Engine',
        client: 'Flowjoy',
        industry: 'SaaS / Content Marketing',
        accentColor: 'blue',
        coverImage: '/flowjoy/nai_cover.jpg',
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
            { icon: '', title: 'Research', desc: '' },
            { icon: '', title: 'Outline', desc: "" },
            { icon: '', title: "Full Post", desc: '' },
            { icon: '', title: 'Auto Publish', desc: '' }
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
        coverImage: '/flowjoy/elio_cover.jpg',
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
            { icon: '', title: 'Keyword Monitoring', desc: "" },
            { icon: '', title: 'Intent Scoring', desc: '' },
            { icon: '', title: 'Draft Reply', desc: '' },
            { icon: '', title: 'Churn Alert', desc: '' }
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
];

export const getFeaturedCaseStudies = () => caseStudies.filter((cs) => cs.featured && cs.published);
export const getPublishedCaseStudies = () => caseStudies.filter((cs) => cs.published);
export const getCaseStudyBySlug = (slug: string) => caseStudies.find((cs) => cs.slug === slug);
