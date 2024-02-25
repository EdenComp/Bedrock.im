import type { ReactElement } from "react";

interface TitleProps {
  children: string;
  className?: string;
}

export default function Text({ children, className = "" }: TitleProps): ReactElement {
  return <h1 className={className}>{children}</h1>;
}
