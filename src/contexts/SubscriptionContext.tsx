import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionPlan: string | null;
  subscriptionExpiresAt: string | null;
  canAccessOracle: boolean;
  lastOracleDate: string | null;
  checkSubscription: () => Promise<void>;
  updateLastOracleDate: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user, userProfile } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [subscriptionExpiresAt, setSubscriptionExpiresAt] = useState<string | null>(null);
  const [lastOracleDate, setLastOracleDate] = useState<string | null>(null);

  const checkSubscription = async () => {
    if (!user || !userProfile) return;

    const now = new Date();
    const expiresAt = userProfile.subscription_expires_at ? new Date(userProfile.subscription_expires_at) : null;
    
    const active = userProfile.subscription_active && (!expiresAt || expiresAt > now);
    
    setIsSubscribed(active);
    setSubscriptionPlan(userProfile.subscription_plan);
    setSubscriptionExpiresAt(userProfile.subscription_expires_at);
    setLastOracleDate(userProfile.last_oracle_date);
  };

  const canAccessOracle = () => {
    if (!isSubscribed) return false;
    if (!lastOracleDate) return true;

    const today = new Date().toDateString();
    const lastAccess = new Date(lastOracleDate).toDateString();
    
    return today !== lastAccess;
  };

  const updateLastOracleDate = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ last_oracle_date: new Date().toISOString() })
        .eq('id', user.id);

      if (error) throw error;
      setLastOracleDate(new Date().toISOString());
    } catch (error) {
      console.error('Error updating last oracle date:', error);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user, userProfile]);

  const value = {
    isSubscribed,
    subscriptionPlan,
    subscriptionExpiresAt,
    canAccessOracle: canAccessOracle(),
    lastOracleDate,
    checkSubscription,
    updateLastOracleDate,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}