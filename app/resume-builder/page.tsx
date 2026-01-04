"use client";

import { useState } from "react";
import { ResumeData, createEmptyResumeData } from "@/lib/resume-types";
import { PersonalInfoForm } from "@/components/resume-builder/personal-info-form";
import { SummaryForm } from "@/components/resume-builder/summary-form";
import { ExperienceForm } from "@/components/resume-builder/experience-form";
import { SkillsForm } from "@/components/resume-builder/skills-form";
import { ProjectsForm } from "@/components/resume-builder/projects-form";
import { EducationForm } from "@/components/resume-builder/education-form";
import { CustomSectionForm } from "@/components/resume-builder/custom-section-form";
import { ResumePreview } from "@/components/resume-builder/resume-preview";
import { DownloadButton } from "@/components/resume-builder/download-button";
import { PresetManager } from "@/components/resume-builder/preset-manager";
import {
    ChevronDown,
    ChevronRight,
    User,
    FileText,
    Briefcase,
    Code,
    FolderKanban,
    GraduationCap,
    Plus,
    Home,
} from "lucide-react";
import Link from "next/link";

interface SectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: SectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-border">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-medium">{title}</span>
                </div>
                {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
            </button>
            {isOpen && <div className="border-t border-border p-4">{children}</div>}
        </div>
    );
}

export default function ResumeBuilderPage() {
    const [resumeData, setResumeData] = useState<ResumeData>(createEmptyResumeData());

    return (
        <div className="flex min-h-screen flex-col gap-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Home className="h-4 w-4" /> <span className="text-sm">Go back Home</span>
            </Link>
            <div className="flex flex-col gap-4 border-b border-border bg-background py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-semibold">Resume Builder</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <PresetManager
                        data={resumeData}
                        onLoad={(data) => setResumeData(data)}
                    />
                    <DownloadButton
                        data={resumeData}
                        fileName={resumeData.personalInfo.name || "Resume"}
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
                <div className="w-full overflow-y-auto border-r-0 border-b border-border bg-background lg:w-1/2 lg:border-r lg:border-b-0">
                    <div className="p-3 space-y-2 sm:p-4">
                    <CollapsibleSection
                        title="Personal Information"
                        icon={<User className="h-4 w-4 text-muted-foreground" />}
                        defaultOpen={true}
                    >
                        <PersonalInfoForm
                            data={resumeData.personalInfo}
                            onChange={(personalInfo) =>
                                setResumeData((prev) => ({ ...prev, personalInfo }))
                            }
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Summary"
                        icon={<FileText className="h-4 w-4 text-muted-foreground" />}
                    >
                        <SummaryForm
                            summary={resumeData.summary}
                            includeSummary={resumeData.includeSummary}
                            onSummaryChange={(summary) =>
                                setResumeData((prev) => ({ ...prev, summary }))
                            }
                            onToggle={(includeSummary) =>
                                setResumeData((prev) => ({ ...prev, includeSummary }))
                            }
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Work Experience"
                        icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
                    >
                        <ExperienceForm
                            experiences={resumeData.experiences}
                            onChange={(experiences) =>
                                setResumeData((prev) => ({ ...prev, experiences }))
                            }
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Skills"
                        icon={<Code className="h-4 w-4 text-muted-foreground" />}
                    >
                        <SkillsForm
                            skills={resumeData.skills}
                            onChange={(skills) =>
                                setResumeData((prev) => ({ ...prev, skills }))
                            }
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Projects"
                        icon={<FolderKanban className="h-4 w-4 text-muted-foreground" />}
                    >
                        <ProjectsForm
                            projects={resumeData.projects}
                            onChange={(projects) =>
                                setResumeData((prev) => ({ ...prev, projects }))
                            }
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Education"
                        icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
                    >
                        <EducationForm
                            education={resumeData.education}
                            onChange={(education) =>
                                setResumeData((prev) => ({ ...prev, education }))
                            }
                        />
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Custom Sections"
                        icon={<Plus className="h-4 w-4 text-muted-foreground" />}
                    >
                        <CustomSectionForm
                            customSections={resumeData.customSections}
                            onChange={(customSections) =>
                                setResumeData((prev) => ({ ...prev, customSections }))
                            }
                        />
                    </CollapsibleSection>
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col bg-muted/30">
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background p-4">
                        <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 flex justify-center xl:p-8">
                        <div className="w-full max-w-[210mm] shadow-lg">
                            <ResumePreview data={resumeData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
