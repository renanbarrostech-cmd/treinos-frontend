import { Calendar, Clock, Dumbbell } from "lucide-react";
import Image from "next/image";

import type { GetHomeData200TodayWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

type WeekDay = NonNullable<GetHomeData200TodayWorkoutDay>["weekDay"];

const WEEK_DAY_LABEL: Record<WeekDay, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

type WorkoutDayCardProps = {
  name: string;
  weekDay: WeekDay;
  isRest: boolean;
  estimatedDurationInSeconds: number;
  exercisesCount: number;
  coverImageUrl?: string | null;
  className?: string;
};

export const WorkoutDayCard = ({
  name,
  weekDay,
  isRest,
  estimatedDurationInSeconds,
  exercisesCount,
  coverImageUrl,
  className,
}: WorkoutDayCardProps) => {
  const durationInMinutes = Math.round(estimatedDurationInSeconds / 60);

  return (
    <div
      className={cn(
        "relative h-[200px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-media to-media/80 shadow-sm",
        className
      )}
    >
      {coverImageUrl && (
        <Image
          src={coverImageUrl}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-media via-media/40 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex w-fit items-center gap-1.5 rounded-full bg-media-foreground/20 px-3 py-1 text-xs text-media-foreground backdrop-blur-sm">
          <Calendar className="size-3.5" />
          <span className="uppercase">{WEEK_DAY_LABEL[weekDay]}</span>
        </div>

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
      </div>
    </div>
  );
};
