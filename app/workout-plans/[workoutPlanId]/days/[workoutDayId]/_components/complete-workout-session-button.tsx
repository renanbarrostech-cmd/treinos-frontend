"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { completeWorkoutSessionAction } from "../actions";

type CompleteWorkoutSessionButtonProps = {
  workoutPlanId: string;
  workoutDayId: string;
  workoutSessionId: string;
};

export const CompleteWorkoutSessionButton = ({
  workoutPlanId,
  workoutDayId,
  workoutSessionId,
}: CompleteWorkoutSessionButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await completeWorkoutSessionAction(
        workoutPlanId,
        workoutDayId,
        workoutSessionId
      );

      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
      className="h-12 w-full rounded-xl border-border text-base font-medium"
    >
      {isPending ? "Marcando..." : "Marcar como concluído"}
    </Button>
  );
};
