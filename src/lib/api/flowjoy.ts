/**
 * Flowjoy API Client
 * Handles sanitized lead and teardown form submissions to the FastAPI backend.
 */

export interface FlowjoyLeadPayload {
  company_url: string;
  email: string;
  bottleneck?: string;
  name?: string;
  phone?: string;
  source?: string;
  website_hp?: string; // Honeypot field for bot protection
}

export interface FlowjoyLeadResponse {
  id: string;
  company_url: string;
  email: string;
  bottleneck?: string;
  status: string;
  created_at: string;
}

export async function submitFlowjoyLead(
  payload: FlowjoyLeadPayload
): Promise<{ success: boolean; data?: FlowjoyLeadResponse; error?: string }> {
  try {
    // Resolve backend base URL from env with fallback
    const baseUrl =
      (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_FLOWJOY_API_URL) ||
      'https://saas-sms-backend.onrender.com';

    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBaseUrl}/api/v1/flowjoy/leads`;

    // Client-side quick sanitization
    const sanitizedPayload: FlowjoyLeadPayload = {
      company_url: payload.company_url?.trim(),
      email: payload.email?.trim().toLowerCase(),
      bottleneck: payload.bottleneck?.trim() || undefined,
      name: payload.name?.trim() || undefined,
      phone: payload.phone?.trim() || undefined,
      source: payload.source || 'floating_scheduler',
      website_hp: payload.website_hp || undefined
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sanitizedPayload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.detail?.[0]?.msg ||
        errorData?.detail ||
        `Request failed with status ${response.status}`;
      return { success: false, error: errorMessage };
    }

    const data: FlowjoyLeadResponse = await response.json();
    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error occurred. Please try again.'
    };
  }
}

export async function fetchFlowjoyLeads(
  password: string
): Promise<{ success: boolean; data?: FlowjoyLeadResponse[]; error?: string }> {
  try {
    const baseUrl =
      (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_FLOWJOY_API_URL) ||
      'https://saas-sms-backend.onrender.com';

    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBaseUrl}/api/v1/flowjoy/leads`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Dashboard-Password': password.trim(),
        'Authorization': `Bearer ${password.trim()}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, error: 'Incorrect dashboard password.' };
      }
      return { success: false, error: `Failed to fetch submissions (${response.status})` };
    }

    const data: FlowjoyLeadResponse[] = await response.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to connect to backend.' };
  }
}

export async function updateFlowjoyLeadStatus(
  leadId: string,
  status: string,
  password: string
): Promise<{ success: boolean; data?: FlowjoyLeadResponse; error?: string }> {
  try {
    const baseUrl =
      (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_FLOWJOY_API_URL) ||
      'https://saas-sms-backend.onrender.com';

    const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
    const endpoint = `${normalizedBaseUrl}/api/v1/flowjoy/leads/${leadId}`;

    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Dashboard-Password': password.trim(),
        'Authorization': `Bearer ${password.trim()}`
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      return { success: false, error: `Update failed (${response.status})` };
    }

    const data: FlowjoyLeadResponse = await response.json();
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update status.' };
  }
}
