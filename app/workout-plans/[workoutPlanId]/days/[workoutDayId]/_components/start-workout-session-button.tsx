"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { startWorkoutSessionAction } from "../actions";

type StartWorkoutSessionButtonProps = {
  workoutPlanId: string;
  workoutDayId: string;
};

export const StartWorkoutSessionButton = ({
  workoutPlanId,
  workoutDayId,
}: StartWorkoutSessionButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await startWorkoutSessionAction(
        workoutPlanId,
        workoutDayId
      );

      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className="shrink-0 gap-1.5 rounded-full bg-brand px-5 text-brand-foreground shadow-md shadow-brand/30 transition-transform hover:scale-105 hover:bg-brand/90 active:scale-95"
    >
      {isPending ? "Iniciando..." : "Iniciar Treino"}
    </Button>
  );
};
