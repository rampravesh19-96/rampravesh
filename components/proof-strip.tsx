"use client";

import { motion, useReducedMotion } from "framer-motion";

import { proofItems } from "@/data/proof";

const easing = [0.16, 1, 0.3, 1] as const;

export function ProofStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="proof" className="pb-14 sm:pb-20 lg:pb-24">
      <motion.div
        className="rounded-[32px] border border-border-subtle bg-surface/85 p-4 shadow-[0_28px_90px_rgba(5,8,20,0.36)] backdrop-blur-xl sm:p-6"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.72,
          ease: easing,
        }}
      >
        <div className="mb-5 px-2 sm:px-1">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/82">
            Proof At A Glance
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[2rem]">
            Strong signal, quickly understood.
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {proofItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 transition duration-200 hover:border-white/14 hover:bg-white/[0.06]"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: easing,
              }}
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/48">
                {item.label}
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                {item.value}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
