import { ResumeData } from "./resume-types";

const PRESET_STORAGE_KEY = "resume-presets";

export interface Preset {
    id: string;
    name: string;
    data: ResumeData;
    createdAt: string;
}

export function savePreset(name: string, data: ResumeData): Preset {
    const presets = getPresets();
    const preset: Preset = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        data,
        createdAt: new Date().toISOString(),
    };
    
    presets.push(preset);
    localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
    
    return preset;
}

export function getPresets(): Preset[] {
    if (typeof window === "undefined") return [];
    
    try {
        const stored = localStorage.getItem(PRESET_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function loadPreset(id: string): ResumeData | null {
    const presets = getPresets();
    const preset = presets.find((p) => p.id === id);
    return preset ? preset.data : null;
}

export function deletePreset(id: string): boolean {
    const presets = getPresets();
    const filtered = presets.filter((p) => p.id !== id);
    localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(filtered));
    return filtered.length < presets.length;
}

export function findPresetByName(name: string): Preset | null {
    const presets = getPresets();
    return presets.find((p) => p.name.toLowerCase() === name.toLowerCase().trim()) || null;
}

export function updatePreset(id: string, data: ResumeData): void {
    const presets = getPresets();
    const index = presets.findIndex((p) => p.id === id);
    if (index !== -1) {
        presets[index].data = data;
        presets[index].createdAt = new Date().toISOString();
        localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
    }
}

