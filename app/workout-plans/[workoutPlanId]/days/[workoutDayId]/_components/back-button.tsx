"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="absolute left-4 text-foreground"
    >
      <ChevronLeft className="size-5" />
    </Button>
  );
};
