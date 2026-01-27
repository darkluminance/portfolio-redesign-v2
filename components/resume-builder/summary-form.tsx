"use client";

import { FormattableTextarea } from "@/components/resume-builder/formattable-textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface SummaryFormProps {
    summary: string;
    includeSummary: boolean;
    onSummaryChange: (summary: string) => void;
    onToggle: (include: boolean) => void;
}

export function SummaryForm({
    summary,
    includeSummary,
    onSummaryChange,
    onToggle,
}: SummaryFormProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="summary">Professional Summary</Label>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggle(!includeSummary)}
                    className="gap-1.5"
                >
                    {includeSummary ? (
                        <>
                            <Eye className="h-3.5 w-3.5" />
                            <span>Visible</span>
                        </>
                    ) : (
                        <>
                            <EyeOff className="h-3.5 w-3.5" />
                            <span>Hidden</span>
                        </>
                    )}
                </Button>
            </div>
            <FormattableTextarea
                id="summary"
                placeholder="A brief summary of your professional background and goals..."
                value={summary}
                onChange={(e) => onSummaryChange(e.target.value)}
                rows={4}
                className={!includeSummary ? "opacity-50" : ""}
            />
            {!includeSummary && (
                <p className="text-xs text-muted-foreground">
                    This section will not appear in the resume preview.
                </p>
            )}
        </div>
    );
}
