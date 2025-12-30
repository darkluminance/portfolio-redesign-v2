import Link from "next/link";

interface UnderlineLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function UnderlineLink({ href, children, external }: UnderlineLinkProps) {
  const isExternal = external ?? href.startsWith("http");

  return (
    <Link
      href={href}
      className="underline transition-colors hover:text-muted-foreground"
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {children}
    </Link>
  );
}

