import fs from "fs";
import path from "path";
import { cache } from "react";
import { Project } from "./project-types";

export type { Project, ProjectImage } from "./project-types";
export { getCloudinaryUrl } from "./project-types";

const projectsDirectory = path.join(process.cwd(), "data/projects");

export const getProjects = cache((): Project[] => {
  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as Project;
    });

  return projects.sort((a, b) => b.year - a.year);
});

export const getProjectBySlug = cache((slug: string): Project | undefined => {
  const filePath = path.join(projectsDirectory, `${slug}.json`);
  
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents) as Project;
});

export const getAllSlugs = cache((): string[] => {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => fileName.replace(/\.json$/, ""));
});
