import { FormEventHandler, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { toast } from "sonner";

import {
  gdgLogo,
  devfestMain,
  wave,
  firebase,
  mask,
  kite,
  sugarcane,
} from "../../public";

import { db } from "@/config/firebase";

const googleMedium = localFont({
  src: "../../public/fonts/Google-Sans-Medium.ttf",
  display: "swap",
  weight: "600",
  // variable: "--font-google-bold",
});

export default function Home() {
  const { push } = useRouter();

  const [email, setEmail] = useState("");

  const handleLocate: FormEventHandler = async (e) => {
    e.preventDefault();

    const q = query(
      collection(db, "certificates/devfest23/for"),
      where("email", "==", email),
      limit(1)
    );

    try {
      const querySnapshot = await getDocs(q);
      let message = "⚠️ No certificate found";

      querySnapshot.forEach((doc) => {
        if (doc.data().email) {
          push(`/cert/${doc.id}`);
          message = "✅ Certificate found!";
          return;
        }
      });

      toast(message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <section className="h-screen lg:py-20 py-10 relative font-google-reg">
      <Image
        height={250}
        src={kite}
        alt="Kite"
        className="absolute pointer-events-none hidden xl:block top-96 left-44 z-40"
      />
      <Image
        height={320}
        src={firebase}
        alt="Firebase logo"
        className="absolute md:top-20 top-[55%] scale-75 lg:scale-100 z-20"
      />
      <Image
        height={360}
        src={mask}
        alt="MassKara mask"
        className="absolute md:right-10 right-0 scale-75 lg:scale-100 z-20 md:top-0 top-[55%]"
      />
      <Image
        height={280}
        src={sugarcane}
        alt="Sugarcane"
        className="absolute right-20 bottom-0 z-40 pointer-events-none hidden lg:block"
      />
      <div className="glassmorph h-full z-30 relative w-[90%] px-7 md:w-3/4 mx-auto">
        <div className="gap-5 flex flex-col h-full items-center pt-28">
          <Image
            src={gdgLogo}
            alt="GDG logo"
            priority
            className=""
            height={30}
          />
          <Image src={devfestMain} alt="DevFest logo" priority height={180} />

          <form
            onSubmit={handleLocate}
            className="flex flex-col gap-2 mt-8 w-full sm:max-w-[400px] max-w-[350px] text-black"
          >
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
            />
            <Button
              type="submit"
              className={`cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full ${googleMedium.className}`}
            >
              Claim
            </Button>
          </form>
        </div>
      </div>

      <div className="absolute overflow-hidden left-0 bottom-0 right-0">
        <Image
          src={wave}
          alt="RGBY Wave"
          priority
          className="pointer-events-none object-cover object-left z-20 relative"
        />
      </div>
    </section>
  );
}
