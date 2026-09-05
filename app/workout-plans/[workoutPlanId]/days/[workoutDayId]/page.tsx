import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { listWorkoutDayById } from "@/app/_lib/api/fetch-generated";
import { BottomNav } from "@/components/bottom-nav";

import { BackButton } from "./_components/back-button";
import { CompleteWorkoutSessionButton } from "./_components/complete-workout-session-button";
import { ExerciseItem } from "./_components/exercise-item";
import { StartWorkoutSessionButton } from "./_components/start-workout-session-button";
import { WorkoutDayCover } from "./_components/workout-day-cover";

type WorkoutDayPageProps = {
  params: Promise<{ workoutPlanId: string; workoutDayId: string }>;
};

export default async function WorkoutDayPage({ params }: WorkoutDayPageProps) {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const { workoutPlanId, workoutDayId } = await params;
  const response = await listWorkoutDayById(workoutPlanId, workoutDayId);

  if (response.status !== 200) redirect("/");

  const workoutDay = response.data;

  const inProgressSession = workoutDay.sessions.find(
    (workoutSession) => workoutSession.completedAt === null
  );
  const completedSession = workoutDay.sessions.find(
    (workoutSession) => workoutSession.completedAt !== null
  );

  return (
    <div className="min-h-svh bg-background pb-28 md:pb-32">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-5 pt-4 md:max-w-3xl md:px-8">
        <header className="relative flex items-center justify-center py-2">
          <BackButton />
          <h1 className="font-heading text-base font-semibold text-foreground">
            Treino de Hoje
          </h1>
        </header>

        <WorkoutDayCover
          name={workoutDay.name}
          weekDay={workoutDay.weekDay}
          isRest={workoutDay.isRest}
          estimatedDurationInSeconds={workoutDay.estimatedDurationInSeconds}
          exercisesCount={workoutDay.exercises.length}
          coverImageUrl={workoutDay.coverImageUrl}
          isCompleted={!!completedSession && !inProgressSession}
          cta={
            !inProgressSession &&
            !completedSession && (
              <StartWorkoutSessionButton
                workoutPlanId={workoutPlanId}
                workoutDayId={workoutDayId}
              />
            )
          }
        />

        {!workoutDay.isRest && (
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {workoutDay.exercises.map((exercise) => (
              <ExerciseItem key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}

        {inProgressSession && (
          <CompleteWorkoutSessionButton
            workoutPlanId={workoutPlanId}
            workoutDayId={workoutDayId}
            workoutSessionId={inProgressSession.id}
          />
        )}
      </div>

      <BottomNav />
    </div>
  );
}
