"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  experienceHighlights,
  experienceMetrics,
} from "@/data/experience";

const easing = [0.16, 1, 0.3, 1] as const;

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-32 py-14 sm:py-20 lg:py-24">
      <motion.div
        className="overflow-hidden rounded-[36px] border border-border-subtle bg-surface/90 p-6 shadow-[0_30px_110px_rgba(5,8,20,0.42)] backdrop-blur-xl sm:p-7 lg:p-8"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.68,
          ease: easing,
        }}
      >
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/82">
              Experience Snapshot
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.8rem]">
              Concise experience, centered on product-facing systems.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              This is intentionally selective. The aim is to show signal quickly:
              domain depth, transaction-heavy flow ownership, and strong full
              stack execution across complete product systems.
            </p>

            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
                Profile Positioning
              </p>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Full stack engineer with experience across ecommerce and
                HOI Travel Tech where frontend quality, backend workflows,
                payment logic, and lifecycle visibility all need to work together.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {experienceMetrics.map((metric, index) => (
                <motion.article
                  key={metric.label}
                  className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.48,
                    delay: prefersReducedMotion ? 0 : index * 0.06,
                    ease: easing,
                  }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/48">
                    {metric.label}
                  </p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {metric.description}
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 sm:p-6"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.56,
                delay: prefersReducedMotion ? 0 : 0.12,
                ease: easing,
              }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
                Experience Notes
              </p>
              <div className="mt-5 grid gap-3 xl:grid-cols-3">
                {experienceHighlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-300"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
