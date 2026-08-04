"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import {
  CoffeeGlyph,
  GitHubIcon,
  hoverIconPaths,
  HoverIconName,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from "./icons";

export function Intro() {
  const [active, setActive] = useState<HoverIconName | null>(null);

  // Shared hover wiring for keyword/link words that reveal a background icon.
  const hover = (icon: HoverIconName) => ({
    onMouseEnter: () => setActive(icon),
    onMouseLeave: () => setActive(null),
  });

  const kw =
    "cursor-default border-b border-dotted border-ink/30 font-semibold text-ink transition-colors hover:border-brand hover:text-brand";
  const ulink =
    "border-b border-line pb-px transition-colors hover:border-brand hover:text-brand";

  return (
    <section className="relative flex min-h-screen flex-col justify-start pb-24 pt-12 md:pb-0 md:pt-[14vh]">
      {/* Hover background icons */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0"
        )}
      >
        {(Object.keys(hoverIconPaths) as HoverIconName[]).map((name) => (
          <span
            key={name}
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
              active === name
                ? "opacity-100 [animation:floaty_6s_ease-in-out_infinite]"
                : "scale-90 opacity-0"
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-auto w-[84%] fill-none stroke-brand opacity-[0.22] [&_*]:[vector-effect:non-scaling-stroke] md:w-[min(680px,64vw)]"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {hoverIconPaths[name]}
            </svg>
          </span>
        ))}
      </div>

      <div className="relative z-[1] flex flex-col gap-x-[60px] gap-y-10 md:flex-row md:flex-wrap md:items-start md:justify-between">
        <div className="max-w-[600px]">
          <div className="klabel mb-[26px]">
            Software Engineer — Dhaka, Bangladesh
          </div>
          <h1 className="mb-9 font-serif text-[38px] leading-[1.02] md:text-[56px]">
            Hello, I&apos;m Raiyan<span className="text-brand">.</span>
          </h1>
          <p className="mb-[26px] text-[18px] leading-[2]">
            I&apos;m a 25 year old developer currently working at{" "}
            <Link
              href="https://www.enosisbd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={ulink}
            >
              Enosis Solutions
            </Link>
            . I have coded{" "}
            <span className="font-semibold">scaleable web applications</span>,{" "}
            <span className="font-semibold">designed</span> products, built{" "}
            <span className="font-semibold">APIs</span>,{" "}
            <span className="font-semibold">led</span> cross-functional{" "}
            <span className="font-semibold">teams</span> and made various types
            of <span className="font-semibold">games</span>.
          </p>
          <p className="text-[18px] leading-[2]">
            I love to{" "}
            <span className={kw} {...hover("plane")}>
              travel
            </span>
            , especially to the{" "}
            <span className={kw} {...hover("mountain")}>
              mountains
            </span>
            . I own a{" "}
            <Link
              href="https://www.sony.com/ng/electronics/interchangeable-lens-cameras/ilce-6400a"
              target="_blank"
              rel="noopener noreferrer"
              className={ulink}
              {...hover("camera")}
            >
              Sony-A6400
            </Link>{" "}
            that frames my passion towards{" "}
            <Link href="/gallery" className={ulink} {...hover("camera")}>
              photography
            </Link>
            . I also occasionally do{" "}
            <Link href="/digital-arts" className={ulink} {...hover("pen")}>
              digital arts
            </Link>
            . I am a fan of{" "}
            <Link href="/games-played" className={ulink} {...hover("game")}>
              video-games
            </Link>{" "}
            and anime. My big dream is to someday own a{" "}
            <span className={kw} {...hover("cat")}>
              cat
            </span>
            .
          </p>
          <span
            className="mt-[30px] inline-flex cursor-default items-center gap-[9px] font-serif text-[20px] italic text-brand"
            {...hover("coffee")}
          >
            — A Coffee Lover
            <CoffeeGlyph className="h-[19px] w-[19px]" />
          </span>
        </div>

        <div className="order-first flex-none md:order-none md:text-center">
          <Image
            src="/me.jpg"
            alt="Raiyan Abrar"
            width={160}
            height={160}
            priority
            className="h-28 w-28 rounded-full object-cover grayscale contrast-[1.02] md:h-40 md:w-40"
          />
          <div className="mt-6 flex justify-start gap-[18px] md:justify-center">
            <SocialLink href={profile.linkedinUrl} label="LinkedIn">
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </SocialLink>
            <SocialLink href={profile.githubUrl} label="GitHub">
              <GitHubIcon className="h-[18px] w-[18px]" />
            </SocialLink>
            <SocialLink href={`mailto:${profile.socialEmail}`} label="Email">
              <MailIcon className="h-[18px] w-[18px]" />
            </SocialLink>
            <SocialLink href={profile.instagramUrl} label="Instagram">
              <InstagramIcon className="h-[18px] w-[18px]" />
            </SocialLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isMail = href.startsWith("mailto:");
  return (
    <Link
      href={href}
      aria-label={label}
      {...(!isMail && { target: "_blank", rel: "noopener noreferrer" })}
      className="grid place-items-center text-label transition-all hover:-translate-y-0.5 hover:text-ink"
    >
      {children}
    </Link>
  );
}
