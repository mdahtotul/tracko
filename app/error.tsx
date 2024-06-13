"use client";

import GenericError from "@/components/common/GenericError";

export default function ErrorPage() {
  return (
    <GenericError
      status={500}
      message={"Something went wrong"}
      redirectUrl={"/"}
      redirectUrlButtonText={"Go Back"}
    />
  );
}
