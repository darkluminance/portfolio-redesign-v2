"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Full-screen signature-reveal loader. Plays once per browser session
 * (guarded by sessionStorage['introSeen']); returning views skip straight past it.
 */
export function SignatureLoader() {
  const [hidden, setHidden] = useState(false);
  const [run, setRun] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("introSeen");
    } catch {}

    if (seen) {
      setRun(false);
      setHidden(true);
      return;
    }

    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {}

    const el = ref.current;
    if (!el) return;

    const onEnd = (e: AnimationEvent) => {
      if (e.animationName === "ldOut") setHidden(true);
    };
    el.addEventListener("animationend", onEnd);
    return () => el.removeEventListener("animationend", onEnd);
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#0b0a08]",
        run && "ld-run"
      )}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/signature.png"
          alt="Raiyan Abrar"
          width={320}
          height={110}
          priority
          className="ld-sig-img w-[220px] opacity-0 brightness-[2.2] invert md:w-[320px]"
        />
        <div className="ld-uline mt-7 h-px w-0 bg-white/65" />
      </div>
    </div>
  );
}
