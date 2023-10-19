import { ReactNode } from "react";

export default function Layout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <main
      className={`bg-white min-h-screen mx-auto font-google-reg ${className}`}
    >
      {children}
    </main>
  );
}
