import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { ArrowRight, Flame } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { WorkoutDayCard } from "@/components/workout-day-card";
import { cn } from "@/lib/utils";

dayjs.extend(isoWeek);

const WEEK_DAY_LETTERS = ["S", "T", "Q", "Q", "S", "S", "D"];

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const today = dayjs();
  const response = await getHomeData(today.format("YYYY-MM-DD"));

  if (response.status !== 200) redirect("/auth");

  const { todayWorkoutDay, workoutStreak, consistencyByDay } = response.data;

  const startOfWeek = today.startOf("isoWeek");
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = startOfWeek.add(index, "day");
    const dateKey = date.format("YYYY-MM-DD");
    const consistency = consistencyByDay[dateKey];

    return {
      dateKey,
      letter: WEEK_DAY_LETTERS[index],
      isToday: dateKey === today.format("YYYY-MM-DD"),
      completed: consistency?.workoutDayCompleted ?? false,
      started: consistency?.workoutDayStarted ?? false,
    };
  });

  const firstName = session.data.user.name?.split(" ")[0];

  return (
    <div className="min-h-svh bg-gradient-to-b from-muted/50 to-background pb-28 md:pb-32">
      <div className="mx-auto flex w-full max-w-md flex-col md:max-w-3xl">
        <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-b-[28px] shadow-lg md:h-[380px] md:rounded-[28px] md:shadow-xl">
          <Image
            src="/images/home-bg.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-media via-media/40 to-transparent" />

          <div className="relative flex h-full flex-col justify-between p-6 pb-10 md:p-8">
            <Image src="/fit.ai.svg" alt="FIT.AI" width={78} height={20} />

            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-media-foreground md:text-4xl">
                  Olá, {firstName}
                </h1>
                <p className="text-sm text-media-foreground/70 md:text-base">
                  Bora treinar hoje?
                </p>
              </div>

              <Button className="shrink-0 gap-1.5 rounded-full bg-brand px-5 text-brand-foreground shadow-md shadow-brand/30 transition-transform hover:scale-105 hover:bg-brand/90 active:scale-95">
                Bora!
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-5 pt-6 md:grid md:grid-cols-2 md:items-start md:gap-6 md:px-8">
          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                Consistência
              </h2>
              <Button variant="link" className="h-auto p-0 text-sm text-brand">
                Ver histórico
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-1 items-center justify-between rounded-xl border border-border px-4 py-2 md:px-5">
                {weekDays.map((day) => (
                  <div
                    key={day.dateKey}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div
                      className={cn(
                        "size-5 rounded-[6px] border border-border transition-colors",
                        day.completed && "border-transparent bg-brand",
                        !day.completed &&
                          day.started &&
                          "border-transparent bg-consistency-started",
                        !day.completed &&
                          !day.started &&
                          day.isToday &&
                          "border-[1.6px] border-brand"
                      )}
                    />
                    <span className="text-xs text-muted-foreground">
                      {day.letter}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-xl bg-streak px-4 py-2 shadow-sm shadow-streak-foreground/10 md:px-5">
                <Flame className="size-5 text-streak-foreground" />
                <span className="font-semibold text-streak-foreground">
                  {workoutStreak}
                </span>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                Treino de Hoje
              </h2>
              <Button variant="link" className="h-auto p-0 text-sm text-brand">
                Ver treinos
              </Button>
            </div>

            {todayWorkoutDay ? (
              <Link
                href={`/workout-plans/${todayWorkoutDay.workoutPlanId}/days/${todayWorkoutDay.id}`}
                className="block transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                <WorkoutDayCard
                  name={todayWorkoutDay.name}
                  weekDay={todayWorkoutDay.weekDay}
                  isRest={todayWorkoutDay.isRest}
                  estimatedDurationInSeconds={
                    todayWorkoutDay.estimatedDurationInSeconds
                  }
                  exercisesCount={todayWorkoutDay.exercisesCount}
                  coverImageUrl={todayWorkoutDay.coverImageUrl}
                />
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum treino programado para hoje.
              </p>
            )}
          </section>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
