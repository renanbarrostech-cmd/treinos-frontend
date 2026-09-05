"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BottomNavCalendarLinkProps = {
  href: string;
};

export const BottomNavCalendarLink = ({ href }: BottomNavCalendarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname.startsWith("/workout-plans/") && pathname.includes("/days/");

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
      <Link href={href}>
        <Calendar className="size-5" />
      </Link>
    </Button>
  );
};
