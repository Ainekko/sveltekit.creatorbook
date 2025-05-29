export const ssr = false;
// src/routes/+layout.js
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
    posthog.init('phc_JyJ1MIeHjGHDj50rZhIFmLSJlKm9kXjejFtBbKipRk5', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'always',
      capture_pageview: 'history_change',
      autocapture: true,
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
          password: true
        }
      },
      debug: true // Remove in production
    });
  }
  return {};
};