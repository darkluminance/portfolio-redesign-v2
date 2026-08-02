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

const toStringArray = (value: unknown): string[] =>
    Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

const asString = (value: unknown, fallback = ""): string =>
    typeof value === "string" ? value : fallback;

/**
 * Leniently coerce arbitrary parsed JSON into a valid ResumeData.
 * Missing fields fall back to an empty template, wrong-typed fields are
 * ignored, and array items are guaranteed a stable `id`. Never throws.
 */
export const normalizeResumeData = (input: unknown): ResumeData => {
    const base = createEmptyResumeData();
    if (typeof input !== "object" || input === null) return base;
    const raw = input as Record<string, unknown>;

    if (typeof raw.personalInfo === "object" && raw.personalInfo !== null) {
        const p = raw.personalInfo as Record<string, unknown>;
        base.personalInfo = {
            name: asString(p.name),
            email: asString(p.email),
            phone: asString(p.phone),
            location: asString(p.location),
            github: asString(p.github),
            linkedin: asString(p.linkedin),
            portfolio: asString(p.portfolio),
        };
    }

    if (typeof raw.includeSummary === "boolean") base.includeSummary = raw.includeSummary;
    if (typeof raw.summary === "string") base.summary = raw.summary;

    if (Array.isArray(raw.experiences)) {
        base.experiences = raw.experiences.map((item): WorkExperience => {
            const e = (item ?? {}) as Record<string, unknown>;
            return {
                id: asString(e.id) || generateId(),
                company: asString(e.company),
                title: asString(e.title),
                location: asString(e.location),
                startDate: asString(e.startDate),
                endDate: asString(e.endDate),
                bulletPoints: toStringArray(e.bulletPoints),
            };
        });
    }

    if (Array.isArray(raw.skills)) {
        base.skills = raw.skills.map((item): Skill => {
            const s = (item ?? {}) as Record<string, unknown>;
            return {
                id: asString(s.id) || generateId(),
                category: asString(s.category),
                skills: toStringArray(s.skills),
            };
        });
    }

    if (Array.isArray(raw.projects)) {
        base.projects = raw.projects.map((item): Project => {
            const p = (item ?? {}) as Record<string, unknown>;
            return {
                id: asString(p.id) || generateId(),
                name: asString(p.name),
                link: asString(p.link),
                technologies: asString(p.technologies),
                bulletPoints: toStringArray(p.bulletPoints),
            };
        });
    }

    if (Array.isArray(raw.education)) {
        base.education = raw.education.map((item): Education => {
            const ed = (item ?? {}) as Record<string, unknown>;
            return {
                id: asString(ed.id) || generateId(),
                school: asString(ed.school),
                location: asString(ed.location),
                degree: asString(ed.degree),
                startDate: asString(ed.startDate),
                endDate: asString(ed.endDate),
                achievements: toStringArray(ed.achievements),
            };
        });
    }

    if (Array.isArray(raw.customSections)) {
        base.customSections = raw.customSections.map((item): CustomSection => {
            const c = (item ?? {}) as Record<string, unknown>;
            const items = Array.isArray(c.items) ? c.items : [];
            return {
                id: asString(c.id) || generateId(),
                title: asString(c.title),
                items: items.map((it): CustomSectionItem => {
                    const i = (it ?? {}) as Record<string, unknown>;
                    return {
                        id: asString(i.id) || generateId(),
                        content: asString(i.content),
                    };
                }),
            };
        });
    }

    return base;
};
