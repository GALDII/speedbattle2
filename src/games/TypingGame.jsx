import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomWords } from '../data/words';
import styles from './TypingGame.module.css';

export default function TypingGame({ onResult }) {
  const [words]        = useState(() => getRandomWords(10));
  const [wordIndex, setWordIndex]   = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [started, setStarted]       = useState(false);
  const [done, setDone]             = useState(false);
  const [elapsed, setElapsed]       = useState(0);
  const [liveWpm, setLiveWpm]       = useState(0);
  const [liveAcc, setLiveAcc]       = useState(100);

  const startTimeRef = useRef(null);
  const timerRef     = useRef(null);
  const inputRef     = useRef(null);
  const wordIndexRef = useRef(0);
  const errorsRef    = useRef(0);

  const finish = useCallback((finalIndex, finalErrors, finalElapsed) => {
    clearInterval(timerRef.current);
    const secs = finalElapsed / 1000;
    const wpm  = Math.round((finalIndex / Math.max(secs, 0.1)) * 60);
    const acc  = Math.max(0, Math.round(((finalIndex - finalErrors) / Math.max(finalIndex, 1)) * 100));
    onResult({ wpm, acc, time: secs.toFixed(1) });
  }, [onResult]);

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
    if (done) return;
    const val = e.target.value;

    // Auto-start on first keystroke
    if (!started && val.length > 0) {
      setStarted(true);
      startTimeRef.current = performance.now();
      timerRef.current = setInterval(() => {
        const elapsed = Math.round(performance.now() - startTimeRef.current);
        setElapsed(elapsed);
        const secs = elapsed / 1000;
        setLiveWpm(secs > 0 ? Math.round((wordIndexRef.current / secs) * 60) : 0);
      }, 100);
    }

    const isLastWord = wordIndexRef.current === words.length - 1;

    if (val.endsWith(' ') && !isLastWord) {
      // Space advances to next word (not on last word)
      const typed   = val.trim();
      const correct = typed === words[wordIndexRef.current];
      if (!correct) errorsRef.current += 1;
      const newIndex = wordIndexRef.current + 1;
      wordIndexRef.current = newIndex;
      setWordIndex(newIndex);
      setCurrentInput('');
      setLiveAcc(Math.max(0, Math.round(((newIndex - errorsRef.current) / Math.max(newIndex, 1)) * 100)));
    } else if (isLastWord && val === words[wordIndexRef.current]) {
      // Last word: finish immediately when typed correctly (exact match, no trailing space needed)
      const correct = true;
      if (!correct) errorsRef.current += 1;
      const newIndex = wordIndexRef.current + 1;
      wordIndexRef.current = newIndex;
      setWordIndex(newIndex);
      setCurrentInput(val);
      setDone(true);
      const finalElapsed = Math.round(performance.now() - startTimeRef.current);
      finish(newIndex, errorsRef.current, finalElapsed);
    } else {
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
        placeholder={started ? '' : 'Start typing to begin...'}
        disabled={done}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus
      />
    </div>
  );
}