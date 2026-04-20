import type { ReactNode } from "react";

type LayoutShellProps = {
  children: ReactNode;
};

export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-[-18rem] h-[32rem] bg-[radial-gradient(circle_at_top,rgba(139,215,255,0.22),transparent_52%)] blur-3xl" />
        <div className="absolute left-[-10rem] top-1/3 h-[22rem] w-[22rem] rounded-full bg-[rgba(83,179,255,0.08)] blur-[120px]" />
        <div className="absolute right-[-12rem] top-28 h-[28rem] w-[28rem] rounded-full bg-[rgba(62,121,255,0.08)] blur-[140px]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
