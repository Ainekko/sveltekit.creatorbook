<script lang="ts">
	interface DataItem {
		title: string;
		detail: string;
	}
	interface LegalBasis {
		basis: string;
		detail: string;
	}
	interface CookieItem {
		name: string;
		detail: string;
	}

	const dataItems: DataItem[] = [
		{
			title: 'Account & Contact Information',
			detail:
				'Name, email address, company name, and any information you voluntarily submit via our contact form, intake forms, or at account creation.'
		},
		{
			title: 'Usage & Technical Data',
			detail:
				'IP address, browser type, operating system, pages visited, time on page, and other analytics data collected via cookies or similar technologies.'
		},
		{
			title: 'Communications',
			detail:
				'Emails, messages, or project briefs you send us as part of an agency engagement or support request.'
		},
		{
			title: 'Payment Information',
			detail:
				'We do not store payment card details ourselves. Payments are processed by a third-party provider (e.g. Stripe) and subject to their privacy policy.'
		},
		{
			title: 'Content You Upload',
			detail:
				'Any data, files, or content you upload to the Platform while using our SaaS features.'
		}
	];

	const usageItems: string[] = [
		'Provide, operate, and maintain our Platform and Agency Services.',
		'Respond to enquiries, contact form submissions, and support requests.',
		'Process invoices and payments for services rendered.',
		'Send transactional emails (e.g. onboarding, invoices, project updates).',
		'Improve and personalise our website and Platform through aggregated analytics.',
		'Comply with legal obligations and enforce our Terms of Service.'
	];

	const legalBases: LegalBasis[] = [
		{
			basis: 'Contract',
			detail:
				"Processing is necessary to perform a contract with you (e.g. delivering services you've paid for)."
		},
		{
			basis: 'Legitimate Interests',
			detail:
				'We have a legitimate interest in operating and improving our business, provided your rights are not overridden.'
		},
		{
			basis: 'Legal Obligation',
			detail: 'We may need to process data to comply with applicable laws (e.g. tax records).'
		},
		{
			basis: 'Consent',
			detail:
				'Where we rely on your consent (e.g. marketing emails), you may withdraw it at any time.'
		}
	];

	const cookieItems: CookieItem[] = [
		{
			name: 'Strictly necessary',
			detail: 'Required for the Platform to function (e.g. session authentication).'
		},
		{
			name: 'Analytics',
			detail:
				'Help us understand usage patterns so we can improve the product (e.g. page views, traffic sources).'
		}
	];

	const thirdParties: string[] = [
		'Stripe – Payment processing',
		'Google – Authentication and analytics',
		'Cal.com – Meeting scheduling',
		'Amazon Web Services / Vercel – Hosting and infrastructure'
	];

	const rights: string[] = [
		'Access the personal data we hold about you.',
		'Correct inaccurate or incomplete data.',
		'Request deletion of your personal data (right to erasure).',
		'Object to or restrict certain types of processing.',
		'Data portability — receive your data in a structured, machine-readable format.',
		'Withdraw consent where processing is based on consent.',
		'Lodge a complaint with a supervisory authority (in the UK: the ICO at ico.org.uk).'
	];
</script>

<svelte:head>
	<title>Privacy Policy – Flowjoy</title>
	<meta
		name="description"
		content="Read Flowjoy's Privacy Policy. Learn how we collect, use, and protect your personal data."
	/>
</svelte:head>

<div class="relative font-[Poppins] bg-white min-h-screen">
	<!-- Subtle dot grid -->
	<div
		class="absolute inset-0 pointer-events-none opacity-20"
		style="background-image: radial-gradient(circle, #d4d4d8 1px, transparent 1px); background-size: 28px 28px;"
	></div>

	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
		<!-- Header -->
		<div class="mb-12 pb-8 border-b border-zinc-100">
			<a
				href="/"
				class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-zinc-700 transition-colors mb-8 group"
			>
				<svg
					class="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back to Flowjoy
			</a>
			<div
				class="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200 text-zinc-500 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"
			>
				Legal
			</div>
			<h1 class="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-3">
				Privacy Policy
			</h1>
			<p class="text-sm text-zinc-400">
				Last updated: April 10, 2025 &nbsp;·&nbsp; Effective date: April 10, 2025
			</p>
		</div>

		<!-- Body -->
		<div class="text-zinc-600 text-[15px] leading-[1.8] space-y-10">
			<p>
				Flowjoy ("we," "our," or "us") is committed to protecting your personal information. This
				Privacy Policy explains what data we collect, how we use it, and your rights relating to
				that data when you visit <strong class="text-zinc-900">flowjoy.online</strong> or use our
				SaaS platform and agency services. If you have questions, email us at
				<a
					href="mailto:hello@flowjoy.online"
					class="text-zinc-900 font-semibold underline underline-offset-4 hover:text-zinc-600 transition-colors"
					>hello@flowjoy.online</a
				>.
			</p>

			<!-- 1 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					1. Who We Are
				</h2>
				<p>
					Flowjoy is a software agency and SaaS provider. For the purposes of data protection law,
					Flowjoy is the data controller responsible for your personal data collected through our
					website and services.
				</p>
			</section>

			<!-- 2 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					2. Data We Collect
				</h2>
				<p class="mb-5">We collect the following categories of data:</p>
				<div class="space-y-4">
					{#each dataItems as item}
						<div class="flex gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
							<div class="w-2 h-2 bg-zinc-300 rounded-full flex-shrink-0 mt-2"></div>
							<div>
								<p class="font-semibold text-zinc-900 mb-1">{item.title}</p>
								<p class="text-sm">{item.detail}</p>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- 3 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					3. How We Use Your Data
				</h2>
				<p class="mb-4">We use your data to:</p>
				<ul class="list-none space-y-2">
					{#each usageItems as item}
						<li class="flex items-start gap-3">
							<div
								class="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 mt-0.5"
							>
								<svg class="w-3 h-3 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							{item}
						</li>
					{/each}
				</ul>
				<p class="mt-4">
					We do <strong class="text-zinc-900">not</strong> sell your personal data to third parties,
					use it for unsolicited advertising, or share it beyond what is necessary to deliver our services.
				</p>
			</section>

			<!-- 4 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					4. Legal Basis for Processing
				</h2>
				<p class="mb-4">
					We process your data under one or more of the following legal bases under UK/EU GDPR:
				</p>
				<ul class="list-none space-y-2">
					{#each legalBases as item}
						<li class="flex items-start gap-3">
							<div
								class="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 mt-0.5"
							>
								<div class="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
							</div>
							<span><strong class="text-zinc-800">{item.basis}:</strong> {item.detail}</span>
						</li>
					{/each}
				</ul>
			</section>

			<!-- 5 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					5. Cookies
				</h2>
				<p class="mb-4">
					We use cookies and similar tracking technologies to understand how visitors interact with
					our website and to keep you logged in on the Platform. Types of cookies we use:
				</p>
				<ul class="list-none space-y-2">
					{#each cookieItems as c}
						<li class="flex items-start gap-3">
							<div
								class="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 mt-0.5"
							>
								<div class="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
							</div>
							<span><strong class="text-zinc-800">{c.name}:</strong> {c.detail}</span>
						</li>
					{/each}
				</ul>
				<p class="mt-4">You can control cookies via your browser settings at any time.</p>
			</section>

			<!-- 6 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					6. Third-Party Services
				</h2>
				<p class="mb-4">
					We use trusted third-party services to help operate our business. These providers act as
					data processors under our instruction and are contractually bound to protect your data:
				</p>
				<ul class="list-none space-y-2">
					{#each thirdParties as item}
						<li class="flex items-start gap-3">
							<div
								class="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 mt-0.5"
							>
								<div class="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
							</div>
							{item}
						</li>
					{/each}
				</ul>
			</section>

			<!-- 7 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					7. Data Retention
				</h2>
				<p>
					We retain personal data only as long as necessary for the purpose it was collected, or as
					required by law. Account data is retained for the duration of your subscription plus up to
					2 years after termination. You may request deletion of your data at any time (see Section
					8). Anonymised analytics data may be retained indefinitely.
				</p>
			</section>

			<!-- 8 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					8. Your Rights
				</h2>
				<p class="mb-4">Under UK/EU GDPR and similar laws, you have the right to:</p>
				<ul class="list-none space-y-2">
					{#each rights as item}
						<li class="flex items-start gap-3">
							<div
								class="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 mt-0.5"
							>
								<svg class="w-3 h-3 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							{item}
						</li>
					{/each}
				</ul>
				<p class="mt-4">
					To exercise any right, email us at
					<a
						href="mailto:hello@flowjoy.online"
						class="text-zinc-900 font-semibold underline underline-offset-4 hover:text-zinc-600 transition-colors"
						>hello@flowjoy.online</a
					>. We will respond within 30 days.
				</p>
			</section>

			<!-- 9 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					9. Security
				</h2>
				<p>
					We implement appropriate technical and organisational measures to protect your data
					against unauthorised access, alteration, disclosure, or destruction. However, no internet
					transmission is 100% secure. We recommend keeping your account credentials confidential
					and notifying us promptly of any suspected breach.
				</p>
			</section>

			<!-- 10 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					10. Children's Privacy
				</h2>
				<p>
					Our services are not directed at children under 16. We do not knowingly collect personal
					data from anyone under 16. If you believe a child has provided us data, please contact us
					and we will delete it promptly.
				</p>
			</section>

			<!-- 11 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					11. Changes to This Policy
				</h2>
				<p>
					We may update this Privacy Policy periodically. We will post the revised policy on this
					page with an updated date and, where changes are material, notify you by email. Continued
					use of our services after the effective date constitutes acceptance of the updated policy.
				</p>
			</section>

			<!-- Contact -->
			<div class="mt-12 pt-8 border-t border-zinc-100 bg-zinc-50 rounded-2xl p-6">
				<h3 class="font-bold text-zinc-900 mb-1">Questions or requests?</h3>
				<p class="text-sm text-zinc-500 mb-3">
					Get in touch — we're real humans who will actually reply.
				</p>
				<a
					href="mailto:hello@flowjoy.online"
					class="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					hello@flowjoy.online
				</a>
			</div>
		</div>
	</div>
</div>
