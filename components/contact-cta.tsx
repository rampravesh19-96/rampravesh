"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ProjectLink } from "@/data/projects";
import { siteConfig } from "@/data/site";

import { LiveLinksBar } from "@/components/live-links-bar";

const easing = [0.16, 1, 0.3, 1] as const;

function isPendingLink(href: string) {
  return href === "#";
}

const contactLinks: ProjectLink[] = [
  {
    label: "Email",
    href: siteConfig.links.email,
    variant: "primary",
    disabled: isPendingLink(siteConfig.links.email),
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    variant: "secondary",
    disabled: isPendingLink(siteConfig.links.linkedin),
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    variant: "secondary",
    disabled: isPendingLink(siteConfig.links.github),
  },
  {
    label: "Resume",
    href: siteConfig.links.resume,
    variant: "secondary",
    disabled: isPendingLink(siteConfig.links.resume),
  },
];

const fitPoints = [
  "Full stack engineering roles",
  "Product engineering teams",
  "Checkout, payments, and booking systems",
  "User-facing systems with operational depth",
] as const;

const approachPoints = [
  "End-to-end ownership across product flows",
  "Strong fit for checkout, booking, and payment systems",
  "Comfortable moving across UI, backend workflows, and data state",
] as const;

export function ContactCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="scroll-mt-32 py-14 sm:py-20 lg:py-24">
      <motion.div
        className="relative overflow-hidden rounded-[40px] border border-border-strong bg-card/94 p-6 shadow-[0_34px_120px_rgba(4,6,15,0.46)] backdrop-blur-xl sm:p-7 lg:p-9"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.72,
          ease: easing,
        }}
      >
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/26 to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,215,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(83,179,255,0.12),transparent_34%)]"
        />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/82">
              Contact
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.045em] text-white sm:text-[3.1rem]">
              {siteConfig.contactHeading}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {siteConfig.contactDescription}
            </p>

            <div className="mt-8">
              <LiveLinksBar links={contactLinks} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/82">
                Best Fit
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {fitPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white/82"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/82">
                Working Style
              </p>
              <div className="mt-5 space-y-3">
                {approachPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-300"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/48">
                Role Positioning
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Full stack engineer aligned with product teams building
                conversion-critical and lifecycle-heavy systems across ecommerce
                and travel-tech.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
