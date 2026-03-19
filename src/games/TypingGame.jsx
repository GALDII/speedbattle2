// ─── TypingGame.jsx ───────────────────────────────────────────
// Typing speed test with anti-cheat:
//   - Space-spamming is blocked (empty input = space ignored)
//   - WPM is calculated from CORRECTLY typed characters, not just word count
//   - Accuracy must be >0% for a valid result
//   - Character-level accuracy tracking

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomWords } from '../data/words';
import { useSound } from '../hooks/useSound';
import styles from './TypingGame.module.css';

export default function TypingGame({ onResult }) {
  const [words]       = useState(() => getRandomWords(10));
  const [wordIndex, setWordIndex]   = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [started, setStarted]       = useState(false);
  const [done, setDone]             = useState(false);
  const [elapsed, setElapsed]       = useState(0);
  const [liveWpm, setLiveWpm]       = useState(0);
  const [liveAcc, setLiveAcc]       = useState(100);
  const [wordResults, setWordResults] = useState([]);  // tracks each word: { word, typed, correct }

  const startTimeRef  = useRef(null);
  const timerRef      = useRef(null);
  const inputRef      = useRef(null);
  const wordIndexRef  = useRef(0);
  const totalCharsRef = useRef(0);   // total characters in correct words
  const correctCharsRef = useRef(0); // correctly typed characters
  const wordResultsRef  = useRef([]); // mirror of wordResults for ref access

  const { playClick, playError, playCorrectWord, playWhoosh } = useSound();

  const finish = useCallback((results, finalElapsed) => {
    clearInterval(timerRef.current);
    playWhoosh();

    const secs = finalElapsed / 1000;
    const totalWords = results.length;
    const correctWords = results.filter(r => r.correct).length;

    // Calculate WPM based on correctly typed characters
    // Standard: 1 word = 5 characters (typing test standard)
    const correctCharCount = results
      .filter(r => r.correct)
      .reduce((sum, r) => sum + r.word.length, 0);

    // Net WPM: (correct characters / 5) / time in minutes
    const netWpm = Math.max(0, Math.round((correctCharCount / 5) / Math.max(secs / 60, 0.01)));

    // Accuracy: percentage of words typed correctly
    const acc = Math.max(0, Math.round((correctWords / Math.max(totalWords, 1)) * 100));

    onResult({ wpm: netWpm, acc, time: secs.toFixed(1) });
  }, [onResult, playWhoosh]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const startGame = () => {
    inputRef.current?.focus();
    setStarted(true);
    startTimeRef.current = performance.now();
    timerRef.current = setInterval(() => {
      const e = Math.round(performance.now() - startTimeRef.current);
      setElapsed(e);
      const secs = e / 1000;
      // Live WPM based on correct chars so far
      const liveNetWpm = secs > 0
        ? Math.round((correctCharsRef.current / 5) / (secs / 60))
        : 0;
      setLiveWpm(liveNetWpm);
    }, 100);
  };

  const handleInput = (e) => {
    if (!started || done) return;
    const val  = e.target.value;

    if (val.endsWith(' ')) {
      const typed = val.trim();

      // ═══ ANTI-CHEAT: Block empty space presses ═══
      // User must type at least 1 character before space advances the word
      if (typed.length === 0) {
        // Just clear and ignore — don't advance
        setCurrentInput('');
        return;
      }

      const targetWord = words[wordIndexRef.current];
      const isCorrect = typed === targetWord;

      // Track character accuracy
      totalCharsRef.current += targetWord.length;
      if (isCorrect) {
        correctCharsRef.current += targetWord.length;
        playCorrectWord();
      } else {
        playError();
      }

      const result = { word: targetWord, typed, correct: isCorrect };
      const newResults = [...wordResultsRef.current, result];
      wordResultsRef.current = newResults;
      setWordResults(newResults);

      const newIndex = wordIndexRef.current + 1;
      wordIndexRef.current = newIndex;
      setWordIndex(newIndex);
      setCurrentInput('');

      // Update live accuracy
      const correctCount = newResults.filter(r => r.correct).length;
      setLiveAcc(Math.max(0, Math.round((correctCount / newResults.length) * 100)));

      if (newIndex >= words.length) {
        setDone(true);
        const finalElapsed = Math.round(performance.now() - startTimeRef.current);
        finish(newResults, finalElapsed);
      }
    } else {
      // Character-level feedback
      if (val.length > currentInput.length) {
        const currentWord = words[wordIndexRef.current];
        const isCorrectSoFar = currentWord.startsWith(val);
        if (isCorrectSoFar) {
          playClick();
        } else {
          playError();
        }
      }
      setCurrentInput(val);
    }
  };

  const getWordClass = (i) => {
    if (i < wordIndex) {
      // Show green for correctly typed, red for incorrectly typed
      return wordResults[i]?.correct ? styles.correct : styles.wrong;
    }
    if (i === wordIndex) {
      if (currentInput && !words[i].startsWith(currentInput)) return styles.wrong;
      return styles.current;
    }
    return styles.pending;
  };

  return (
    <div>
      <div className={styles.timerBarWrap}>
        <div
          className={styles.timerBar}
          style={{ width: started ? `${Math.min((wordIndex / words.length) * 100, 100)}%` : '0%' }}
        />
      </div>

      <div className={styles.statsLive}>
        <div className={styles.statLive}>
          <div className={styles.statVal}>{liveWpm}</div>
          <div className={styles.statLbl}>WPM</div>
        </div>
        <div className={styles.statLive}>
          <div className={styles.statVal}>{liveAcc}%</div>
          <div className={styles.statLbl}>Accuracy</div>
        </div>
        <div className={styles.statLive}>
          <div className={styles.statVal}>{(elapsed / 1000).toFixed(1)}s</div>
          <div className={styles.statLbl}>Time</div>
        </div>
      </div>

      <div className={styles.wordDisplay}>
        {words.map((w, i) => (
          <span key={i} className={`${styles.word} ${getWordClass(i)}`}>
            {i === wordIndex && started && currentInput ? (
              <>
                <span className={words[i].startsWith(currentInput) ? styles.typed : styles.typedWrong}>
                  {w.slice(0, currentInput.length)}
                </span>
                <span>{w.slice(currentInput.length)}</span>
              </>
            ) : w}
            {' '}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={currentInput}
        onChange={handleInput}
        onKeyDown={e => e.key === 'Enter' && !started && startGame()}
        placeholder={started ? '' : 'Press Enter or click Start...'}
        disabled={done}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {!started && (
        <button className={styles.startBtn} onClick={startGame}>▶ &nbsp; Start Game</button>
      )}
    </div>
  );
}