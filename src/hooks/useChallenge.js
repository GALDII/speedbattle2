// ─── useChallenge.js ──────────────────────────────────────────
// PLACEMENT: src/hooks/useChallenge.js  (NEW FILE)
// Creates and reads challenge links.
// Challenge URL format: /challenge/{id}
// Supabase table needed:
//   CREATE TABLE challenges (
//     id TEXT PRIMARY KEY,
//     challenger_name TEXT,
//     game_type TEXT,   -- 'reaction' | 'typing'
//     score INTEGER,
//     acc INTEGER,
//     rank_label TEXT,
//     rank_emoji TEXT,
//     created_at TIMESTAMPTZ DEFAULT now()
//   );

import { useCallback } from 'react';
import { supabase } from '../lib/supabase';

function generateId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function useChallenge() {

  // Called from ScoreModal after user enters name
  const createChallenge = useCallback(async ({ name, gameType, score, acc, rank }) => {
    const id = generateId();
    try {
      const { error } = await supabase.from('challenges').insert([{
        id,
        challenger_name: name,
        game_type: gameType,
        score,
        acc: acc ?? null,
        rank_label: rank?.label ?? '',
        rank_emoji: rank?.emoji ?? '',
      }]);
      if (error) throw error;
      return `${window.location.origin}/challenge/${id}`;
    } catch (e) {
      console.warn('Challenge creation failed:', e);
      // Fallback: encode data in URL directly (no DB needed)
      const params = new URLSearchParams({ n: name, g: gameType, s: score, r: rank?.label ?? '' });
      return `${window.location.origin}/challenge/${id}?${params}`;
    }
  }, []);

  // Called on /challenge/:id page load
  const fetchChallenge = useCallback(async (id) => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) return null;
      return data;
    } catch (e) {
      return null;
    }
  }, []);

  return { createChallenge, fetchChallenge };
}