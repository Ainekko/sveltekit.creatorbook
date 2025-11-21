// src/lib/components/elio/api.js
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
  const response = await fetch(`${MAIN_BACKEND_URL}/elio/api/reddit-account/disconnect/`, {
    method: 'POST',
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
    // 🆕 NEW FIELDS
    is_comment: opp.is_comment || false,
    parent_post_title: opp.parent_post_title || '',
    frustration_level: opp.frustration_level || 'neutral',
    match_reasoning: opp.match_reasoning || ''
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
// 🆕 Reddit Posts Management (NEW)
// ============================================================================

export async function fetchRedditPostsFromBackend(projectId, authToken, MAIN_BACKEND_URL) {
  try {
    const response = await fetch(
      `${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/reddit-posts/`,
      { headers: getHeaders(authToken) }
    );
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch Reddit posts from backend:', error);
    throw error;
  }
}

export async function saveRedditPostsToBackend(posts, projectId, authToken, MAIN_BACKEND_URL) {
  try {
    const response = await fetch(
      `${MAIN_BACKEND_URL}/elio/api/projects/${projectId}/reddit-posts/save/`,
      {
        method: 'POST',
        headers: getHeaders(authToken),
        body: JSON.stringify({ posts })
      }
    );
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to save Reddit posts to backend:', error);
    throw error;
  }
}

// ============================================================================
// Worker API (Stateless Processing)
// ============================================================================

/**
 * 🆕 Scan Reddit for opportunities (posts AND comments)
 */
export async function scanOpportunities(
  projectData, 
  config, 
  WORKER_URL, 
  includeComments = true
) {
  const response = await fetch(`${WORKER_URL}/elio/reddit/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      business_name: projectData.business_name,
      business_description: projectData.description,
      subreddits: config.subreddits,
      keywords: config.keywords,
      exclude_keywords: config.exclude_keywords,
      min_relevance: config.min_relevance || 65.0,
      time_window_hours: config.time_window_hours || 24,
      max_per_subreddit: config.max_per_subreddit || 5,
      include_comments: includeComments  // 🆕 NEW
    })
  });

  if (!response.ok) {
    throw new Error('Worker scan failed');
  }

  return await response.json();
}

/**
 * 🆕 Expand content into Reddit-ready posts (NEW ENDPOINT)
 */
export async function expandContentToReddit(
  blogPost,
  projectData,
  targetSubreddits,
  WORKER_URL,
  numVariations = 3
) {
  const response = await fetch(`${WORKER_URL}/elio/reddit/expand`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      business_name: projectData.business_name,
      business_description: projectData.description,
      original_title: blogPost.title,
      original_content: blogPost.content,
      target_subreddits: targetSubreddits,
      num_variations: numVariations
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Content expansion failed: ${errorText}`);
  }

  return await response.json();
}

/**
 * Generate alternative responses for an opportunity
 */
export async function generateAlternatives(
  opportunity,
  numAlternatives,
  WORKER_URL
) {
  const response = await fetch(`${WORKER_URL}/elio/reddit/alternatives`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      post_title: opportunity.title,
      post_content: opportunity.content,
      subreddit: opportunity.subreddit,
      sentiment: opportunity.sentiment,
      original_response: opportunity.suggested_response,
      num_alternatives: numAlternatives || 2
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate alternatives');
  }

  return await response.json();
}

/**
 * Health check for worker
 */
export async function checkWorkerHealth(WORKER_URL) {
  try {
    const response = await fetch(`${WORKER_URL}/elio/health`);
    return await response.json();
  } catch (error) {
    console.error('Worker health check failed:', error);
    return { status: 'unavailable' };
  }
}