import { FormEventHandler, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Home() {
  const { push } = useRouter();
  const [code, setCode] = useState("");

  const handleLocate: FormEventHandler = (e) => {
    e.preventDefault();

    push(`/cert/${code}`);
  };

  return (
    <section className="flex items-center justify-center flex-col min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
          Certificate Generator
        </h1>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base md:text-lg">
          An open-source, fully customizable template.
        </p>
      </div>

      <form
        onSubmit={handleLocate}
        className="flex space-x-2 mt-8 w-full sm:max-w-[400px] max-w-[350px]"
      >
        <Input
          required
          type="text"
          maxLength={10}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().trim())}
          placeholder="Enter code here"
        />
        <Button type="submit">Locate</Button>
      </form>
    </section>
  );
}
