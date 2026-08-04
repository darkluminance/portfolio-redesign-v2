import Link from "next/link";
import type { Metadata } from "next";
import { getWorkExperiences } from "@/lib/work-experience";
import { getSkills } from "@/lib/skills";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Résumé — Raiyan Abrar",
  description: "Curriculum Vitæ of Raiyan Abrar.",
};

const tag =
  "rounded-[40px] border border-line px-3 py-[5px] text-[12px] text-ink/80 transition-colors hover:border-brand hover:text-brand";

function SectionHead({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <b className="block font-label text-[13px] font-normal tracking-[0.14em] text-brand">
        {num}
      </b>
      <span className="mt-2.5 block font-label text-[10px] uppercase tracking-[0.2em] text-label">
        {label}
      </span>
    </div>
  );
}

export default function ResumePage() {
  const experiences = getWorkExperiences();
  const skills = getSkills();

  return (
    <>
      {/* Header */}
      <header className="pb-2 pt-16 md:pt-[76px]">
        <div className="klabel mb-[22px]">Curriculum Vitæ</div>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <h1 className="font-serif text-[46px] leading-[0.98] md:text-[64px]">
            {profile.name}
          </h1>
          <div className="text-left font-label text-[12.5px] leading-[1.9] text-label md:text-right">
            <div>
              {profile.role} — {profile.location}
            </div>
            <div>
              <a
                className="border-b border-line pb-px transition-colors hover:border-brand hover:text-brand"
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </a>
            </div>
            <div>
              <a
                className="border-b border-line pb-px transition-colors hover:border-brand hover:text-brand"
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.githubLabel}
              </a>{" "}
              ·{" "}
              <a
                className="border-b border-line pb-px transition-colors hover:border-brand hover:text-brand"
                href={profile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.websiteLabel}
              </a>
            </div>
          </div>
        </div>
        <p className="mb-14 mt-9 max-w-[820px] font-serif text-[19px] leading-[1.5] text-ink/85 md:text-[23px]">
          {profile.summary}
        </p>
      </header>

      {/* 01 Experience */}
      <section className="grid grid-cols-1 gap-4 border-t border-line py-12 md:grid-cols-[150px_1fr] md:gap-12 md:py-16">
        <SectionHead num="01" label="Experience" />
        <div>
          {experiences.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.startDate}`}
              className={
                i === 0
                  ? "pb-8"
                  : "border-t border-line pb-8 pt-8"
              }
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <div className="font-serif text-[23px] leading-[1.1] md:text-[26px]">
                  {exp.position}
                </div>
                <div className="whitespace-nowrap font-label text-[12px] text-label">
                  {exp.startDate} — {exp.endDate}
                </div>
              </div>
              <div className="mt-1.5 text-sm font-medium text-brand">
                {exp.company}
              </div>
              <div className="text-[13px] text-label">{exp.location}</div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {exp.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-[15px] leading-[1.7] text-ink/85"
                  >
                    <span className="flex-none text-brand">—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.stacks.map((s) => (
                  <span key={s} className={tag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 02 Skills */}
      <section className="grid grid-cols-1 gap-4 border-t border-line py-12 md:grid-cols-[150px_1fr] md:gap-12 md:py-16">
        <SectionHead num="02" label="Skills" />
        <div>
          {skills.map((cat) => (
            <div key={cat.category} className="mb-[26px] last:mb-0">
              <h4 className="mb-3 font-serif text-[20px]">{cat.category}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s} className={tag}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 Projects */}
      <section className="grid grid-cols-1 gap-4 border-t border-line py-12 md:grid-cols-[150px_1fr] md:gap-12 md:py-16">
        <SectionHead num="03" label="Projects" />
        <div>
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={
                i === 0 ? "pb-[26px]" : "border-t border-line py-[26px]"
              }
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="font-serif text-[24px]">{project.name}</div>
                <div className="whitespace-nowrap font-label text-[12px] text-label">
                  {project.year} · {project.stacks.slice(0, 3).join(" · ")}
                </div>
              </div>
              <p className="mt-2.5 max-w-[640px] text-[15px] leading-[1.7] text-ink/85">
                {project.description}
              </p>
              <div className="mt-3 flex gap-[18px] font-label text-[12px] font-medium tracking-[0.04em]">
                {project.demoURL && (
                  <Link
                    href={project.demoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-line pb-0.5 transition-colors hover:border-brand hover:text-brand"
                  >
                    Live ↗
                  </Link>
                )}
                {project.githubURL && (
                  <Link
                    href={project.githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-line pb-0.5 transition-colors hover:border-brand hover:text-brand"
                  >
                    GitHub ↗
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
