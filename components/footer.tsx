import { siteConfig } from "@/data/site";

const footerLinks = [
  { label: "Proof", href: "#proof" },
  { label: "Projects", href: "#projects" },
  { label: "Strengths", href: "#strengths" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 pb-8 pt-8 sm:pb-10 sm:pt-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-white/72">{siteConfig.title}</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {siteConfig.footerNote}
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          <nav className="flex flex-wrap gap-2 text-sm">
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-white/76 transition duration-200 hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="text-xs uppercase tracking-[0.22em] text-white/42">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
