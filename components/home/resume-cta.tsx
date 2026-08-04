import Link from "next/link";
import { NumberedSection } from "./numbered-section";

export function ResumeCta() {
  return (
    <NumberedSection num="03" label="Résumé">
      <div className="flex flex-wrap items-center justify-between gap-10">
        <div>
          <div className="font-serif text-[36px] leading-[1.1]">
            The full story.
          </div>
          <div className="mt-2.5 max-w-[360px] text-[15px] leading-[1.6] text-label">
            Detailed experience, skills, projects, education and more — on one
            considered page.
          </div>
        </div>
        <Link
          href="/resume"
          className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-[40px] border border-ink px-6 py-3.5 text-sm font-medium transition-all duration-200 hover:bg-ink hover:text-paper"
        >
          Read the résumé{" "}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </NumberedSection>
  );
}
