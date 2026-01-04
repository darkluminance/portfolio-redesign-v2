"use client";

import { ResumeData } from "@/lib/resume-types";
import { LinkIcon } from "lucide-react";

interface ResumePreviewProps {
    data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
    const { personalInfo, includeSummary, summary, experiences, skills, projects, education, customSections } = data;

    const hasContent = personalInfo.name || experiences.length > 0 || skills.length > 0 ||
        projects.length > 0 || education.length > 0;

    if (!hasContent) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                <p>Start filling the form to see your resume preview</p>
            </div>
        );
    }

    return (
        <div
            id="resume-preview"
            className="resume-preview p-8 text-[10pt] leading-snug font-serif flex flex-col gap-2"
            style={{
                fontFamily: "'Computer Modern Serif', 'Latin Modern Roman', 'CMU Serif', serif",
                backgroundColor: "#ffffff",
                color: "#000000",
                letterSpacing: "0px"
            }}
        >
            {/* Header */}
            <div className="text-center mb-2">
                {personalInfo.name && (
                    <h1 className="text-3xl font-bold mb-1">{personalInfo.name}</h1>
                )}
                <div className="flex flex-wrap justify-center items-center gap-x-1 text-[10pt]">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.location && personalInfo.phone && <span>|</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {(personalInfo.location || personalInfo.phone) && personalInfo.email && <span>|</span>}
                    {personalInfo.email && (
                        <a href={`mailto:${personalInfo.email}`} className="underline">
                            {personalInfo.email}
                        </a>
                    )}
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-1 text-[10pt] mt-0.5">
                    {personalInfo.portfolio && (
                        <a href={`https://${personalInfo.portfolio.replace(/^https?:\/\//, '')}`} className="underline">
                            {personalInfo.portfolio.replace(/^https?:\/\//, '')}
                        </a>
                    )}
                    {personalInfo.portfolio && personalInfo.linkedin && <span>|</span>}
                    {personalInfo.linkedin && (
                        <a href={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} className="underline">
                            {personalInfo.linkedin.replace(/^https?:\/\//, '')}
                        </a>
                    )}
                    {personalInfo.linkedin && personalInfo.github && <span>|</span>}
                    {personalInfo.github && (
                        <a href={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} className="underline">
                            {personalInfo.github.replace(/^https?:\/\//, '')}
                        </a>
                    )}
                </div>
            </div>

            {/* Summary */}
            {includeSummary && summary && (
                <div className="mb-3">
                    <h2 className="resume-section-title">Summary</h2>
                    <p className="text-[10pt]">{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
                <div className="mb-3">
                    <h2 className="resume-section-title">Experience</h2>
                    <div className="space-y-2 ml-4">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="mb-2">
                                <div className="flex justify-between items-start">
                                    <span className="font-bold">{exp.title}</span>
                                    <span className="text-[10pt] shrink-0">
                                        {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.endDate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="text-[10pt] italic">{exp.company}</span>
                                    <span className="text-[10pt] italic shrink-0">{exp.location}</span>
                                </div>
                                {exp.bulletPoints.filter(bp => bp.trim()).length > 0 && (
                                    <ul className="list-disc ml-8 mt-1 space-y-0.5">
                                        {exp.bulletPoints.filter(bp => bp.trim()).map((bp, i) => (
                                            <li key={i} className="text-[10pt]">{bp}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <div className="mb-3">
                    <h2 className="resume-section-title">Skills</h2>
                    <div className="space-y-0.5 ml-4">
                        {skills.map((skill) => (
                            <div key={skill.id} className="text-[10pt]">
                                {skill.category && <span className="font-bold">{skill.category}: </span>}
                                {skill.skills.join(', ')}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <div className="mb-3">
                    <h2 className="resume-section-title">Projects</h2>
                    <div className="space-y-2 ml-4">
                        {projects.map((proj) => (
                            <div key={proj.id} className="mb-1">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-1 text-md font-bold">
                                        {proj.link ? (
                                            <a href={proj.link.startsWith("http") ? proj.link : `https://${proj.link}`}>
                                                {proj.name} <LinkIcon className="h-2.5 w-2.5 inline" />
                                            </a>
                                        ) : (
                                            <span>{proj.name}</span>
                                        )}
                                    </div>
                                    {proj.technologies && (
                                        <span className="text-[10pt] italic shrink-0">{proj.technologies}</span>
                                    )}
                                </div>
                                {proj.bulletPoints.filter(bp => bp.trim()).length > 0 && (
                                    <ul className="list-disc ml-8 mt-1 space-y-0.5">
                                        {proj.bulletPoints.filter(bp => bp.trim()).map((bp, i) => (
                                            <li key={i} className="text-[10pt]">{bp}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {education.length > 0 && (
                <div className="mb-3">
                    <h2 className="resume-section-title">Education</h2>
                    <div className="space-y-2 ml-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-start">
                                    <span className="font-bold">{edu.school}</span>
                                    <span className="text-[10pt] shrink-0">{edu.location}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="text-[10pt] italic">{edu.degree}</span>
                                    <span className="text-[10pt] italic shrink-0">
                                        {edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}
                                    </span>
                                </div>
                                {edu.achievements.filter(a => a.trim()).length > 0 && (
                                    <ul className="list-disc ml-8 mt-1 space-y-0.5">
                                        {edu.achievements.filter(a => a.trim()).map((achievement, i) => (
                                            <li key={i} className="text-[10pt]">{achievement}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Custom Sections */}
            {customSections.map((section) => (
                section.title && section.items.length > 0 && (
                    <div key={section.id} className="mb-3">
                        <h2 className="resume-section-title">
                            {section.title}
                        </h2>
                        <ul className="list-disc ml-4 space-y-0.5">
                            {section.items.filter(item => item.content.trim()).map((item) => (
                                <li key={item.id} className="text-[10pt]">{item.content}</li>
                            ))}
                        </ul>
                    </div>
                )
            ))}
        </div>
    );
}
