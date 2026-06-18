import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "3+", label: "Years Experience" },
  { value: "5+", label: "Completed Projects" },
  { value: "9.45", label: "Sahyadri CGPA" }
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke/20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-stroke/30">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="text-center pt-8 md:pt-0 md:px-6 flex flex-col items-center select-none"
            >
              <span className="text-5xl md:text-7xl lg:text-8xl font-display italic font-semibold text-text-primary leading-none mb-3">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-muted uppercase tracking-[0.2em] font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
