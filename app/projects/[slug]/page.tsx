import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { getProjectBySlug, getAllSlugs, getCloudinaryUrl } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const imageUrl = getCloudinaryUrl(project.image, 1200);

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/projects"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold uppercase">
            {project.name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {project.category} • {project.year}
          </p>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={project.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        <p className="">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.stacks.map((stack) => (
            <Badge key={stack} variant="outline">
              {stack}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {project.githubURL && (
            <Button asChild variant="outline">
              <Link
                href={project.githubURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                View Source
              </Link>
            </Button>
          )}
          {project.demoURL && (
            <Button asChild>
              <Link
                href={project.demoURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

