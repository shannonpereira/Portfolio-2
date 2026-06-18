import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  category: string;
  imageUrl: string;
  colSpan: string;
  aspectRatio: string;
  period: string;
  techStack: string;
  bullets: string[];
}

const projects: Project[] = [
  {
    title: "Inoora",
    category: "Agentic AI-Powered Automation & Device Management",
    imageUrl: "https://res.cloudinary.com/dd7fdogoa/image/upload/v1781684494/Media_3_fmrxay.jpg",
    colSpan: "md:col-span-8",
    aspectRatio: "aspect-[16/10] md:aspect-[16/9.5]",
    period: "2025 - 2026",
    techStack: "Android (DPC), Firebase (FCM), Playwright, FlaUI, WPF (C#/.NET), Next.js",
    bullets: [
      "Built a custom Mobile Device Management (MDM) solution for BYOD environments using Android (DPC) architecture.",
      "Implemented work/personal profile separation, allowing admins to control only enterprise data while preserving user privacy.",
      "Integrated Firebase Cloud Messaging (FCM) for real-time device monitoring, communication, and policy enforcement.",
      "Developed an automation engine for browser and desktop applications using Playwright (web) and FlaUI + WPF (C#/.NET) for Windows headless execution.",
      "Contributed to cross-platform development: Android (APK), iOS, and Windows (.exe).",
      "Built a Next.js admin dashboard for centralized control, analytics, and user/device management.",
      "Showcased at GITEX Global 2025 (Dubai) as part of company product demonstration."
    ]
  },
  {
    title: "Ventura Grand Inn",
    category: "Hotel Booking & Management Platform",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    colSpan: "md:col-span-4",
    aspectRatio: "aspect-[4/3] md:aspect-[16/19.5]",
    period: "Feb 2025",
    techStack: "Stripe, Cloudbeds, AI Integration, Web Technologies",
    bullets: [
      "Developed and deployed the official hotel website with an optimized booking experience.",
      "Integrated Stripe for secure online payments and Cloudbeds for hotel operations.",
      "Designed a custom loyalty program to increase repeat bookings and customer retention.",
      "Implemented AI-based business insights (e.g., weather-driven recommendations to improve guest experience and revenue).",
      "Improved booking flow and UI/UX for better conversion and usability."
    ]
  },
  {
    title: "Learning Management System (LMS)",
    category: "EdTech Platform",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    colSpan: "md:col-span-4",
    aspectRatio: "aspect-[4/3]",
    period: "Jun 2024",
    techStack: "React.js, CSS, Web Development",
    bullets: [
      "Built a responsive LMS using React.js with modules for courses, assignments, quizzes, and performance tracking.",
      "Designed interactive UI components to enhance engagement and usability."
    ]
  },
  {
    title: "Fleet Management System",
    category: "Logistics Optimization",
    imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    colSpan: "md:col-span-4",
    aspectRatio: "aspect-[4/3]",
    period: "Jun 2023",
    techStack: "MERN Stack, Firebase, MongoDB, Leaflet API, Tailwind CSS, Shadcn",
    bullets: [
      "Developed a full-stack system using MERN stack, Firebase, and MongoDB.",
      "Implemented real-time fleet tracking and route optimization using Leaflet API.",
      "Built a responsive UI with Tailwind CSS and Shadcn."
    ]
  },
  {
    title: "Healthcare Website for Hospitals",
    category: "Medical Portal",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    colSpan: "md:col-span-4",
    aspectRatio: "aspect-[4/3]",
    period: "Jun 2023",
    techStack: "React.js, API Integration, Web Development",
    bullets: [
      "Created a healthcare platform using React.js with features like patient management and appointment scheduling.",
      "Enabled online consultations with a clean and intuitive interface."
    ]
  }
];

export const SelectedWorks: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="bg-bg py-16 md:py-24 border-t border-stroke/20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-none tracking-tight text-text-primary">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-md mt-4 leading-relaxed font-light">
              Projects I've built, ranging from AI automation platforms to hotel and learning management portals.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setSelectedProject(project)}
              className={`${project.colSpan} ${project.aspectRatio} group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer`}
            >
              {/* Image */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Halftone Overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />

              {/* Gradient overlay from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85 group-hover:opacity-0 transition-opacity duration-500" />

              {/* Card Meta Content (Visible by default, hidden on hover) */}
              <div className="absolute bottom-6 left-6 right-6 z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-muted uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <span className="text-lg md:text-xl font-medium text-text-primary">
                      {project.title}
                    </span>
                  </div>
                  <span className="text-xs text-muted font-mono">{project.period}</span>
                </div>
              </div>

              {/* Hover Backdrop glass content overlay */}
              <div className="absolute inset-0 bg-bg/65 backdrop-blur-md opacity-0 group-hover:opacity-100 flex flex-col justify-between p-6 transition-all duration-500">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-muted uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted font-mono">{project.period}</span>
                  </div>
                  <h3 className="text-xl font-medium text-text-primary mb-3">
                    {project.title}
                  </h3>
                  <div className="text-xs text-muted mb-4 line-clamp-3 md:line-clamp-none">
                    <p className="font-semibold text-text-primary/95 mb-1.5">Key Features:</p>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      {project.bullets.slice(0, 3).map((b, i) => (
                        <li key={i} className="truncate">{b}</li>
                      ))}
                      {project.bullets.length > 3 && <li className="italic text-text-primary/70">Click to view {project.bullets.length - 3} more...</li>}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-[11px] text-muted">
                    <span className="text-text-primary/80 font-medium">Stack:</span> {project.techStack}
                  </div>
                  
                  <div className="relative rounded-full p-[1.5px] w-full group/btn transition-transform duration-300"
                       style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)" }}>
                    <div className="bg-white text-bg py-2.5 rounded-full flex items-center justify-center gap-1.5 font-semibold shadow-xl">
                      <span className="text-xs">
                        View Details — <span className="font-display italic font-semibold">{project.title}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog / Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-stroke rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stroke/50 border border-white/5 flex items-center justify-center text-text-primary hover:bg-white/10 transition-colors"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-semibold block mb-1">
                  {selectedProject.category}
                </span>
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="text-2xl md:text-3xl font-display italic font-bold text-text-primary">
                    {selectedProject.title}
                  </h3>
                  <span className="text-sm text-muted font-mono">{selectedProject.period}</span>
                </div>
              </div>

              {/* Main image in modal */}
              <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden border border-stroke/50 mb-6">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description Bullet points */}
              <div className="mb-6 text-sm text-text-primary/90 leading-relaxed">
                <h4 className="font-semibold text-text-primary mb-3 text-sm md:text-base border-b border-stroke/30 pb-1.5">
                  Project Responsibilities & Features
                </h4>
                <ul className="list-disc pl-5 space-y-2 md:space-y-3 font-light text-muted">
                  {selectedProject.bullets.map((bullet, index) => (
                    <li key={index} className="pl-1">
                      <span className="text-text-primary/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack info */}
              <div className="bg-bg/40 border border-stroke/50 rounded-2xl p-4">
                <span className="text-xs text-muted uppercase tracking-wider block mb-1 font-semibold">
                  Technologies Used
                </span>
                <span className="text-xs md:text-sm text-text-primary font-mono font-medium">
                  {selectedProject.techStack}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
