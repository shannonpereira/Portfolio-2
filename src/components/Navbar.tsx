import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Work", id: "work" },
    { label: "Resume", id: "resume" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 select-none">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-1.5 transition-all duration-300 ${
          isScrolled ? "shadow-lg shadow-black/40 bg-surface/95" : ""
        }`}
      >
        {/* 1. Logo */}
        <motion.button
          onClick={() => onNavClick("home")}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          whileHover={{ scale: 1.1 }}
          className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
        >
          {/* Logo accent ring (reverses background gradient rotation on hover) */}
          <div
            className={`absolute inset-0 transition-transform duration-700 ${
              logoHovered ? "rotate-180" : "rotate-0"
            }`}
            style={{
              background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            }}
          />
          {/* Inner Logo Content */}
          <div className="absolute inset-[2px] bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary/90 font-bold mt-[1px]">
              SP
            </span>
          </div>
        </motion.button>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavClick(link.id)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-text-primary bg-stroke/50 font-medium"
                    : "text-muted hover:text-text-primary hover:bg-stroke/30"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* 5. "Say hi" button with premium hover shadow */}
        <a
          href="mailto:shannonpereira1402@gmail.com"
          className="relative text-xs sm:text-sm group rounded-full overflow-hidden p-[1px] transition-all duration-300"
        >
          {/* Accent gradient border on hover */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
            style={{
              background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              margin: "-2px"
            }}
          />
          {/* Inner content */}
          <span className="relative flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary border border-white/5 group-hover:border-transparent transition-colors duration-200">
            Say hi <span className="inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
};
