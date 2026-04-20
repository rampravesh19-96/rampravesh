import type { Metadata } from "next";
import resumeData from "@/data/resume.json";

export const metadata: Metadata = {
  title: "Ram Pravesh | Resume Download",
  description:
    "Resume of Ram Pravesh, Full Stack Engineer building payment, checkout, booking, deployment, SaaS, and AI-assisted product workflows.",
};

type ResumeLink = {
  label: string;
  href: string;
};

type ResumeSkillGroup = {
  title: string;
  items: string[];
};

type ResumeExperienceItem = {
  title: string;
  scope: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

type ResumeProject = {
  title: string;
  stack: string;
  bullets: string[];
  liveHref: string;
  codeHref: string;
};

type ResumeData = {
  name: string;
  location: string;
  email: string;
  phone: string;
  title: string;
  headline: string;
  summary: string;
  contactLinks: ResumeLink[];
  skillGroups: ResumeSkillGroup[];
  experience: ResumeExperienceItem[];
  projects: ResumeProject[];
  achievements?: string[];
  certifications?: string[];
  aiTools?: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
};

const data = resumeData as ResumeData;

const SECTION_PT = "pt-5 print:pt-2.25";
const SECTION_MT = "mt-2.25 print:mt-1.25";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 break-after-avoid-page">
      <span className="hidden h-[8px] w-[8px] rounded-full bg-slate-900/75 print:hidden sm:inline-block" />
      <h2 className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-600 print:text-[9px] print:tracking-[0.04em]">
        {children}
      </h2>
      <div className="h-px flex-1 bg-slate-300/60" />
    </div>
  );
}

function BulletList({
  items,
  maxItems,
  compact = false,
}: {
  items: string[];
  maxItems?: number;
  compact?: boolean;
}) {
  const finalItems =
    typeof maxItems === "number" ? items.slice(0, maxItems) : items;

  return (
    <ul
      className={
        compact
          ? "mt-1.5 list-disc pl-5 space-y-[2px] text-[11.75px] leading-[1.4] text-slate-700 marker:text-slate-400 print:mt-1 print:text-[10.3px] print:leading-[1.23]"
          : "mt-2 list-disc pl-5 space-y-[3px] text-[12.1px] leading-[1.5] text-slate-700 marker:text-slate-400 print:mt-1.2 print:text-[10.8px] print:leading-[1.28]"
      }
    >
      {finalItems.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

function HeaderLinks({ links }: { links: ResumeLink[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11.8px] text-slate-700 print:mt-1.15 print:text-[10.4px]">
      {links.map((item, index) => (
        <div key={item.label} className="inline-flex items-center gap-2.5">
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-[3px] transition-colors duration-200 hover:text-slate-700"
          >
            {item.label}
          </a>
          {index < links.length - 1 ? (
            <span className="text-slate-300">/</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function formatDateRange(startDate: string, endDate: string) {
  return `${startDate} – ${endDate}`;
}

function ExperienceItem({ item }: { item: ResumeExperienceItem }) {
  return (
    <article className="break-inside-auto border-b border-slate-200/85 pb-3 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[13.85px] font-semibold tracking-[-0.016em] text-slate-950 print:text-[12.05px]">
            {item.title}
          </h3>
          <p className="mt-0.55 text-[12.1px] font-medium text-slate-700 print:text-[10.8px]">
            {item.scope}
          </p>
        </div>

        <p className="shrink-0 whitespace-nowrap rounded-full border border-slate-200/90 bg-slate-50/70 px-2 py-[2px] text-right text-[9.7px] font-semibold tracking-[0.02em] text-slate-500 print:border-0 print:bg-transparent print:px-0 print:py-0 print:text-[8.6px]">
          {formatDateRange(item.startDate, item.endDate)}
        </p>
      </div>

      <BulletList items={item.bullets} maxItems={4} />
    </article>
  );
}

function ProjectItem({ project }: { project: ResumeProject }) {
  return (
    <article className="break-inside-auto border-b border-slate-200/85 pb-3 last:border-b-0 last:pb-0">
      <div className="rounded-[12px] border border-slate-100 bg-slate-50/35 px-3 py-3 print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0">
        <div className="border-l-2 border-slate-200 pl-3 print:border-l print:pl-2.5">
          <h3 className="text-[13.7px] font-semibold tracking-[-0.016em] text-slate-950 print:text-[11.85px]">
            {project.title}
          </h3>

          <p className="mt-0.6 text-[11.7px] leading-[1.41] text-slate-600 print:text-[10.3px] print:leading-[1.21]">
            {project.stack}
          </p>

          <BulletList items={project.bullets} maxItems={3} compact />

          <div className="mt-1.4 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-slate-700 print:text-[10.2px]">
            <a
              href={project.liveHref}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-[3px]"
            >
              Live Demo
            </a>
            <span className="text-slate-300">/</span>
            <a
              href={project.codeHref}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-[3px]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function SkillGroups({ groups }: { groups: ResumeSkillGroup[] }) {
  return (
    <div className="space-y-3 print:space-y-1.35">
      {groups.map((group) => (
        <div
          key={group.title}
          className="break-inside-avoid rounded-[12px] border border-slate-100 bg-slate-50/40 px-3 py-2.75 print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0"
        >
          <p className="text-[10.85px] font-semibold uppercase tracking-[0.015em] text-slate-950 print:text-[9.5px]">
            {group.title}
          </p>
          <p className="mt-0.8 text-[11.65px] leading-[1.4] text-slate-600 print:mt-0.45 print:text-[10.3px] print:leading-[1.19]">
            {group.items.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={SECTION_PT}>
      <SectionHeading>{title}</SectionHeading>
      <div className={SECTION_MT}>{children}</div>
    </section>
  );
}

export default function ResumeDownloadPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 py-6 print:bg-white print:p-0">
      <article className="mx-auto w-full max-w-[210mm] overflow-hidden rounded-[26px] border border-black/5 bg-white text-slate-900 shadow-[0_32px_100px_rgba(15,23,42,0.12)] print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        <div className="h-[4px] w-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 print:h-[2px] print:bg-slate-900" />

        <div className="px-8 py-8 print:px-[10mm] print:py-[7.9mm]">
          <header className="border-b border-slate-200/85 pb-5 print:pb-3">
            <h1 className="text-[34px] font-semibold tracking-[-0.072em] text-slate-950 print:text-[26px]">
              {data.name}
            </h1>

            <p className="mt-1 text-[10.75px] font-semibold uppercase tracking-[0.05em] text-slate-600 print:text-[9.5px]">
              {data.title}
            </p>

            <p className="mt-2.1 text-[12.7px] leading-[1.45] text-slate-700 print:mt-1.2 print:text-[10.7px] print:leading-[1.24]">
              {data.headline}
            </p>

            <div className="mt-2.35 flex flex-wrap gap-x-2 gap-y-1 text-[11.95px] leading-[1.38] text-slate-700 print:mt-1.3 print:text-[10.35px] print:leading-[1.2]">
              <span>{data.location}</span>
              <span className="text-slate-300">•</span>
              <span>{data.phone}</span>
              <span className="text-slate-300">•</span>
              <a href={`mailto:${data.email}`} className="text-slate-900">
                {data.email}
              </a>
            </div>

            <HeaderLinks links={data.contactLinks} />
          </header>

          <SectionBlock title="Professional Summary">
            <div className="rounded-[12px] border border-slate-100 bg-slate-50/40 px-3 py-3 print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0">
              <p className="max-w-[780px] text-[12.15px] leading-[1.48] text-slate-700 print:max-w-none print:text-[10.7px] print:leading-[1.25]">
                {data.summary}
              </p>
            </div>
          </SectionBlock>

          <SectionBlock title="Technical Skills">
            <SkillGroups groups={data.skillGroups} />
          </SectionBlock>

          <SectionBlock title="Professional Experience">
            <div className="space-y-3 print:space-y-1.6">
              {data.experience.map((item) => (
                <ExperienceItem
                  key={`${item.title}-${item.scope}-${item.startDate}-${item.endDate}`}
                  item={item}
                />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Projects">
            <div className="space-y-2.5 print:space-y-1.4">
              {data.projects.map((project) => (
                <ProjectItem key={project.title} project={project} />
              ))}
            </div>
          </SectionBlock>

          {data.achievements && data.achievements.length > 0 ? (
            <SectionBlock title="Selected Achievements">
              <BulletList items={data.achievements} compact />
            </SectionBlock>
          ) : null}

          {data.certifications && data.certifications.length > 0 ? (
            <SectionBlock title="Certifications">
              <BulletList items={data.certifications} compact />
            </SectionBlock>
          ) : null}

          {data.aiTools && data.aiTools.length > 0 ? (
            <SectionBlock title="AI Tools & Platforms">
              <p className="text-[11.65px] leading-[1.35] text-slate-600 print:text-[10.25px] print:leading-[1.19]">
                {data.aiTools.join(", ")}
              </p>
            </SectionBlock>
          ) : null}

          <SectionBlock title="Education">
            <div>
              <h3 className="text-[12.9px] font-semibold tracking-[-0.01em] text-slate-950 print:text-[11.6px]">
                {data.education.degree}
              </h3>
              <p className="mt-0.4 text-[11.85px] text-slate-700 print:text-[10.6px]">
                {data.education.institution}
              </p>
              <p className="mt-0.4 text-[9.7px] font-semibold tracking-[0.02em] text-slate-500 print:text-[8.6px]">
                {data.education.year}
              </p>
            </div>
          </SectionBlock>
        </div>
      </article>
    </main>
  );
}

