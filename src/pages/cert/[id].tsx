import { useRouter } from "next/router";
import { doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

import { db } from "@/config/firebase";
import Certificate from "@/components/Certificate";

export default function Cert() {
  const {
    query: { id },
  } = useRouter();
  const [value, loading] = useDocumentOnce(
    doc(db, `certificates/${id?.toString().toUpperCase()}`)
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

  return <Certificate value={value} loading={loading} />;
}
