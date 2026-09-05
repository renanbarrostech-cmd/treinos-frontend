"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BottomNavProfileLink = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/profile");

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "text-muted-foreground transition-colors hover:text-foreground",
        isActive && "text-brand hover:text-brand"
      )}
      asChild
    >
      <Link href="/profile">
        <User className="size-5" />
      </Link>
    </Button>
  );
};
