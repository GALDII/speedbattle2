// ─── App.jsx ──────────────────────────────────────────────────
// PLACEMENT: src/App.jsx  (REPLACE existing)
// Adds: /challenge/:id route, live player count, myScore state

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header      from './components/Header';
import BottomNav   from './components/BottomNav';
import Toast       from './components/Toast';
import AdSlot      from './components/AdSlot';

import Home            from './pages/Home';
import ReactionPage    from './pages/ReactionPage';
import ReactionResult  from './pages/ReactionResult';
import TypingPage      from './pages/TypingPage';
import TypingResult    from './pages/TypingResult';
import LeaderboardPage from './pages/LeaderboardPage';
import ChallengePage   from './pages/ChallengePage';

import { useLeaderboard }  from './hooks/useLeaderboard';
import { useToast }        from './hooks/useToast';
import { useLivePlayers }  from './hooks/useLivePlayers';

export default function App() {
  const [reactionScore, setReactionScore] = useState(null);
  const [typingResult,  setTypingResult]  = useState(null);
  const [myScore,       setMyScore]       = useState(null); // { game, name, score }

  const { reactionBoard, typingBoard, addScore } = useLeaderboard();
  const { toast, showToast } = useToast();
  const liveCount = useLivePlayers();

  const stats = {
    players:      liveCount ?? '—',
    bestReaction: reactionBoard.length ? reactionBoard[0].score : 176,
    bestWpm:      typingBoard.length   ? typingBoard[0].score   : 134,
    liveCount,
  };

  // Wrap addScore to also record myScore for personal rank display
  const handleAddScore = async (type, name, score, extra) => {
    const pos = await addScore(type, name, score, extra);
    setMyScore({ game: type, name, score });
    return pos;
  };

  return (
    <>
      <Header liveCount={liveCount} />
      <AdSlot size="banner" />

      <Routes>
        <Route path="/" element={<Home stats={stats} />} />

        <Route path="/challenge/:id" element={<ChallengePage />} />

        <Route path="/reaction" element={<ReactionPage onResult={setReactionScore} />} />
        <Route path="/reaction/result" element={
          <ReactionResult score={reactionScore} onSubmit={handleAddScore} showToast={showToast} />
        } />

        <Route path="/typing" element={<TypingPage onResult={setTypingResult} />} />
        <Route path="/typing/result" element={
          <TypingResult result={typingResult} onSubmit={handleAddScore} showToast={showToast} />
        } />

        <Route path="/leaderboard" element={
          <LeaderboardPage reactionBoard={reactionBoard} typingBoard={typingBoard} myScore={myScore} />
        } />
      </Routes>

      <BottomNav />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}