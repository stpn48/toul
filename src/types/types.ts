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
  isWarmupSet: boolean;
};

export type CreateExercise = {
  name: string;
  description: string | null;
  sets: CreateSet[];
};

export type Filter =
  | "a-z"
  | "z-a"
  | "times completed lowest to highest"
  | "times completed highest to lowest"
  | "last completed latest to oldest"
  | "last completed oldest to latest"
  | "created latest to oldest"
  | "created oldest to latest";
