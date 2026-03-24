// ─── App.jsx ──────────────────────────────────────────────────
// Main app with all routes including content pages for AdSense approval
//
// Ad strategy:
//   - Sticky banner lives HERE, outside all routes, fixed above BottomNav
//   - NO banner inside any individual page
//   - Game pages have zero ads inside them
//   - Result/Home/Leaderboard pages each have one non-intrusive block

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header      from './components/Header';
import BottomNav   from './components/BottomNav';
import Footer      from './components/Footer';
import Toast       from './components/Toast';
import AdSlot      from './components/AdSlot';

import Home            from './pages/Home';
import ReactionPage    from './pages/ReactionPage';
import ReactionResult  from './pages/ReactionResult';
import TypingPage      from './pages/TypingPage';
import TypingResult    from './pages/TypingResult';
import LeaderboardPage from './pages/LeaderboardPage';
import ChallengePage   from './pages/ChallengePage';

// Content pages for AdSense approval
import AboutPage    from './pages/AboutPage';
import PrivacyPage  from './pages/PrivacyPage';
import TermsPage    from './pages/TermsPage';
import ContactPage  from './pages/ContactPage';
import BlogList     from './pages/BlogList';
import BlogPost     from './pages/BlogPost';

import { useLeaderboard } from './hooks/useLeaderboard';
import { useToast }       from './hooks/useToast';
import { useLivePlayers } from './hooks/useLivePlayers';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [reactionScore, setReactionScore] = useState(null);
  const [typingResult,  setTypingResult]  = useState(null);
  const [myScore,       setMyScore]       = useState(null);

  const { reactionBoard, typingBoard, addScore } = useLeaderboard();
  const { toast, showToast } = useToast();
  const liveCount = useLivePlayers();

  const stats = {
    players:      liveCount ?? '2.4K',
    bestReaction: reactionBoard.length ? reactionBoard[0].score : 176,
    bestWpm:      typingBoard.length   ? typingBoard[0].score   : 134,
    liveCount,
  };

  const handleAddScore = async (type, name, score, extra) => {
    const pos = await addScore(type, name, score, extra);
    setMyScore({ game: type, name, score });
    return pos;
  };

  return (
    <>
      <ScrollToTop />
      <Header liveCount={liveCount} />

      {/* ── Sticky banner ad — sits above BottomNav on all pages ──
          Passive, never overlaps game content, always in view.
          This is the highest-impression placement on the site.    */}
      <AdSlot size="banner" />

      <Routes>
        <Route path="/"               element={<Home stats={stats} />} />
        <Route path="/challenge/:id"  element={<ChallengePage />} />
        <Route path="/reaction"       element={<ReactionPage onResult={setReactionScore} />} />
        <Route path="/reaction/result" element={
          <ReactionResult score={reactionScore} onSubmit={handleAddScore} showToast={showToast} />
        } />
        <Route path="/typing"         element={<TypingPage onResult={setTypingResult} />} />
        <Route path="/typing/result"  element={
          <TypingResult result={typingResult} onSubmit={handleAddScore} showToast={showToast} />
        } />
        <Route path="/leaderboard"    element={
          <LeaderboardPage reactionBoard={reactionBoard} typingBoard={typingBoard} myScore={myScore} />
        } />

        {/* Content pages — high-quality unique content for AdSense */}
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/privacy"   element={<PrivacyPage />} />
        <Route path="/terms"     element={<TermsPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/blog"      element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>

      <Footer />
      <BottomNav />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}