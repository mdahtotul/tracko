"use client";

import GenericError from "@/components/common/GenericError";

export default function NotFoundPage() {
  return (
    <GenericError
      status={404}
      message={"This page does not exist"}
      redirectUrl={"/"}
      redirectUrlButtonText={"Go Back"}
    />
  );
}
