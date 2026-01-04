"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skill, generateId } from "@/lib/resume-types";
import { Plus, Trash2, X } from "lucide-react";

interface SkillsFormProps {
    skills: Skill[];
    onChange: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
    const addCategory = () => {
        onChange([
            ...skills,
            {
                id: generateId(),
                category: "",
                skills: [],
            },
        ]);
    };

    const updateCategory = (id: string, category: string) => {
        onChange(
            skills.map((skill) =>
                skill.id === id ? { ...skill, category } : skill
            )
        );
    };

    const removeCategory = (id: string) => {
        onChange(skills.filter((skill) => skill.id !== id));
    };

    const addSkill = (categoryId: string, skillName: string) => {
        if (!skillName.trim()) return;
        onChange(
            skills.map((skill) =>
                skill.id === categoryId
                    ? { ...skill, skills: [...skill.skills, skillName.trim()] }
                    : skill
            )
        );
    };

    const removeSkill = (categoryId: string, skillIndex: number) => {
        onChange(
            skills.map((skill) =>
                skill.id === categoryId
                    ? {
                        ...skill,
                        skills: skill.skills.filter((_, i) => i !== skillIndex),
                    }
                    : skill
            )
        );
    };

    return (
        <div className="space-y-6">
            {skills.map((skillCategory) => (
                <div
                    key={skillCategory.id}
                    className="relative space-y-4 border border-border p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1 space-y-2">
                            <Label>Category Name</Label>
                            <Input
                                placeholder="e.g., Programming Languages"
                                value={skillCategory.category}
                                onChange={(e) =>
                                    updateCategory(skillCategory.id, e.target.value)
                                }
                            />
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => removeCategory(skillCategory.id)}
                            className="ml-2 text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label>Skills</Label>
                        <div className="flex flex-wrap gap-2">
                            {skillCategory.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 border border-border bg-muted px-2 py-1 text-xs"
                                >
                                    <span>{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skillCategory.id, index)}
                                        className="ml-1 text-muted-foreground hover:text-destructive"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Type a skill and press Enter"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const input = e.currentTarget;
                                        addSkill(skillCategory.id, input.value);
                                        input.value = "";
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                    const input = e.currentTarget
                                        .previousElementSibling as HTMLInputElement;
                                    addSkill(skillCategory.id, input.value);
                                    input.value = "";
                                }}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addCategory}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill Category
            </Button>
        </div>
    );
}
