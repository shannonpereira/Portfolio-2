import { motion } from "framer-motion";
import type { Skill } from "../../data/skills";
import { proficiencyLabel } from "../../data/skills";

interface SkillDetailCardProps {
  skill: Skill;
  onClose: () => void;
}

const logoSrc = (slug: string, variant = "default") =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`;

export function SkillDetailCard({
  skill,
  onClose,
}: SkillDetailCardProps) {
  return (
    <motion.div
      key={skill.name}
     className="pointer-events-auto absolute z-[100]
 left-[30%] bottom-4 top-auto
  w-[240px] max-w-[75vw]

  md:left-auto
  md:bottom-auto
  md:right-6
  md:top-1/2
  md:w-[340px]
  md:max-w-[88vw]"
      style={{
        transform: "translateX(-80%)",
      }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
      }}
    >
      <motion.div
        className="w-full rounded-[18px] border border-white/15 p-3 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] md:rounded-[24px] md:p-5"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.02))",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close details"
          className="absolute right-1 top-1 z-50 flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 transition hover:bg-white/10 md:right-2 md:top-2 md:h-10 md:w-10"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 md:h-7 md:w-7">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </button>

        <div className="relative flex items-center gap-2.5 md:gap-3">
          <div
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/25 shadow-lg md:h-14 md:w-14 md:rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.92)",
            }}
          >
            <img
              src={
                logoSrc(skill.slug, skill.variant) ||
                "/placeholder.svg"
              }
              alt={`${skill.name} logo`}
              className="h-6 w-6 object-contain md:h-8 md:w-8"
              crossOrigin="anonymous"
            />
          </div>

          <div className="min-w-0 pr-5">
            <p className="text-[8px] font-medium uppercase tracking-widest text-accent md:text-[9px]">
              {skill.category}
            </p>

            <h2 className="truncate text-base font-semibold text-foreground md:text-xl">
              {skill.name}
            </h2>
          </div>
        </div>

        <p className="relative mt-2 line-clamp-3 text-[11px] leading-relaxed text-muted md:mt-3 md:line-clamp-none md:text-xs">
          {skill.description}
        </p>

        <div className="relative mt-3 grid grid-cols-2 gap-2 md:mt-4 md:gap-2">
          <Stat
            label="Proficiency"
            value={proficiencyLabel(skill.proficiency)}
            sub={`${skill.proficiency}/10`}
          />

          <Stat
            label="Experience"
            value={`${skill.years} yr${
              skill.years === 1 ? "" : "s"
            }`}
            sub="hands-on"
          />
        </div>

        <div className="relative mt-3 md:mt-4">
          <div className="mb-1 flex items-center justify-between text-[9px] text-muted">
            <span>Mastery</span>
            <span>
              {Math.round(
                (skill.proficiency / 10) * 100
              )}
              %
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                boxShadow: `0 0 14px ${skill.color}aa`,
              }}
              initial={{ width: 0 }}
              animate={{
                width: `${
                  (skill.proficiency / 10) * 100
                }%`,
              }}
              transition={{
                delay: 0.15,
                duration: 0.7,
                ease: "easeOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="rounded-xl border border-white/12 p-1.5 md:rounded-2xl md:p-2.5"
      style={{
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <p className="text-[8px] uppercase tracking-widest text-muted md:text-[9px]">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-foreground md:text-sm">
        {value}
      </p>

      <p className="text-[9px] text-muted md:text-[10px]">
        {sub}
      </p>
    </div>
  );
}