import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={`min-h-screen mx-auto container px-6 ${inter.className}`}>
      {children}
    </main>
  );
}
