"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormattableTextarea } from "@/components/resume-builder/formattable-textarea";
import { Project, generateId } from "@/lib/resume-types";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ProjectsFormProps {
    projects: Project[];
    onChange: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
    const addProject = () => {
        onChange([
            ...projects,
            {
                id: generateId(),
                name: "",
                link: "",
                technologies: "",
                bulletPoints: [""],
            },
        ]);
    };

    const updateProject = (
        id: string,
        field: keyof Project,
        value: string | string[]
    ) => {
        onChange(
            projects.map((proj) =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        );
    };

    const removeProject = (id: string) => {
        onChange(projects.filter((proj) => proj.id !== id));
    };

    const addBulletPoint = (projId: string) => {
        onChange(
            projects.map((proj) =>
                proj.id === projId
                    ? { ...proj, bulletPoints: [...proj.bulletPoints, ""] }
                    : proj
            )
        );
    };

    const updateBulletPoint = (projId: string, index: number, value: string) => {
        onChange(
            projects.map((proj) =>
                proj.id === projId
                    ? {
                        ...proj,
                        bulletPoints: proj.bulletPoints.map((bp, i) =>
                            i === index ? value : bp
                        ),
                    }
                    : proj
            )
        );
    };

    const removeBulletPoint = (projId: string, index: number) => {
        onChange(
            projects.map((proj) =>
                proj.id === projId
                    ? {
                        ...proj,
                        bulletPoints: proj.bulletPoints.filter((_, i) => i !== index),
                    }
                    : proj
            )
        );
    };

    return (
        <div className="space-y-6">
            {projects.map((proj, projIndex) => (
                <div
                    key={proj.id}
                    className="relative space-y-4 border border-border p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <GripVertical className="h-4 w-4" />
                            <span className="text-sm font-medium">Project {projIndex + 1}</span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => removeProject(proj.id)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Project Name</Label>
                            <Input
                                placeholder="My Awesome Project"
                                value={proj.name}
                                onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Link (Optional)</Label>
                            <Input
                                placeholder="github.com/user/project"
                                value={proj.link || ""}
                                onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Technologies</Label>
                        <Input
                            placeholder="React, Node.js, PostgreSQL"
                            value={proj.technologies}
                            onChange={(e) =>
                                updateProject(proj.id, "technologies", e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description / Highlights</Label>
                        <div className="space-y-2">
                            {proj.bulletPoints.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="flex items-start gap-2">
                                    <span className="mt-2 text-muted-foreground">•</span>
                                    <FormattableTextarea
                                        placeholder="Describe a key feature or achievement..."
                                        value={bullet}
                                        onChange={(e) =>
                                            updateBulletPoint(proj.id, bulletIndex, e.target.value)
                                        }
                                        rows={2}
                                        className="flex-1"
                                    />
                                    {proj.bulletPoints.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon-xs"
                                            onClick={() => removeBulletPoint(proj.id, bulletIndex)}
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
                            onClick={() => addBulletPoint(proj.id)}
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
                onClick={addProject}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
            </Button>
        </div>
    );
}
