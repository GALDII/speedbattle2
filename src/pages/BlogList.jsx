// ─── BlogList.jsx ─────────────────────────────────────────────
// Blog index page showing all articles

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import styles from './BlogList.module.css';

export default function BlogList() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>SpeedBattle Blog</h1>
        <p className={styles.heroSub}>
          Tips, science, and strategies to improve your reaction time and typing speed.
          Backed by research and real-world practice.
        </p>
      </div>

      <div className={styles.grid}>
        {BLOG_POSTS.map(post => (
          <article
            key={post.slug}
            className={styles.card}
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{post.icon}</span>
              <span className={styles.cardCategory}>{post.category}</span>
            </div>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.cardExcerpt}>{post.excerpt}</p>
            <div className={styles.cardMeta}>
              <span>{post.date}</span>
              <span className={styles.dot}>·</span>
              <span>{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to Put These Tips to the Test?</h2>
        <p className={styles.ctaSub}>
          Practice makes perfect. Jump into a quick reaction or typing speed test and see how you stack up against players worldwide.
        </p>
        <div className={styles.ctaBtns}>
          <button className={styles.ctaBtn} onClick={() => navigate('/reaction')}>
            ⚡ Reaction Test
          </button>
          <button className={styles.ctaBtn} onClick={() => navigate('/typing')}>
            ⌨️ Typing Test
          </button>
        </div>
      </div>
    </div>
  );
}
