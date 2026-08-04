import Link from "next/link";

interface SiteFooterProps {
  /** Optional right-side link (e.g. GitHub / Instagram). Defaults to a static label. */
  rightHref?: string;
  rightLabel?: string;
}

export function SiteFooter({ rightHref, rightLabel }: SiteFooterProps) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-10">
      <span className="klabel">© 2026 Raiyan Abrar</span>
      {rightHref ? (
        <Link
          href={rightHref}
          target="_blank"
          rel="noopener noreferrer"
          className="klabel transition-colors hover:text-brand"
        >
          {rightLabel ?? "More ↗"}
        </Link>
      ) : (
        <span className="klabel">Designed &amp; built in Dhaka</span>
      )}
    </footer>
  );
}
