"use client";

import { motion, useReducedMotion } from "framer-motion";

import { siteConfig } from "@/data/site";

const easing = [0.16, 1, 0.3, 1] as const;

const heroActions = [
  { label: "View Projects", href: siteConfig.links.projects, variant: "primary" },
  { label: "Download Resume", href: siteConfig.links.resume, variant: "secondary" },
  { label: "GitHub", href: siteConfig.links.github, variant: "secondary" },
  { label: "LinkedIn", href: siteConfig.links.linkedin, variant: "secondary" },
] as const;

const focusCards = [
  {
    label: "Checkout and Payments",
    description:
      "Polished user flows for cart, checkout, payment confirmation, and order confidence.",
  },
  {
    label: "Booking and Confirmation",
    description:
      "Search-to-booking journeys with traveller data, fare validation, and lifecycle updates.",
  },
  {
    label: "Operational Visibility",
    description:
      "Admin-lite dashboards and status systems that keep transaction-heavy products manageable.",
  },
] as const;

const capabilityTags = [
  "End-to-End Systems",
  "Product Engineering",
  "Protected Flows",
  "Razorpay Sandbox",
  "Lifecycle Systems",
] as const;

function getAnchorProps(href: string) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  return isExternal
    ? { target: "_blank", rel: "noreferrer" }
    : {};
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const leftMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.72, ease: easing },
      };

  const rightMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.08, ease: easing },
      };

  return (
    <section className="relative flex flex-1 items-center py-14 sm:py-20 lg:py-24">
      <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div {...leftMotion} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-accent/90 shadow-[0_16px_50px_rgba(7,10,22,0.28)]">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {siteConfig.availability}
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-white/55">
            {siteConfig.name}
          </p>

          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-slate-300 sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroActions.map((action) => {
              const props = getAnchorProps(action.href);
              const isPrimary = action.variant === "primary";

              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={
                    isPrimary
                      ? "inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f8fbff_0%,#d9e8ff_100%)] px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:translate-y-[-2px] hover:shadow-[0_22px_60px_rgba(176,204,255,0.22)]"
                      : "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/85 transition duration-200 hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
                  }
                  {...props}
                >
                  {action.label}
                </a>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {capabilityTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/72"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...rightMotion} className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(139,215,255,0.18),transparent_52%)] blur-3xl" />

          <div className="relative overflow-hidden rounded-[32px] border border-border-strong bg-card/92 p-6 shadow-[0_32px_120px_rgba(4,6,15,0.46)] backdrop-blur-xl sm:p-7">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/26 to-transparent" />

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
                  Product System Focus
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Full stack execution across product flows
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/72">
                Transaction-heavy flows
              </span>
            </div>

            <div className="mt-7 space-y-4">
              {focusCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5"
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 18 }
                  }
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.48,
                    delay: prefersReducedMotion ? 0 : 0.18 + index * 0.08,
                    ease: easing,
                  }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    <p className="text-sm font-semibold text-white">
                      {card.label}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/52">
                  Focus
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Payments, booking, and lifecycle journeys
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/52">
                  Style
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Product-minded execution with production-style systems thinking
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
