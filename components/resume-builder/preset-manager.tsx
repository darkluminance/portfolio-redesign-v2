"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "@/lib/resume-types";
import { savePreset, getPresets, loadPreset, deletePreset, Preset } from "@/lib/preset-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { Save, Trash2, Loader2 } from "lucide-react";

interface PresetManagerProps {
    data: ResumeData;
    onLoad: (data: ResumeData) => void;
}

export function PresetManager({ data, onLoad }: PresetManagerProps) {
    const [presets, setPresets] = useState<Preset[]>([]);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [presetName, setPresetName] = useState("");
    const [selectedPresetId, setSelectedPresetId] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPresets(getPresets());
    }, []);

    const handleSave = () => {
        if (!presetName.trim()) return;
        
        setIsLoading(true);
        savePreset(presetName.trim(), data);
        setPresets(getPresets());
        setPresetName("");
        setSaveDialogOpen(false);
        setIsLoading(false);
    };

    const handleLoad = () => {
        if (!selectedPresetId) return;
        
        const presetData = loadPreset(selectedPresetId);
        if (presetData) {
            onLoad(presetData);
        }
    };

    const handleDelete = (id: string) => {
        deletePreset(id);
        setPresets(getPresets());
        if (selectedPresetId === id) {
            setSelectedPresetId("");
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                onClick={() => setSaveDialogOpen(true)}
                variant="outline"
                size="sm"
            >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save Preset
            </Button>

            {presets.length > 0 && (
                <>
                    <Select value={selectedPresetId} onValueChange={setSelectedPresetId}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Load preset..." />
                        </SelectTrigger>
                        <SelectContent>
                            {presets.map((preset) => (
                                <SelectItem key={preset.id} value={preset.id}>
                                    {preset.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {selectedPresetId && (
                        <>
                            <Button
                                onClick={handleLoad}
                                variant="default"
                                size="sm"
                            >
                                Load
                            </Button>
                            <Button
                                onClick={() => handleDelete(selectedPresetId)}
                                variant="outline"
                                size="sm"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </>
                    )}
                </>
            )}

            <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Save Preset</AlertDialogTitle>
                        <AlertDialogDescription>
                            Enter a name for this preset. You can load it later to restore your resume data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <Input
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            placeholder="Preset name..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && presetName.trim()) {
                                    handleSave();
                                }
                            }}
                            autoFocus
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleSave}
                            disabled={!presetName.trim() || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

