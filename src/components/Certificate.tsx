import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import Tilt from "react-parallax-tilt";
import { FormEventHandler, useCallback, useRef, useState } from "react";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

import Button from "./Button";
import { Icons } from "./Icons";
import { Attendee } from "@/types";

type Props = {
  value: DocumentSnapshot<DocumentData, DocumentData> | undefined;
  loading: boolean;
};

export default function Certificate({ value, loading }: Props) {
  const data = { ...value?.data(), id: value?.id } as Attendee;

  const cardRef = useRef<HTMLImageElement>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const saveImage = useCallback(() => {
    if (cardRef.current === null) {
      return;
    }

    toast.message("Saving Image...");
    setImgLoading(true);

    toPng(cardRef.current, {
      skipAutoScale: true,
      cacheBust: true,
      pixelRatio: 5,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `certificate_${data.id}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Image Saved!");
        setImgLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setImgLoading(false);
      });
  }, [cardRef, data.id]);

  const handleSubmit: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (cardRef.current === null) {
        return;
      }

      toast.message("Sending email...");

      toPng(cardRef.current, {
        skipAutoScale: true,
        cacheBust: true,
        pixelRatio: 1,
      })
        .then(async (imgUrl) => {
          try {
            const res = await fetch("/api/send-email", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: data.id,
                email: data.email,
                imgUrl,
                day: 1,
              }),
            });

            const resData = await res.json();
            toast.success(resData.message);
          } catch (err: any) {
            toast.error(err.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    [cardRef, data.id, data.email]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen px-8"
    >
      {loading ? (
        <Icons.spinner className="w-6 h-6" />
      ) : (
        <>
          <Tilt className="rounded-xl overflow-hidden relative">
            <Image
              priority
              width={1864}
              height={1190}
              src="/images/certificates/cert-day1.png"
              className="object-contain w-full h-auto max-w-[800px] pointer-events-none"
              alt="sample image"
            />

            <h2 className="absolute text-[#171717] text-4xl">
              {data.firstName} {data.lastName}
            </h2>
          </Tilt>

          <div className="flex items-center mt-8 space-x-4">
            <Link href="/">
              <Icons.arrowLeft className="h-10 w-10" />
            </Link>

            <Button
              type="button"
              className="bg-blue-500 text-white"
              disabled={imgLoading}
              onClick={saveImage}
            >
              Download
            </Button>

            <Button
              type="submit"
              className="bg-blue-500 text-white"
              disabled={imgLoading}
            >
              Send to Email
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
