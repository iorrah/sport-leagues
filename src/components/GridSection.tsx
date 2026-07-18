import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const GridSection = ({ children }: Props) => (
  <section className="flex w-full flex-1 flex-col bg-neutral-50 py-4 md:py-12">{children}</section>
);
