'use client';

import { useState } from 'react';
import styles from './EmojiCard.module.css';

interface Emoji {
  emoji: string;
  name: string;
  keywords: string[];
}

interface EmojiCardProps {
  emoji: Emoji;
  onCopy?: (emoji: string) => void;
}

export default function EmojiCard({ emoji, onCopy }: EmojiCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(emoji.emoji);
      setIsCopied(true);
      onCopy?.(emoji.emoji);
      
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy emoji:', err);
    }
  };

  return (
    <div 
      className={`${styles.card} ${isCopied ? styles.copied : ''}`}
      onClick={handleClick}
      title={`${emoji.name} - Click to copy`}
    >
      <div className={styles.emojiContainer}>
        <span className={styles.emoji}>{emoji.emoji}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{emoji.name}</span>
      </div>
      {isCopied && (
        <div className={styles.copyFeedback}>
          Copied!
        </div>
      )}
    </div>
  );
}