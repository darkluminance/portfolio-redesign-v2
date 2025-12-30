import fs from "fs";
import path from "path";
import { cache } from "react";
import { buildCloudinaryImageUrl } from "./cloudinary";

export interface ProjectImage {
  version: number;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export interface Project {
  name: string;
  slug: string;
  category: string;
  year: number;
  description: string;
  githubURL: string;
  demoURL: string;
  stacks: string[];
  image: ProjectImage;
}

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

export function getCloudinaryUrl(image: ProjectImage, width: number = 600): string {
  return buildCloudinaryImageUrl(
    image.version,
    image.public_id,
    image.format,
    `c_thumb,w_${width}`
  );
}
