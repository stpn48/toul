import { redirect } from "next/navigation";

export default function WorkoutDetailsPage() {
  // When user refreshes with the modal open this will run (just close the modal)
  redirect("/app/your-workouts");
}
