import { Exercise, Set, Workout } from "@prisma/client";

export type ClientWorkout = {
  name: string;
  description: string;
  difficulty: string;
  estimatedDuration: string;
};

export type ExerciseWithSets = Exercise & {
  sets: Set[];
};

export type WorkoutWithExercises = Workout & {
  exercises: ExerciseWithSets[];
};

export type CreateSet = {
  name: string;
  targetReps: number;
};

export type CreateExercise = {
  name: string;
  description: string | null;
  sets: CreateSet[];
};
