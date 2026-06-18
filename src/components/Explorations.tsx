import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: number;
  title: string;
  imageUrl: string;
  rotation: string;
}

const items: ExplorationItem[] = [
  {
    id: 1,
    title: "Fluid Geometry",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600",
    rotation: "rotate-[-3deg]"
  },
  {
    id: 2,
    title: "Chroma Sphere",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    rotation: "rotate-[4deg]"
  },
  {
    id: 3,
    title: "Organic Waveforms",
    imageUrl: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=600",
    rotation: "rotate-[-2deg]"
  },
  {
    id: 4,
    title: "Glassmorphism Studies",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600",
    rotation: "rotate-[2deg]"
  },
  {
    id: 5,
    title: "Structural Monolith",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=600",
    rotation: "rotate-[-4deg]"
  },
  {
    id: 6,
    title: "Refracted Radiance",
    imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=600",
    rotation: "rotate-[3deg]"
  }
];

const skills = [
  "Python", "SQL", "Web development", "Software development", "API integration", 
  "Database management", "Git proficiency", "MongoDB", "HTML", "React.js", 
  "Next.js", "CSS", "Bootstrap", "C programming", "Machine learning", 
  "Cypress", "Postman", "Security best practices", "Continuous integration", 
  "Deployment tools", "IDE usage", "Code debugging", "Project management", 
  "Project planning", "Software applications", "Database querying", 
  "Product development", "Cross-functional collaboration", "Team leadership", 
  "Problem solving", "Client communication", ".NET development", "Communication skills"
];

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const colLeftRef = useRef<HTMLDivElement | null>(null);
  const colRightRef = useRef<HTMLDivElement | null>(null);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    // Desktop layout ScrollTrigger pinning and parallax
    const ctx = gsap.context(() => {
      // Pin Left Content Panel
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftContentRef.current,
        pinSpacing: false
      });

      // Parallax Left Column: moves up faster
      gsap.fromTo(
        colLeftRef.current,
        { y: "20vh" },
        {
          y: "-60vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // Parallax Right Column: moves up slower
      gsap.fromTo(
        colRightRef.current,
        { y: "45vh" },
        {
          y: "-30vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explorations"
      className="relative bg-bg w-full min-h-[220vh] md:min-h-[300vh] py-16 flex flex-col md:block"
    >
      {/* Layer 1: Left Pinned Content */}
      <div
        ref={leftContentRef}
        className="w-full md:w-5/12 h-auto md:h-screen flex items-center md:pl-16 lg:pl-24 px-6 mb-12 md:mb-0 select-none z-10"
      >
        <div className="max-w-md py-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-none tracking-tight text-text-primary mb-6">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-sm md:text-base text-muted mb-6 leading-relaxed font-light">
            A sandbox of digital rendering, experiments, and creative thoughts where form meets function in three dimensions.
          </p>

          {/* Skills Grid */}
          <div className="mb-8">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted font-bold mb-3">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-1.5 max-h-[240px] overflow-y-auto pr-2 scrollbar-thin">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-surface/80 border border-stroke text-[10px] md:text-[11px] text-text-primary/90 rounded-lg px-2.5 py-1 hover:border-text-primary/60 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex rounded-full text-xs font-semibold px-6 py-3 transition-all duration-300 border border-stroke text-muted hover:text-text-primary hover:border-transparent"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]"
              style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)" }}
            >
              <span className="flex items-center justify-center w-full h-full bg-bg text-text-primary rounded-full" />
            </span>
            <span className="relative z-10 flex items-center gap-1.5">
              Explore on Dribbble <span className="inline-block transform group-hover:translate-x-0.5 transition-transform duration-200">↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns */}
      <div className="w-full md:w-7/12 md:absolute md:right-0 md:top-0 px-6 md:px-12 lg:px-24 flex md:justify-end">
        <div className="grid grid-cols-2 gap-6 md:gap-12 w-full max-w-[700px]">
          {/* Column Left (items 1, 3, 5) */}
          <div ref={colLeftRef} className="flex flex-col gap-6 md:gap-16 pt-0 md:pt-16">
            {items
              .filter((_, i) => i % 2 === 0)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item.imageUrl)}
                  className={`group aspect-square w-full rounded-2xl md:rounded-3xl border border-stroke overflow-hidden cursor-zoom-in relative bg-surface ${item.rotation} shadow-xl hover:scale-105 hover:rotate-0 transition-all duration-500`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end p-4 md:p-6 transition-opacity duration-300">
                    <span className="text-xs md:text-sm font-medium text-text-primary font-display italic">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Column Right (items 2, 4, 6) */}
          <div ref={colRightRef} className="flex flex-col gap-6 md:gap-16">
            {items
              .filter((_, i) => i % 2 !== 0)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item.imageUrl)}
                  className={`group aspect-square w-full rounded-2xl md:rounded-3xl border border-stroke overflow-hidden cursor-zoom-in relative bg-surface ${item.rotation} shadow-xl hover:scale-105 hover:rotate-0 transition-all duration-500`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end p-4 md:p-6 transition-opacity duration-300">
                    <span className="text-xs md:text-sm font-medium text-text-primary font-display italic">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={activeImage}
                alt="Exploration Detail"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-text-primary hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
