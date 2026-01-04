"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PersonalInfo } from "@/lib/resume-types";

interface PersonalInfoFormProps {
    data: PersonalInfo;
    onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
    const handleChange = (field: keyof PersonalInfo, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        value={data.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={data.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        placeholder="+1 234 567 8900"
                        value={data.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        placeholder="City, Country"
                        value={data.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                        id="github"
                        placeholder="github.com/username"
                        value={data.github}
                        onChange={(e) => handleChange("github", e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/username"
                        value={data.linkedin}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio (Optional)</Label>
                <Input
                    id="portfolio"
                    placeholder="yourportfolio.com"
                    value={data.portfolio || ""}
                    onChange={(e) => handleChange("portfolio", e.target.value)}
                />
            </div>
        </div>
    );
}
