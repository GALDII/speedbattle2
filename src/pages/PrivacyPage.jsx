// ─── PrivacyPage.jsx ──────────────────────────────────────────
// Privacy Policy page — required for AdSense approval

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContentPage.module.css';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>← Home</button>

      <article className={styles.content}>
        <div className={styles.contentHeader}>
          <h1 className={styles.contentTitle}>Privacy Policy</h1>
          <p className={styles.contentDate}>Last updated: March 20, 2026</p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            Welcome to SpeedBattle ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
          </p>
          <p className={styles.p}>
            By using SpeedBattle (accessible at speedbattle.vercel.app), you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Information We Collect</h2>

          <h3 className={styles.h3}>Information You Provide</h3>
          <p className={styles.p}>
            When you submit a score to the leaderboard, you provide a display name. We do not require email addresses, phone numbers, or any other personal identification. The display name you choose is publicly visible on the leaderboard.
          </p>

          <h3 className={styles.h3}>Automatically Collected Information</h3>
          <p className={styles.p}>
            When you visit SpeedBattle, we automatically collect certain information about your device and usage:
          </p>
          <ul className={styles.list}>
            <li>Game scores and performance metrics (reaction time, typing speed, accuracy)</li>
            <li>Device type and browser information</li>
            <li>IP address (for analytics and abuse prevention)</li>
            <li>Pages visited and time spent on the site</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>How We Use Your Information</h2>
          <p className={styles.p}>We use the information we collect to:</p>
          <ul className={styles.list}>
            <li>Display your scores on the public leaderboard</li>
            <li>Provide and maintain our gaming platform</li>
            <li>Improve our games and user experience</li>
            <li>Prevent abuse and cheating</li>
            <li>Analyze usage patterns to optimize performance</li>
            <li>Display relevant advertisements through our advertising partners</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Advertising</h2>
          <p className={styles.p}>
            SpeedBattle uses Google AdSense to display advertisements. Google AdSense may use cookies and similar technologies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className={styles.link}>Google Ads Settings</a>.
          </p>
          <p className={styles.p}>
            Third-party vendors, including Google, use cookies to serve ads based on your visit to SpeedBattle and other sites on the internet. You may opt out of the use of cookies by Google for personalized advertising by visiting the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className={styles.link}>Digital Advertising Alliance opt-out page</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Cookies and Tracking Technologies</h2>
          <p className={styles.p}>
            We use cookies and similar tracking technologies to track activity on our platform. Cookies are small data files stored on your device. We use the following types of cookies:
          </p>
          <ul className={styles.list}>
            <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our platform</li>
            <li><strong>Advertising Cookies:</strong> Used by our advertising partners to deliver relevant ads</li>
          </ul>
          <p className={styles.p}>
            You can set your browser to refuse all or some cookies, or to alert you when cookies are being sent. However, some features of SpeedBattle may not function properly if you disable cookies.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Data Storage and Security</h2>
          <p className={styles.p}>
            Your game scores and display names are stored on Supabase (our database provider). We take reasonable measures to protect your information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Children's Privacy</h2>
          <p className={styles.p}>
            SpeedBattle does not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take appropriate action.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Your Rights</h2>
          <p className={styles.p}>Depending on your location, you may have the following rights:</p>
          <ul className={styles.list}>
            <li>The right to access the personal information we hold about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
          </ul>
          <p className={styles.p}>
            To exercise any of these rights, please contact us using the information provided in the Contact section below.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Changes to This Policy</h2>
          <p className={styles.p}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Contact Us</h2>
          <p className={styles.p}>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className={styles.list}>
            <li>Email: contact@speedbattle.vercel.app</li>
            <li>Website: <button className={styles.inlineLink} onClick={() => navigate('/contact')}>Contact Page</button></li>
          </ul>
        </section>
      </article>
    </div>
  );
}
