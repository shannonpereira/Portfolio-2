import React, { useState } from "react";
import { Scene } from "./SkillUniverse/scene";
import { SkillDetailCard } from "./SkillUniverse/skill-detail-card";
import { type SkillNode } from "../lib/honeycomb";

export const Explorations: React.FC = () => {
  const [selected, setSelected] = useState<SkillNode | null>(null);

  return (
    <section
      id="skills"
      className="relative bg-bg w-full min-h-screen overflow-visible py-16 md:py-0 flex flex-col md:flex-row"
    >
      {/* Layer 1: Left Content */}
      <div className="w-full md:w-5/12 h-auto md:min-h-screen flex items-center md:pl-16 lg:pl-24 px-6 mb-8 md:mb-0 select-none z-10">
        <div className="max-w-md py-8 md:py-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-none tracking-tight text-text-primary mb-6">
            Skill <span className="font-display italic">universe</span>
          </h2>

          <p className="text-sm md:text-base text-muted mb-6 leading-relaxed font-light">
            An interactive 3D visualization of my technical stack and expertise,
            exploring the connections between different technologies.
          </p>

          <a
            href="https://www.linkedin.com/in/shannon-pereira-b999b7228/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex rounded-full text-xs font-semibold px-6 py-3 transition-all duration-300 border border-stroke text-muted hover:text-text-primary hover:border-transparent"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              }}
            >
              <span className="flex items-center justify-center w-full h-full bg-bg text-text-primary rounded-full" />
            </span>

            <span className="relative z-10 flex items-center gap-1.5">
              Let's connect{" "}
              <span className="inline-block transform group-hover:translate-x-0.5 transition-transform duration-200">
                ↗
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Skill Universe */}
      <div className="relative flex-1 w-full min-h-[100svh] md:min-h-screen overflow-visible">
        <div className="relative w-full h-[100svh] md:h-screen overflow-visible">
          <Scene
            selected={selected}
            onSelect={setSelected}
            onHover={() => {}}
          />

          {selected && (
            <SkillDetailCard
              skill={selected.skill}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
};