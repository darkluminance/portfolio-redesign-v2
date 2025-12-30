import fs from "fs";
import path from "path";
import { cache } from "react";

export interface SkillCategory {
  category: string;
  order: number;
  skills: string[];
}

const skillsDirectory = path.join(process.cwd(), "data/skills");

export const getSkills = cache((): SkillCategory[] => {
  const fileNames = fs.readdirSync(skillsDirectory);
  const categories = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(skillsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as SkillCategory;
    });

  return categories.sort((a, b) => a.order - b.order);
});

