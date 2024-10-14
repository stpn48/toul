"use client";

import Button from "@/components/Button";
import React from "react";

type Props = { handleEditExercise: () => void };

export function EditExerciseButton({ handleEditExercise }: Props) {
  return <Button onClick={() => handleEditExercise()}>Edit Exercise</Button>;
}
