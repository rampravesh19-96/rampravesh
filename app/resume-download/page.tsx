"use client";

import { useEffect, useMemo, useState } from "react";
import initialResumeData from "@/data/resume.json";

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
  liveHrefLabel?: string;
  liveHref: string;
  codeHref: string;
  buildHrefLabel?: string;
  buildHref?: string;
};

type ResumeOpenSourceItem = {
  title: string;
  bullets: string[];
  links: ResumeLink[];
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
  openSource?: ResumeOpenSourceItem[];
  keyHighlights?: string[];
  achievements?: string[];
  certifications?: string[];
  aiTools?: string[];
  developerTools?: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  };
};

type ApplicationStatus =
  | "Applied"
  | "Interviewing"
  | "Rejected"
  | "Offer"
  | "Saved";

type ApplicationEntry = {
  id: string;
  appliedAt: string;
  companyName: string;
  targetRole: string;
  fileName: string;
  status: ApplicationStatus;
  jobLink: string;
  notes: string;
  jobDescription: string;
};

const defaultResumeData = initialResumeData as ResumeData;
const initialJsonText = JSON.stringify(defaultResumeData, null, 2);
const defaultFileName = "Ram_Pravesh_Frontend";
const APPLICATIONS_STORAGE_KEY = "resume_application_tracker_v1";

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validateResumeData(value: unknown): ResumeData {
  if (!value || typeof value !== "object") {
    throw new Error("Resume JSON must be an object.");
  }

  const data = value as Record<string, unknown>;

  const requiredStrings = [
    "name",
    "location",
    "email",
    "phone",
    "title",
    "headline",
    "summary",
  ] as const;

  for (const key of requiredStrings) {
    if (!isString(data[key])) {
      throw new Error(`"${key}" must be a non-empty string.`);
    }
  }

  if (
    !Array.isArray(data.contactLinks) ||
    !data.contactLinks.every(
      (item) =>
        item &&
        typeof item === "object" &&
        isString((item as Record<string, unknown>).label) &&
        isString((item as Record<string, unknown>).href),
    )
  ) {
    throw new Error(`"contactLinks" must be an array of { label, href } objects.`);
  }

  if (
    !Array.isArray(data.skillGroups) ||
    !data.skillGroups.every(
      (item) =>
        item &&
        typeof item === "object" &&
        isString((item as Record<string, unknown>).title) &&
        isStringArray((item as Record<string, unknown>).items),
    )
  ) {
    throw new Error(`"skillGroups" must be an array of { title, items[] } objects.`);
  }

  if (
    !Array.isArray(data.experience) ||
    !data.experience.every((item) => {
      const record = item as Record<string, unknown>;
      return (
        item &&
        typeof item === "object" &&
        isString(record.title) &&
        isString(record.scope) &&
        isString(record.startDate) &&
        isString(record.endDate) &&
        isStringArray(record.bullets)
      );
    })
  ) {
    throw new Error(
      `"experience" must be an array of { title, scope, startDate, endDate, bullets[] } objects.`,
    );
  }

  if (
    !Array.isArray(data.projects) ||
    !data.projects.every((item) => {
      const record = item as Record<string, unknown>;
      return (
        item &&
        typeof item === "object" &&
        isString(record.title) &&
        isString(record.stack) &&
        isStringArray(record.bullets) &&
        isString(record.liveHref) &&
        isString(record.codeHref)
      );
    })
  ) {
    throw new Error(
      `"projects" must be an array of { title, stack, bullets[], liveHref, codeHref } objects.`,
    );
  }

  if (data.openSource !== undefined) {
    if (
      !Array.isArray(data.openSource) ||
      !data.openSource.every((item) => {
        const record = item as Record<string, unknown>;
        return (
          item &&
          typeof item === "object" &&
          isString(record.title) &&
          isStringArray(record.bullets) &&
          Array.isArray(record.links) &&
          record.links.every(
            (link) =>
              link &&
              typeof link === "object" &&
              isString((link as Record<string, unknown>).label) &&
              isString((link as Record<string, unknown>).href),
          )
        );
      })
    ) {
      throw new Error(
        `"openSource" must be an array of { title, bullets[], links[] } objects.`,
      );
    }
  }

  if (data.keyHighlights !== undefined && !isStringArray(data.keyHighlights)) {
    throw new Error(`"keyHighlights" must be an array of strings.`);
  }

  if (
    !data.education ||
    typeof data.education !== "object" ||
    !isString((data.education as Record<string, unknown>).degree) ||
    !isString((data.education as Record<string, unknown>).institution) ||
    !isString((data.education as Record<string, unknown>).year)
  ) {
    throw new Error(`"education" must contain { degree, institution, year }.`);
  }

  if (data.achievements !== undefined && !isStringArray(data.achievements)) {
    throw new Error(`"achievements" must be an array of strings.`);
  }

  if (data.certifications !== undefined && !isStringArray(data.certifications)) {
    throw new Error(`"certifications" must be an array of strings.`);
  }

  if (data.aiTools !== undefined && !isStringArray(data.aiTools)) {
    throw new Error(`"aiTools" must be an array of strings.`);
  }

  if (
    data.developerTools !== undefined &&
    !isStringArray(data.developerTools)
  ) {
    throw new Error(`"developerTools" must be an array of strings.`);
  }

  return data as unknown as ResumeData;
}

function buildPrompt(jobDescription: string, jsonText: string) {
  return `I will give you:

1. A job description
2. My current resume JSON

Your task:
- Return the resume JSON updated to match the job description as strongly as possible for ATS and recruiter screening
- Also return the exact best resume file name for that job application
- Keep the same JSON structure unless a structural change is truly needed
- Tailor title, headline, summary, skillGroups, experience, keyHighlights, projects, openSource, achievements, certifications, developerTools, aiTools, and education wording wherever useful
- Add only missing keywords or phrases from the JD that improve match quality
- Do not add unnecessary alternative technologies
  Examples:
  - if React is already relevant, do not add Angular
  - if Node.js is already relevant, do not add Python or Java
  - if REST APIs are already relevant, do not add GraphQL unless the JD clearly requires it
- Prioritize:
  1. ATS keyword match
  2. Recruiter readability
  3. JD wording alignment
  4. Truth-preserving edits based on my existing resume content
- Keep the resume strong, compact, and recruiter-friendly
- Reorder bullets, skills, projects, achievements, certifications, or aiTools if it improves match quality
- Keep output direct
- Do not explain much
- Do not give generic advice
- Do not add long notes
- Do not ask unnecessary questions

Rules for the resume file name:
- Make it clean and professional
- Include my name
- Include target role
- Include company name if available
- Use hyphens or underscores only
- Make it ATS-friendly
- Return filename with .pdf extension

Output format:
RESUME FILE NAME
<filename>.pdf

FINAL MATCHED JSON
\`\`\`json
<full updated json>
\`\`\`

CHANGES MADE
- <short bullet>
- <short bullet>
- <short bullet>

Here is the job description:
${jobDescription.trim() || "[PASTE JD HERE]"}

Here is my current resume JSON:
\`\`\`json
${jsonText}
\`\`\`
`;
}

function normalizeFileName(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return defaultFileName;

  return trimmed
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function formatDisplayDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

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
          ? "mt-1.5 list-disc pl-5 space-y-[2px] text-[11.75px] leading-[1.4] text-slate-700 marker:text-slate-400 print:mt-1 print:text-[9.7px] print:leading-[1.16]"
          : "mt-2 list-disc pl-5 space-y-[3px] text-[12.1px] leading-[1.5] text-slate-700 marker:text-slate-400 print:mt-1.2 print:text-[10px] print:leading-[1.18]"
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
    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11.8px] text-slate-700 print:mt-1.15 print:text-[9.8px]">
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
          {index < links.length - 1 ? <span className="text-slate-300">/</span> : null}
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
    <article className="break-inside-auto border-b border-slate-200/85 pb-2.5 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[13.85px] font-semibold tracking-[-0.016em] text-slate-950 print:text-[11.3px]">
            {item.title}
          </h3>
          <p className="mt-0.55 text-[12.1px] font-medium text-slate-700 print:text-[10px]">
            {item.scope}
          </p>
        </div>

        <p className="shrink-0 whitespace-nowrap rounded-full border border-slate-200/90 bg-slate-50/70 px-2 py-[2px] text-right text-[9.7px] font-semibold tracking-[0.02em] text-slate-500 print:border-0 print:bg-transparent print:px-0 print:py-0 print:text-[8.6px]">
          {formatDateRange(item.startDate, item.endDate)}
        </p>
      </div>

      <BulletList items={item.bullets} maxItems={3} />
    </article>
  );
}

function ProjectItem({ project }: { project: ResumeProject }) {
  return (
    <article className="break-inside-auto border-b border-slate-200/85 pb-2.5 last:border-b-0 last:pb-0">
      <div className="rounded-[12px] border border-slate-100 bg-slate-50/35 px-3 py-3 print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0">
        <div className="border-l-2 border-slate-200 pl-3 print:border-l print:pl-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-[13.7px] font-semibold tracking-[-0.016em] text-slate-950 print:text-[11.85px]">
              {project.title}
            </h3>

            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11.2px] text-slate-700 print:text-[9.4px]">
              <a
                href={project.liveHref}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-[3px]"
              >
                {project.liveHrefLabel || "Live Demo"}
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
              {project.buildHref ? (
                <>
                  <span className="text-slate-300">/</span>
                  <a
                    href={project.buildHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-[3px]"
                  >
                    {project.buildHrefLabel || "Build"}
                  </a>
                </>
              ) : null}
            </div>
          </div>

          <p className="mt-0.6 text-[11.7px] leading-[1.41] text-slate-600 print:text-[9.7px] print:leading-[1.12]">
            {project.stack}
          </p>

          <BulletList items={project.bullets} maxItems={3} compact />
        </div>
      </div>
    </article>
  );
}

function OpenSourceItem({ item }: { item: ResumeOpenSourceItem }) {
  return (
    <article className="break-inside-auto border-b border-slate-200/85 pb-2.5 last:border-b-0 last:pb-0 print:pb-1">
      <div className="rounded-[12px] border border-slate-100 bg-slate-50/35 px-3 py-3 print:rounded-none print:border-0 print:bg-transparent print:px-0 print:py-0">
        <div className="border-l-2 border-slate-200 pl-3 print:border-l print:pl-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h3 className="text-[13.7px] font-semibold tracking-[-0.016em] text-slate-950 print:text-[11.5px]">
              {item.title}
            </h3>

            {item.links.length > 0 ? (
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-slate-700 print:text-[8.7px]">
                {item.links.map((link, index) => (
                  <span key={link.href} className="inline-flex whitespace-nowrap">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-[3px]"
                    >
                      {link.label}
                    </a>
                    {index < item.links.length - 1 ? (
                      <span className="ml-1.5 text-slate-300">/</span>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <BulletList items={item.bullets} maxItems={3} compact />
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
  breakBeforePrint = false,
}: {
  title: string;
  children: React.ReactNode;
  breakBeforePrint?: boolean;
}) {
  return (
    <section className={`${breakBeforePrint ? "print:break-before-page" : ""} pt-5 print:pt-1.6`}>
      <SectionHeading>{title}</SectionHeading>
      <div className="mt-2.25 print:mt-0.9">{children}</div>
    </section>
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  return (
    <article className="mx-auto w-full max-w-[210mm] overflow-hidden rounded-[26px] border border-black/5 bg-white text-slate-900 shadow-[0_32px_100px_rgba(15,23,42,0.12)] print:max-w-none print:rounded-none print:border-0 print:shadow-none">
      <div className="h-[4px] w-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 print:h-[2px] print:bg-slate-900" />

      <div className="px-8 py-8 print:px-[8mm] print:py-[6mm]">
        <header className="border-b border-slate-200/85 pb-5 print:pb-2">
          <h1 className="text-[34px] font-semibold tracking-[-0.072em] text-slate-950 print:text-[24px]">
            {data.name}
          </h1>

          <p className="mt-1 text-[10.75px] font-semibold uppercase tracking-[0.05em] text-slate-600 print:text-[9.5px]">
            {data.title}
          </p>

          <p className="mt-2.1 text-[12.7px] leading-[1.45] text-slate-700 print:mt-1.2 print:text-[10.7px] print:leading-[1.24]">
            {data.headline}
          </p>

          <div className="mt-2.35 flex flex-wrap gap-x-2 gap-y-1 text-[11.95px] leading-[1.38] text-slate-700 print:mt-1.3 print:text-[9.8px] print:leading-[1.2]">
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

        {data.keyHighlights && data.keyHighlights.length > 0 ? (
          <SectionBlock title="Key Highlights">
            <BulletList items={data.keyHighlights} maxItems={3} compact />
          </SectionBlock>
        ) : null}

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
          <div className="space-y-2 print:space-y-0.8">
            {data.projects.map((project) => (
              <ProjectItem key={project.title} project={project} />
            ))}
          </div>
        </SectionBlock>

        {data.openSource && data.openSource.length > 0 ? (
          <SectionBlock title="Open Source Contributions">
            <div className="space-y-2 print:space-y-0.8">
              {data.openSource.map((item) => (
                <OpenSourceItem key={item.title} item={item} />
              ))}
            </div>
          </SectionBlock>
        ) : null}

        <SectionBlock title="Technical Skills">
          <SkillGroups groups={data.skillGroups} />
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

        {(data.developerTools?.length || data.aiTools?.length) ? (
          <SectionBlock title="AI Tools & Platforms">
            <p className="text-[11.65px] leading-[1.35] text-slate-600 print:text-[10.25px] print:leading-[1.19]">
              {(data.developerTools || data.aiTools || []).join(", ")}
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
  );
}

export default function ResumeDownloadPage() {
  const [jsonText, setJsonText] = useState(initialJsonText);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState(defaultFileName);
  const [listToggle, setListToggle] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus>("Applied");
  const [notes, setNotes] = useState("");

  const [applications, setApplications] = useState<ApplicationEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ApplicationStatus>("All");

  const [copyStatus, setCopyStatus] = useState<
    "idle" | "json-copied" | "prompt-copied" | "failed"
  >("idle");

  useEffect(() => {
    document.title = defaultFileName;
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(APPLICATIONS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ApplicationEntry[];
      if (Array.isArray(parsed)) {
        setApplications(parsed);
      }
    } catch {
      // ignore malformed local storage
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      APPLICATIONS_STORAGE_KEY,
      JSON.stringify(applications),
    );
  }, [applications]);

  const generatedPrompt = useMemo(() => {
    return buildPrompt(jobDescription, jsonText);
  }, [jobDescription, jsonText]);

  const filteredApplications = useMemo(() => {
    return applications.filter((item) => {
      const matchesStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      const haystack = [
        item.companyName,
        item.targetRole,
        item.fileName,
        item.status,
        item.jobLink,
        item.notes,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(searchTerm.trim().toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [applications, searchTerm, statusFilter]);

  const statusText = useMemo(() => {
    if (error) return error;
    return "JSON valid. Preview is updated.";
  }, [error]);

  function handleJsonChange(value: string) {
    setJsonText(value);

    try {
      const parsed = JSON.parse(value);
      const validated = validateResumeData(parsed);
      setResumeData(validated);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Invalid JSON format.";
      setError(message);
    }
  }

  async function handleCopyJson() {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopyStatus("json-copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    }
  }

  async function handleCopyPrompt() {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopyStatus("prompt-copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    }
  }

  function handleDownloadPrompt() {
    downloadTextFile("resume-tailoring-prompt.txt", generatedPrompt);
  }

  function handleResetJson() {
    setJsonText(initialJsonText);
    setResumeData(defaultResumeData);
    setError(null);
    setCopyStatus("idle");
  }

  function handleResetFileName() {
    setFileName(defaultFileName);
  }

  function addApplicationEntry(fileNameForSave: string) {
    const entry: ApplicationEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      appliedAt: new Date().toISOString(),
      companyName: companyName.trim(),
      targetRole: targetRole.trim(),
      fileName: fileNameForSave,
      status: applicationStatus,
      jobLink: jobLink.trim(),
      notes: notes.trim(),
      jobDescription: jobDescription.trim(),
    };

    setApplications((prev) => [entry, ...prev]);
  }

  function updateApplicationStatus(id: string, status: ApplicationStatus) {
    setApplications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  function deleteApplication(id: string) {
    setApplications((prev) => prev.filter((item) => item.id !== id));
  }

  function handleDownload() {
    const originalTitle = document.title;
    const safeFileName = normalizeFileName(fileName) || defaultFileName;

    addApplicationEntry(safeFileName);

    document.title = safeFileName;
    window.print();

    window.setTimeout(() => {
      document.title = originalTitle;
    }, 300);
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] px-4 py-1 print:bg-white print:p-0">
      <div className="mx-auto mb-6 w-full max-w-[210mm] space-y-6 print:hidden">
        <div className="overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
          <div className="h-[4px] w-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900" />
          <div className="p-5 sm:p-6">
            <div className="mb-4">
              {/* <h1 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-950">
                Resume JSON Editor
              </h1> */}
              <p className="mt-1 text-[13px] text-slate-600">
                Edit the JSON, paste a job description, copy or download the tailoring prompt,
                and update the preview instantly.
              </p>
            </div>

            <div className="mb-5 grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="company-name"
                  className="mb-2 block text-[13px] font-medium text-slate-800"
                >
                  Company name
                </label>
                <input
                  id="company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Example: Razorpay"
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="target-role"
                  className="mb-2 block text-[13px] font-medium text-slate-800"
                >
                  Target role
                </label>

                <input
                  id="job-link"
                  type="text"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  placeholder="Paste job URL"
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                />

              </div>

              <div>
                                                <label
                  htmlFor="job-link"
                  className="mb-2 block text-[13px] font-medium text-slate-800"
                >
                  Job link
                </label>
                                <input
                  id="target-role"
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Example: Full Stack Engineer"
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                />

              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="resume-file-name"
                  className="block text-[13px] font-medium text-slate-800"
                >
                  Resume file name
                </label>
                <button
                  type="button"
                  onClick={handleResetFileName}
                  className="text-[12px] font-medium text-slate-600 underline decoration-slate-300 underline-offset-[3px] transition hover:text-slate-900"
                >
                  Reset file name
                </button>
              </div>

              <input
                id="resume-file-name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder={defaultFileName}
                className="w-full rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
              />
              <p className="mt-2 text-[12px] text-slate-500">
                This name will be used as the suggested PDF file name during print/save.
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="job-description"
                className="mb-2 block text-[13px] font-medium text-slate-800"
              >
                Job description
              </label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                spellCheck={false}
                placeholder="Paste the job description here..."
                className="min-h-[100px] w-full resize-y rounded-[16px] border border-slate-200 bg-slate-50/70 p-4 text-[13px] leading-[1.55] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[12px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Copy Prompt
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPrompt}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[12px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Download Prompt
                </button>
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-[13px] font-medium text-slate-800">Resume JSON</p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Copy JSON
                </button>
                <button
                  type="button"
                  onClick={handleResetJson}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Reset JSON
                </button>
                <button
                  type="button"
                  onClick={()=> setListToggle(prev => !prev)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  List toggle: {listToggle ? "On" : "Off"}
                </button>
              </div>
            </div>

            <textarea
              value={jsonText}
              onChange={(e) => handleJsonChange(e.target.value)}
              spellCheck={false}
              className="min-h-[160px] w-full resize-y rounded-[16px] border border-slate-200 bg-slate-50/70 p-4 font-mono text-[12.5px] leading-[1.55] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
            />

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] justify-between">
            <div className="flex gap-2">
                            <p className={`${error ? "text-red-600" : "text-emerald-700"}`}>
                {statusText}
              </p>

              {copyStatus === "json-copied" ? (
                <p className="text-emerald-700">JSON copied.</p>
              ) : null}

              {copyStatus === "prompt-copied" ? (
                <p className="text-emerald-700">Prompt copied.</p>
              ) : null}

              {copyStatus === "failed" ? (
                <p className="text-red-600">Copy failed.</p>
              ) : null}
            </div>
                            <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-slate-800"
              >
                Download / Save PDF
              </button>
            </div>
          </div>
        </div>

          {listToggle &&         <div className="overflow-hidden rounded-[22px] border border-black/5 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
          <div className="h-[4px] w-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900" />
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-950">
                  Application Tracker
                </h2>
                <p className="mt-1 text-[13px] text-slate-600">
                  Every time you download a resume, one application entry is stored here.
                </p>
              </div>

              <div className="grid w-full gap-3 sm:max-w-[460px] sm:grid-cols-[1fr_150px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search company, role, filename..."
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as "All" | ApplicationStatus)
                  }
                  className="w-full rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3 text-[13px] text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
                >
                  <option value="All">All statuses</option>
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Offer">Offer</option>
                  <option value="Saved">Saved</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredApplications.length === 0 ? (
                <div className="rounded-[16px] border border-dashed border-slate-200 bg-slate-50/40 px-4 py-5 text-[13px] text-slate-500">
                  No applications found yet.
                </div>
              ) : (
                filteredApplications.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[16px] border border-slate-200 bg-slate-50/40 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-semibold text-slate-950">
                          {item.companyName || "Unknown Company"}
                        </h3>
                        <p className="mt-1 text-[13px] text-slate-700">
                          {item.targetRole || "Unknown Role"}
                        </p>
                        <p className="mt-1 text-[12px] text-slate-500">
                          Applied on {formatDisplayDate(item.appliedAt)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            updateApplicationStatus(
                              item.id,
                              e.target.value as ApplicationStatus,
                            )
                          }
                          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 outline-none"
                        >
                          <option>Applied</option>
                          <option>Interviewing</option>
                          <option>Rejected</option>
                          <option>Offer</option>
                          <option>Saved</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => deleteApplication(item.id)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-[12px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-3 text-[12.5px] text-slate-700 sm:grid-cols-2">
                      <div>
                        <span className="font-medium text-slate-900">Resume file:</span>{" "}
                        {item.fileName}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Status:</span>{" "}
                        {item.status}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-medium text-slate-900">Job link:</span>{" "}
                        {item.jobLink ? (
                          <a
                            href={item.jobLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-900 underline decoration-slate-300 underline-offset-[3px]"
                          >
                            {item.jobLink}
                          </a>
                        ) : (
                          <span className="text-slate-500">Not added</span>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-medium text-slate-900">Notes:</span>{" "}
                        {item.notes || <span className="text-slate-500">No notes</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>}
      </div>

      <ResumePreview data={resumeData} />
    </main>
  );
}