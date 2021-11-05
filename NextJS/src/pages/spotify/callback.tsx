import { useRouter } from "next/dist/client/router";
import { useRef } from "react";

export default function Callback() {
  const router = useRef(useRouter());
}
