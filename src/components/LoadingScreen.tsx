import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter using requestAnimationFrame over 3500ms
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 3500; // 3500ms for safer asset loading

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const currentCount = Math.min(Math.floor((progress / duration) * 100), 100);
      setCount(currentCount);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setCount(100);
        // On complete: 500ms delay then call onComplete
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    window.requestAnimationFrame(step);
  }, [onComplete]);

  // Rotate words every 1166ms (3 words * 1166ms = 3500ms total)
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 1166);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      {/* Top Left Label */}
      <div>
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] inline-block"
        >
          Portfolio
        </motion.span>
      </div>

      {/* Center Word Rotator */}
      <div className="flex items-center justify-center h-24">
        <AnimatePresence mode="wait">
          <motion.h2
            key={wordIndex}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom section with Counter and Progress */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-end items-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary/90 leading-none tabular-nums select-none">
            {count}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-[3px] w-full bg-stroke/50 relative overflow-hidden rounded-full">
          <div
            className="accent-gradient h-full absolute left-0 top-0 transition-transform duration-75 ease-out origin-left"
            style={{
              width: "100%",
              transform: `scaleX(${count / 100})`,
              boxShadow: "0 0 12px rgba(137, 170, 204, 0.55)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
