import { cache } from "react";
import { Project } from "./project-types";
import { projects as allProjects } from "@/data/projects";

export type { Project, ProjectImage } from "./project-types";
export { getCloudinaryUrl } from "./project-types";

export const getProjects = cache((): Project[] => {
  return [...allProjects].sort((a, b) => b.year - a.year);
});

export const getProjectBySlug = cache((slug: string): Project | undefined => {
  return allProjects.find((project) => project.slug === slug);
});

export const getAllSlugs = cache((): string[] => {
  return allProjects.map((project) => project.slug);
});
