"use client";

import { motion, useReducedMotion } from "framer-motion";

import { projects } from "@/data/projects";

import { FeaturedProjectCard } from "@/components/featured-project-card";
import { LiveLinksBar } from "@/components/live-links-bar";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { SectionHeader } from "@/components/section-header";

const easing = [0.16, 1, 0.3, 1] as const;

type DeepDiveListProps = {
  title: string;
  items: string[];
};

function DeepDiveList({ title, items }: DeepDiveListProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
      <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/72">
        {title}
      </h4>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectShowcaseSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="scroll-mt-32 py-14 sm:py-20 lg:py-24">
      <SectionHeader
        eyebrow="Featured Projects"
        title="Two flagship systems that show real product depth."
        description="These projects are framed like product case studies: transaction-heavy, user-facing systems where frontend quality, system thinking, and trust-critical flows all matter."
      />

      <div className="mt-12 grid gap-6 xl:grid-cols-2">
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="mt-8 space-y-8 lg:mt-10">
        {projects.map((project, index) => {
          const reverse = index % 2 === 1;

          return (
            <motion.article
              key={project.slug}
              id={`project-${project.slug}`}
              className="overflow-hidden rounded-[36px] border border-border-subtle bg-surface/88 p-5 shadow-[0_30px_110px_rgba(5,8,20,0.42)] backdrop-blur-xl sm:p-6 lg:p-8"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.72,
                delay: prefersReducedMotion ? 0 : index * 0.06,
                ease: easing,
              }}
            >
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-start">
                <div className={`${reverse ? "lg:order-2" : ""} space-y-6`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-accent/82">
                      {project.domain}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/56">
                      {project.focus}
                    </span>
                  </div>

                  <h3 className="mt-6 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.45rem]">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                    {project.deepDiveSummary}
                  </p>

                  <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 sm:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
                      Why It Matters
                    </p>
                    <p className="mt-4 text-base leading-8 text-slate-300">
                      {project.cardSummary}
                    </p>
                  </div>

                  <div className="grid gap-4 xl:grid-cols-2">
                    <DeepDiveList title="Main User Journey" items={project.journey} />
                    <DeepDiveList
                      title="Engineering Complexity"
                      items={project.engineeringDepth}
                    />
                  </div>

                  <div className="border-t border-white/8 pt-6">
                    <LiveLinksBar links={project.links} />
                  </div>
                </div>

                <div className={`${reverse ? "lg:order-1" : ""} space-y-6`}>
                  <ScreenshotGallery
                    title={project.title}
                    screenshots={project.screenshots}
                    highlights={project.highlights}
                  />

                  <div className="grid gap-4 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
                    <DeepDiveList
                      title="Product and UX Depth"
                      items={project.productDepth}
                    />

                    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 sm:p-6">
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
                        Technical Stack
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/74"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 border-t border-white/8 pt-6">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/52">
                          Selected Capabilities
                        </p>
                        <div className="mt-4 grid gap-3">
                          {project.capabilities.map((capability) => (
                            <div
                              key={capability}
                              className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-300"
                            >
                              {capability}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
