import type { ProjectLink } from "@/data/projects";

type LiveLinksBarProps = {
  links: ProjectLink[];
  compact?: boolean;
};

function getAnchorProps(href: string) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  return isExternal
    ? { target: "_blank", rel: "noreferrer" }
    : {};
}

export function LiveLinksBar({
  links,
  compact = false,
}: LiveLinksBarProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "" : "pt-1"}`}>
      {links.map((link) => {
        const baseClass =
          link.variant === "primary"
            ? "bg-[linear-gradient(135deg,#f8fbff_0%,#d9e8ff_100%)] text-slate-950"
            : link.variant === "secondary"
              ? "border border-white/10 bg-white/[0.03] text-white/88"
              : "border border-transparent bg-transparent text-white/72";

        const hoverClass =
          link.disabled
            ? "cursor-not-allowed opacity-50"
            : link.variant === "ghost"
              ? "hover:text-white"
              : "hover:translate-y-[-1px] hover:border-white/16 hover:bg-white/[0.06]";

        const commonClass = [
          "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition duration-200",
          compact ? "px-3.5 py-2 text-sm" : "",
          baseClass,
          hoverClass,
        ]
          .filter(Boolean)
          .join(" ");

        if (link.disabled) {
          return (
            <span key={link.label} className={commonClass} aria-disabled="true">
              <span>{link.label}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-white/58">
                Pending
              </span>
            </span>
          );
        }

        return (
          <a
            key={link.label}
            href={link.href}
            className={commonClass}
            {...getAnchorProps(link.href)}
          >
            <span>{link.label}</span>
            {link.variant !== "ghost" ? (
              <span
                className={
                  link.variant === "primary" ? "text-slate-500" : "text-white/50"
                }
              >
                ↗
              </span>
            ) : null}
          </a>
        );
      })}
    </div>
  );
}
