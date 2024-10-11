"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  placeholder?: string;
  error?: boolean;
  errorLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  className,
  placeholder,
  onChange,
  error,
  errorLabel,
  ...props
}: Props) {
  const [showLabel, setShowLabel] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setShowLabel(true);
    } else {
      setShowLabel(false);
    }

    onChange?.(e);
  };

  return (
    <div className="relative">
      <input
        onChange={handleOnChange}
        placeholder={placeholder}
        className={twMerge(
          "min-w-[200px] rounded-md border px-4 py-2 text-black outline-none",
          className,
          error && "border-[#e22743]",
        )}
        {...props}
      />

      {/* There is no error and the input is not empty show the label */}
      <AnimatePresence>
        {showLabel && !error && (
          <motion.p
            exit={{ opacity: 0 }} // Move up on exit
            animate={{ scale: 1 }} // Move further up when animated
            initial={{ scale: 1.1 }} // Start below
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-secondary absolute -top-[9px] left-2 bg-white px-px text-xs"
          >
            {placeholder}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            exit={{ opacity: 0 }} // Move up on exit
            animate={{ scale: 1 }} // Move further up when animated
            initial={{ scale: 1.1 }} // Start below
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute -top-[9px] left-2 bg-white px-px text-xs text-[#e22743]"
          >
            {errorLabel}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
