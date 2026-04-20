import type { Metadata } from "next";
import Link from "next/link";

import { ResumePrintButton } from "@/components/resume-print-button";
import {
  getResumeDataForVariant,
  normalizeResumeVariant,
  resumeVariantOptions,
} from "@/data/resume-variants";

export const metadata: Metadata = {
  title: "Ram Pravesh | Resume",
  description:
    "Print-friendly resume for Ram Pravesh, Full Stack Engineer building payment, checkout, booking, and lifecycle systems across ecommerce and travel-tech.",
};

type ResumePageProps = {
  searchParams?:
    | Promise<{ variant?: string | string[] | undefined }>
    | { variant?: string | string[] | undefined };
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="resume-heading-row flex items-center gap-3">
      <span className="h-px flex-1 bg-slate-200" />
      <h2 className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
        {children}
      </h2>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const variant = normalizeResumeVariant(resolvedSearchParams.variant);
  const resumeData = getResumeDataForVariant(variant);
  const [leadExperience, ...remainingExperience] = resumeData.experience;

  return (
    <main className="resume-print-root min-h-screen bg-[#07101e] px-4 py-6 sm:px-6 sm:py-10">
      <div className="resume-screen-only mx-auto mb-4 flex w-full max-w-[940px] flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/84 transition duration-200 hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
        >
          Back to Portfolio
        </Link>

        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {resumeVariantOptions.map((option) => {
            const isActive = option.value === variant;

            return (
              <Link
                key={option.value}
                href={option.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition duration-200 ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "text-white/72 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </div>

        <ResumePrintButton />
      </div>

      <article className="resume-sheet mx-auto w-full max-w-[940px] overflow-hidden rounded-[32px] border border-slate-200 bg-white text-slate-900 shadow-[0_36px_120px_rgba(2,8,20,0.26)]">
        <div className="resume-inner px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <header className="resume-section resume-avoid-break border-b border-slate-200 pb-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <p className="resume-screen-only font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Resume
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-[2.8rem]">
                  {resumeData.name}
                </h1>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-slate-600">
                  {resumeData.title}
                </p>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-700">
                  {resumeData.headline}
                </p>
              </div>

              <div className="resume-screen-only min-w-[220px] rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Contact
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  {resumeData.location}
                </p>
                <p className="mt-1 text-sm text-slate-800">{resumeData.phone}</p>
                <a href={`mailto:${resumeData.email}`} className="mt-1 block text-sm text-sky-700">
                  {resumeData.email}
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-sm leading-6 text-slate-700">
              <span>{resumeData.location}</span>
              <span className="text-slate-300">&bull;</span>
              <span>{resumeData.phone}</span>
              <span className="text-slate-300">&bull;</span>
              <a href={`mailto:${resumeData.email}`} className="text-sky-700">
                {resumeData.email}
              </a>
            </div>

            <div className="resume-link-row mt-3 flex flex-wrap gap-2 text-[12.5px] leading-5 text-slate-700">
              {resumeData.contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-visible-link inline-flex items-center rounded-full border border-slate-200 px-3 py-1.5 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-900">{item.label}</span>
                </a>
              ))}
            </div>
          </header>

          <div className="resume-top-grid grid gap-5 pt-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
            <section className="resume-section resume-avoid-break">
              <SectionHeading>Professional Summary</SectionHeading>
              <p className="mt-3 text-[14px] leading-6 text-slate-700">
                {resumeData.summary}
              </p>
            </section>

            <section className="resume-section resume-avoid-break">
              <SectionHeading>Core Skills</SectionHeading>
              <div className="mt-3 space-y-2">
                {resumeData.skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="resume-compact-card rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-[13px] font-semibold text-slate-900">
                      {group.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-6 text-slate-700">
                      {group.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="resume-section resume-flow-section pt-5">
            <div className="resume-experience-lead">
              <SectionHeading>Professional Experience</SectionHeading>
              <div className="mt-3">
                <article className="resume-experience-card resume-flow-card resume-compact-card rounded-[24px] border border-slate-200 px-4 py-3.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">
                        {leadExperience.title} | {leadExperience.scope}
                      </h3>
                    </div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {leadExperience.duration}
                    </p>
                  </div>
                  <ul className="mt-2.5 space-y-2 text-sm leading-6 text-slate-700">
                    {leadExperience.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-700" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>

            {remainingExperience.length > 0 ? (
              <div className="mt-3 space-y-3">
                {remainingExperience.map((item) => (
                  <article
                    key={item.scope}
                    className="resume-experience-card resume-flow-card resume-compact-card rounded-[24px] border border-slate-200 px-4 py-3.5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="text-base font-semibold text-slate-950">
                          {item.title} | {item.scope}
                        </h3>
                      </div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        {item.duration}
                      </p>
                    </div>
                    <ul className="mt-2.5 space-y-2 text-sm leading-6 text-slate-700">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-700" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            ) : null}
          </section>

          <section className="resume-section resume-flow-section pt-5">
            <SectionHeading>Flagship Projects</SectionHeading>
            <div className="resume-project-grid mt-3 grid gap-3 lg:grid-cols-2">
              {resumeData.projects.map((project) => (
                <article
                  key={project.title}
                  className="resume-flow-card resume-compact-card rounded-[24px] border border-slate-200 px-4 py-3.5"
                >
                  <h3 className="text-base font-semibold text-slate-950">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-slate-700">
                    {project.stack}
                  </p>
                  <ul className="mt-2.5 space-y-2 text-sm leading-6 text-slate-700">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-700" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="resume-project-link-row mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noreferrer"
                      className="resume-project-link font-medium text-sky-700"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.codeHref}
                      target="_blank"
                      rel="noreferrer"
                      className="resume-project-link font-medium text-sky-700"
                    >
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="resume-bottom-row grid gap-4 pt-5 lg:grid-cols-[0.74fr_1.26fr]">
            <section className="resume-section resume-avoid-break">
              <SectionHeading>Education</SectionHeading>
              <div className="resume-compact-card mt-3 rounded-[24px] border border-slate-200 px-4 py-3.5">
                <h3 className="text-base font-semibold text-slate-950">
                  {resumeData.education.degree}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-700">
                  {resumeData.education.institution}
                </p>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {resumeData.education.year}
                </p>
              </div>
            </section>

            <section className="resume-screen-only resume-section resume-avoid-break">
              <SectionHeading>Selected Links</SectionHeading>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {resumeData.links.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[22px] border border-slate-200 px-4 py-3 transition duration-200 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {item.value}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
