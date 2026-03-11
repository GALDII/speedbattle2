// ─── TypingGame.jsx ───────────────────────────────────────────
// PLACEMENT: src/games/TypingGame.jsx  (REPLACE existing)
// Adds: sound effects on correct/wrong letter, word complete, game end

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

  const startTimeRef  = useRef(null);
  const timerRef      = useRef(null);
  const inputRef      = useRef(null);
  const wordIndexRef  = useRef(0);
  const errorsRef     = useRef(0);
  const prevInputRef  = useRef('');

  const { playClick, playError, playCorrectWord, playWhoosh } = useSound();

  const finish = useCallback((finalIndex, finalErrors, finalElapsed) => {
    clearInterval(timerRef.current);
    playWhoosh();
    const secs = finalElapsed / 1000;
    const wpm  = Math.round((finalIndex / Math.max(secs, 0.1)) * 60);
    const acc  = Math.max(0, Math.round(((finalIndex - finalErrors) / Math.max(finalIndex, 1)) * 100));
    onResult({ wpm, acc, time: secs.toFixed(1) });
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
      setLiveWpm(secs > 0 ? Math.round((wordIndexRef.current / secs) * 60) : 0);
    }, 100);
  };

  const handleInput = (e) => {
    if (!started || done) return;
    const val  = e.target.value;
    const prev = prevInputRef.current;
    prevInputRef.current = val;

    if (val.endsWith(' ')) {
      const typed   = val.trim();
      const correct = typed === words[wordIndexRef.current];
      if (!correct) errorsRef.current += 1;

      playCorrectWord();

      const newIndex = wordIndexRef.current + 1;
      wordIndexRef.current = newIndex;
      setWordIndex(newIndex);
      setCurrentInput('');
      prevInputRef.current = '';
      setLiveAcc(Math.max(0, Math.round(((newIndex - errorsRef.current) / Math.max(newIndex, 1)) * 100)));

      if (newIndex >= words.length) {
        setDone(true);
        const finalElapsed = Math.round(performance.now() - startTimeRef.current);
        finish(newIndex, errorsRef.current, finalElapsed);
      }
    } else {
      // Sound on each new character typed
      if (val.length > prev.length) {
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
    if (i < wordIndex) return styles.correct;
    if (i === wordIndex) {
      if (currentInput && !words[i].startsWith(currentInput)) return styles.wrong;
      return styles.current;
    }
    return styles.pending;
  };

  return (
    <div>
      <div className={styles.timerBarWrap}>
        <div className={styles.timerBar} style={{ width: started ? '100%' : '100%' }} />
      </div>

      <div className={styles.statsLive}>
        <div className={styles.statLive}><div className={styles.statVal}>{liveWpm}</div><div className={styles.statLbl}>WPM</div></div>
        <div className={styles.statLive}><div className={styles.statVal}>{liveAcc}%</div><div className={styles.statLbl}>Accuracy</div></div>
        <div className={styles.statLive}><div className={styles.statVal}>{(elapsed / 1000).toFixed(1)}s</div><div className={styles.statLbl}>Time</div></div>
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