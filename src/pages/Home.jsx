// ─── Home.jsx ─────────────────────────────────────────────────
// Enhanced home page with rich text content for AdSense approval
// Ad placement: ONE 'between' block after the game cards — natural break.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdSlot from '../components/AdSlot';
import { BLOG_POSTS } from '../data/blogData';
import styles from './Home.module.css';

const GAME_CARDS = [
  { icon: '⚡', title: 'Reaction Speed', desc: 'Tap the instant it turns green', badge: '~10 seconds', path: '/reaction' },
  { icon: '⌨️', title: 'Typing Speed',   desc: 'Type 10 words as fast as possible', badge: '~30 seconds', path: '/typing' },
];

export default function Home({ stats }) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <div className={styles.statPill}><div className={styles.val}>{stats.players}</div><div className={styles.lbl}>Players</div></div>
        <div className={styles.statPill}><div className={styles.val}>{stats.bestReaction}ms</div><div className={styles.lbl}>Best Reflex</div></div>
        <div className={styles.statPill}><div className={styles.val}>{stats.bestWpm}</div><div className={styles.lbl}>Best WPM</div></div>
      </div>

      <div className={styles.sectionLabel}>Choose Your Battle</div>
      <div className={styles.gameGrid}>
        {GAME_CARDS.map(card => (
          <div key={card.path} className={styles.gameCard} onClick={() => navigate(card.path)}>
            <span className={styles.cardIcon}>{card.icon}</span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
            <span className={styles.cardBadge}>{card.badge}</span>
          </div>
        ))}
      </div>

      {/* Ad sits naturally between game cards and leaderboard button */}
      <AdSlot size="between" />

      <button className={styles.lbBtn} onClick={() => navigate('/leaderboard')}>
        <span>🏆 &nbsp; View Leaderboard</span>
        <span className={styles.arrow}>›</span>
      </button>

      <div className={styles.howTo}>
        <div className={styles.sectionLabel}>How it works</div>
        {['Pick a game and beat the clock','Get your score and rank','Share your result and challenge friends'].map((s, i) => (
          <div key={i} className={styles.step}>
            <div className={styles.stepNum}>{i + 1}</div>
            <div className={styles.stepText}>{s}</div>
          </div>
        ))}
      </div>

      {/* ── Rich Content Section: Why SpeedBattle ── */}
      <div className={styles.richContent}>
        <div className={styles.sectionLabel}>Why SpeedBattle?</div>
        <h2 className={styles.richTitle}>Test, Track, and Improve Your Speed</h2>
        <p className={styles.richText}>
          SpeedBattle is a free online platform designed to help you measure and improve two critical cognitive skills: 
          <strong> reaction speed</strong> and <strong>typing speed</strong>. Whether you're a competitive gamer, a 
          professional looking to boost productivity, or simply curious about your reflexes — our scientifically-informed 
          tests give you accurate, real-time results.
        </p>
        <p className={styles.richText}>
          Our <strong>Reaction Speed Test</strong> measures your visual reaction time with millisecond precision. 
          The average human reaction time is 200-300ms — can you do better? With regular practice, most people 
          improve by 10-20% within just a few weeks.
        </p>
        <p className={styles.richText}>
          The <strong>Typing Speed Test</strong> calculates your Net WPM (Words Per Minute) based on correctly 
          typed characters, giving you an accurate picture of your real-world typing ability. The average typist 
          clocks in at about 40 WPM — professional typists exceed 80 WPM.
        </p>

        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>🎯</span>
            <h3 className={styles.featureTitle}>Accurate Measurement</h3>
            <p className={styles.featureDesc}>
              High-precision timing with anti-cheat measures ensures fair, reliable results you can trust.
            </p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>📊</span>
            <h3 className={styles.featureTitle}>Track Progress</h3>
            <p className={styles.featureDesc}>
              See your percentile ranking and compare against players worldwide on our global leaderboard.
            </p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>⚔️</span>
            <h3 className={styles.featureTitle}>Challenge Friends</h3>
            <p className={styles.featureDesc}>
              Share your scores with a single tap and challenge friends to beat your result.
            </p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureIcon}>📱</span>
            <h3 className={styles.featureTitle}>Mobile-First</h3>
            <p className={styles.featureDesc}>
              Optimized for phones, tablets, and desktops. Play anywhere, anytime — no download needed.
            </p>
          </div>
        </div>
      </div>

      {/* ── Blog Preview Section ── */}
      <div className={styles.blogPreview}>
        <div className={styles.sectionLabel}>From the Blog</div>
        <div className={styles.blogCards}>
          {BLOG_POSTS.slice(0, 2).map(post => (
            <div
              key={post.slug}
              className={styles.blogCard}
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <div className={styles.blogCardHeader}>
                <span className={styles.blogCardIcon}>{post.icon}</span>
                <span className={styles.blogCardCategory}>{post.category}</span>
              </div>
              <h3 className={styles.blogCardTitle}>{post.title}</h3>
              <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
              <div className={styles.blogCardMeta}>{post.readTime}</div>
            </div>
          ))}
        </div>
        <button className={styles.viewAllBtn} onClick={() => navigate('/blog')}>
          View All Articles →
        </button>
      </div>

      {/* ── About CTA ── */}
      <div className={styles.aboutCta}>
        <p className={styles.aboutText}>
          SpeedBattle is free, ad-supported, and built with ❤️ for speed enthusiasts everywhere.
        </p>
        <div className={styles.aboutLinks}>
          <button className={styles.aboutLink} onClick={() => navigate('/about')}>About Us</button>
          <span className={styles.aboutSep}>·</span>
          <button className={styles.aboutLink} onClick={() => navigate('/blog')}>Blog</button>
          <span className={styles.aboutSep}>·</span>
          <button className={styles.aboutLink} onClick={() => navigate('/contact')}>Contact</button>
        </div>
      </div>
    </div>
  );
}