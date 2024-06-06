import Navbar from "@/components/common/Navbar";
import { PropsWithChildren } from "react";

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}
