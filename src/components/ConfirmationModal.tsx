"use client";

import React from "react";
import Button from "./Button";
import { Modal } from "./Modal";

type Props = {
  closeModal: () => void;
  message: string;
  confirmAction: () => void;
};

export function ConfirmationModal({ closeModal, message, confirmAction }: Props) {
  return (
    <Modal closeModal={closeModal} className="flex h-fit w-fit flex-col gap-4 p-10 px-[100px]">
      <p>{message}</p>
      <div className="flex justify-center gap-4">
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="secondary" onClick={confirmAction}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
