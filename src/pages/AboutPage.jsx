// ─── AboutPage.jsx ────────────────────────────────────────────
// Comprehensive about page with mission, features, and FAQ

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContentPage.module.css';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>← Home</button>

      <div className={styles.hero}>
        <span className={styles.heroIcon}>⚡</span>
        <h1 className={styles.heroTitle}>About SpeedBattle</h1>
        <p className={styles.heroSub}>
          The ultimate platform for testing and improving your reaction speed and typing abilities.
        </p>
      </div>

      <article className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.h2}>Our Mission</h2>
          <p className={styles.p}>
            SpeedBattle was created with a simple but powerful goal: to help people measure, track, and improve their cognitive and motor skills through engaging, scientifically-informed games. Whether you're a competitive gamer looking to gain an edge, a professional wanting to boost typing productivity, or simply curious about your reflexes — SpeedBattle provides the tools you need.
          </p>
          <p className={styles.p}>
            We believe that human performance is trainable. With consistent practice and the right feedback, anyone can significantly improve their reaction time and typing speed. Our platform provides immediate, accurate feedback so you can see your progress in real time.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>What We Offer</h2>

          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚡</span>
              <h3 className={styles.featureTitle}>Reaction Speed Test</h3>
              <p className={styles.featureDesc}>
                Measure your visual reaction time with millisecond precision. Our test uses a randomized delay to prevent anticipation, ensuring you get an accurate measurement of your true reflexes. Take multiple attempts and see your best, average, and consistency metrics.
              </p>
            </div>

            <div className={styles.feature}>
              <span className={styles.featureIcon}>⌨️</span>
              <h3 className={styles.featureTitle}>Typing Speed Test</h3>
              <p className={styles.featureDesc}>
                Test your typing speed with a curated set of common English words. Our test measures both your raw WPM (Words Per Minute) and accuracy, calculating a Net WPM score that reflects your real-world typing ability. Real-time character-level feedback and anti-cheat measures ensure fair, accurate results.
              </p>
            </div>

            <div className={styles.feature}>
              <span className={styles.featureIcon}>🏆</span>
              <h3 className={styles.featureTitle}>Global Leaderboard</h3>
              <p className={styles.featureDesc}>
                Compare your scores against players from around the world. Our leaderboard shows all-time best scores and today's top performers, giving you both long-term goals and daily competition.
              </p>
            </div>

            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚔️</span>
              <h3 className={styles.featureTitle}>Challenge Friends</h3>
              <p className={styles.featureDesc}>
                Share your scores directly with friends and challenge them to beat your result. Generate shareable links that show your score, rank, and title — perfect for friendly competition on social media.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>How Our Tests Work</h2>
          <p className={styles.p}>
            <strong>Reaction Speed Test:</strong> When you start the test, the screen shows a red "Wait" state. After a random delay (2-5 seconds), the screen turns green. You tap as fast as possible. The time between the green flash and your tap is your reaction time in milliseconds. You can take multiple attempts — we track your best score for the leaderboard.
          </p>
          <p className={styles.p}>
            <strong>Typing Speed Test:</strong> You're presented with 10 randomly selected words. Type each word and press space to advance to the next. Your WPM is calculated using the standard formula: (correctly typed characters / 5) / time in minutes. Accuracy is tracked word-by-word, and our anti-cheat system prevents empty space-bar presses from advancing through words.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Our Ranking System</h2>
          <p className={styles.p}>
            SpeedBattle features a unique ranking system that assigns fun, descriptive titles based on your performance. For reaction tests, titles range from "Grandma Reflexes" for slower times to "Cyborg" for sub-150ms reactions. For typing, you'll earn titles from "Two-Finger Typist" up to "Keyboard Hacker" for blazing fast speeds with high accuracy.
          </p>
          <p className={styles.p}>
            We also show your percentile — how you compare against all players who have taken the test. This gives you a realistic picture of where you stand and motivates continued improvement.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Frequently Asked Questions</h2>

          <div className={styles.faq}>
            <h3 className={styles.faqQ}>Is SpeedBattle free to use?</h3>
            <p className={styles.faqA}>Yes! SpeedBattle is completely free. We're supported by ads to keep the platform running and accessible to everyone.</p>
          </div>

          <div className={styles.faq}>
            <h3 className={styles.faqQ}>Do I need to create an account?</h3>
            <p className={styles.faqA}>No account is required to play the games. To submit scores to the leaderboard, you just need to enter a display name — no email or registration needed.</p>
          </div>

          <div className={styles.faq}>
            <h3 className={styles.faqQ}>How accurate are the reaction time measurements?</h3>
            <p className={styles.faqA}>Our tests use the browser's high-resolution performance timer (performance.now()), which provides sub-millisecond precision. While no browser-based test can match laboratory equipment, our measurements are accurate enough for comparison and tracking improvement.</p>
          </div>

          <div className={styles.faq}>
            <h3 className={styles.faqQ}>Can I use SpeedBattle on mobile?</h3>
            <p className={styles.faqA}>Absolutely! SpeedBattle is designed mobile-first. The reaction test works great with touch input, and the typing test is optimized for mobile keyboards as well as desktop keyboards.</p>
          </div>

          <div className={styles.faq}>
            <h3 className={styles.faqQ}>How do you prevent cheating?</h3>
            <p className={styles.faqA}>Our typing test includes anti-cheat measures like blocking empty space-bar presses and calculating WPM based on correctly typed characters only. For the reaction test, the random delay prevents anticipation-based cheating.</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Technology Stack</h2>
          <p className={styles.p}>
            SpeedBattle is built with modern web technologies for the best possible performance and user experience. We use React for the frontend, Supabase for real-time leaderboard data, and Vercel for global CDN hosting. The entire application is optimized for mobile devices with responsive design and touch-optimized interactions.
          </p>
        </section>
      </article>
    </div>
  );
}
