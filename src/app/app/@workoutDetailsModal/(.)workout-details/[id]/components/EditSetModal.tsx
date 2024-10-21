"use client";

import Button from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { CreateSet } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  closeModal: () => void;
  setExerciseSets: React.Dispatch<React.SetStateAction<CreateSet[]>>;
  editingSetIndex: number;
  setDetails: CreateSet;
};

export function EditSetModal({ closeModal, setExerciseSets, editingSetIndex, setDetails }: Props) {
  const [setName, setSetName] = useState<string | null>(setDetails.name);
  const [targetRepsString, setTargetRepsString] = useState<string | null>(setDetails.targetReps.toString());
  const [isWarmupSet, setIsWarmupSet] = useState(setDetails.isWarmupSet);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [removeConfirmationModal, setRemoveConfirmationModal] = useState(false);

  const { madeChanges } = useMadeChanges(setDetails.name, setDetails.targetReps, setName, parseInt(targetRepsString || "0"));

  const handleEditSet = useCallback(() => {
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
    setExerciseSets((prev) => {
      const updatedExerciseSets = [...prev];

      updatedExerciseSets[editingSetIndex] = {
        isWarmupSet,
        name: setName,
        targetReps,
      };

      return updatedExerciseSets;
    });

    // reset state
    setSetName(null);
    setTargetRepsString(null);

    // close modal
    closeModal();
  }, [setExerciseSets, setName, targetRepsString, isWarmupSet, closeModal, editingSetIndex]);

  const handleRemoveSet = useCallback(() => {
    setExerciseSets((prev) => {
      const updatedExerciseSets = [...prev];

      updatedExerciseSets.splice(editingSetIndex, 1);

      return updatedExerciseSets;
    });

    closeModal();
  }, [editingSetIndex, setExerciseSets, closeModal]);

  const handleCloseModal = useCallback(() => {
    if (madeChanges) {
      setShowConfirmationModal(true);
    } else {
      closeModal();
    }
  }, [madeChanges, setShowConfirmationModal, closeModal]);

  return (
    <Modal className="flex h-fit w-fit flex-col gap-4 p-10 px-[100px]" closeModal={handleCloseModal}>
      <h1 className="mb-4 flex w-full justify-center text-2xl font-bold">Edit Set</h1>
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
      <div className="flex items-center gap-2">
        <Checkbox initialIsChecked={isWarmupSet} onClick={() => setIsWarmupSet((prev) => !prev)} />
        <p className="text-sm text-secondary">Warmup Set</p>
      </div>
      <div className="relative">
        <button onClick={() => setRemoveConfirmationModal(true)} className="absolute -left-8 top-[50%] translate-y-[-50%]">
          <TrashIcon />
        </button>
        <Button onClick={handleEditSet} className="flex w-full justify-center">
          Edit Set
        </Button>
      </div>

      {showConfirmationModal && (
        <ConfirmationModal
          closeModal={() => setShowConfirmationModal(false)}
          message="Are you sure you want to discard all changes?"
          confirmAction={() => closeModal()}
        />
      )}

      {removeConfirmationModal && (
        <ConfirmationModal
          closeModal={() => setRemoveConfirmationModal(false)}
          message="Are you sure you want to remove this set?"
          confirmAction={handleRemoveSet}
        />
      )}
    </Modal>
  );
}

// helpers
function useMadeChanges(initialSetName: string, initialTargetReps: number, setName: string | null, targetReps: number) {
  const [madeChanges, setMadeChanges] = useState(false);

  useEffect(() => {
    if (initialSetName !== setName || initialTargetReps !== targetReps) {
      setMadeChanges(true);
    } else {
      setMadeChanges(false);
    }
  }, [initialSetName, initialTargetReps, setName, targetReps]);

  return { madeChanges };
}

export function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-4 text-red-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}
