// ─── TermsPage.jsx ────────────────────────────────────────────
// Terms of Service page — required for AdSense approval

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContentPage.module.css';

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>← Home</button>

      <article className={styles.content}>
        <div className={styles.contentHeader}>
          <h1 className={styles.contentTitle}>Terms of Service</h1>
          <p className={styles.contentDate}>Last updated: March 20, 2026</p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.h2}>1. Acceptance of Terms</h2>
          <p className={styles.p}>
            By accessing and using SpeedBattle (accessible at speedbattle.vercel.app), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you should not use our platform.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>2. Description of Service</h2>
          <p className={styles.p}>
            SpeedBattle is a free online gaming platform that offers reaction speed tests, typing speed tests, global leaderboards, and social sharing features. The service is provided "as is" and may be modified, suspended, or discontinued at any time without prior notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>3. User Conduct</h2>
          <p className={styles.p}>When using SpeedBattle, you agree to:</p>
          <ul className={styles.list}>
            <li>Provide reasonably accurate information when submitting scores</li>
            <li>Use appropriate and non-offensive display names on the leaderboard</li>
            <li>Not attempt to manipulate or falsify game scores through automated tools, scripts, or other cheating methods</li>
            <li>Not attempt to disrupt the service or its infrastructure</li>
            <li>Not use the platform for any illegal or unauthorized purpose</li>
            <li>Not impersonate other users or public figures</li>
          </ul>
          <p className={styles.p}>
            We reserve the right to remove any scores or display names that violate these guidelines without prior notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>4. Intellectual Property</h2>
          <p className={styles.p}>
            All content on SpeedBattle — including but not limited to text, graphics, logos, game mechanics, code, and design — is the property of SpeedBattle or its content creators and is protected by copyright and intellectual property laws.
          </p>
          <p className={styles.p}>
            You may not reproduce, distribute, modify, or create derivative works from any content on SpeedBattle without explicit written permission.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>5. User-Generated Content</h2>
          <p className={styles.p}>
            When you submit scores and display names to SpeedBattle, you grant us a non-exclusive, worldwide, royalty-free license to display this content on our platform and in promotional materials. You retain ownership of any content you submit, but acknowledge that leaderboard submissions are publicly visible.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>6. Advertising</h2>
          <p className={styles.p}>
            SpeedBattle is a free, ad-supported service. By using our platform, you acknowledge and accept that advertisements will be displayed during your use of the service. We strive to place ads in non-intrusive positions that don't interfere with gameplay.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>7. Disclaimer of Warranties</h2>
          <p className={styles.p}>
            SpeedBattle is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or free of harmful components.
          </p>
          <p className={styles.p}>
            Reaction time and typing speed measurements are provided for entertainment and self-improvement purposes. Results may vary based on device, network conditions, and browser capabilities. SpeedBattle measurements should not be used for medical, professional, or employment assessments.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>8. Limitation of Liability</h2>
          <p className={styles.p}>
            To the maximum extent permitted by law, SpeedBattle and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, including but not limited to damage to your device or data loss.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>9. Modifications to Terms</h2>
          <p className={styles.p}>
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of SpeedBattle after any changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>10. Governing Law</h2>
          <p className={styles.p}>
            These Terms of Service are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of SpeedBattle shall be resolved through appropriate legal channels.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>11. Contact Information</h2>
          <p className={styles.p}>
            If you have any questions about these Terms of Service, please visit our <button className={styles.inlineLink} onClick={() => navigate('/contact')}>Contact Page</button> or email us at contact@speedbattle.vercel.app.
          </p>
        </section>
      </article>
    </div>
  );
}
