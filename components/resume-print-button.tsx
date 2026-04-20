"use client";

export function ResumePrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f8fbff_0%,#d9e8ff_100%)] px-4 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_18px_40px_rgba(176,204,255,0.2)]"
    >
      Print / Save PDF
    </button>
  );
}
