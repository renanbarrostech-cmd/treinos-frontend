import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { listWorkoutPlans } from "@/app/_lib/api/fetch-generated";
import { BottomNav } from "@/components/bottom-nav";
import { WorkoutDayCard } from "@/components/workout-day-card";

import { RestDayCard } from "./_components/rest-day-card";
import { WorkoutPlanHero } from "./_components/workout-plan-hero";

type WorkoutPlanPageProps = {
  params: Promise<{ workoutPlanId: string }>;
};

export default async function WorkoutPlanPage({
  params,
}: WorkoutPlanPageProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const { workoutPlanId } = await params;
  const response = await listWorkoutPlans(workoutPlanId);

  if (response.status !== 200) redirect("/");

  const workoutPlan = response.data;

  return (
    <div className="min-h-svh bg-background pb-28 md:pb-32">
      <div className="mx-auto flex w-full max-w-md flex-col md:max-w-3xl">
        <WorkoutPlanHero name={workoutPlan.name} />

        <div className="flex flex-col gap-3 px-5 pt-6 md:px-8">
          {workoutPlan.workoutDays.map((workoutDay) =>
            workoutDay.isRest ? (
              <RestDayCard key={workoutDay.id} weekDay={workoutDay.weekDay} />
            ) : (
              <Link
                key={workoutDay.id}
                href={`/workout-plans/${workoutPlanId}/days/${workoutDay.id}`}
                className="block transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                <WorkoutDayCard
                  name={workoutDay.name}
                  weekDay={workoutDay.weekDay}
                  isRest={workoutDay.isRest}
                  estimatedDurationInSeconds={
                    workoutDay.estimatedDurationInSeconds
                  }
                  exercisesCount={workoutDay.exercisesCount}
                  coverImageUrl={workoutDay.coverImageUrl}
                />
              </Link>
            )
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
