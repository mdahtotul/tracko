"use client";

import CoverImageModal from "@/components/common/Modals/CoverImageModal";
import SettingsModal from "@/components/common/Modals/SettingsModal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
}
