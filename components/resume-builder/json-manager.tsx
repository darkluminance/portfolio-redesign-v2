"use client";

import { useRef, useState } from "react";
import { ResumeData, normalizeResumeData } from "@/lib/resume-types";
import { savePreset, findPresetByName } from "@/lib/preset-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Upload, FileJson } from "lucide-react";

interface JsonManagerProps {
    data: ResumeData;
    onImport: (data: ResumeData) => void;
}

export function JsonManager({ data, onImport }: JsonManagerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [parsed, setParsed] = useState<ResumeData | null>(null);
    const [parseError, setParseError] = useState<string>("");
    const [presetName, setPresetName] = useState("");
    const [nameError, setNameError] = useState<string>("");

    const handleExport = () => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${data.personalInfo.name || "resume"}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // Reset so re-selecting the same file re-fires onChange.
        e.target.value = "";
        if (!file) return;

        setPresetName("");
        setNameError("");

        try {
            const text = await file.text();
            const json = JSON.parse(text);
            setParsed(normalizeResumeData(json));
            setParseError("");
        } catch {
            setParsed(null);
            setParseError("This file isn't valid JSON. Please choose a valid resume export.");
        }
        setDialogOpen(true);
    };

    const handleConfirm = () => {
        if (!parsed) return;

        const trimmed = presetName.trim();
        if (trimmed) {
            if (findPresetByName(trimmed)) {
                setNameError(
                    `A preset named "${trimmed}" already exists. Rename it, or clear the field to just load.`
                );
                return;
            }
            savePreset(trimmed, parsed);
            window.dispatchEvent(new Event("resume-presets-updated"));
        }

        onImport(parsed);
        closeDialog();
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setParsed(null);
        setParseError("");
        setPresetName("");
        setNameError("");
    };

    const counts = parsed
        ? [
              parsed.experiences.length && `${parsed.experiences.length} experience`,
              parsed.projects.length && `${parsed.projects.length} project`,
              parsed.skills.length && `${parsed.skills.length} skill group`,
              parsed.education.length && `${parsed.education.length} education`,
          ].filter(Boolean)
        : [];

    return (
        <div className="flex flex-wrap items-center gap-2">
            <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleFileChange}
                className="hidden"
            />
            <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="sm"
                className="flex-shrink-0"
            >
                <Upload className="h-3.5 w-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Import JSON</span>
                <span className="sm:hidden">Import</span>
            </Button>
            <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                className="flex-shrink-0"
            >
                <FileJson className="h-3.5 w-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Export JSON</span>
                <span className="sm:hidden">Export</span>
            </Button>

            <AlertDialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    if (!open) closeDialog();
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {parseError ? "Import failed" : "Import resume data"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {parseError ? (
                                parseError
                            ) : (
                                <>
                                    Loaded
                                    {parsed?.personalInfo.name
                                        ? ` "${parsed.personalInfo.name}"`
                                        : " resume data"}
                                    {counts.length > 0 && ` (${counts.join(", ")})`}. Loading
                                    replaces the data currently in the builder. Optionally save it
                                    as a preset first.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {!parseError && (
                        <div className="py-4 space-y-2">
                            <Input
                                value={presetName}
                                onChange={(e) => {
                                    setPresetName(e.target.value);
                                    setNameError("");
                                }}
                                placeholder="Optional: save as preset…"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleConfirm();
                                }}
                                autoFocus
                            />
                            {nameError && (
                                <p className="text-sm text-destructive">{nameError}</p>
                            )}
                        </div>
                    )}

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                        {!parseError && (
                            <AlertDialogAction
                                onClick={(e) => {
                                    // Prevent auto-close so name-conflict errors can show inline.
                                    e.preventDefault();
                                    handleConfirm();
                                }}
                            >
                                {presetName.trim() ? "Save & Load" : "Load"}
                            </AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
