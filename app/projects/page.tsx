import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { getCloudinaryUrl } from "@/lib/project-types";

export const metadata: Metadata = {
  title: "Projects — Raiyan Abrar",
  description: "Selected & personal builds by Raiyan Abrar.",
};

export const revalidate = 86400;

export default function ProjectsPage() {
  return (
    <>
      <header className="flex flex-col items-start justify-between gap-8 pb-5 pt-16 md:flex-row md:items-end md:pt-[88px]">
        <div>
          <div className="klabel mb-[22px]">Selected &amp; personal builds</div>
          <h1 className="font-serif text-[46px] leading-[0.95] md:text-[72px]">
            Projects
          </h1>
        </div>
        <div className="klabel">
          {String(projects.length).padStart(2, "0")} / works
        </div>
      </header>

      {projects.map((project, i) => {
        const mediaRight = i % 2 === 1;
        return (
          <section
            key={project.slug}
            className="grid grid-cols-1 items-center gap-7 border-t border-line py-12 md:grid-cols-2 md:gap-14 md:py-20"
          >
            <div
              className={`relative aspect-[16/10] overflow-hidden rounded-[10px] border border-line shadow-[0_30px_60px_-34px_rgba(0,0,0,0.4)] ${
                mediaRight ? "md:order-2" : ""
              }`}
            >
              <Image
                src={getCloudinaryUrl(project.image, 1000)}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <div className="font-label text-[12px] tracking-[0.14em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h2 className="mt-3.5 font-serif text-[30px] leading-[1.02] md:text-[42px]">
                {project.name}
              </h2>
              <div className="mt-3.5 font-label text-[11.5px] uppercase tracking-[0.06em] text-label">
                {project.year} — {project.category}
              </div>
              <p className="mt-5 max-w-[460px] text-[16px] leading-[1.8] text-ink/85">
                {project.description}
              </p>
              <div className="mt-[22px] flex flex-wrap gap-2">
                {project.stacks.map((s) => (
                  <span
                    key={s}
                    className="rounded-[40px] border border-line px-3 py-[5px] text-[12px] text-ink/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-[26px] flex gap-[22px] font-label text-[13px] font-medium">
                {project.demoURL && (
                  <Link
                    href={project.demoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-ink pb-[3px] transition-colors hover:border-brand hover:text-brand"
                  >
                    Live ↗
                  </Link>
                )}
                {project.githubURL && (
                  <Link
                    href={project.githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-ink pb-[3px] transition-colors hover:border-brand hover:text-brand"
                  >
                    GitHub ↗
                  </Link>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
