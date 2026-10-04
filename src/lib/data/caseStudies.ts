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
    websiteUrl?: string; // live website URL — when set, a "Try it free" / "Visit website" button appears
    services: string[];
    heroImage: string;
    screenshots: CaseStudyScreenshot[];
    demoVideoUrl?: string;
    shortDescription: string;
    challenge: string;
    solution: string;
    results: string;
    features: { icon: string; title: string; desc: string }[];
    metrics: { value: string; label: string; highlight?: boolean }[];
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
        websiteUrl: 'https://laurie.flowjoy.online',
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
            { value: '24/7', label: 'Always-on front desk', highlight: true },
            { value: 'Instant', label: 'SMS + email after every booking' },
            { value: '100%', label: 'Leads logged in ClickUp CRM' }
        ],
        quote: {
            text: "Client: MHR",
            author: '',
            role: ''
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
        websiteUrl: 'https://broadr.flowjoy.online',
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
            { value: '2h/day', label: 'Time saved on manual texting', highlight: true },
            { value: 'AI', label: 'Automated DNC list — zero re-contacts' }
        ],
        quote: {
            text: "Client: MHR",
            author: '',
            role: ''
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
        websiteUrl: '/signup',
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
            { value: '4x', label: 'Content velocity increase', highlight: true },
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
        websiteUrl: '/signup',
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
            { value: '15–30', label: 'Qualified leads found/week', highlight: true },
            { value: '< 5 min', label: 'Alert to response time' },
            { value: '∞', label: 'Subreddits monitored' }
        ],
        quote: {
            text: "Client: Flowjoy",
            author: '',
            role: ''
        },
        tags: ['Reddit', 'Lead Gen', 'AI Agent', 'B2B', 'Monitoring'],
        cta: { label: 'Try Elio for free →', href: '/signup' },
        published: true,
        featured: true,
        publishedAt: '2024-11-01'
    },

    // ─── Verve — Autonomous Account Intelligence ────────────────────
    {
        id: 'verve',
        slug: 'verve-gtm-engine',
        title: 'Verve — Autonomous Account Intelligence at $0.04/Lead',
        client: 'Flowjoy',
        industry: 'B2B GTM / Outbound Engineering',
        accentColor: 'orange',
        coverImage: '/flowjoy/verve-thumbnail.svg',
        websiteUrl: 'https://flowjoy.online',
        techLogos: [
            { src: '/flowjoy/yc.svg', label: 'Y Combinator' },
            { src: '/flowjoy/typesafe-ai-200x200.jfif', label: 'JEV by TypeSafe AI' },
            { src: '/flowjoy/algolia.svg', label: 'Algolia' },
            { src: '/flowjoy/gemini.svg', label: 'Google Gemini' }
        ],
        services: ['Algolia Direct Search ($0.00)', 'JEV ICP Scoring ($0.04)', 'Treg.to Verified Contact Lookup ($0.005)', 'Gemini AI Pitch Generation', 'Zero Browser Waste Architecture'],
        heroImage: '/flowjoy/verve-thumbnail.svg',
        screenshots: [
            {
                src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
                        <defs>
                            <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stop-color="#f6f4ef"/>
                                <stop offset="100%" stop-color="#e7e3dc"/>
                            </linearGradient>
                        </defs>
                        <rect width="1200" height="760" fill="url(#bg)"/>
                        <rect x="50" y="50" width="1100" height="660" rx="34" fill="#f9f7f2" stroke="#d9d3ca"/>
                        <rect x="90" y="94" width="1020" height="58" rx="18" fill="#f1efe8" stroke="#d8d2c6"/>
                        <rect x="120" y="108" width="72" height="30" rx="15" fill="#f3d1a8"/>
                        <text x="138" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#8f4c0b" font-weight="700">YC</text>
                        <rect x="214" y="108" width="120" height="30" rx="15" fill="#f2e7d8"/>
                        <text x="231" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#5b4d42" font-weight="700">JEV</text>
                        <rect x="356" y="108" width="116" height="30" rx="15" fill="#dfeaf7"/>
                        <text x="377" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#1f5fa8" font-weight="700">Algolia</text>
                        <rect x="494" y="108" width="140" height="30" rx="15" fill="#eae3f8"/>
                        <text x="514" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#5a4d8d" font-weight="700">Gemini</text>
                        <rect x="90" y="176" width="310" height="180" rx="22" fill="#f1efe8" stroke="#d8d2c6"/>
                        <text x="118" y="228" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" fill="#24201d" font-weight="700">Verve</text>
                        <text x="118" y="260" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#6a625d" font-weight="600">founder intelligence</text>
                        <rect x="118" y="286" width="220" height="12" rx="6" fill="#d97706" opacity="0.85"/>
                        <rect x="118" y="308" width="170" height="12" rx="6" fill="#d5d0c9"/>
                        <rect x="440" y="176" width="250" height="220" rx="26" fill="#fff" stroke="#e3ddd4"/>
                        <text x="470" y="214" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">live signals</text>
                        <rect x="470" y="236" width="170" height="14" rx="7" fill="#ece5dc"/>
                        <rect x="470" y="236" width="130" height="14" rx="7" fill="#d97706"/>
                        <rect x="470" y="270" width="170" height="14" rx="7" fill="#ece5dc"/>
                        <rect x="470" y="270" width="156" height="14" rx="7" fill="#d7cab8"/>
                        <text x="470" y="324" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#4d4843">intent: 93</text>
                        <text x="470" y="348" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#4d4843">fit: 91/100</text>
                        <rect x="730" y="176" width="350" height="220" rx="26" fill="#fff" stroke="#e3ddd4"/>
                        <text x="760" y="214" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">account score</text>
                        <rect x="760" y="240" width="260" height="18" rx="9" fill="#ece5dc"/>
                        <rect x="760" y="240" width="238" height="18" rx="9" fill="#d97706"/>
                        <rect x="760" y="282" width="260" height="18" rx="9" fill="#ece5dc"/>
                        <rect x="760" y="282" width="214" height="18" rx="9" fill="#c8c0b3"/>
                        <text x="760" y="336" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#4d4843">priority bucket: high fit</text>
                        <rect x="90" y="392" width="990" height="250" rx="30" fill="#f8f5f0" stroke="#d9d3ca"/>
                        <text x="128" y="434" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">score trend</text>
                        <path d="M170 570 C260 430, 350 470, 430 365 S620 250, 700 390 S860 600, 980 380" fill="none" stroke="#d97706" stroke-width="6" stroke-linecap="round"/>
                        <circle cx="170" cy="570" r="12" fill="#d97706"/>
                        <circle cx="430" cy="365" r="12" fill="#d97706"/>
                        <circle cx="700" cy="390" r="12" fill="#d97706"/>
                        <circle cx="980" cy="380" r="12" fill="#d97706"/>
                        <rect x="128" y="454" width="180" height="120" rx="18" fill="#fff" stroke="#d8d0c7"/>
                        <text x="150" y="494" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#5d574f" font-weight="600">signals</text>
                        <text x="150" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" fill="#1d1b1a" font-weight="700">42</text>
                        <text x="150" y="552" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#7a736d">founders</text>
                        <rect x="644" y="454" width="180" height="120" rx="18" fill="#fff" stroke="#d8d0c7"/>
                        <text x="666" y="494" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#5d574f" font-weight="600">score</text>
                        <text x="666" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" fill="#1d1b1a" font-weight="700">91</text>
                        <text x="666" y="552" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#7a736d">ICP fit</text>
                        <text x="930" y="465" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">YC batch scan</text>
                        <text x="930" y="499" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">deep founder intel</text>
                        <text x="930" y="533" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">AI-ready outreach</text>
                    </svg>
                `),
                alt: 'Verve signal pipeline',
                caption: 'Signal pipeline'
            },
            {
                src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
                        <defs>
                            <linearGradient id="bg2" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stop-color="#f6f4ef"/>
                                <stop offset="100%" stop-color="#e7e3dc"/>
                            </linearGradient>
                        </defs>
                        <rect width="1200" height="760" fill="url(#bg2)"/>
                        <rect x="50" y="50" width="1100" height="660" rx="34" fill="#f9f7f2" stroke="#d9d3ca"/>
                        <rect x="90" y="94" width="1020" height="58" rx="18" fill="#f1efe8" stroke="#d8d2c6"/>
                        <rect x="120" y="108" width="110" height="30" rx="15" fill="#f3d1a8"/>
                        <text x="142" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#8f4c0b" font-weight="700">JEV</text>
                        <rect x="250" y="108" width="126" height="30" rx="15" fill="#e8f2fd"/>
                        <text x="267" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#2161a8" font-weight="700">Algolia</text>
                        <rect x="396" y="108" width="130" height="30" rx="15" fill="#ece4fd"/>
                        <text x="420" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#564381" font-weight="700">Gemini</text>
                        <rect x="90" y="176" width="310" height="180" rx="22" fill="#f1efe8" stroke="#d8d2c6"/>
                        <text x="118" y="226" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" fill="#24201d" font-weight="700">JEV ICP score</text>
                        <text x="118" y="258" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#6a625d" font-weight="600">firmographic + intent + authority</text>
                        <rect x="118" y="288" width="220" height="12" rx="6" fill="#b45309" opacity="0.85"/>
                        <rect x="118" y="310" width="180" height="12" rx="6" fill="#d5d0c9"/>
                        <rect x="440" y="176" width="250" height="220" rx="26" fill="#fff" stroke="#e3ddd4"/>
                        <text x="470" y="214" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">priority tags</text>
                        <rect x="470" y="236" width="160" height="30" rx="15" fill="#f5ead8"/>
                        <text x="498" y="256" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#9b5c14" font-weight="700">intent: 93</text>
                        <rect x="470" y="280" width="160" height="30" rx="15" fill="#e8efe9"/>
                        <text x="498" y="300" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#296f49" font-weight="700">fit: 91/100</text>
                        <rect x="470" y="324" width="160" height="30" rx="15" fill="#f0e7e7"/>
                        <text x="500" y="344" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#8b3a3a" font-weight="700">risk: low</text>
                        <rect x="730" y="176" width="350" height="220" rx="26" fill="#fff" stroke="#e3ddd4"/>
                        <text x="760" y="214" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">overall score</text>
                        <rect x="760" y="240" width="260" height="18" rx="9" fill="#ece5dc"/>
                        <rect x="760" y="240" width="228" height="18" rx="9" fill="#b45309"/>
                        <rect x="760" y="282" width="260" height="18" rx="9" fill="#ece5dc"/>
                        <rect x="760" y="282" width="248" height="18" rx="9" fill="#c8c0b3"/>
                        <text x="760" y="336" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#4d4843">priority bucket: high fit</text>
                        <rect x="90" y="392" width="990" height="250" rx="30" fill="#f8f5f0" stroke="#d9d3ca"/>
                        <text x="128" y="434" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">score trend</text>
                        <path d="M170 570 C260 430, 350 470, 430 365 S620 250, 700 390 S860 600, 980 380" fill="none" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
                        <circle cx="170" cy="570" r="12" fill="#b45309"/>
                        <circle cx="430" cy="365" r="12" fill="#b45309"/>
                        <circle cx="700" cy="390" r="12" fill="#b45309"/>
                        <circle cx="980" cy="380" r="12" fill="#b45309"/>
                        <rect x="128" y="454" width="180" height="120" rx="18" fill="#fff" stroke="#d8d0c7"/>
                        <text x="150" y="494" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#5d574f" font-weight="600">fit</text>
                        <text x="150" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" fill="#1d1b1a" font-weight="700">91</text>
                        <text x="150" y="552" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#7a736d">/ 100</text>
                        <rect x="644" y="454" width="180" height="120" rx="18" fill="#fff" stroke="#d8d0c7"/>
                        <text x="666" y="494" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#5d574f" font-weight="600">risk</text>
                        <text x="666" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" fill="#1d1b1a" font-weight="700">low</text>
                        <text x="666" y="552" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#7a736d">gated</text>
                        <text x="930" y="465" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">fit score 91</text>
                        <text x="930" y="499" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">intent + authority</text>
                        <text x="930" y="533" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">risk gate</text>
                    </svg>
                `),
                alt: 'Verve ICP score board',
                caption: 'ICP scoring'
            },
            {
                src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
                        <defs>
                            <linearGradient id="bg3" x1="0" x2="1" y1="0" y2="1">
                                <stop offset="0%" stop-color="#f6f4ef"/>
                                <stop offset="100%" stop-color="#e7e3dc"/>
                            </linearGradient>
                        </defs>
                        <rect width="1200" height="760" fill="url(#bg3)"/>
                        <rect x="50" y="50" width="1100" height="660" rx="34" fill="#f9f7f2" stroke="#d9d3ca"/>
                        <rect x="90" y="94" width="1020" height="58" rx="18" fill="#f1efe8" stroke="#d8d2c6"/>
                        <rect x="120" y="108" width="94" height="30" rx="15" fill="#f3d1a8"/>
                        <text x="142" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#8f4c0b" font-weight="700">YC</text>
                        <rect x="236" y="108" width="120" height="30" rx="15" fill="#ebf1ff"/>
                        <text x="255" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#1f5fa8" font-weight="700">Algolia</text>
                        <rect x="378" y="108" width="138" height="30" rx="15" fill="#eee7ff"/>
                        <text x="403" y="129" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#5d4b91" font-weight="700">Gemini</text>
                        <rect x="90" y="176" width="310" height="180" rx="22" fill="#f1efe8" stroke="#d8d2c6"/>
                        <text x="118" y="226" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" fill="#24201d" font-weight="700">Outbound motion</text>
                        <text x="118" y="258" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" fill="#6a625d" font-weight="600">browser gating + pitch AI</text>
                        <rect x="118" y="288" width="220" height="12" rx="6" fill="#a16207" opacity="0.85"/>
                        <rect x="118" y="310" width="170" height="12" rx="6" fill="#d5d0c9"/>
                        <rect x="440" y="176" width="250" height="220" rx="26" fill="#fff" stroke="#e3ddd4"/>
                        <text x="470" y="214" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">gating logic</text>
                        <rect x="470" y="236" width="160" height="28" rx="14" fill="#fcead6"/>
                        <text x="496" y="255" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#9b5c14" font-weight="700">browser: 82%</text>
                        <rect x="470" y="280" width="160" height="28" rx="14" fill="#e9f2ef"/>
                        <text x="506" y="299" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#2c6d57" font-weight="700">saved</text>
                        <rect x="470" y="324" width="160" height="28" rx="14" fill="#f4ebef"/>
                        <text x="496" y="343" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#8b3a3a" font-weight="700">reply: AI</text>
                        <rect x="730" y="176" width="350" height="220" rx="26" fill="#fff" stroke="#e3ddd4"/>
                        <text x="760" y="214" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">campaign result</text>
                        <rect x="760" y="240" width="260" height="18" rx="9" fill="#ece5dc"/>
                        <rect x="760" y="240" width="196" height="18" rx="9" fill="#a16207"/>
                        <rect x="760" y="282" width="260" height="18" rx="9" fill="#ece5dc"/>
                        <rect x="760" y="282" width="238" height="18" rx="9" fill="#c8c0b3"/>
                        <text x="760" y="336" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#4d4843">reply quality: high</text>
                        <rect x="90" y="392" width="990" height="250" rx="30" fill="#f8f5f0" stroke="#d9d3ca"/>
                        <text x="128" y="434" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#615a52" font-weight="600">pipeline output</text>
                        <path d="M170 570 C260 430, 350 470, 430 365 S620 250, 700 390 S860 600, 980 380" fill="none" stroke="#a16207" stroke-width="6" stroke-linecap="round"/>
                        <circle cx="170" cy="570" r="12" fill="#a16207"/>
                        <circle cx="430" cy="365" r="12" fill="#a16207"/>
                        <circle cx="700" cy="390" r="12" fill="#a16207"/>
                        <circle cx="980" cy="380" r="12" fill="#a16207"/>
                        <rect x="128" y="454" width="180" height="120" rx="18" fill="#fff" stroke="#d8d0c7"/>
                        <text x="150" y="494" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#5d574f" font-weight="600">cost</text>
                        <text x="150" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" fill="#1d1b1a" font-weight="700">82%</text>
                        <text x="150" y="552" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#7a736d">saved</text>
                        <rect x="644" y="454" width="180" height="120" rx="18" fill="#fff" stroke="#d8d0c7"/>
                        <text x="666" y="494" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#5d574f" font-weight="600">reply</text>
                        <text x="666" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" fill="#1d1b1a" font-weight="700">AI</text>
                        <text x="666" y="552" font-family="ui-sans-serif, system-ui, sans-serif" font-size="15" fill="#7a736d">pitch</text>
                        <text x="930" y="465" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">browser gating</text>
                        <text x="930" y="499" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">custom pitch</text>
                        <text x="930" y="533" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" fill="#504a45">demo tracking</text>
                    </svg>
                `),
                alt: 'Verve outbound workflow',
                caption: 'AI outbound motion'
            }
        ],
        shortDescription:
            "How we eliminated $1,200/mo in bloated outbound data subscriptions and manual prospecting by building an automated account intelligence engine that discovers, scores, and verifies early-stage B2B founders for pennies.",
        challenge:
            "B2B sales teams are stuck in a costly dilemma: paying $1,200+ every month for bloated Apollo, ZoomInfo, and Clay seats while reps burn 20+ hours a week manually browsing startup lists, copying LinkedIn profiles, and dealing with 35% bounce rates. Traditional outbound tools charge you upfront for stale database records—forcing companies to pay full price for leads that are out of business, not hiring, or completely outside their ideal customer profile.",
        solution:
            "We engineered an autonomous, 3-tier GTM intelligence pipeline that reverses the outbound cost curve. Instead of paying subscription seats, the system queries live Y Combinator cohorts directly for free ($0.00), evaluates founder hiring bottlenecks and intent signals with JEV for just $0.04 per account, and only calls Treg.to to purchase verified founder emails ($0.005) when an account passes qualification. Unfit leads are discarded instantly with zero enrichment cost.",
        results:
            "Reduced outbound lead acquisition costs by 91% while cutting prospecting cycle time to under 500 milliseconds. A full run of 50 qualified, scored, and verified B2B leads now costs under $0.25 total—delivering direct-to-inbox founder briefs with verified deliverability, zero wasted enrichment credits, and custom-engineered pitch hooks.",
        features: [
            { icon: '', title: 'Zero-Waste Direct Sourcing', desc: 'Queries live startup directories directly in <500ms with $0 browser automation bills.' },
            { icon: '', title: 'JEV ICP Scoring Engine', desc: 'Evaluates technical founder signals and hiring bottlenecks for $0.04 per account.' },
            { icon: '', title: 'Treg.to Verified Contact Lookup', desc: 'Only pays $0.005 for confirmed, deliverable emails—misses cost nothing.' },
            { icon: '', title: 'Outcome-Engineered Pitch Hooks', desc: 'Generates specific value propositions tailored to the founder’s exact team bottleneck.' }
        ],
        metrics: [
            { value: '$0.04', label: 'Average cost per scored lead', highlight: true },
            { value: '91%', label: 'Cost savings vs Apollo & ZoomInfo' },
            { value: '$0.005', label: 'Per verified founder email (misses free)' },
            { value: '<500ms', label: 'Live cohort discovery latency' }
        ],
        quote: {
            text: "We stopped paying $1,200/mo for stale B2B database credits. Verve turns directory signals into qualified founder meetings for pocket change.",
            author: 'Flowjoy Revenue Operations',
            role: 'Internal Production System'
        },
        tags: ['GTM Engineering', 'Account Intelligence', 'JEV AI', 'Treg.to', 'Y Combinator', 'Algolia'],
        cta: { label: 'Build something like this →', href: '/#case-studies' },
        published: true,
        featured: true,
        publishedAt: '2026-09-16'
    }

    // ─── ADD MORE CASE STUDIES BELOW ────────────────────────────────────────
];

export const getFeaturedCaseStudies = () => caseStudies.filter((cs) => cs.featured && cs.published);
export const getPublishedCaseStudies = () => caseStudies.filter((cs) => cs.published);
export const getCaseStudyBySlug = (slug: string) => caseStudies.find((cs) => cs.slug === slug);
