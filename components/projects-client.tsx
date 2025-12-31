"use client";

import { useState, useMemo } from "react";
import { Project } from "@/lib/project-types";
import { ProjectCard } from "./project-card";
import { ProjectFilters } from "./project-filters";

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(projects.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, [projects]);

  const stacks = useMemo(() => {
    const uniqueStacks = new Set(projects.flatMap((p) => p.stacks));
    return Array.from(uniqueStacks).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(project.category);
      const stackMatch =
        selectedStacks.length === 0 ||
        selectedStacks.some((stack) => project.stacks.includes(stack));
      return categoryMatch && stackMatch;
    });
  }, [projects, selectedCategories, selectedStacks]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleStackToggle = (stack: string) => {
    setSelectedStacks((prev) =>
      prev.includes(stack) ? prev.filter((s) => s !== stack) : [...prev, stack]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedStacks([]);
  };

  return (
    <div className="">
      <aside className="w-64 absolute left-[5%] flex-shrink-0 hidden xl:block">
        <ProjectFilters
          categories={categories}
          stacks={stacks}
          selectedCategories={selectedCategories}
          selectedStacks={selectedStacks}
          onCategoryToggle={handleCategoryToggle}
          onStackToggle={handleStackToggle}
          onClearFilters={handleClearFilters}
        />
      </aside>

      <div className="flex-1 flex flex-col gap-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No projects match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

