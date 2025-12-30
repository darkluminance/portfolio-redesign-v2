import Image from "next/image";
import Link from "next/link";
import { Project, getCloudinaryUrl } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = getCloudinaryUrl(project.image, 600);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/projects/${project.slug}`}
        className="block aspect-square relative overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      >
        <Image
          src={imageUrl}
          alt={project.name}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold uppercase">
            {project.name}
          </h3>
          <span>{project.year}</span>
        </div>
        <p className="text-md text-muted-foreground">
          {project.category}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground mt-1">
          {project.stacks.map((stack) => (
            <span key={stack} className="flex items-center gap-1">
              <span>•</span>
              <span>{stack}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
