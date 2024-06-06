"use client";

import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import Logo from "../MarketingComp/Logo";
import { Button } from "../ui/button";
import Spinner from "./Spinner";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size={"sm"}>
                Log In
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button size={"sm"}>Get Tracko Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/documents"}>Enter Tracko</Link>
            </Button>{" "}
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
