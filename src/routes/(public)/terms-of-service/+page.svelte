<svelte:head>
	<title>Terms of Service – Flowjoy</title>
	<meta
		name="description"
		content="Read Flowjoy's Terms of Service. These terms govern your use of our custom software, AI automation, and agency services."
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
				Terms of Service
			</h1>
			<p class="text-sm text-zinc-400">
				Last updated: April 10, 2025 &nbsp;·&nbsp; Effective date: April 10, 2025
			</p>
		</div>

		<!-- Body -->
		<div class="text-zinc-600 text-[15px] leading-[1.8] space-y-10">
			<p>
				These Terms of Service ("Agreement") govern your access to and use of the services,
				software, and website provided by <strong class="text-zinc-900">Flowjoy</strong> ("Flowjoy,"
				"we," "our," or "us"), accessible at <strong class="text-zinc-900">flowjoy.online</strong>.
				By using our services — whether as a SaaS subscriber or an agency client — you ("Customer"
				or "you") agree to be bound by this Agreement. If you are acting on behalf of an
				organisation, you represent that you have authority to bind that entity.
			</p>

			<!-- 1 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					1. Our Services
				</h2>
				<h3 class="font-semibold text-zinc-800 mb-2 mt-5">1.1 What We Offer</h3>
				<p>
					Flowjoy provides two types of services: (a) a SaaS platform offering AI-powered tools for
					content creation, SEO, and marketing automation ("Platform"), and (b) custom software and
					AI development engagements, including web apps, automation pipelines, and AI agents
					("Agency Services").
				</p>
				<h3 class="font-semibold text-zinc-800 mb-2 mt-5">1.2 Access & Permitted Use</h3>
				<p>
					Subject to payment of applicable fees, we grant you a limited, non-exclusive,
					non-transferable right to access and use the Platform for your internal business purposes
					during the subscription period. Agency Services deliverables are subject to the terms in
					your individual project agreement or statement of work ("SOW").
				</p>
				<h3 class="font-semibold text-zinc-800 mb-2 mt-5">1.3 Intellectual Property</h3>
				<p>
					Flowjoy retains all rights, title, and interest in the Platform, our proprietary tools,
					templates, and any improvements thereto. For custom Agency Services, upon full payment,
					you own the deliverables as specified in the SOW. We retain the right to use general
					knowledge and techniques learned during your project in future work.
				</p>
			</section>

			<!-- 2 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					2. Your Responsibilities
				</h2>
				<p class="mb-4">By using our services you agree to:</p>
				<ul class="list-none space-y-2 pl-0">
					{#each ['Use the Platform and Agency Services lawfully and in compliance with all applicable laws and regulations.', 'Maintain the confidentiality of your account credentials and notify us immediately of any unauthorised access.', 'Not attempt to reverse-engineer, copy, scrape, resell, or sublicense any part of the Platform.', 'Ensure that anyone using the Platform under your account also complies with this Agreement.', 'Provide accurate information and timely feedback during Agency Service engagements.'] as item}
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
			</section>

			<!-- 3 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					3. Fees & Payment
				</h2>
				<p class="mb-4">
					Platform subscriptions are billed on the cycle stated at checkout (monthly or annual).
					Agency Services are invoiced as agreed in the SOW — typically a deposit upfront and the
					remainder on delivery or at set milestones.
				</p>
				<p class="mb-4">
					All fees are non-refundable unless expressly stated otherwise or required by applicable
					law. We reserve the right to suspend access to the Platform if payment is overdue by more
					than 7 days after written notice.
				</p>
				<p>
					We may update Platform pricing with 30 days' notice. Continued use after the notice period
					constitutes acceptance of the new pricing.
				</p>
			</section>

			<!-- 4 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					4. Confidentiality
				</h2>
				<p>
					Each party agrees to keep the other's confidential information ("Confidential
					Information") private and not to disclose it to third parties without prior written
					consent, except as required by law. Confidential Information does not include information
					already publicly known or independently developed. This obligation survives termination of
					this Agreement for 3 years.
				</p>
			</section>

			<!-- 5 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					5. Data & Privacy
				</h2>
				<p>
					You retain ownership of all data and content you upload to the Platform ("Your Data"). By
					uploading, you grant us a limited licence to process Your Data solely to provide the
					services. We may use aggregated, anonymised usage data to improve our products. For full
					details on how we collect and use personal data, please read our
					<a
						href="/privacy"
						class="text-zinc-900 font-semibold underline underline-offset-4 hover:text-zinc-600 transition-colors"
						>Privacy Policy</a
					>.
				</p>
			</section>

			<!-- 6 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					6. Term & Termination
				</h2>
				<p class="mb-4">
					This Agreement begins when you first use our services and continues until terminated. You
					may cancel a Platform subscription at any time; access continues until the end of the paid
					billing period. For Agency Services, either party may terminate a SOW with 14 days'
					written notice; you will be invoiced for all work completed to that date.
				</p>
				<p>
					We may immediately terminate or suspend your access if you materially breach this
					Agreement and fail to cure the breach within 7 days of notice. Upon termination, your
					right to use the Platform ceases and we may delete Your Data after 30 days, unless legally
					required to retain it.
				</p>
			</section>

			<!-- 7 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					7. Disclaimers
				</h2>
				<p>
					THE PLATFORM AND AGENCY SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DO
					NOT GUARANTEE UNINTERRUPTED, ERROR-FREE OPERATION, NOR ANY SPECIFIC BUSINESS RESULTS FROM
					USING OUR SERVICES. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL IMPLIED
					WARRANTIES, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
				</p>
			</section>

			<!-- 8 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					8. Limitation of Liability
				</h2>
				<p>
					IN NO EVENT SHALL FLOWJOY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
					OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, EVEN IF ADVISED OF THE
					POSSIBILITY OF SUCH DAMAGES. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF
					(A) THE TOTAL FEES PAID BY YOU IN THE 6 MONTHS PRECEDING THE CLAIM, OR (B) £100 GBP.
				</p>
			</section>

			<!-- 9 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					9. Governing Law
				</h2>
				<p>
					This Agreement is governed by the laws of England and Wales. Any disputes shall be subject
					to the exclusive jurisdiction of the courts of England and Wales, unless otherwise
					required by mandatory local law in your jurisdiction.
				</p>
			</section>

			<!-- 10 -->
			<section>
				<h2 class="text-xl font-bold text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
					10. Changes to These Terms
				</h2>
				<p>
					We may update this Agreement from time to time. We will notify you by email or a prominent
					notice on the Platform at least 14 days before material changes take effect. Your
					continued use after that date constitutes acceptance of the updated Agreement.
				</p>
			</section>

			<!-- Contact -->
			<div class="mt-12 pt-8 border-t border-zinc-100 bg-zinc-50 rounded-2xl p-6">
				<h3 class="font-bold text-zinc-900 mb-1">Questions about these terms?</h3>
				<p class="text-sm text-zinc-500 mb-3">We're happy to clarify anything in plain English.</p>
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
