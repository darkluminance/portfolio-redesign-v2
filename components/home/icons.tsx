import { JSX } from "react";

export type HoverIconName =
  | "camera"
  | "mountain"
  | "cat"
  | "coffee"
  | "game"
  | "plane"
  | "pen";

/** Large single-stroke line icons shown behind the intro on keyword hover. */
export const hoverIconPaths: Record<HoverIconName, JSX.Element> = {
  camera: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="3.5" />
      <path d="M8.4 7l1.3-2.3a1 1 0 0 1 .9-.5h2.8a1 1 0 0 1 .9.5L16.6 7" />
      <circle cx="12" cy="13.4" r="3.2" />
    </>
  ),
  mountain: (
    <path d="M2.5 19.5l6.1-10.8a1 1 0 0 1 1.7 0l3 5.3 1.7-2.8a1 1 0 0 1 1.7 0L21.5 19.5z" />
  ),
  cat: (
    <>
      <path d="M5 5.5v3.4a7 7 0 0 0 14 0V5.5l-3.3 2.4a1 1 0 0 1-.6.2H8.9a1 1 0 0 1-.6-.2z" />
      <path d="M9.6 13h.01M14.4 13h.01" />
      <path d="M10.6 16a2.1 2.1 0 0 0 2.8 0" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 8h11v4.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 12.5z" />
      <path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3.5v1.6M11.5 3.5v1.6" />
    </>
  ),
  game: (
    <>
      <rect x="2.5" y="8" width="19" height="8.5" rx="4.25" />
      <path d="M7 11.2v3M5.5 12.7h3M15.4 12h.01M17.8 13.6h.01" />
    </>
  ),
  plane: (
    <>
      <path d="M20.5 4.5L3.9 12.1a.5.5 0 0 0 .05.92l5.05 1.98 1.98 5.05a.5.5 0 0 0 .92.05z" />
      <path d="M20.5 4.5L11 14" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-3.6L16.4 5a1.8 1.8 0 0 1 2.6 2.6L7.6 19z" />
      <path d="M14.5 6.9l2.6 2.6" />
    </>
  ),
};

/** Small coffee cup rendered inline in the "A Coffee Lover" line. */
export function CoffeeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
    >
      <path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" />
      <path d="M17 9h2.5a2.5 2.5 0 0 1 0 5H17" />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.5H5.67V18h2.67V9.5zM7 6.06a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.34 18v-4.66c0-2.5-1.34-3.66-3.12-3.66-1.44 0-2.08.79-2.44 1.35V9.5h-2.67V18h2.67v-4.51c0-1.19.9-1.57 1.44-1.57.54 0 1.45.38 1.45 1.63V18h2.67z" />
    </svg>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
