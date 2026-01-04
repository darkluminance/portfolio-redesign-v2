import { ResumeData } from "./resume-types";

function escapeLatex(text: string): string {
    if (!text) return "";
    return text
        .replace(/\\/g, "\\textbackslash{}")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/\$/g, "\\$")
        .replace(/\&/g, "\\&")
        .replace(/\#/g, "\\#")
        .replace(/\^/g, "\\textasciicircum{}")
        .replace(/\_/g, "\\_")
        .replace(/\~/g, "\\textasciitilde{}")
        .replace(/\%/g, "\\%");
}

function formatDate(date: string): string {
    if (!date) return "";
    return escapeLatex(date);
}

function generateHeading(personalInfo: ResumeData["personalInfo"]): string {
    const name = escapeLatex(personalInfo.name || "");
    const location = escapeLatex(personalInfo.location || "");
    const phone = escapeLatex(personalInfo.phone || "");
    const email = personalInfo.email || "";
    
    let contactParts: string[] = [];
    if (location) contactParts.push(location);
    if (phone) contactParts.push(phone);
    if (email) {
        contactParts.push(`\\href{mailto:${email}}{\\underline{${escapeLatex(email)}}}`);
    }
    
    let links = [];
    if (personalInfo.portfolio) {
        links.push(`\\href{${personalInfo.portfolio}}{\\underline{${escapeLatex(personalInfo.portfolio.replace(/^https?:\/\//, ""))}}}`);
    }
    if (personalInfo.linkedin) {
        const linkedinUrl = personalInfo.linkedin.startsWith("http") 
            ? personalInfo.linkedin 
            : `https://${personalInfo.linkedin}`;
        links.push(`\\href{${linkedinUrl}}{\\underline{${escapeLatex(personalInfo.linkedin.replace(/^https?:\/\//, ""))}}}`);
    }
    if (personalInfo.github) {
        const githubUrl = personalInfo.github.startsWith("http") 
            ? personalInfo.github 
            : `https://${personalInfo.github}`;
        links.push(`\\href{${githubUrl}}{\\underline{${escapeLatex(personalInfo.github.replace(/^https?:\/\//, ""))}}}`);
    }
    
    const contactLine = contactParts.join(" $ | $ ");
    const linksLine = links.join(" $|$ ");
    
    return `\\begin{center}
    \\textbf{\\Huge ${name}} \\\\ \\vspace{2pt}
    ${contactLine}
    ${linksLine ? `\\\\\\vspace{2pt}\n    ${linksLine}` : ""}
\\end{center}`;
}

function generateSummary(summary: string): string {
    if (!summary) return "";
    return `\\section{Summary}
${escapeLatex(summary)}`;
}

function generateExperience(experiences: ResumeData["experiences"]): string {
    if (!experiences || experiences.length === 0) return "";
    
    let content = "\\section{Experience}\n  \\resumeSubHeadingListStart\n";
    
    for (const exp of experiences) {
        const title = escapeLatex(exp.title || "");
        const dateRange = `${formatDate(exp.startDate)} -- ${formatDate(exp.endDate)}`;
        const company = escapeLatex(exp.company || "");
        const location = escapeLatex(exp.location || "");
        
        content += `    \\resumeSubheading\n      {${title}}{${dateRange}}\n      {${company}}{${location}}\n`;
        
        if (exp.bulletPoints && exp.bulletPoints.length > 0) {
            content += "      \\resumeItemListStart\n";
            for (const point of exp.bulletPoints) {
                if (point.trim()) {
                    content += `        \\resumeItem{${escapeLatex(point)}}\n`;
                }
            }
            content += "      \\resumeItemListEnd\n";
        }
    }
    
    content += "  \\resumeSubHeadingListEnd\n";
    return content;
}

function generateSkills(skills: ResumeData["skills"]): string {
    if (!skills || skills.length === 0) return "";
    
    let skillLines: string[] = [];
    
    for (const skill of skills) {
        if (skill.category && skill.skills && skill.skills.length > 0) {
            const category = escapeLatex(skill.category);
            const skillList = skill.skills.map(s => escapeLatex(s)).join(", ");
            skillLines.push(`\\textbf{${category}}{: ${skillList}}`);
        }
    }
    
    if (skillLines.length === 0) return "";
    
    return `\\section{Skills}\n \\begin{itemize}[leftmargin=0.15in, label={}]\n    \\small{\\item{\n     ${skillLines.join(" \\\\\n     ")} \\\\\n    }}\n \\end{itemize}`;
}

function generateProjects(projects: ResumeData["projects"]): string {
    if (!projects || projects.length === 0) return "";
    
    let content = "\\section{Projects}\n    \\resumeSubHeadingListStart\n";
    
    for (const project of projects) {
        const name = escapeLatex(project.name || "");
        const technologies = escapeLatex(project.technologies || "");
        
        let projectHeading = `\\textbf{${name}}`;
        if (project.link) {
            const link = project.link.startsWith("http") ? project.link : `https://${project.link}`;
            projectHeading = `\\textbf{\\href{${link}}{${name} \\faLink}}`;
        }
        
        content += `      \\resumeProjectHeading\n          {${projectHeading}}{\\emph{${technologies}}}\n`;
        
        if (project.bulletPoints && project.bulletPoints.length > 0) {
            content += "          \\resumeItemListStart\n";
            for (const point of project.bulletPoints) {
                if (point.trim()) {
                    content += `            \\resumeItem{${escapeLatex(point)}}\n`;
                }
            }
            content += "          \\resumeItemListEnd\n";
        }
    }
    
    content += "    \\resumeSubHeadingListEnd\n";
    return content;
}

function generateEducation(education: ResumeData["education"]): string {
    if (!education || education.length === 0) return "";
    
    let content = "\\section{Education}\n";
    
    for (const edu of education) {
        content += "  \\resumeSubHeadingListStart\n";
        const school = escapeLatex(edu.school || "");
        const location = escapeLatex(edu.location || "");
        const degree = escapeLatex(edu.degree || "");
        const dateRange = `${formatDate(edu.startDate)} -- ${formatDate(edu.endDate)}`;
        
        content += `    \\resumeSubheading\n      {${school}}{${location}}\n      {${degree}}{${dateRange}}\n`;
        
        if (edu.achievements && edu.achievements.length > 0) {
            content += "      \\item\n        \\resumeItemListStart\n";
            for (const achievement of edu.achievements) {
                if (achievement.trim()) {
                    content += `            \\resumeItem{\\emph{${escapeLatex(achievement)}}}\n`;
                }
            }
            content += "        \\resumeItemListEnd\n";
        }
        
        content += "  \\resumeSubHeadingListEnd\n";
    }
    
    return content;
}

function generateCustomSections(customSections: ResumeData["customSections"]): string {
    if (!customSections || customSections.length === 0) return "";
    
    let content = "";
    
    for (const section of customSections) {
        const title = escapeLatex(section.title || "");
        content += `\\section{${title}}\n`;
        content += "  \\resumeSubHeadingListStart\n";
        
        if (section.items && section.items.length > 0) {
            for (const item of section.items) {
                if (item.content && item.content.trim()) {
                    content += `    \\item\n      \\resumeItem{${escapeLatex(item.content)}}\n`;
                }
            }
        }
        
        content += "  \\resumeSubHeadingListEnd\n";
    }
    
    return content;
}

const LATEX_HEADER = `
\\documentclass[a4paper,10pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}
\\usepackage{fontawesome5}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

`;

const LATEX_FOOTER = `


%-------------------------------------------
\\end{document}
`;

export function generateLatexFromResumeData(data: ResumeData): string {
    let content = LATEX_HEADER;
    
    content += `%----------HEADING----------\n`;
    content += generateHeading(data.personalInfo);
    content += "\n\n";
    
    if (data.includeSummary && data.summary) {
        content += `% -------------- SUMMARY -----------------\n`;
        content += generateSummary(data.summary);
        content += "\n\n";
    }
    
    if (data.experiences && data.experiences.length > 0) {
        content += `%-----------EXPERIENCE-----------\n`;
        content += generateExperience(data.experiences);
        content += "\n\n";
    }
    
    if (data.skills && data.skills.length > 0) {
        content += `%-----------PROGRAMMING SKILLS-----------\n`;
        content += generateSkills(data.skills);
        content += "\n\n";
    }
    
    if (data.projects && data.projects.length > 0) {
        content += `%-----------PROJECTS-----------\n`;
        content += generateProjects(data.projects);
        content += "\n\n";
    }
    
    if (data.education && data.education.length > 0) {
        content += `%-----------EDUCATION-----------\n`;
        content += generateEducation(data.education);
        content += "\n\n";
    }
    
    if (data.customSections && data.customSections.length > 0) {
        content += generateCustomSections(data.customSections);
        content += "\n";
    }
    
    content += LATEX_FOOTER;
    
    return content;
}

