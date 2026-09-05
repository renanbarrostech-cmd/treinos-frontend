import { Calendar, Check, Clock, Dumbbell } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import type { ListWorkoutDayById200WeekDay } from "@/app/_lib/api/fetch-generated";
import { Button } from "@/components/ui/button";

const WEEK_DAY_LABEL: Record<ListWorkoutDayById200WeekDay, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

type WorkoutDayCoverProps = {
  name: string;
  weekDay: ListWorkoutDayById200WeekDay;
  isRest: boolean;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string | null;
  cta?: ReactNode;
  isCompleted?: boolean;
};

export const WorkoutDayCover = ({
  name,
  weekDay,
  isRest,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
  cta,
  isCompleted,
}: WorkoutDayCoverProps) => {
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);

  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-media to-media/80 shadow-sm">
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-media via-media/40 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex w-fit items-center gap-1.5 rounded-full bg-media-foreground/20 px-3 py-1 text-xs text-media-foreground backdrop-blur-sm">
          <Calendar className="size-3.5" />
          <span className="uppercase">{WEEK_DAY_LABEL[weekDay]}</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-heading text-2xl font-semibold text-media-foreground">
              {isRest ? "Descanso" : name}
            </p>

            {!isRest && (
              <div className="flex items-center gap-3 text-xs text-media-foreground/70">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {durationInMinutes}min
                </span>
                <span className="flex items-center gap-1">
                  <Dumbbell className="size-3.5" />
                  {exercisesCount} exercícios
                </span>
              </div>
            )}
          </div>

          {isCompleted ? (
            <Button
              variant="ghost"
              disabled
              className="shrink-0 gap-1.5 rounded-full bg-media-foreground/15 px-5 text-media-foreground backdrop-blur-sm hover:bg-media-foreground/15 disabled:opacity-100"
            >
              <Check className="size-4" />
              Concluído!
            </Button>
          ) : (
            cta
          )}
        </div>
      </div>
    </div>
  );
};
