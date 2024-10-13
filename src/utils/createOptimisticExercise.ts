import { CreateSet, ExerciseWithSets } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export function createOptimisticExercise(
  exercise: ExerciseWithSets,
  exerciseName: string,
  exerciseDescription: string | null,
  exerciseSets: CreateSet[],
) {
  const optimisticExercise: ExerciseWithSets = {
    workoutId: exercise.workoutId,
    userId: exercise.userId,
    sets: exerciseSets.map((set) => ({
      name: set.name,
      targetReps: set.targetReps,
      exerciseId: exercise.id,
      id: uuidv4(),
      createdAt: new Date(),
    })),
    id: exercise.id,
    createdAt: exercise.createdAt,
    repHistory: exercise.repHistory,
    timesCompleted: exercise.timesCompleted,
    description: exerciseDescription,
    name: exerciseName,
  };

  return optimisticExercise;
}
