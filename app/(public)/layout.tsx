"use client";
import Spinner from "@/components/common/Spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}
