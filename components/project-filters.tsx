"use client";

interface ProjectFiltersProps {
  categories: string[];
  stacks: string[];
  selectedCategories: string[];
  selectedStacks: string[];
  onCategoryToggle: (category: string) => void;
  onStackToggle: (stack: string) => void;
  onClearFilters: () => void;
}

export function ProjectFilters({
  categories,
  stacks,
  selectedCategories,
  selectedStacks,
  onCategoryToggle,
  onStackToggle,
  onClearFilters,
}: ProjectFiltersProps) {
  const hasActiveFilters = selectedCategories.length > 0 || selectedStacks.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold uppercase">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Category
          </h3>
          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm group-hover:text-foreground transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Stacks
          </h3>
          <div className="flex flex-col gap-2">
            {stacks.map((stack) => (
              <label
                key={stack}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedStacks.includes(stack)}
                  onChange={() => onStackToggle(stack)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="text-sm group-hover:text-foreground transition-colors">
                  {stack}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

