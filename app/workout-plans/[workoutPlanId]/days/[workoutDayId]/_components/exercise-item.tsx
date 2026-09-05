import { CircleHelp, Zap } from "lucide-react";

import type { ListWorkoutDayById200ExercisesItem } from "@/app/_lib/api/fetch-generated";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ExerciseItemProps = {
  exercise: ListWorkoutDayById200ExercisesItem;
  className?: string;
};

export const ExerciseItem = ({ exercise, className }: ExerciseItemProps) => {
  return (
    <div className={cn("flex flex-col gap-3 p-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-heading text-base font-semibold text-foreground">
          {exercise.name}
        </p>

        <Button
          variant="ghost"
          size="icon-sm"
          className="shrink-0 rounded-full text-muted-foreground"
        >
          <CircleHelp className="size-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase text-foreground">
          {exercise.sets} séries
        </span>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase text-foreground">
          {exercise.reps} reps
        </span>
        <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase text-foreground">
          <Zap className="size-3" />
          {exercise.restTimeInSeconds}s
        </span>
      </div>
    </div>
  );
};
