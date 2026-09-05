"use client";

import { ChartNoAxesColumn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BottomNavStatsLink = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/stats");

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
      <Link href="/stats">
        <ChartNoAxesColumn className="size-5" />
      </Link>
    </Button>
  );
};
