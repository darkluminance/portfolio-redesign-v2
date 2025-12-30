interface HighlightTextProps {
  children: React.ReactNode;
}

export function HighlightText({ children }: HighlightTextProps) {
  return <span className="font-bold">{children}</span>;
}


