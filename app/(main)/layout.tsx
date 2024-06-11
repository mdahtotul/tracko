"use client";
import SearchCommand from "@/components/common/SearchCommand";
import Spinner from "@/components/common/Spinner";
import Navigation from "@/components/MainComp/Navigation";
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
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
