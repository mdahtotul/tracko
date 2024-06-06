import { cn } from "@/lib/utils";
import { Salsa } from "next/font/google";
import Image from "next/image";

const font = Salsa({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/logo.svg" alt="logo" width="20" height="20" />
      <p className={(cn("font-bold"), font.className)}>Tracko</p>
    </div>
  );
}
