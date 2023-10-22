import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { z } from "zod";

import { Attendee } from "@/types";
import Input from "@/components/Input";
import { db } from "../config/firebase";
import Button from "@/components/Button";

export default function Manage() {
  const [attendees, setAttendees] = useState("");
  const [parsedAttendees, setParsedAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);

  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleParse = () => {
    setLoading(true);
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
    });

    try {
      let invalid = false;
      const _parsedAttendees: Attendee[] = JSON.parse(attendees);
      _parsedAttendees.forEach((m, i) => {
        const data = schema.safeParse(m);
        if (!data.success) {
          toast.error("Contains invalid data");
          console.log(i, data.error, m);
          invalid = true;
          return;
        }
      });

      setLoading(false);
      if (invalid) return;

      toast.success("Parsed successfully");
      setParsedAttendees(_parsedAttendees);
    } catch {
      toast.error("Invalid JSON format");
    }
    setLoading(false);
  };

  const handleImport = () => {
    setLoading(true);
    if (parsedAttendees.length === 0) {
      toast.error("No attendees to import");
      return;
    }

    try {
      parsedAttendees.forEach(async (attendee) => {
        try {
          await setDoc(doc(db, "certificates/devfest23/for", nanoid(10)), {
            firstName: attendee.firstName,
            lastName: attendee.lastName,
            email: attendee.email,
          });
        } catch (err: any) {
          toast.error(err.message);
        }
      });

      setTimeout(() => {
        setParsedAttendees([]);
        setAttendees("");
      }, 500);

      toast.success("Certificates added");
    } catch (err: any) {
      toast.error(err.message);
    }
    setLoading(false);
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
    <div className="bg-black relative z-10">
      <form className="max-w-screen-sm py-20 mx-auto text-white flex flex-col">
        <div>
          <h1 className="mb-2 text-2xl font-bold mt-24">Import Certificates</h1>
          <textarea
            className="bg-transparent border rounded border-zinc-600 px-4 py-3 text-white outline-none w-full text-sm sm:text-base min-h-[200px] max-h-[500px]"
            placeholder="Paste JSON"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
          />
        </div>

        <Button
          disabled={loading}
          type="button"
          className="mt-4 bg-white text-black"
          onClick={handleParse}
        >
          Parse Data
        </Button>

        <p className="mt-8 text-zinc-400">Sample JSON</p>
        <pre className="bg-zinc-900 my-4 rounded py-4 px-8 text-yellow-500">
          <code>
            {`
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@doe.com"
  },
  {
    "firstName": "Sally",
    "lastName": "Smith",
    "email": "sally@smith.com"
  }
]
    `}
          </code>
        </pre>

        {parsedAttendees.length > 0 && (
          <div className="mt-8 text-zinc-200">
            <p className="text-zinc-400">
              Total certificates to be added: {parsedAttendees.length}
            </p>
            <div className="mt-4 p-6 rounded max-h-[300px] bg-zinc-900 overflow-y-scroll space-y-12">
              {parsedAttendees.map((m) => {
                return (
                  <div
                    key={nanoid()}
                    className="pb-6 border-b border-zinc-700 flex space-x-8"
                  >
                    <div className="text-zinc-400">
                      <p>Email:</p>
                      <p>First Name</p>
                      <p>Last Name</p>
                    </div>
                    <div>
                      <p>{m.email}</p>
                      <p>{m.firstName}</p>
                      <p>{m.lastName}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              disabled={loading}
              type="button"
              className="mt-4"
              onClick={handleImport}
            >
              Import Certificates
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
