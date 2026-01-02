import { cache } from "react";
import { workExperiences as allWorkExperiences, WorkExperience } from "@/data/work-experience";

export type { WorkExperience } from "@/data/work-experience";

export const getWorkExperiences = cache((): WorkExperience[] => {
  return [...allWorkExperiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB.getTime() - dateA.getTime();
  });
});


