import Image from "next/image";

import type { ProjectHighlight, ProjectScreenshot } from "@/data/projects";

type ScreenshotGalleryProps = {
  title: string;
  screenshots: ProjectScreenshot[];
  highlights: ProjectHighlight[];
};

type ScreenshotCardProps = {
  screenshot: ProjectScreenshot;
  priority?: boolean;
  compact?: boolean;
};

function ScreenshotCard({
  screenshot,
  priority = false,
  compact = false,
}: ScreenshotCardProps) {
  return (
    <figure className="overflow-hidden rounded-[28px] border border-white/10 bg-[#06101f] shadow-[0_24px_80px_rgba(4,6,15,0.36)]">
      <div className="flex items-center gap-2 border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b7a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd56a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#58d694]" />
        <p className="ml-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/54">
          {screenshot.label}
        </p>
      </div>

      <div className="relative">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          width={1200}
          height={760}
          priority={priority}
          unoptimized
          className="h-auto w-full"
        />
      </div>

      <figcaption
        className={`border-t border-white/8 px-4 text-sm leading-7 text-slate-300 ${
          compact ? "py-3" : "py-4"
        }`}
      >
        {screenshot.caption}
      </figcaption>
    </figure>
  );
}

export function ScreenshotGallery({
  title,
  screenshots,
  highlights,
}: ScreenshotGalleryProps) {
  const [primaryScreenshot, secondaryScreenshot] = screenshots;

  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-[32px] border border-border-strong bg-card/90 p-3 shadow-[0_28px_100px_rgba(4,6,15,0.4)] backdrop-blur-xl sm:p-4">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/26 to-transparent" />
        <div className="mb-4 flex items-center justify-between gap-3 px-1">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
              Visual Preview
            </p>
            <p className="mt-1 text-sm text-white/72">{title}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
            Selected Screens
          </span>
        </div>

        <ScreenshotCard screenshot={primaryScreenshot} priority />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] xl:items-stretch">
        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3 sm:p-4">
          <ScreenshotCard screenshot={secondaryScreenshot} compact />
        </div>

        <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
            System Highlights
          </p>
          <div className="mt-5 grid gap-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/48">
                  {highlight.label}
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {highlight.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
