import { Project } from "@/lib/project-types";

export const projects: Project[] = [
  {
    name: "DSA Visualizer",
    slug: "dsav",
    category: "Desktop Application",
    year: 2020,
    description: "A program that visualizes a few data structures and some common sorting and graph algorithms with vibrant colors. It also includes a maze generator and solver.",
    githubURL: "https://github.com/darkluminance/Data-Structure-and-Algorithm-Visualizer",
    demoURL: "",
    stacks: ["Java"],
    image: {
      version: 1696683378,
      public_id: "projects/dsav",
      format: "png",
      width: 895,
      height: 895
    }
  },
  {
    name: "Maze Visualizer",
    slug: "maze_generator",
    category: "Web Development",
    year: 2024,
    description: "A web-application that allows users to manually or automatically generate mazes and visualize solving, with ability to download the produced maze",
    githubURL: "https://github.com/darkluminance/maze-generator",
    demoURL: "https://projects-rye-mazegenerator.vercel.app",
    stacks: ["NextJS"],
    image: {
      version: 1730316426,
      public_id: "projects/maze_generator",
      format: "png",
      width: 1080,
      height: 1080
    }
  },
  {
    name: "Resume Builder",
    slug: "resume_builder",
    category: "Web Development",
    year: 2026,
    description: "A web application that allows users to build professional resumes with customizable sections including personal information, work experience, skills, projects, education, and custom sections. Features real-time preview and PDF export via LaTeX compilation.",
    githubURL: "https://github.com/darkluminance/portfolio-redesign-v2",
    demoURL: "https://raiyanabrar.netlify.app/resume-builder",
    stacks: ["NextJS", "TypeScript", "TailwindCSS", "Shadcn UI"],
    image: {
      version: 1767532548,
      public_id: "projects/resume_builder_ktambd",
      format: "png",
      width: 1080,
      height: 1080
    }
  },
  {
    name: "TrackGrad",
    slug: "trackgrad",
    category: "Web Development",
    year: 2025,
    description: "A management tool that allows users to track their higher studies application journey, with a middleware to prevent unauthorized API access, and a mail notification service to notify users of important events via mail. It is deployed in an AWS EC2 instance hosted using Docker.",
    githubURL: "https://github.com/darkluminance/higher-studies-application-tracker",
    demoURL: "",
    stacks: ["Solid.JS", "Go", "PostgreSQL", "Docker", "AWS"],
    image: {
      version: 1737386347,
      public_id: "projects/trackgrad",
      format: "png",
      width: 1080,
      height: 1080
    }
  },
  {
    name: "URL shortener",
    slug: "url_shortener",
    category: "Web Development",
    year: 2024,
    description: "A simple URL shortener application that converts current timestamp into hexa code to generate temporary short URLs",
    githubURL: "https://github.com/darkluminance/url-shortener",
    demoURL: "https://smol-url.vercel.app/",
    stacks: ["NextJS", "MongoDB"],
    image: {
      version: 1733075959,
      public_id: "projects/url_shortener",
      format: "png",
      width: 1080,
      height: 1080
    }
  }
];

