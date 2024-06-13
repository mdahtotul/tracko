"use client";

import Cover from "@/components/common/Cover";
import Toolbar from "@/components/common/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentDetailPageProps {
  params: { documentId: Id<"documents"> };
}

export default function DocumentDetailPage({
  params: { documentId },
}: DocumentDetailPageProps) {
  const RichTextEditor = useMemo(
    () =>
      dynamic(() => import("@/components/common/RichTextEditor"), {
        ssr: false,
      }),
    []
  );
  const document = useQuery(api.documents.getDocumentById, {
    documentId,
  });

  const update = useMutation(api.documents.updateDocument);

  const onChange = (content: string) => {
    update({
      id: documentId as Id<"documents">,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pt-4 pl-8">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <p>Document not found!</p>;
  }
  return (
    <div className="pb-40">
      <Cover url={document?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <RichTextEditor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
}
