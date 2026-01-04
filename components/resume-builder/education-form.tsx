"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Education, generateId } from "@/lib/resume-types";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface EducationFormProps {
    education: Education[];
    onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
    const addEducation = () => {
        onChange([
            ...education,
            {
                id: generateId(),
                school: "",
                location: "",
                degree: "",
                startDate: "",
                endDate: "",
                achievements: [],
            },
        ]);
    };

    const updateEducation = (
        id: string,
        field: keyof Education,
        value: string | string[]
    ) => {
        onChange(
            education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        );
    };

    const removeEducation = (id: string) => {
        onChange(education.filter((edu) => edu.id !== id));
    };

    const addAchievement = (eduId: string) => {
        onChange(
            education.map((edu) =>
                edu.id === eduId
                    ? { ...edu, achievements: [...edu.achievements, ""] }
                    : edu
            )
        );
    };

    const updateAchievement = (eduId: string, index: number, value: string) => {
        onChange(
            education.map((edu) =>
                edu.id === eduId
                    ? {
                        ...edu,
                        achievements: edu.achievements.map((ach, i) =>
                            i === index ? value : ach
                        ),
                    }
                    : edu
            )
        );
    };

    const removeAchievement = (eduId: string, index: number) => {
        onChange(
            education.map((edu) =>
                edu.id === eduId
                    ? {
                        ...edu,
                        achievements: edu.achievements.filter((_, i) => i !== index),
                    }
                    : edu
            )
        );
    };

    return (
        <div className="space-y-6">
            {education.map((edu, eduIndex) => (
                <div
                    key={edu.id}
                    className="relative space-y-4 border border-border p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <GripVertical className="h-4 w-4" />
                            <span className="text-sm font-medium">
                                Education {eduIndex + 1}
                            </span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => removeEducation(edu.id)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>School / University</Label>
                            <Input
                                placeholder="University Name"
                                value={edu.school}
                                onChange={(e) =>
                                    updateEducation(edu.id, "school", e.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                placeholder="City, Country"
                                value={edu.location}
                                onChange={(e) =>
                                    updateEducation(edu.id, "location", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input
                            placeholder="Bachelor of Science in Computer Science"
                            value={edu.degree}
                            onChange={(e) =>
                                updateEducation(edu.id, "degree", e.target.value)
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                                placeholder="Sept 2018"
                                value={edu.startDate}
                                onChange={(e) =>
                                    updateEducation(edu.id, "startDate", e.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                placeholder="May 2022"
                                value={edu.endDate}
                                onChange={(e) =>
                                    updateEducation(edu.id, "endDate", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Achievements / Activities (Optional)</Label>
                        <div className="space-y-2">
                            {edu.achievements.map((achievement, achIndex) => (
                                <div key={achIndex} className="flex items-center gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <Input
                                        placeholder="Dean's List, Club President, etc."
                                        value={achievement}
                                        onChange={(e) =>
                                            updateAchievement(edu.id, achIndex, e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => removeAchievement(edu.id, achIndex)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => addAchievement(edu.id)}
                            className="mt-2"
                        >
                            <Plus className="mr-1 h-3 w-3" />
                            Add achievement
                        </Button>
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addEducation}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
            </Button>
        </div>
    );
}
