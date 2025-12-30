import fs from "fs";
import path from "path";
import { cache } from "react";

export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  stacks: string[];
}

const workExperienceDirectory = path.join(process.cwd(), "data/work-experience");

export const getWorkExperiences = cache((): WorkExperience[] => {
  const fileNames = fs.readdirSync(workExperienceDirectory);
  const experiences = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(workExperienceDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as WorkExperience;
    });

  return experiences.sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
});


