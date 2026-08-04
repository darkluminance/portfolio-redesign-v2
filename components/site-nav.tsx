"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resume", label: "Résumé" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between border-b border-line py-7 md:py-8">
      <Link href="/" className="flex items-center" aria-label="Home">
        <Image
          src="/signature.png"
          alt="Raiyan Abrar"
          width={120}
          height={40}
          priority
          className="h-[26px] w-auto md:h-[30px] dark:invert"
        />
      </Link>

      <div className="flex items-center gap-[14px] font-medium md:gap-7">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] transition-colors hover:text-brand md:text-[12.5px]",
                isActive ? "text-brand" : "text-ink/85"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
