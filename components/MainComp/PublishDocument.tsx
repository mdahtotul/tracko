"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/useOrigin";
import { useMutation } from "convex/react";
import { CheckIcon, CopyIcon, GlobeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface PublishDocumentProps {
  initialData: Doc<"documents">;
}

export default function PublishDocument({ initialData }: PublishDocumentProps) {
  const origin = useOrigin();
  const update = useMutation(api.documents.updateDocument);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData?._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData?._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published",
      error: "Failed to publish note",
    });
  };

  const onUnpublished = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData?._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Processing...",
      success: "Note unpublished",
      error: "Failed to unpublished note",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          {initialData?.isPublished ? (
            <>
              Published <GlobeIcon className="text-sky-500 w-4 h-4 ml-2" />
            </>
          ) : (
            "Publish"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData?.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <GlobeIcon className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-sky-500 text-xs font-medium">
                This document is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                className="h-8 flex-1 px-2 text-xs border rounded-l-md bg-muted truncate"
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnpublished}
            >
              Conceal
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <GlobeIcon className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size={"sm"}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
