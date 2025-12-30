import Image from "next/image";
import Link from "next/link";
import { Code, MapPin, Linkedin, Github, Mail, Instagram, CoffeeIcon } from "lucide-react";
import { useMemo } from "react";
import { UnderlineLink } from "@/components/underline-link";
import { HighlightText } from "@/components/highlight-text";
import { getWorkExperiences } from "@/lib/work-experience";
import { WorkExperienceCard } from "@/components/work-experience-card";
import { getSkills } from "@/lib/skills";

export default function Home() {
  const workExperiences = getWorkExperiences();
  const skills = getSkills();

  const age = useMemo(() => {
    const dateOfBirth = new Date(1998, 7, 23);
    const currentDate = new Date();
    const age = Math.abs(
      Math.floor(
        (currentDate.getTime() - dateOfBirth.getTime()) /
          (1000 * 3600 * 24 * 365.25)
      )
    );
  
    return age;
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8 min-h-[calc(100vh-var(--topbar-height)-(var(--page-y-padding)))] border-b border-border">
        <div className="md:mt-12 lg:mt-24 flex flex-col-reverse items-center gap-12 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-3xl md:text-4xl font-[400] uppercase">
              <h1>Raiyan Abrar,</h1>
            </div>
            <div className="flex flex-col gap-2 text-lg text-muted-foreground">
              <h3 className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Software Engineer
              </h3>
              <h3 className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Dhaka, Bangladesh
              </h3>
            </div>
          </div>
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/me.jpg"
              alt="Raiyan Abrar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 leading-loose">
          <p>I'm a {age} year old developer currently working at <UnderlineLink href="https://www.enosisbd.com/">Enosis Solutions</UnderlineLink>. I have coded <HighlightText>scaleable web applications</HighlightText>, <HighlightText>designed</HighlightText> products, built <HighlightText>APIs</HighlightText>, led cross-functional <HighlightText>teams</HighlightText> and made various types of <HighlightText>games</HighlightText>.</p>
          <p>I love to <HighlightText>travel</HighlightText>, especially to the <HighlightText>mountains</HighlightText>. I own a <UnderlineLink href="https://www.sony.com/ng/electronics/interchangeable-lens-cameras/ilce-6400a">Sony-A6400</UnderlineLink> that frames my passion towards <UnderlineLink href="/gallery">photography</UnderlineLink>. I am a fan of video-games and anime. My big dream is to someday own a <HighlightText>cat</HighlightText>.</p>
          <span className="flex items-center gap-2">- A Coffee Lover<CoffeeIcon className="h-5 w-5 inline-block text-muted-foreground" /> </span>
        </div>
        <div className="flex items-center gap-8 mb-16">
          <Link
            href="https://linkedin.com/in/rye013"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/darkluminance"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="mailto:raiyan.abrar1308@gmail.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href="https://instagram.com/ryedae.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-8 pb-16 border-b border-border">
        <h2 className="text-2xl font-bold uppercase">Work Experience</h2>
        <div className="flex flex-col gap-8">
          {workExperiences.map((experience) => (
            <WorkExperienceCard key={`${experience.company}-${experience.startDate}`} experience={experience} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 pb-16 border-b border-border">
        <h2 className="text-2xl font-bold uppercase">My Skills</h2>
        <div className="flex flex-col gap-8">
          {skills.map((skillCategory) => (
            <div key={skillCategory.category} className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{skillCategory.category}</h3>
              <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                {skillCategory.skills.map((skill) => (
                  <span key={skill}>{skill} |</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}