"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export function ChartInformation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex w-[400px] justify-end">
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-7 z-50 flex w-fit flex-col rounded-lg bg-secondary p-2 text-secondary shadow-md dark:bg-dark-secondary"
            transition={{ delay: 0.4, duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>*Hover on the line to see the tooltip</p>
            <p>*Session means the iteration of the exercise</p>
            <p>*Reps means the number of reps you did in that iteration</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
