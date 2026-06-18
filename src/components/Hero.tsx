import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";

interface HeroProps {
  onSeeWorksClick: () => void;
}

const roles = ["Software Engineer", ".NET Developer", "Fullstack Developer", "Curious Mind"];

export const Hero: React.FC<HeroProps> = ({ onSeeWorksClick }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // HLS stream setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("HLS video auto-play failed: ", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("Native HLS auto-play failed: ", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP text animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Cycle roles every 2 seconds
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setWordTrigger(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(roleInterval);
  }, []);

  const [wordTrigger, setWordTrigger] = useState(true);
  useEffect(() => {
    setWordTrigger(true);
  }, [roleIndex]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl select-none mt-12">
        {/* Eyebrow */}
        <span className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-6 block font-medium">
          THIS IS
        </span>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Shannon Pereira
        </h1>

        {/* Role line */}
        <div className="blur-in text-lg md:text-2xl text-text-primary/90 font-light mb-6 flex items-center justify-center gap-2">
          <span>A</span>
      <div className="inline-block min-w-[120px] md:min-w-[170px] text-center font-display italic font-semibold text-text-primary relative h-[1.3em] overflow-hidden">
            {wordTrigger && (
              <span key={roleIndex} className="animate-role-fade-in absolute inset-0 text-center">
                {roles[roleIndex]}
              </span>
            )}
          </div>
          <span>turning problems into solutions.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-2xl mb-10 leading-relaxed font-light">
         Software Engineer who believes every problem presents an opportunity for innovation. Passionate about identifying challenges, designing effective solutions and building products that create meaningful impact.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-row flex-wrap justify-center gap-4">
          {/* See Works */}
          <button
            onClick={onSeeWorksClick}
            className="group relative rounded-full text-sm font-medium px-8 py-3.5 transition-all duration-300 hover:scale-105 cursor-pointer bg-text-primary text-bg"
          >
            {/* Hover border container */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1.5px]"
                  style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)" }}>
              <span className="flex items-center justify-center w-full h-full bg-bg text-text-primary rounded-full" />
            </span>
            <span className="relative z-10 group-hover:text-text-primary transition-colors duration-300">
              See Works
            </span>
          </button>

          {/* Reach out... */}
          <a
            href="mailto:shannonpereira1402@gmail.com"
            className="group relative rounded-full text-sm font-medium px-8 py-3.5 transition-all duration-300 hover:scale-105 cursor-pointer border border-stroke bg-bg text-text-primary hover:border-transparent"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1.5px]"
                  style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)" }}>
              <span className="flex items-center justify-center w-full h-full bg-bg text-text-primary rounded-full" />
            </span>
            <span className="relative z-10 transition-colors duration-300">
              Reach out...
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-10 pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-medium opacity-60">
          SCROLL
        </span>
        <div className="w-[1px] h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-text-primary/70 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
