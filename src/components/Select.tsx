import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  label?: string;
  disableLabel?: boolean;
  className?: string;
};

export default function Select({ value, setValue, options, label, disableLabel, className }: Props) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative">
      <select
        className={twMerge(
          "rounded-lg border border-main px-4 py-2 outline-none focus:border-hover dark:border-dark-main dark:focus:border-dark-hover",
          className,
        )}
        value={value}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>

      {!disableLabel && (
        <p className="absolute -top-[9px] left-2 whitespace-nowrap bg-white px-px text-xs text-secondary dark:bg-black">
          {label}
        </p>
      )}
    </div>
  );
}
