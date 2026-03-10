import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useLeaderboard() {
  const [reactionBoard, setReactionBoard] = useState([]);
  const [typingBoard,   setTypingBoard]   = useState([]);
  const [loading,       setLoading]       = useState(true);

  // Fetch on mount
  useEffect(() => {
    fetchBoards();
  }, []);

  async function fetchBoards() {
    setLoading(true);

    const [{ data: reaction }, { data: typing }] = await Promise.all([
      supabase
        .from('reaction_scores')
        .select('*')
        .order('score', { ascending: true })   // lower ms = better
        .limit(10),

      supabase
        .from('typing_scores')
        .select('*')
        .order('score', { ascending: false })  // higher WPM = better
        .limit(10),
    ]);

    if (reaction) setReactionBoard(reaction);
    if (typing)   setTypingBoard(typing);
    setLoading(false);
  }

  const addScore = useCallback(async (type, name, score, extra = {}) => {
    const table = type === 'reaction' ? 'reaction_scores' : 'typing_scores';

    const { data, error } = await supabase
      .from(table)
      .insert([{ name, score, ...extra }])
      .select()
      .single();

    if (error) { console.error(error); return -1; }

    // Refresh boards after insert
    await fetchBoards();

    // Return position on leaderboard
    const board = type === 'reaction' ? reactionBoard : typingBoard;
    const sorted = [...board, data].sort((a, b) =>
      type === 'reaction' ? a.score - b.score : b.score - a.score
    );
    return sorted.findIndex(e => e.id === data.id);
  }, [reactionBoard, typingBoard]);

  return { reactionBoard, typingBoard, loading, addScore };
}