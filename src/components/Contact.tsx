import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";

export const Contact: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // Flipped background video player
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
        video.play().catch((err) => console.log("HLS video footer auto-play failed: ", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("Native HLS footer auto-play failed: ", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Infinite Marquee Animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const anim = gsap.to(marquee, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1
    });

    return () => {
      anim.kill();
    };
  }, []);

  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/shannon-pereira-b999b7228/" },
    { name: "GitHub", url: "https://github.com/shannonpereira" },
    { name: "Email", url: "mailto:shannonpereira1402@gmail.com" },
  ];

  return (
    <section id="contact" className="relative bg-bg pt-20 pb-8 md:pb-12 overflow-hidden border-t border-stroke/20">
      {/* Background Video (flipped vertically) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-105 scale-y-[-1]"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* GSAP Marquee */}
        <div className="overflow-hidden whitespace-nowrap w-full border-y border-stroke/20 py-5 md:py-6 mb-16 relative">
          <div ref={marqueeRef} className="flex w-max select-none">
            {/* First segment */}
            <div className="flex items-center text-4xl md:text-6xl lg:text-7xl font-display italic font-bold uppercase tracking-wider text-text-primary/10 whitespace-nowrap">
              {Array(10)
                .fill("BUILDING THE FUTURE • ")
                .map((text, idx) => (
                  <span key={`marq1-${idx}`} className="px-4">
                    {text}
                  </span>
                ))}
            </div>
            {/* Second segment (identical for looping) */}
            <div className="flex items-center text-4xl md:text-6xl lg:text-7xl font-display italic font-bold uppercase tracking-wider text-text-primary/10 whitespace-nowrap">
              {Array(10)
                .fill("BUILDING THE FUTURE • ")
                .map((text, idx) => (
                  <span key={`marq2-${idx}`} className="px-4">
                    {text}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* CTA Container */}
        <div className="relative z-20 text-center px-6 max-w-2xl mb-20 select-none">
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4 block">
            Let's work together
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-10 leading-none">
            Let's make something <br />
            beautiful together.
          </h2>

          {/* Email button with gradient hover border */}
          <a
            href="mailto:shannonpereira1402@gmail.com"
            className="group relative inline-flex rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{ background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)" }}
          >
            <div className="bg-bg text-text-primary px-8 py-4 rounded-full flex items-center gap-2 font-medium border border-transparent group-hover:bg-transparent transition-colors duration-300">
              shannonpereira1402@gmail.com <span className="inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
            </div>
          </a>
        </div>

        {/* Footer Bar */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/20 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social links */}
          <div className="flex gap-6">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-text-primary transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Green dot availability indicator */}
          <div className="flex items-center gap-2 bg-surface/50 border border-stroke rounded-full px-4.5 py-1.5 select-none text-[11px] text-text-primary/95">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for projects</span>
          </div>

          {/* Copyright */}
          <span className="text-[10px] text-muted uppercase tracking-wider select-none">
            © 2026 Shannon Pereira. All rights reserved.
          </span>
        </div>
      </div>
    </section>
  );
};
