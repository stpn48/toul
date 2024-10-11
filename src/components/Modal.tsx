import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  closeModal: () => void;
  className?: string;
  transparentBackdrop?: boolean;
  children: React.ReactNode;
};

export function Modal({ closeModal, className, transparentBackdrop, children }: Props) {
  return (
    // Backdrop
    <div
      onClick={closeModal}
      className={twMerge(
        "fixed inset-0 flex h-screen w-screen items-center justify-center bg-stone-900 bg-opacity-50",
        transparentBackdrop && "bg-transparent",
      )}
    >
      {/* Modal */}
      <div
        className={twMerge(
          "dark:bg-dark relative flex h-[95%] w-[80%] flex-col rounded-lg bg-white",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-2 top-2" onClick={closeModal}>
          <XMarkIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

function XMarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-secondary size-5"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
