import Link from "next/link";
import { getWorkExperiences } from "@/lib/work-experience";
import { NumberedSection } from "./numbered-section";

/** "March 2026" | "Present" -> "2026" | "Present" */
function toYear(date: string): string {
  if (/present/i.test(date)) return "Present";
  const match = date.match(/\d{4}/);
  return match ? match[0] : date;
}

export function ExperienceList() {
  const experiences = getWorkExperiences();

  return (
    <NumberedSection num="01" label="Experience">
      <div>
        {experiences.map((exp, i) => (
          <Link
            key={`${exp.company}-${exp.startDate}`}
            href="/resume"
            className={`group flex items-start justify-between gap-6 border-t border-line py-7 transition-[padding] duration-200 hover:pl-3 ${
              i === experiences.length - 1 ? "border-b" : ""
            }`}
          >
            <div>
              <div className="font-serif text-[23px] leading-[1.05] transition-colors duration-200 group-hover:text-brand md:text-[30px]">
                {exp.position}
              </div>
              <div className="mt-2 text-sm text-label">{exp.company}</div>
            </div>
            <div className="whitespace-nowrap pt-3.5 font-label text-[12px] text-label">
              {toYear(exp.startDate)} — {toYear(exp.endDate)}
            </div>
          </Link>
        ))}
      </div>
    </NumberedSection>
  );
}
