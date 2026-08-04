import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { getCloudinaryUrl } from "@/lib/project-types";
import { NumberedSection } from "./numbered-section";

export function SelectedWork() {
  const selected = projects.slice(0, 3);

  return (
    <NumberedSection num="02" label="Selected Work">
      <div>
        <div className="relative">
          {selected.map((project, i) => (
            <Link
              key={project.slug}
              href={project.demoURL || project.githubURL || "/projects"}
              {...(project.demoURL || project.githubURL
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`group relative flex items-center gap-5 border-t border-line py-8 transition-[padding] duration-200 hover:pl-3.5 ${
                i === selected.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="font-label text-[12px] text-label">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-[25px] leading-none transition-colors duration-200 group-hover:text-brand md:text-[36px]">
                {project.name}
              </span>

              {/* Live preview card (desktop only) */}
              <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[200px] w-80 -translate-y-1/2 translate-x-6 scale-[0.97] overflow-hidden rounded-lg border border-line opacity-0 shadow-[0_24px_48px_-22px_rgba(0,0,0,0.35)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100 md:block">
                <Image
                  src={getCloudinaryUrl(project.image, 640)}
                  alt={project.name}
                  fill
                  sizes="320px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/projects"
          className="mt-10 inline-flex w-fit items-center gap-2.5 border-b border-ink pb-[5px] text-sm font-medium transition-all duration-200 hover:gap-4 hover:border-brand hover:text-brand"
        >
          See all projects <span>→</span>
        </Link>
      </div>
    </NumberedSection>
  );
}
