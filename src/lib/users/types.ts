// lib/users/types.ts

export type SubscriptionTier = 'starter' | 'pro' | null;
export type SubscriptionStatus = 'none' | 'active' | 'cancelled' | 'past_due' | 'trialing' | 'paused' | 'unpaid';
export type BillingPeriod = 'monthly' | 'annual' | null;

export interface SubscriptionFeatures {
  max_projects: number;
  storage_gb: number;
  api_calls_per_month: number;
  support: string;
}

export interface SubscriptionInfo {
  has_subscription: boolean;
  tier: SubscriptionTier;
  billing_period: BillingPeriod;
  status: SubscriptionStatus;
  amount?: number;
  currency?: string;
  current_period_end?: string;
  is_expired?: boolean;
  features: SubscriptionFeatures;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  subscription_status: SubscriptionStatus;
  subscription_info?: SubscriptionInfo;
}

export interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}