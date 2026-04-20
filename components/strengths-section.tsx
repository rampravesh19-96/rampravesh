"use client";

import { motion, useReducedMotion } from "framer-motion";

import { strengths } from "@/data/strengths";

import { SectionHeader } from "@/components/section-header";

const easing = [0.16, 1, 0.3, 1] as const;

export function StrengthsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="strengths" className="scroll-mt-32 py-14 sm:py-20 lg:py-24">
      <SectionHeader
        eyebrow="What I Build"
        title="Product-minded systems where frontend quality and flow correctness both matter."
        description="This section is about strengths, not generic skill bars. The focus stays on the kinds of products and transaction-heavy journeys Ram is best positioned to build."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-3">
        {strengths.map((strength, index) => (
          <motion.article
            key={strength.title}
            className="relative overflow-hidden rounded-[32px] border border-border-subtle bg-surface/88 p-6 shadow-[0_26px_90px_rgba(5,8,20,0.38)] backdrop-blur-xl"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.62,
              delay: prefersReducedMotion ? 0 : index * 0.08,
              ease: easing,
            }}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
          >
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent" />
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-accent/82">
                Strength {index + 1}
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-white">
              {strength.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              {strength.summary}
            </p>

            <ul className="mt-6 space-y-3">
              {strength.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-300"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
