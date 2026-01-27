"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormattableTextarea } from "@/components/resume-builder/formattable-textarea";
import { WorkExperience, generateId } from "@/lib/resume-types";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ExperienceFormProps {
    experiences: WorkExperience[];
    onChange: (experiences: WorkExperience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
    const addExperience = () => {
        onChange([
            ...experiences,
            {
                id: generateId(),
                company: "",
                title: "",
                location: "",
                startDate: "",
                endDate: "",
                bulletPoints: [""],
            },
        ]);
    };

    const updateExperience = (
        id: string,
        field: keyof WorkExperience,
        value: string | string[]
    ) => {
        onChange(
            experiences.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        );
    };

    const removeExperience = (id: string) => {
        onChange(experiences.filter((exp) => exp.id !== id));
    };

    const addBulletPoint = (expId: string) => {
        onChange(
            experiences.map((exp) =>
                exp.id === expId
                    ? { ...exp, bulletPoints: [...exp.bulletPoints, ""] }
                    : exp
            )
        );
    };

    const updateBulletPoint = (expId: string, index: number, value: string) => {
        onChange(
            experiences.map((exp) =>
                exp.id === expId
                    ? {
                        ...exp,
                        bulletPoints: exp.bulletPoints.map((bp, i) =>
                            i === index ? value : bp
                        ),
                    }
                    : exp
            )
        );
    };

    const removeBulletPoint = (expId: string, index: number) => {
        onChange(
            experiences.map((exp) =>
                exp.id === expId
                    ? {
                        ...exp,
                        bulletPoints: exp.bulletPoints.filter((_, i) => i !== index),
                    }
                    : exp
            )
        );
    };

    return (
        <div className="space-y-6">
            {experiences.map((exp, expIndex) => (
                <div
                    key={exp.id}
                    className="relative space-y-4 border border-border p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <GripVertical className="h-4 w-4" />
                            <span className="text-sm font-medium">
                                Experience {expIndex + 1}
                            </span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => removeExperience(exp.id)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Job Title</Label>
                            <Input
                                placeholder="Software Engineer"
                                value={exp.title}
                                onChange={(e) =>
                                    updateExperience(exp.id, "title", e.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={(e) =>
                                    updateExperience(exp.id, "company", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                placeholder="City, Country"
                                value={exp.location}
                                onChange={(e) =>
                                    updateExperience(exp.id, "location", e.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                                placeholder="Jan 2022"
                                value={exp.startDate}
                                onChange={(e) =>
                                    updateExperience(exp.id, "startDate", e.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                placeholder="Present"
                                value={exp.endDate}
                                onChange={(e) =>
                                    updateExperience(exp.id, "endDate", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Key Achievements / Responsibilities</Label>
                        <div className="space-y-2">
                            {exp.bulletPoints.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="flex items-start gap-2">
                                    <span className="mt-2 text-muted-foreground">•</span>
                                    <FormattableTextarea
                                        placeholder="Describe your achievement or responsibility..."
                                        value={bullet}
                                        onChange={(e) =>
                                            updateBulletPoint(exp.id, bulletIndex, e.target.value)
                                        }
                                        rows={2}
                                        className="flex-1"
                                    />
                                    {exp.bulletPoints.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-xs"
                                            onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                                            className="mt-1 text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => addBulletPoint(exp.id)}
                            className="mt-2"
                        >
                            <Plus className="mr-1 h-3 w-3" />
                            Add bullet point
                        </Button>
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addExperience}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Work Experience
            </Button>
        </div>
    );
}
