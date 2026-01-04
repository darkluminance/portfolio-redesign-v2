import { WorkExperience } from "@/lib/work-experience";
import {Badge} from "./ui/badge";

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

export function WorkExperienceCard({ experience }: WorkExperienceCardProps) {
  return (
    <div className="flex flex-col gap-4 border-l-1 pl-6">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 relative">
          <h3 className="text-lg font-bold relative before:absolute before:left-[-1.5rem] before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-[2px] before:bg-border">
            {experience.position}
          </h3>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {experience.startDate} – {experience.endDate}
          </span>
        </div>
        <p className="">
          {experience.company}
        </p>
        <p className="text-muted-foreground font-light text-sm">
          {experience.location}
        </p>
      </div>
      
      <ul className="flex flex-col gap-2">
        {experience.highlights.map((highlight, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-muted-foreground">•</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {experience.stacks.map((stack, index) => (
          <Badge key={stack} variant="secondary" className="cursor-pointer hover:bg-muted hover:text-muted-foreground transition-all duration-300">{stack}</Badge>
        ))}
      </div>
    </div>
  );
}

