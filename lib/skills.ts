import { cache } from "react";
import { skills as allSkills, SkillCategory } from "@/data/skills";

export type { SkillCategory } from "@/data/skills";

export const getSkills = cache((): SkillCategory[] => {
  return allSkills;
});


