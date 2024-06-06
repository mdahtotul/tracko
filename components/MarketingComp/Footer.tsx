import { Button } from "../ui/button";
import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50">
      <Logo />

      <div className="w-full md:ml-auto flex items-center justify-between md:justify-end gap-x-2">
        <Button variant={"ghost"} size={"sm"}>
          Privacy Policy
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}
