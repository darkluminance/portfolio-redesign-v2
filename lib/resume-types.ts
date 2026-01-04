export interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio?: string;
}

export interface WorkExperience {
    id: string;
    company: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    bulletPoints: string[];
}

export interface Skill {
    id: string;
    category: string;
    skills: string[];
}

export interface Project {
    id: string;
    name: string;
    link?: string;
    technologies: string;
    bulletPoints: string[];
}

export interface Education {
    id: string;
    school: string;
    location: string;
    degree: string;
    startDate: string;
    endDate: string;
    achievements: string[];
}

export interface CustomSectionItem {
    id: string;
    content: string;
}

export interface CustomSection {
    id: string;
    title: string;
    items: CustomSectionItem[];
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    includeSummary: boolean;
    summary: string;
    experiences: WorkExperience[];
    skills: Skill[];
    projects: Project[];
    education: Education[];
    customSections: CustomSection[];
}

export const createEmptyResumeData = (): ResumeData => ({
    personalInfo: {
        name: "",
        email: "",
        phone: "",
        location: "",
        github: "",
        linkedin: "",
        portfolio: "",
    },
    includeSummary: false,
    summary: "",
    experiences: [],
    skills: [],
    projects: [],
    education: [],
    customSections: [],
});

export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
};
