import { NextResponse } from "next/server";
import { generateLatexFromResumeData } from "@/lib/latex-generator";
import { ResumeData } from "@/lib/resume-types";

export async function POST(request: Request) {
    try {
        const resumeData: ResumeData = await request.json();
        const texContent = generateLatexFromResumeData(resumeData);

        const response = await fetch("https://latex.ytotech.com/builds/sync", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                resources: [
                    {
                        path: "main.tex",
                        content: texContent,
                    },
                ],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`LaTeX compilation failed: ${response.status} - ${errorText}`);
        }

        const pdfBuffer = await response.arrayBuffer();

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=resume.pdf",
            },
        });
    } catch (error: any) {
        console.error("Error compiling LaTeX:", error);
        
        return NextResponse.json(
            { 
                error: "Failed to compile LaTeX",
                details: error.message || String(error)
            },
            { status: 500 }
        );
    }
}

