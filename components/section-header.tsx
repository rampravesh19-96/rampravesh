type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent/80">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.15rem]">
        {title}
      </h2>
      <p className="mt-5 text-balance text-base leading-8 text-slate-300 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
