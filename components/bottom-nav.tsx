import { Calendar, ChartNoAxesColumn, House, Sparkles, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const BottomNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-md items-center justify-between rounded-full border border-border/60 bg-background/80 px-6 py-3 shadow-lg shadow-foreground/5 backdrop-blur-md md:bottom-6 md:max-w-sm">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground transition-colors hover:text-foreground"
        asChild
      >
        <Link href="/">
          <House className="size-5" />
        </Link>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <Calendar className="size-5" />
      </Button>

      <Button
        size="icon-lg"
        className="rounded-full bg-brand text-brand-foreground shadow-md shadow-brand/40 transition-transform hover:scale-105 hover:bg-brand/90 active:scale-95"
      >
        <Sparkles className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChartNoAxesColumn className="size-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <User className="size-5" />
      </Button>
    </nav>
  );
};
