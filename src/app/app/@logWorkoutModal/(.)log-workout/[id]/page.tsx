import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";
import { LogWorkoutModal } from "./components/LogWorkoutModal";

type Props = {
  params: { id: string };
};

export default async function LogWorkoutModalPage({ params }: Props) {
  if (!params.id) {
    redirect("/app/your-workouts");
  }

  try {
    const workout = await prisma.workout.findFirst({
      where: {
        id: params.id,
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    if (!workout) {
      // close modal TODO: Show error toast and improve error handling
      redirect("/app/your-workouts");
    }

    return <LogWorkoutModal workout={workout} />;
  } catch (error) {
    redirect("/app/your-workouts");
  }
}
