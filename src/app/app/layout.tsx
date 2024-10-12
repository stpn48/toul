import { CreateWorkoutModal } from "@/components/CreateWorkoutModal";
import PageContainer from "@/components/PageContainer";
import { SettingButton } from "@/components/SettingButton";
import { Sidebar } from "@/components/Sidebar";
import { OptimisticWorkoutsProvider } from "@/context/useOptimisticWorkouts";
import { ExerciseWithSets } from "@/types/types";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { Workout } from "@prisma/client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignOutButton from "./components/SignOutButton";

export const metadata: Metadata = {
  title: "toul",
  description: "toul.app",
};

export default async function AppLayout({
  children,
  workoutDetailsModal,
}: {
  children: React.ReactNode;
  workoutDetailsModal: React.ReactNode; // Make the modal prop optional
}) {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const initialWorkouts: Workout[] = await prisma.workout.findMany({
    where: {
      userId: user.id,
    },
  });

  const initialExercises: ExerciseWithSets[] = await prisma.exercise.findMany({
    where: {
      userId: user.id,
    },
    include: {
      sets: true,
    },
  });
  return (
    <OptimisticWorkoutsProvider
      initialWorkouts={initialWorkouts}
      initialExercises={initialExercises}
    >
      <SettingButton className="absolute right-2 top-2" />
      <Sidebar />
      <PageContainer>
        {children}
        {workoutDetailsModal}
        <SignOutButton />
        <CreateWorkoutModal />
      </PageContainer>
    </OptimisticWorkoutsProvider>
  );
}
