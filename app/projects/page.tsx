import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export const revalidate = 86400;

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold uppercase tracking-wide">Projects</h1>
        <p className="text-muted-foreground text-sm mt-2">
          A collection of things I&apos;ve built over the years
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
