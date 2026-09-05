"use server";

import { revalidatePath } from "next/cache";

import {
  startWorkoutSession,
  updateWorkoutSession,
} from "@/app/_lib/api/fetch-generated";

export const startWorkoutSessionAction = async (
  workoutPlanId: string,
  workoutDayId: string
) => {
  const response = await startWorkoutSession(workoutPlanId, workoutDayId);

  if (response.status !== 201) {
    return { error: response.data.error };
  }

  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
};

export const completeWorkoutSessionAction = async (
  workoutPlanId: string,
  workoutDayId: string,
  workoutSessionId: string
) => {
  const response = await updateWorkoutSession(
    workoutPlanId,
    workoutDayId,
    workoutSessionId,
    { completedAt: new Date().toISOString() }
  );

  if (response.status !== 200) {
    return { error: response.data.error };
  }

  revalidatePath(`/workout-plans/${workoutPlanId}/days/${workoutDayId}`);
};
