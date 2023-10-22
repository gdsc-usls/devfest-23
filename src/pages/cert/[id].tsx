import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { toPng } from "html-to-image";
import Tilt from "react-parallax-tilt";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import {
  FormEventHandler,
  Suspense,
  useCallback,
  useRef,
  useState,
} from "react";

import { db } from "@/config/firebase";
import Button from "@/components/Button";
import { Icons } from "@/components/Icons";
import { Attendee } from "@/types";

const googleBold = localFont({
  src: "../../../public/fonts/Google-Sans-Bold.woff2",
  display: "swap",
  weight: "600",
  variable: "--font-google-bold",
});

export default function Cert() {
  const {
    query: { id },
  } = useRouter();
  const [value, loading] = useDocumentOnce(
    doc(db, `certificates/devfest23/for/${id}`)
  );
  const data = { ...value?.data(), id: value?.id } as Attendee;

  const cardRef = useRef<HTMLDivElement>(null);
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
      pixelRatio: 3,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `certificate_${value?.id}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Image Saved!");
        setImgLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setImgLoading(false);
      });
  }, [cardRef, value?.id]);

  const handleSendEmail: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (cardRef.current === null) {
        return;
      }

      toast.message("Sending email...");
      setImgLoading(true);

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
                id: value?.id,
                email: data.email,
                imgUrl,
                firstName: data?.firstName,
                lastName: data?.lastName,
              }),
            });

            const resData = await res.json();
            toast.success(resData.message);
            setImgLoading(false);
          } catch (err: any) {
            toast.error(err.message);
            setImgLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setImgLoading(false);
        });
    },
    [cardRef, value?.id, data.email, data.firstName, data.lastName]
  );

  return (
    <form
      onSubmit={handleSendEmail}
      className="flex flex-col items-center justify-center min-h-screen px-8 z-50 relative"
    >
      {loading ? (
        <Icons.spinner className="w-6 h-6" />
      ) : !data.email ? (
        <p>Certificate not found</p>
      ) : (
        <>
          <Tilt className="rounded-xl overflow-hidden relative">
            <div ref={cardRef} className="grid place-items-center">
              <Suspense
                fallback={
                  <div className="h-[565px]">
                    <Icons.spinner className="w-6 h-6" />
                  </div>
                }
              >
                <Image
                  priority
                  quality={100}
                  width={1864}
                  height={1190}
                  src={`/images/certificate.png`}
                  className="object-contain w-full h-auto max-w-[800px] pointer-events-none"
                  alt="sample image"
                />
              </Suspense>

              <h2
                className={`absolute z-10 md:mt-20 mt-12 text-[#171717] text-4xl [font-size:clamp(18px,3vw,40px)] uppercase ${googleBold.className}`}
              >
                {data.firstName} {data.lastName}
              </h2>
            </div>
          </Tilt>
          <div className="flex items-center mt-8 space-x-4">
            {imgLoading ? (
              <Icons.spinner className="w-6 h-6" />
            ) : (
              <>
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
              </>
            )}
          </div>
        </>
      )}
    </form>
  );
}
