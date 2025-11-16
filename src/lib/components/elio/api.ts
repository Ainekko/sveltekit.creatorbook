// API client for Elio endpoints using DRF Router structure

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }
  return await response.json();
};

const getHeaders = (authToken) => ({
  'Authorization': `Token ${authToken}`,
  'Content-Type': 'application/json'
});

// ============================================================================
// Reddit Account Management
// ============================================================================

export async function checkRedditConnection(authToken, MAIN_BACKEND_URL) {
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/reddit-account/`, {
    headers: getHeaders(authToken)
  });
  
  const data = await handleResponse(response);
  return { 
    connected: data.connected, 
    username: data.username || null,
    scopes: data.scopes || []
  };
}

export async function connectReddit(projectId, authToken, MAIN_BACKEND_URL) {
  const url = `${MAIN_BACKEND_URL}/elio/api/reddit-account/initiate/?project_id=${projectId}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(authToken),
    credentials: 'include'
  });
  
  return await handleResponse(response);
}

export async function disconnectReddit(authToken, MAIN_BACKEND_URL) {
  // Don't hardcode ID - the backend should handle deletion based on the authenticated user
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/reddit-account/disconnect/`, {
    method: 'POST',  // Change to POST with custom action
    headers: getHeaders(authToken)
  });
  
  return await handleResponse(response);
}

export async function refreshRedditToken(authToken, MAIN_BACKEND_URL) {
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/reddit-account/refresh/`, {
    method: 'POST',
    headers: getHeaders(authToken)
  });
  
  return await handleResponse(response);
}

// ============================================================================
// Project Data & Configuration
// ============================================================================

export async function fetchProjectData(projectId, authToken, MAIN_BACKEND_URL) {
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/`, {
    headers: getHeaders(authToken)
  });
  
  const data = await handleResponse(response);
  return { 
    project: data.project, 
    config: data.config,
    reddit_account: data.reddit_account
  };
}

export async function saveConfig(projectId, config, authToken, MAIN_BACKEND_URL) {
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/config/`, {
    method: 'POST',
    headers: getHeaders(authToken),
    credentials: 'include',
    body: JSON.stringify(config)
  });
  
  return await handleResponse(response);
}

// ============================================================================
// Profile & Analytics
// ============================================================================

export async function fetchProfile(projectId, authToken, MAIN_BACKEND_URL) {
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/profile/`, {
    headers: getHeaders(authToken)
  });
  
  return await handleResponse(response);
}

// ============================================================================
// Opportunities
// ============================================================================

export async function fetchOpportunitiesFromBackend(projectId, authToken, MAIN_BACKEND_URL) {
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/`, {
    headers: getHeaders(authToken)
  });
  
  return await handleResponse(response);
}

export async function saveOpportunitiesToBackend(opps, projectId, authToken, MAIN_BACKEND_URL) {
  const backendOpportunities = opps.map(opp => ({
    post_id: opp.post_id,
    subreddit: opp.subreddit,
    title: opp.title,
    content: opp.content || '',
    author: opp.author,
    url: opp.url,
    score: opp.score,
    num_comments: opp.num_comments,
    created_utc: opp.created_utc,
    relevance_score: opp.relevance_score,
    opportunity_type: opp.opportunity_type,
    sentiment: opp.sentiment,
    key_points: opp.key_points || [],
    suggested_response: opp.suggested_response,
  }));

  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/save/`, {
    method: 'POST',
    headers: getHeaders(authToken),
    body: JSON.stringify({ opportunities: backendOpportunities })
  });

  return await handleResponse(response);
}

export async function updateOpportunity(projectId, opportunityId, updates, authToken, MAIN_BACKEND_URL) {
  const response = await fetch(
    `${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/opportunities/${opportunityId}/`,
    {
      method: 'PATCH',
      headers: getHeaders(authToken),
      credentials: 'include',
      body: JSON.stringify(updates)
    }
  );

  return await handleResponse(response);
}

// ============================================================================
// Worker API (unchanged)
// ============================================================================

export async function scanOpportunities(projectData, config, WORKER_URL) {
  const response = await fetch(`${WORKER_URL}/elio/reddit/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      business_name: projectData.business_name,
      business_description: projectData.description,
      subreddits: config.subreddits,
      keywords: config.keywords,
      exclude_keywords: config.exclude_keywords,
      min_relevance: config.min_relevance,
      time_window_hours: config.time_window_hours,
      max_per_subreddit: config.max_per_subreddit,
    })
  });

  if (!response.ok) {
    throw new Error('Worker scan failed');
  }

  return await response.json();
}