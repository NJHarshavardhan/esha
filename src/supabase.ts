import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Review = {
  id: string;
  name: string;
  review: string;
  rating: number;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  title: string;
  created_at: string;
};

export type Quote = {
  id: string;
  text: string;
  author: string;
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  created_at: string;
};