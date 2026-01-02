export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      "C",
      "C++",
      "Python",
      "Java",
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "SQL"
    ]
  },
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Vue",
      "Nuxt.js",
      "SASS",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Three.js"
    ]
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Django",
      "Spring Boot",
      "REST API",
      "Microservices"
    ]
  },
  {
    category: "Database",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Firebase",
      "Prisma"
    ]
  },
  {
    category: "Tools",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "Docker",
      "VS Code",
      "Cursor",
      "Figma",
      "Postman",
      "Linux",
      "AWS",
      "Vercel",
      "Netlify",
      "Jira",
      "Confluence",
      "Slack",
      "Notion",
      "n8n"
    ]
  },
  {
    category: "Practices",
    skills: [
      "Agile Development",
      "Scrum",
      "Test-Driven Development",
      "CI/CD",
      "Code Review",
      "Design Patterns",
      "SOLID Principles",
      "Clean Code",
      "Responsive Design",
      "Performance Optimization"
    ]
  },
  {
    category: "Soft Skills",
    skills: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Leadership",
      "Time Management",
      "Adaptability",
      "Critical Thinking",
      "Fast Learner",
      "Mentoring",
      "Project Management"
    ]
  }
];

