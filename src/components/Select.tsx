import React from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  label: string;
};

export default function Select({ value, setValue, options, label }: Props) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative">
      <select
        className="main-border rounded-lg border px-4 py-2 outline-none"
        value={value}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>

      <p className="text-secondary absolute -top-[9px] left-2 whitespace-nowrap bg-white px-px text-xs dark:bg-black">
        {label}
      </p>
    </div>
  );
}
