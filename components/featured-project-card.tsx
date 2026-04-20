"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import type { Project } from "@/data/projects";

import { LiveLinksBar } from "@/components/live-links-bar";

const easing = [0.16, 1, 0.3, 1] as const;

type FeaturedProjectCardProps = {
  project: Project;
  index: number;
};

export function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group overflow-hidden rounded-[32px] border border-border-subtle bg-surface/90 shadow-[0_26px_90px_rgba(5,8,20,0.38)] backdrop-blur-xl"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.62,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: easing,
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -5 }}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-accent/82">
            {project.domain}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/56">
            {project.focus}
          </span>
        </div>

        <div className="mt-6">
          <h3 className="max-w-2xl text-balance text-2xl font-semibold tracking-[-0.035em] text-white sm:text-[2rem]">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-300">
            {project.cardSummary}
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-[#06101f]">
          <div className="flex items-center gap-2 border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b7a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd56a]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#58d694]" />
            <p className="ml-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/54">
              Product Preview
            </p>
          </div>
          <Image
            src={project.screenshots[0].src}
            alt={project.screenshots[0].alt}
            width={1200}
            height={760}
            unoptimized
            className="h-auto w-full transition duration-300 group-hover:scale-[1.01]"
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {project.highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/48">
                {highlight.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {highlight.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/52">
            Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/74"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/52">
            Key Capabilities
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-300 sm:grid-cols-2">
            {project.capabilities.slice(0, 4).map((capability) => (
              <li
                key={capability}
                className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-white/8 pt-6">
          <LiveLinksBar links={project.links} compact />
        </div>
      </div>
    </motion.article>
  );
}
