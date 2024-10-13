"use client";

import { removeWorkout } from "@/app/actions/removeWorkout";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { TrashIcon } from "./EditSetModal";

export function DeleteWorkoutButton({ workoutId }: { workoutId: string }) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const router = useRouter();

  const handleDeleteWorkout = useCallback(async () => {
    const response = await removeWorkout(workoutId);

    if (response?.error) {
      toast.error(response.error);
      return;
    }
  }, [router]);

  return (
    <div className="z-50">
      <button className="absolute bottom-4 left-4" onClick={() => setShowConfirmationModal(true)}>
        <TrashIcon />
      </button>

      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this workout? There is no coming back."
          closeModal={() => setShowConfirmationModal(false)}
          confirmAction={handleDeleteWorkout}
        />
      )}
    </div>
  );
}
