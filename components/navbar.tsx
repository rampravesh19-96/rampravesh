import Link from "next/link";

import { siteConfig } from "@/data/site";

const navigationItems = [
  { label: "Projects", href: "#projects" },
  { label: "Proof", href: "#proof" },
  { label: "Resume", href: siteConfig.links.resume },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
];

function getAnchorProps(href: string) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  return isExternal
    ? { target: "_blank", rel: "noreferrer" }
    : {};
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 pt-4 sm:pt-6">
      <div className="rounded-[28px] border border-border-subtle bg-surface/85 px-4 py-3 shadow-[0_24px_80px_rgba(5,8,20,0.42)] backdrop-blur-xl sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.08] text-sm font-semibold tracking-[0.2em] text-white">
              RP
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {siteConfig.name}
              </p>
              <p className="hidden truncate text-xs text-muted sm:block">
                {siteConfig.title}
              </p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
            {navigationItems.map((item) => {
              const props = getAnchorProps(item.href);
              const isPrimary = item.label === "Resume";

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={
                    isPrimary
                      ? "rounded-full bg-[linear-gradient(135deg,#f8fbff_0%,#d9e8ff_100%)] px-4 py-2.5 font-medium text-slate-950 transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_18px_40px_rgba(176,204,255,0.2)]"
                      : "rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-white/82 transition duration-200 hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
                  }
                  {...props}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
