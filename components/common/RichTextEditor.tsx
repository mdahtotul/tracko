"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";

interface RichTextEditorProps {
  isEditable?: boolean;
  initialContent?: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({
  onChange,
  initialContent,
  isEditable = true,
}: RichTextEditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    return res.url;
  };
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: (file: File) => handleUpload(file),
  });
  return (
    <BlockNoteView
      editor={editor}
      editable={isEditable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
    />
  );
}
