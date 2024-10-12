"use client";

import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateSet } from "@/types/types";
import React, { useCallback, useState } from "react";

type Props = {
  setExerciseSets: React.Dispatch<React.SetStateAction<CreateSet[]>>;
};

export function AddSetModal({ setExerciseSets }: Props) {
  const { setShowCreateSetModal } = useModalVisibility();

  const [setName, setSetName] = useState<string | null>(null);
  const [targetRepsString, setTargetRepsString] = useState<string | null>(null);

  const handleAddSet = useCallback(() => {
    // check if all fields are filled
    if (!setName || !targetRepsString) {
      if (!setName) {
        setSetName("");
      }

      if (!targetRepsString) {
        setTargetRepsString("");
      }

      return;
    }

    // convert targetRepsString to number
    let targetReps;

    try {
      targetReps = parseInt(targetRepsString);
    } catch (error) {
      console.log(error);
      return;
    }

    // update sets for the exercise (append it)
    setExerciseSets((prev) => [...prev, { name: setName, targetReps }]);

    // reset state
    setSetName(null);
    setTargetRepsString(null);

    // close modal
    setShowCreateSetModal(false);
  }, [setExerciseSets, setName, targetRepsString, setShowCreateSetModal]);

  return (
    <Modal
      className="flex h-fit w-fit flex-col gap-4 p-10 pb-6"
      closeModal={() => setShowCreateSetModal(false)}
    >
      <h1 className="text-2xl font-bold">Add Set</h1>
      <Input
        error={setName === ""}
        errorLabel={"This field is required"}
        value={setName || ""}
        onChange={(e) => setSetName(e.target.value)}
        placeholder="Set Name"
      />
      <Input
        min={1}
        type="number"
        value={targetRepsString || ""}
        error={targetRepsString === ""}
        errorLabel={"This field is required"}
        onChange={(e) => setTargetRepsString(e.target.value)}
        placeholder="Target Reps"
      />
      <button
        onClick={handleAddSet}
        className="flex w-full justify-center rounded-full bg-amber-500 px-4 py-2 text-white"
      >
        Add Set
      </button>
    </Modal>
  );
}
