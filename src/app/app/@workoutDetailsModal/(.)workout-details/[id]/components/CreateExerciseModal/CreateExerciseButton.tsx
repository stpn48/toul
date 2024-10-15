"use client";

import Button from "@/components/Button";
import React from "react";

type Props = { onClick: () => void };

export function CreateExerciseButton({ onClick }: Props) {
  return (
    <Button onClick={onClick} className="absolute bottom-4 right-4">
      Create Exercise
    </Button>
  );
}
