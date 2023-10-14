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

  return <Certificate value={value} loading={loading} />;
}
