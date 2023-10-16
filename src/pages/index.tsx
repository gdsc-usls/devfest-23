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

export default function Home() {
  const { push } = useRouter();
  const [code, setCode] = useState("");

  const handleLocate: FormEventHandler = (e) => {
    e.preventDefault();

    push(`/cert/${code}`);
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
          onSubmit={handleLocate}
          className="flex flex-col gap-2 mt-8 w-full sm:max-w-[400px] max-w-[350px] "
        >
          <div className="flex gap-2">
            <Input required type="text" placeholder="First Name" />
            <Input required type="text" placeholder="Last Name" />
          </div>
          <Input
            required
            type="text"
            maxLength={10}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().trim())}
            placeholder="Enter code here"
          />
          <div className="flex gap-2">
            <Button className="w-full bg-blue-500 text-white">Day 1</Button>
            <Button type="submit" className="w-full bg-blue-500 text-white">
              Get Certificate
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
