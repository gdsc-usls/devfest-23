import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";

import {
  gdgLogo,
  devfestMain,
  wave,
  bg,
  firebase,
  mask,
  kite,
  sugarcane,
} from "../../public";

import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { nanoid } from "nanoid";
import localFont from "next/font/local";
import Dropdown from "@/components/Dropdown";

const googleMedium = localFont({
  src: "../../public/fonts/Google-Sans-Medium.ttf",
  display: "swap",
  weight: "600",
  // variable: "--font-google-bold",
});

export default function Home() {
  const { push } = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [day, setDay] = useState<1 | 2>(1);

  const handleGenerate: FormEventHandler = async (e) => {
    e.preventDefault();
    const code = nanoid(10);

    try {
      await setDoc(doc(db, "certificates", code), {
        firstName,
        lastName,
        email,
        day,
      });

      toast.success("Certificate Generated!");
      push(`/cert/${code}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <section className="h-screen py-20 relative">
      <Image
        height={250}
        src={kite}
        alt="Kite"
        className="absolute top-96 left-44 z-40"
      />
      <Image
        height={320}
        src={firebase}
        alt="Firebase logo"
        className="absolute top-20  z-20"
      />
      <Image
        height={360}
        src={mask}
        alt="MassKara mask"
        className="absolute right-10  z-20"
      />
      <Image
        height={280}
        src={sugarcane}
        alt="Sugarcane"
        className="absolute right-20 bottom-0 z-40"
      />
      <div className="glassmorph h-full z-30 relative w-3/4 mx-auto">
        <div className="gap-5 flex flex-col h-full items-center pt-28">
          <Image
            src={gdgLogo}
            alt="GDG logo"
            priority
            className=""
            height={30}
          />
          <Image src={devfestMain} alt="DevFest logo" priority height={190} />

          <form
            onSubmit={handleGenerate}
            className="flex flex-col gap-2 mt-8 w-full sm:max-w-[400px] max-w-[350px] text-black"
          >
            <div className="flex gap-2">
              <Input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
              />
              <Input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
            />
            <div
              className={`flex gap-2 font-google-bold ${googleMedium.className}`}
            >
              <Dropdown setDay={setDay} />
              <Button
                type="submit"
                className="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full"
              >
                Generate
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute h-full overflow-hidden text-black left-0 bottom-0 right-0">
        <Image
          src={bg}
          alt="Grid bg"
          priority
          className="pointer-events-none object-left z-10 relative opacity-50"
        />
      </div>

      <div className="absolute overflow-hidden text-black  left-0 bottom-0 right-0">
        <Image
          src={wave}
          alt="RGBY Wave"
          priority
          className="pointer-events-none object-cover object-left z-10 relative"
        />
      </div>
    </section>
  );
}
