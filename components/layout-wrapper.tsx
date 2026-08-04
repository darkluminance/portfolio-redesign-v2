"use client";

import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

interface ShellConfig {
  maxWidth: string;
  pad: string;
  footerHref?: string;
  footerLabel?: string;
}

function getShellConfig(pathname: string): ShellConfig {
  if (pathname.startsWith("/projects")) {
    return {
      maxWidth: "1160px",
      pad: "88px",
      footerHref: "https://github.com/darkluminance",
      footerLabel: "More on GitHub ↗",
    };
  }
  if (pathname.startsWith("/gallery")) {
    return {
      maxWidth: "1240px",
      pad: "72px",
      footerHref: "https://instagram.com/ryedae.jpg",
      footerLabel: "More on Instagram ↗",
    };
  }
  // Home, Résumé and all light-touch pages
  return { maxWidth: "1040px", pad: "88px" };
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The resume-builder tool keeps its own full-width, chrome-less layout.
  if (pathname.startsWith("/resume-builder")) {
    return (
      <div className="mx-auto p-6 leading-relaxed tracking-wide">{children}</div>
    );
  }

  const { maxWidth, pad, footerHref, footerLabel } = getShellConfig(pathname);

  return (
    <div
      className="mx-auto px-[22px] md:px-[var(--page-pad)]"
      style={
        {
          maxWidth,
          "--page-pad": pad,
        } as CSSProperties
      }
    >
      <SiteNav />
      <main>{children}</main>
      <SiteFooter rightHref={footerHref} rightLabel={footerLabel} />
    </div>
  );
}
