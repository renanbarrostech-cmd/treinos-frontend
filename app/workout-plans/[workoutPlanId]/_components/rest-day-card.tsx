import { Calendar, Zap } from "lucide-react";

import type { ListWorkoutPlans200WorkoutDaysItemWeekDay } from "@/app/_lib/api/fetch-generated";

const WEEK_DAY_LABEL: Record<ListWorkoutPlans200WorkoutDaysItemWeekDay, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

type RestDayCardProps = {
  weekDay: ListWorkoutPlans200WorkoutDaysItemWeekDay;
};

export const RestDayCard = ({ weekDay }: RestDayCardProps) => {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-muted p-5">
      <div className="flex w-fit items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1 text-xs text-foreground backdrop-blur-sm">
        <Calendar className="size-3.5" />
        <span className="uppercase">{WEEK_DAY_LABEL[weekDay]}</span>
      </div>

      <div className="flex items-center gap-1.5 font-heading text-base font-semibold text-foreground">
        <Zap className="size-4" />
        Descanso
      </div>
    </div>
  );
};
