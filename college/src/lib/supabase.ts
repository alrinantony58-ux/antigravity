/**
 * CAMPUSFIND: SUPABASE CLIENT CONFIGURATION
 * Connects to Supabase PostgreSQL & Auth with seamless LocalStorage fallback
 */

const SUPABASE_URL = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || '';
const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Storage Bucket Constants
 */
export const STORAGE_BUCKETS = {
  PUBLIC_ITEMS: 'public_items',     // Public item photographs
  PRIVATE_EVIDENCE: 'private_evidence', // Confidential receipts & proof documents
};

export const getSupabaseConfig = () => ({
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY,
  configured: isSupabaseConfigured,
});

