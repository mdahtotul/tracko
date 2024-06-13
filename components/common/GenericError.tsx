import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface GenericErrorProps {
  status: number;
  message: string;
  redirectUrl: string;
  redirectUrlButtonText: string;
}

export default function GenericError({
  status,
  message,
  redirectUrl,
  redirectUrlButtonText,
}: GenericErrorProps) {
  return (
    <div className="flex gap-5 items-center justify-center w-full h-full">
      <figure>
        <Image src={"/gene.png"} width={300} height={300} alt={"error"} />
      </figure>
      <figcaption className="space-y-4">
        <h3 className="text-3xl font-bold text-black dark:text-white">
          Error: {status}
        </h3>
        <p className="text-lg font-medium text-muted-foreground">{message}</p>
        <Button asChild>
          <Link href={redirectUrl}>{redirectUrlButtonText}</Link>
        </Button>
      </figcaption>
    </div>
  );
}
