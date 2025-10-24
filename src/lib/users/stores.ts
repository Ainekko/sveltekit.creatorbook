// lib/users/store.ts
import { writable, derived, get } from 'svelte/store';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { API_BASE_URL } from '$lib/config';
import type { User, UserState, SubscriptionInfo, SubscriptionTier } from './types';

// Create the main user store
function createUserStore() {
  const initialState: UserState = {
    user: null,
    token: browser ? localStorage.getItem('token') : null,
    isLoading: false,
    isAuthenticated: false
  };

  const { subscribe, set, update } = writable<UserState>(initialState);

  return {
    subscribe,
    
    // Initialize user on app load
    async init() {
      const token = browser ? localStorage.getItem('token') : null;
      if (!token) {
        this.clear();
        return;
      }

      update(state => ({ ...state, isLoading: true }));

      try {
        const isValid = await checkToken(token);
        if (isValid) {
          const userData = await fetchUser(token);
          if (userData) {
            const subscriptionInfo = await fetchSubscriptionInfo(token);
            this.setUser(userData, token, subscriptionInfo);
          } else {
            this.clear();
          }
        } else {
          this.clear();
        }
      } catch (error) {
        console.error('Failed to initialize user:', error);
        this.clear();
      } finally {
        update(state => ({ ...state, isLoading: false }));
      }
    },

    // Set user data
    setUser(user: User, token: string, subscriptionInfo?: SubscriptionInfo) {
      if (browser) {
        localStorage.setItem('token', token);
      }
      set({
        user: { ...user, subscription_info: subscriptionInfo },
        token,
        isLoading: false,
        isAuthenticated: true
      });
    },

    // Update user data
    async refresh() {
      const state = get(userStore);
      if (!state.token) return;

      try {
        const userData = await fetchUser(state.token);
        const subscriptionInfo = await fetchSubscriptionInfo(state.token);
        
        if (userData) {
          update(s => ({
            ...s,
            user: { ...userData, subscription_info: subscriptionInfo }
          }));
        }
      } catch (error) {
        console.error('Failed to refresh user:', error);
      }
    },

    // Clear user data and logout
    clear() {
      if (browser) {
        localStorage.removeItem('token');
      }
      set({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false
      });
    },

    // Logout
    async logout() {
      const state = get(userStore);
      if (state.token) {
        try {
          await fetch(`${API_BASE_URL}/users/logout/`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${state.token}`,
            },
          });
        } catch (error) {
          console.error('Logout request failed:', error);
        }
      }
      this.clear();
      goto('/');
    }
  };
}

// Helper functions
async function checkToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/check/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Token check failed:', error);
    return false;
  }
}

async function fetchUser(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/get_user/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

async function fetchSubscriptionInfo(token: string): Promise<SubscriptionInfo | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/creem/subscription-info/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
    return undefined;
  } catch (error) {
    console.error('Failed to fetch subscription info:', error);
    return undefined;
  }
}

// Create the store instance
export const userStore = createUserStore();

// Derived stores for easy access
export const user = derived(userStore, $store => $store.user);
export const isAuthenticated = derived(userStore, $store => $store.isAuthenticated);
export const isLoading = derived(userStore, $store => $store.isLoading);

// Subscription-related derived stores
export const hasActiveSubscription = derived(
  userStore,
  $store => $store.user?.subscription_info?.has_subscription && 
           $store.user?.subscription_info?.status === 'active'
);

export const subscriptionTier = derived(
  userStore,
  $store => $store.user?.subscription_info?.tier || null
);

export const subscriptionFeatures = derived(
  userStore,
  $store => $store.user?.subscription_info?.features || {
    max_projects: 1,
    storage_gb: 1,
    api_calls_per_month: 100,
    support: 'community'
  }
);

// Helper functions for components
export function hasSubscriptionTier(tier: SubscriptionTier): boolean {
  const state = get(userStore);
  return state.user?.subscription_info?.tier === tier;
}

export function canAccessFeature(featureName: string, requiredValue?: number | string): boolean {
  const state = get(userStore);
  const features = state.user?.subscription_info?.features;
  
  if (!features || !(featureName in features)) {
    return false;
  }

  if (requiredValue === undefined) {
    return true;
  }

  const featureValue = features[featureName as keyof typeof features];

  if (typeof featureValue === 'number' && typeof requiredValue === 'number') {
    return featureValue >= requiredValue;
  }

  return featureValue === requiredValue;
}

export function isSubscriptionExpired(): boolean {
  const state = get(userStore);
  return state.user?.subscription_info?.is_expired || false;
}