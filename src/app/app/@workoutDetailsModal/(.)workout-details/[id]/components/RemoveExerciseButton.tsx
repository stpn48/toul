import React from "react";
import { TrashIcon } from "./EditSetModal";

type Props = {
  handleRemoveExercise: () => void;
};

export function RemoveExerciseButton({ handleRemoveExercise }: Props) {
  return (
    <button onClick={handleRemoveExercise}>
      <TrashIcon />
    </button>
  );
}
