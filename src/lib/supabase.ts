import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          subscription_active: boolean;
          subscription_plan: string | null;
          subscription_expires_at: string | null;
          last_oracle_date: string | null;
        };
        Insert: {
          id: string;
          email: string;
          subscription_active?: boolean;
          subscription_plan?: string | null;
          subscription_expires_at?: string | null;
          last_oracle_date?: string | null;
        };
        Update: {
          subscription_active?: boolean;
          subscription_plan?: string | null;
          subscription_expires_at?: string | null;
          last_oracle_date?: string | null;
        };
      };
      cards: {
        Row: {
          id: string;
          name: string;
          image_url: string;
          message: string;
          ritual: string;
          created_at: string;
        };
        Insert: {
          name: string;
          image_url: string;
          message: string;
          ritual: string;
        };
        Update: {
          name?: string;
          image_url?: string;
          message?: string;
          ritual?: string;
        };
      };
      user_cards: {
        Row: {
          id: string;
          user_id: string;
          card_id: string;
          drawn_at: string;
        };
        Insert: {
          user_id: string;
          card_id: string;
        };
        Update: {};
      };
    };
  };
};