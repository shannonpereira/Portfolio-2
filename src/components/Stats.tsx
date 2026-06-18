import React from "react";
import { motion } from "framer-motion";

interface StatItem {
value: string;
label: string;
}

const stats: StatItem[] = [
{
value: "IMAGINING",
label: "every possibility",
},
{
value: "ENGINEERING",
label: "possible solutions",
},
{
value: "DELIVERING",
label: "premium experiences",
},
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke/20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: idx * 0.2,
                ease: "easeOut",
              }}
              className="relative flex flex-col items-center text-center py-10 md:py-0"
            >
              {/* Glow Orb with more complex motion */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.03, 0.08, 0.03],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 1.2,
                }}
                className="absolute w-60 h-60 rounded-full bg-accent/20 blur-3xl -z-10"
              />

              {/* Divider */}
              {idx !== stats.length - 1 && (
                <motion.div
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    height: [96, 120, 96],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx,
                  }}
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"
                />
              )}

              {/* Main Title with hover expansion */}
              <motion.h3
                whileHover={{ scale: 1.05, color: "#89AACC" }}
                className="text-4xl md:text-5xl lg:text-6xl font-display italic font-semibold text-white leading-none cursor-default"
              >
                {stat.value}
              </motion.h3>

              {/* Subtitle */}
              <p
                className="mt-5 text-xs md:text-sm uppercase tracking-[0.28em] text-white/60"
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
