import Link from "next/link";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { useRouter } from "next/router";
import { doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { FormEventHandler, useCallback, useRef, useState } from "react";

import { db } from "@/config/firebase";
import Button from "@/components/Button";
import { Icons } from "@/components/Icons";
import Certificate from "@/components/Certificate";

export default function Cert() {
  const {
    query: { id },
  } = useRouter();
  const [value, loading] = useDocumentOnce(
    doc(db, `certificates/${id?.toString().toUpperCase()}`)
  );

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
      pixelRatio: 5,
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
                id: value?.id,
                email: value?.data()?.email,
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
    [cardRef, value?.id, value?.data()?.email]
  );

  // useEffect(() => {
  //   if (!loading) {
  //     if (!value?.exists()) {
  //       push("/");
  //       toast.error("Certificate not found!");
  //       return;
  //     }
  //
  //     toast.success("Certificate generated!");
  //   }
  // }, [loading, value]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen px-8"
    >
      {loading ? (
        <Icons.spinner className="w-6 h-6" />
      ) : (
        <>
          <Certificate value={value} ref={cardRef} />
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
