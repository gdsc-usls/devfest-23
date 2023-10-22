import { FormEventHandler, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { nanoid } from "nanoid";
import Image from "next/image";
import { toast } from "sonner";

import kite from "@/images/kite.svg";
import mask from "@/images/mask.png";
import wave from "@/images/wave.svg";
import gdgLogo from "@/images/gdg-logo.png";
import firebase from "@/images/firebase.png";
import sugarcane from "@/images/sugarcane.png";
import devfestMain from "@/images/devfest-main.png";

import { db } from "@/config/firebase";

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

  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleGenerate: FormEventHandler = async (e) => {
    e.preventDefault();
    const code = nanoid(10);

    try {
      await setDoc(doc(db, "certificates/devfest23/for", code), {
        firstName,
        lastName,
        email,
      });

      toast.success("Certificate Generated!");
      push(`/cert/${code}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleLogin: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      setAuthorized(true);
      toast.success("Login successful");
    } else {
      toast.error("Incorrect password");
    }
  };

  if (!authorized) {
    return (
      <form
        onSubmit={handleLogin}
        className="flex space-x-2 mt-40 w-full sm:max-w-[400px] max-w-[350px] mx-auto z-10 relative"
      >
        <Input
          required
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border rounded-md border-zinc-600 px-4 outline-none w-full text-sm sm:text-base"
        />
        <Button className="rounded-md bg-black text-white" type="submit">
          Login
        </Button>
      </form>
    );
  }

  return (
    <section className="h-screen lg:py-20 py-10 relative">
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
            onSubmit={handleGenerate}
            className="flex flex-col gap-2 mt-8 w-full sm:max-w-[400px] max-w-[350px] text-black"
          >
            <div className="flex gap-2 [&>input]:bg-white">
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
              type="email"
              placeholder="Enter your email"
            />
            <Button
              type="submit"
              className={`cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full ${googleMedium.className}`}
            >
              Generate
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
