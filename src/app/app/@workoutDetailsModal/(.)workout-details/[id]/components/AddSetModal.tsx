"use client";

import Button from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
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
  const [isWarmupSet, setIsWarmupSet] = useState(false);

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
    setExerciseSets((prev) => [...prev, { name: setName, targetReps, isWarmupSet }]);

    // reset state
    setSetName(null);
    setTargetRepsString(null);
    setIsWarmupSet(false);

    // close modal
    setShowCreateSetModal(false);
  }, [setExerciseSets, setName, targetRepsString, setShowCreateSetModal, isWarmupSet, setIsWarmupSet]);

  return (
    <Modal className="flex h-fit w-fit flex-col gap-4 p-10" closeModal={() => setShowCreateSetModal(false)}>
      <h1 className="mb-4 flex w-full justify-center text-2xl font-bold">Add Set</h1>
      <Input value={setName || ""} onChange={(e) => setSetName(e.target.value)} placeholder="Set Name" />
      <Input
        min={1}
        type="number"
        value={targetRepsString || ""}
        onChange={(e) => setTargetRepsString(e.target.value)}
        placeholder="Target Reps"
      />
      <div className="flex items-center gap-2">
        <Checkbox onClick={() => setIsWarmupSet((prev) => !prev)} />
        <p className="text-sm text-secondary">Warmup Set</p>
      </div>
      <Button onClick={handleAddSet} className="w-full">
        Add Set
      </Button>
    </Modal>
  );
}
