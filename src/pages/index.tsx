import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";

import { gdgLogo, devfestMain, wave } from "../../public";

import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { nanoid } from "nanoid";

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
    <section className="h-screen p-10 relative overflow-hidden">
      {/* <Image src={masskara} alt="MassKara Illustration" priority height={280} /> */}
      <div className="gap-5 mt-20 flex flex-col overflow-hidden relative items-center justify-between z-30">
        <Image src={gdgLogo} alt="GDG logo" priority className="" height={30} />
        <Image src={devfestMain} alt="DevFest logo" priority height={200} />

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
            <Button
              type="button"
              onClick={() => setDay(2)}
              className="w-full bg-blue-500 text-white"
            >
              Day 2
            </Button>
            <Button type="submit" className="w-full bg-blue-500 text-white">
              Generate
            </Button>
          </div>
        </form>
      </div>

      <div className="absolute overflow-hidden text-black  left-0 bottom-0 right-0">
        <Image
          src={wave}
          alt="RGBY Wave"
          priority
          className="object-cover object-left z-10 relative"
        />
      </div>

      <div className="absolute overflow-hidden text-black  left-0 bottom-0 right-0">
        <Image
          src={wave}
          alt="RGBY Wave"
          priority
          className="object-cover object-left z-10 relative"
        />
      </div>
    </section>
  );
}
