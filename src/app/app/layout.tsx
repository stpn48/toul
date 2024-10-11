import { CreateWorkoutModal } from "@/components/CreateWorkoutModal";
import PageContainer from "@/components/PageContainer";
import { SettingButton } from "@/components/SettingButton";
import { Sidebar } from "@/components/Sidebar";
import CreateWorkoutButton from "@/components/Sidebar/components/CreateWorkoutButton";
import { OptimisticWorkoutsProvider } from "@/context/useOptimisticWorkouts";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SignOutButton from "./components/SignOutButton";

export const metadata: Metadata = {
  title: "toul",
  description: "toul.app",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
  createWorkoutModal: React.ReactNode; // Make the modal prop optional
}) {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const initialWorkouts = await prisma.workout.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <OptimisticWorkoutsProvider initialWorkouts={initialWorkouts}>
      <SettingButton className="absolute right-2 top-2" />
      <Sidebar />
      <PageContainer>
        {children}
        <SignOutButton />
        <CreateWorkoutModal />
      </PageContainer>
    </OptimisticWorkoutsProvider>
  );
}
