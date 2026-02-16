"use client";

import Select from "react-select";
import { useFilterBar } from "./filter-bar";

interface FilterSelectProps {
  paramName: string;
  placeholder: string;
  options: { label: string; value: string }[] | string[];
}

export default function FilterSelect({
  paramName,
  placeholder,
  options,
}: FilterSelectProps) {
  const { updateFilter, getFilter } = useFilterBar();
  const value = getFilter(paramName);

  const normalized = options.map((o) =>
    typeof o === "string" ? { label: o, value: o } : o,
  );

  const selected = normalized.find((o) => o.value === value) ?? null;

  return (
    <Select
      options={normalized}
      value={selected}
      onChange={(opt) => updateFilter(paramName, opt?.value ?? "")}
      placeholder={placeholder}
      isClearable
      classNames={{
        control: (state) =>
          `!min-h-[38px] !w-full sm:!min-w-[200px] !rounded-lg !border-gray-200 !shadow-none ${state.isFocused ? "!border-[var(--color-primary)] !ring-1 !ring-[var(--color-primary)]" : ""}`,
        menu: () => "!rounded-lg !border !border-gray-200 !shadow-lg !z-50",
        option: (state) =>
          `!text-sm ${state.isSelected ? "!bg-[var(--color-primary)] !text-white" : state.isFocused ? "!bg-gray-100" : ""}`,
        placeholder: () => "!text-gray-400 !text-sm",
        singleValue: () => "!text-sm",
        input: () => "!text-base sm:!text-sm",
      }}
      unstyled={false}
    />
  );
}
