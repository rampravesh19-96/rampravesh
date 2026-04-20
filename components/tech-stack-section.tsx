"use client";

import { motion, useReducedMotion } from "framer-motion";

import { stackGroups } from "@/data/stack";

import { SectionHeader } from "@/components/section-header";

const easing = [0.16, 1, 0.3, 1] as const;

export function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="stack" className="scroll-mt-32 py-14 sm:py-20 lg:py-24">
      <SectionHeader
        eyebrow="Tech Stack"
        title="Grouped to show how products are shipped, not to dump a long tool list."
        description="The stack is presented by function so recruiters and teams can quickly understand how frontend execution connects to backend workflows, persistence, payments, and deployment."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {stackGroups.map((group, index) => (
          <motion.article
            key={group.title}
            className="overflow-hidden rounded-[30px] border border-border-subtle bg-surface/88 p-5 shadow-[0_24px_80px_rgba(5,8,20,0.34)] backdrop-blur-xl"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 22 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.58,
              delay: prefersReducedMotion ? 0 : index * 0.06,
              ease: easing,
            }}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
          >
            <div className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/82">
                {group.title}
              </p>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              {group.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/78"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
