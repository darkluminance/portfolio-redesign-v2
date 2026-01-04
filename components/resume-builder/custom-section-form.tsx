"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CustomSection, generateId } from "@/lib/resume-types";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface CustomSectionFormProps {
    customSections: CustomSection[];
    onChange: (customSections: CustomSection[]) => void;
}

export function CustomSectionForm({
    customSections,
    onChange,
}: CustomSectionFormProps) {
    const addSection = () => {
        onChange([
            ...customSections,
            {
                id: generateId(),
                title: "",
                items: [],
            },
        ]);
    };

    const updateSectionTitle = (id: string, title: string) => {
        onChange(
            customSections.map((section) =>
                section.id === id ? { ...section, title } : section
            )
        );
    };

    const removeSection = (id: string) => {
        onChange(customSections.filter((section) => section.id !== id));
    };

    const addItem = (sectionId: string) => {
        onChange(
            customSections.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        items: [...section.items, { id: generateId(), content: "" }],
                    }
                    : section
            )
        );
    };

    const updateItem = (sectionId: string, itemId: string, content: string) => {
        onChange(
            customSections.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        items: section.items.map((item) =>
                            item.id === itemId ? { ...item, content } : item
                        ),
                    }
                    : section
            )
        );
    };

    const removeItem = (sectionId: string, itemId: string) => {
        onChange(
            customSections.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        items: section.items.filter((item) => item.id !== itemId),
                    }
                    : section
            )
        );
    };

    return (
        <div className="space-y-6">
            {customSections.map((section, sectionIndex) => (
                <div
                    key={section.id}
                    className="relative space-y-4 border border-border p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <GripVertical className="h-4 w-4" />
                            <span className="text-sm font-medium">
                                Custom Section {sectionIndex + 1}
                            </span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => removeSection(section.id)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label>Section Title</Label>
                        <Input
                            placeholder="e.g., Certifications, Volunteer Work, etc."
                            value={section.title}
                            onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Items</Label>
                        <div className="space-y-2">
                            {section.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <Input
                                        placeholder="Add an item..."
                                        value={item.content}
                                        onChange={(e) =>
                                            updateItem(section.id, item.id, e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => removeItem(section.id, item.id)}
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
                            onClick={() => addItem(section.id)}
                            className="mt-2"
                        >
                            <Plus className="mr-1 h-3 w-3" />
                            Add item
                        </Button>
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                onClick={addSection}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Section
            </Button>
        </div>
    );
}
