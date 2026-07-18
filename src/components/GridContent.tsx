import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const GridContent = ({ children }: Props) => (
  <div className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-0 lg:py-8">
    {children}
  </div>
);
