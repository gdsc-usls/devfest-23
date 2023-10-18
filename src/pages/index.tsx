import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import {
  devfestLogo,
  gdgWtmLogo,
  // masskara,
  waveColors,
  whitePaperTexture,
  gdgLogo,
  masskaraSet,
} from "@/assets/images";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { nanoid } from "nanoid";

export default function Home() {
  const { push } = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleGenerate: FormEventHandler = async (e) => {
    e.preventDefault();
    const code = nanoid(10);

    try {
      await setDoc(doc(db, "certificates", code), {
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

  return (
    <section className="h-screen p-10 relative overflow-hidden">
      {/* <Image src={masskara} alt="MassKara Illustration" priority height={280} /> */}
      <div className="gap-5 mt-20 flex flex-col overflow-hidden relative items-center justify-between z-30">
        <Image
          src={gdgLogo}
          alt="DevFest logo"
          priority
          className=""
          height={30}
        />
        <Image src={devfestLogo} alt="DevFest logo" priority height={250} />

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
          <div className="flex gap-2">
            <Button className="w-full bg-blue-500 text-white">Day 1</Button>
            <Button type="submit" className="w-full bg-blue-500 text-white">
              Generate
            </Button>
          </div>
        </form>
      </div>

      <div>
        <Image
          src={masskaraSet}
          alt="GDG & WTM Logo"
          priority
          className="absolute -bottom-7 -right-14 z-20"
          height={500}
        />
        <Image
          src={gdgWtmLogo}
          alt="GDG & WTM Logo"
          priority
          className="absolute bottom-7 left-7 z-20"
          height={350}
        />
        <div className="absolute overflow-hidden text-black  left-0 bottom-0 right-0">
          <Image
            src={waveColors}
            alt="RGBY Wave"
            priority
            className="object-cover object-left z-10 relative"
          />
        </div>
        <Image
          src={whitePaperTexture}
          alt="White Paper Texture"
          className="opacity-50 absolute left-0 top-0 object-cover h-screen w-screen"
        />
      </div>
    </section>
  );
}
