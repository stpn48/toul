"use client";

import { Modal } from "@/components/Modal";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function LogWorkoutModal({}: Props) {
  const router = useRouter();

  return (
    <Modal closeModal={() => router.back()}>
      <h1>HELLO</h1>
    </Modal>
  );
}
