"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/resume-builder", label: "Resume Builder" },
];

export default function Topbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center">
        <Image
          src="/signature.png"
          alt="Signature"
          width={120}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </Link>

      <nav className="hidden items-center gap-4 md:flex">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-muted-foreground hover:underline transition-all duration-1000",
                isActive ? "text-nav-active underline" : "text-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {!mounted ? (
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <nav className="mt-16 ml-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-xl font-medium transition-colors hover:text-muted-foreground",
                      isActive ? "text-nav-active" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
}
