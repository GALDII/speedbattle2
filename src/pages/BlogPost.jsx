// ─── BlogPost.jsx ─────────────────────────────────────────────
// Individual blog article page with rich markdown-like rendering

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug } from '../data/blogData';
import AdSlot from '../components/AdSlot';
import styles from './BlogPost.module.css';

// Simple markdown-ish renderer for our content
function renderContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let listItems = [];
  let tableRows = [];
  let inTable = false;
  let tableHeaders = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className={styles.list}>
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>{tableHeaders.map((h, i) => <th key={i}>{h.trim()}</th>)}</tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{cell.trim()}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      tableHeaders = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      flushList();
      if (inTable) flushTable();
      continue;
    }

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim() !== '');
      // separator row
      if (cells.every(c => /^[-:\s]+$/.test(c.trim()))) continue;
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={i} className={styles.h3}>{trimmed.slice(4)}</h3>);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={i} className={styles.h2}>{trimmed.slice(3)}</h2>);
    }
    // List items
    else if (trimmed.startsWith('- ')) {
      listItems.push(renderInline(trimmed.slice(2)));
    }
    // Numbered list
    else if (/^\d+\.\s/.test(trimmed)) {
      listItems.push(renderInline(trimmed.replace(/^\d+\.\s/, '')));
    }
    // Regular paragraph
    else {
      flushList();
      elements.push(<p key={i} className={styles.paragraph}>{renderInline(trimmed)}</p>);
    }
  }
  flushList();
  if (inTable) flushTable();
  return elements;
}

function renderInline(text) {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <div className={styles.nfEmoji}>📝</div>
          <div className={styles.nfTitle}>Article not found</div>
          <button className={styles.backBtn} onClick={() => navigate('/blog')}>← Back to Blog</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/blog')}>← Back to Blog</button>

      <article className={styles.article}>
        <div className={styles.articleHeader}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.date}</span>
            <span className={styles.dot}>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className={styles.content}>
          {renderContent(post.content)}
        </div>

        {/* Ad placement at end of article — natural content break */}
        <AdSlot size="between" />

        <div className={styles.articleCta}>
          <h3 className={styles.ctaTitle}>Ready to Test Your Skills?</h3>
          <p className={styles.ctaSub}>Put what you've learned into practice with our free online tests.</p>
          <div className={styles.ctaBtns}>
            <button className={styles.ctaBtn} onClick={() => navigate('/reaction')}>⚡ Reaction Test</button>
            <button className={styles.ctaBtn} onClick={() => navigate('/typing')}>⌨️ Typing Test</button>
          </div>
        </div>
      </article>

      <div className={styles.moreArticles}>
        <h3 className={styles.moreTitle}>More Articles</h3>
        <button className={styles.moreBtnLink} onClick={() => navigate('/blog')}>View all articles →</button>
      </div>
    </div>
  );
}
