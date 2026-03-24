// ─── ContactPage.jsx ──────────────────────────────────────────
// Contact page with form and info

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContentPage.module.css';

export default function ContactPage() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to a backend
    setSent(true);
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>← Home</button>

      <div className={styles.hero}>
        <span className={styles.heroIcon}>📬</span>
        <h1 className={styles.heroTitle}>Contact Us</h1>
        <p className={styles.heroSub}>
          Have questions, feedback, or suggestions? We'd love to hear from you.
        </p>
      </div>

      <article className={styles.content}>
        {sent ? (
          <div className={styles.successMsg}>
            <span className={styles.successIcon}>✅</span>
            <h2 className={styles.successTitle}>Message Sent!</h2>
            <p className={styles.successText}>
              Thank you for reaching out. We'll get back to you as soon as possible.
            </p>
            <button className={styles.formBtn} onClick={() => setSent(false)}>
              Send Another Message
            </button>
          </div>
        ) : (
          <>
            <section className={styles.section}>
              <h2 className={styles.h2}>Get in Touch</h2>
              <p className={styles.p}>
                Whether you've found a bug, have a feature request, or just want to share your high score story — we're all ears. Fill out the form below and we'll respond within 24-48 hours.
              </p>
            </section>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  className={styles.input}
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  className={styles.input}
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="score">Score/Leaderboard Issue</option>
                  <option value="advertising">Advertising Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  className={styles.textarea}
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className={styles.formBtn}>Send Message</button>
            </form>
          </>
        )}

        <section className={styles.section}>
          <h2 className={styles.h2}>Other Ways to Reach Us</h2>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactValue}>contact@speedbattle.vercel.app</div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>🌐</span>
              <div>
                <div className={styles.contactLabel}>Website</div>
                <div className={styles.contactValue}>speedbattle.vercel.app</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Frequently Asked Questions</h2>
          <p className={styles.p}>
            Before reaching out, you might find your answer in our{' '}
            <button className={styles.inlineLink} onClick={() => navigate('/about')}>About page FAQ section</button>.
            We cover topics like how our tests work, accuracy of measurements, device compatibility, and more.
          </p>
        </section>
      </article>
    </div>
  );
}
