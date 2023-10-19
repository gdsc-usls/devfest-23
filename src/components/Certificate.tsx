import Image from "next/image";
import Tilt from "react-parallax-tilt";
import localFont from "next/font/local";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

import { Attendee } from "@/types";

type Props = {
  value: DocumentSnapshot<DocumentData, DocumentData> | undefined;
  ref: React.RefObject<HTMLDivElement>;
  className?: string;
};

const googleBold = localFont({
  src: "../assets/fonts/Google-Sans-Bold.woff2",
  display: "swap",
  weight: "600",
  variable: "--font-google-bold",
});

export default function Certificate({ value, ref }: Props) {
  const data = { ...value?.data(), id: value?.id } as Attendee;

  return (
    <Tilt className="rounded-xl overflow-hidden relative">
      <div ref={ref} className="grid place-items-center">
        <Image
          priority
          width={1864}
          height={1190}
          src="/images/certificates/cert-day1.png"
          className="object-contain w-full h-auto max-w-[800px] pointer-events-none"
          alt="sample image"
        />

        <h2
          className={`absolute z-10 text-[#171717] text-4xl ${googleBold.className}`}
        >
          {data.firstName} {data.lastName} test
        </h2>
      </div>
    </Tilt>
  );
}
