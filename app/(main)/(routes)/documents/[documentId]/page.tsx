"use client";

import Toolbar from "@/components/common/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentDetailPageProps {
  params: { documentId: Id<"documents"> };
}

export default function DocumentDetailPage({
  params: { documentId },
}: DocumentDetailPageProps) {
  const document = useQuery(api.documents.getDocumentById, {
    documentId,
  });

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) {
    return <p>Document not found!</p>;
  }
  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
