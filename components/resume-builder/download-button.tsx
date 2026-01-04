"use client";

import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { ResumeData } from "@/lib/resume-types";

interface DownloadButtonProps {
    data: ResumeData;
    fileName: string;
}

export function DownloadButton({ data, fileName }: DownloadButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [status, setStatus] = useState<string>("");

    const handleDownload = async () => {
        setIsGenerating(true);
        setStatus("Compiling PDF...");

        try {
            const response = await fetch("/api/resume/compile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            setStatus("Preparing download...");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${fileName || "resume"}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setStatus("Download complete!");
            setTimeout(() => {
                setIsGenerating(false);
                setStatus("");
            }, 1000);
        } catch (error: any) {
            console.error("Error generating PDF:", error);
            setStatus(`Error: ${error.message || "Failed to generate PDF"}`);
            setTimeout(() => {
                setIsGenerating(false);
                setStatus("");
            }, 3000);
        }
    };

    return (
        <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-none border-primary/50 text-foreground hover:bg-primary/5 hover:text-primary"
        >
            {isGenerating ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{status || "Generating..."}</span>
                </>
            ) : (
                <>
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                </>
            )}
        </Button>
    );
}
