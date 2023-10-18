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
import sampleImg from "public/images/certificates/sample.png";

type Props = {
  value: DocumentSnapshot<DocumentData, DocumentData> | undefined;
  loading: boolean;
};

export default function Certificate({ value, loading }: Props) {
  const data = { ...value?.data(), id: value?.id } as Attendee;

  const cardRef = useRef<HTMLImageElement>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const saveImage = useCallback(() => {
    if (cardRef.current === null) {
      return;
    }

    toast.message("Saving Image...");
    setImgLoading(true);

    toPng(cardRef.current, {
      skipAutoScale: true,
      cacheBust: true,
      pixelRatio: 1,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `certificate_${data.id}.png`;
        link.href = dataUrl;
        setImgUrl(dataUrl);
        console.log(dataUrl);
        link.click();
        toast.success("Image Saved!");
        setImgLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setImgLoading(false);
      });
  }, [cardRef]);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id, imgUrl, day: 1 }),
      });

      const resData = await res.json();
      toast.success(resData.message);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      {loading ? (
        <Icons.spinner className="w-6 h-6" />
      ) : (
        <>
          <Tilt className="rounded-xl overflow-hidden">
            <Image
              priority
              sizes="100vw"
              ref={cardRef}
              src={sampleImg}
              className="object-contain w-full h-auto max-w-[600px] pointer-events-none"
              alt="sample image"
            />
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
