"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import DocumentDetailBanner from "./DocumentDetailBanner";
import DocumentDetailTitle from "./DocumentDetailTitle";
import Menu from "./Menu";
import PublishDocument from "./PublishDocument";

interface DocumentDetailNavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export default function DocumentDetailNavbar({
  isCollapsed,
  onResetWidth,
}: DocumentDetailNavbarProps) {
  const params = useParams();
  const document = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center justify-between">
        <DocumentDetailTitle.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return <p>Document not found</p>;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-4 w-4 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <DocumentDetailTitle initialData={document} />
          <div className="flex items-center gap-x-2">
            <PublishDocument initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document?.isArchived && (
        <DocumentDetailBanner documentId={document._id} />
      )}
    </>
  );
}
