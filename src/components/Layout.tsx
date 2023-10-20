import { ReactNode } from "react";
import Image from "next/image";
import { bg, kite, firebase, mask, sugarcane } from "../../public";

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
      <div className="absolute h-full overflow-hidden text-black left-0 bottom-0 right-0">
        <Image
          src={bg}
          alt="Grid bg"
          priority
          className="pointer-events-none object-left z-10 relative opacity-50"
        />
      </div>
    </main>
  );
}
