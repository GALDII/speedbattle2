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

import { useLeaderboard } from './hooks/useLeaderboard';
import { useToast }       from './hooks/useToast';

export default function App() {
  const [reactionScore, setReactionScore] = useState(null);
  const [typingResult,  setTypingResult]  = useState(null);

  const { reactionBoard, typingBoard, addScore } = useLeaderboard();
  const { toast, showToast } = useToast();

  const stats = {
    players:      '2.4K',
    bestReaction: reactionBoard.length ? reactionBoard[0].score : 176,
    bestWpm:      typingBoard.length   ? typingBoard[0].score   : 134,
  };

  return (
    <>
      <Header />
      <AdSlot size="banner" />
      <Routes>
        <Route path="/" element={<Home stats={stats} />} />

        <Route
          path="/reaction"
          element={<ReactionPage onResult={setReactionScore} />}
        />
        <Route
          path="/reaction/result"
          element={
            <ReactionResult
              score={reactionScore}
              onSubmit={addScore}
              showToast={showToast}
            />
          }
        />

        <Route
          path="/typing"
          element={<TypingPage onResult={setTypingResult} />}
        />
        <Route
          path="/typing/result"
          element={
            <TypingResult
              result={typingResult}
              onSubmit={addScore}
              showToast={showToast}
            />
          }
        />

        <Route
          path="/leaderboard"
          element={
            <LeaderboardPage
              reactionBoard={reactionBoard}
              typingBoard={typingBoard}
            />
          }
        />
      </Routes>

      <BottomNav />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}