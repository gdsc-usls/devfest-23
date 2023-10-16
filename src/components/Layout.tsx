import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={`bg-white min-h-screen mx-auto ${inter.className}`}>
      {children}
    </main>
  );
}
