'use client';

import { useEffect, useState } from 'react';
import styles from './CopyNotification.module.css';

interface CopyNotificationProps {
  emoji: string;
  show: boolean;
  onHide: () => void;
}

export default function CopyNotification({ emoji, show, onHide }: CopyNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onHide, 300); // Wait for exit animation
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show && !isVisible) return null;

  return (
    <div className={`${styles.notification} ${isVisible ? styles.show : styles.hide}`}>
      <div className={styles.content}>
        <div className={styles.emoji}>{emoji}</div>
        <div className={styles.message}>
          <span className={styles.text}>Copied to clipboard!</span>
          <div className={styles.subtext}>Ready to paste anywhere</div>
        </div>
        <div className={styles.checkmark}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}