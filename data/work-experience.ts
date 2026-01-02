export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  stacks: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    company: "Enosis Solutions",
    position: "Software Engineer II",
    location: "Dhaka, Bangladesh",
    startDate: "March 2025",
    endDate: "Present",
    highlights: [
      "Architected and optimized movement and alignment systems for a multi-platform (AR/VR/Web) 3D SaaS AR/VR product using Three.js and Node.js",
      "Enhanced controller-picking and rendering algorithms, improving performance by 5x across VR/AR modes",
      "Contributed to a Python (Django)-React-based dental management application, focusing on logging, deployment, code cleaning, and feature development"
    ],
    stacks: ["Three.js", "Node.js", "Python", "Django", "React", "AWS", "Tailwind CSS", "AR/VR"]
  },
  {
    company: "Enosis Solutions",
    position: "Software Engineer I",
    location: "Dhaka, Bangladesh",
    startDate: "Feb 2024",
    endDate: "Feb 2025",
    highlights: [
      "Built and maintained an interactive 3D AR/VR application using Vue and Node.js",
      "Refactored drag-and-drop movement logic, boosting efficiency by 15% across VR and non-VR environments",
      "Improved 3D interaction efficiency by refactoring move/rotate features with scalable architecture",
      "Modularized core motion systems to improve scalability and readability, aligning with design patterns and SOLID principles"
    ],
    stacks: ["Vue", "Node.js", "Three.js", "AR/VR"]
  },
  {
    company: "Reddot Digital Ltd.",
    position: "Software Engineer",
    location: "Dhaka, Bangladesh",
    startDate: "March 2023",
    endDate: "Jan 2024",
    highlights: [
      "Developed a microservice-based fintech reporting system with download options using Spring Boot and Nuxt.js, enabling real-time insights into transactions, balances, and account activities",
      "Designed APIs and data models enabling real-time financial reporting and insights for thousands of users",
      "Recognized as the Star Developer (Q3 2023) for outstanding contributions to fintech solutions",
      "Worked cross-functionally in agile teams, participating in design discussions, QA, and release cycles"
    ],
    stacks: ["Spring Boot", "Nuxt.js", "Microservices", "REST APIs", "Tailwind CSS"]
  }
];

