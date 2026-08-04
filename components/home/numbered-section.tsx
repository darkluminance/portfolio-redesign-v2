interface NumberedSectionProps {
  num: string;
  label: string;
  children: React.ReactNode;
}

/** Full-viewport home section with a ghost numeral and the numbered spine column. */
export function NumberedSection({ num, label, children }: NumberedSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col justify-center border-t border-line py-24 md:py-[120px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1.5 top-[-22px] select-none font-serif text-[92px] leading-none text-ink/5 md:left-[34px] md:top-[-40px] md:text-[160px]"
      >
        {num}
      </div>
      <div className="relative z-[1] grid grid-cols-1 gap-[18px] md:grid-cols-[140px_1fr] md:gap-12">
        <div className="relative md:before:absolute md:before:bottom-[-52px] md:before:left-[-2px] md:before:top-[26px] md:before:w-px md:before:bg-line md:before:content-['']">
          <b className="block font-label text-[13px] font-normal tracking-[0.14em] text-brand">
            {num}
          </b>
          <span className="mt-2.5 block font-label text-[10px] uppercase tracking-[0.2em] text-label">
            {label}
          </span>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
