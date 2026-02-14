"use client";

import { useRouter } from "next/navigation";
import Select from "react-select";

interface EventBreedSelectProps {
  breeds: string[];
  basePath: string;
}

export default function EventBreedSelect({
  breeds,
  basePath,
}: EventBreedSelectProps) {
  const router = useRouter();

  const options = breeds.map((b) => ({ label: b, value: b }));

  return (
    <Select
      options={options}
      value={null}
      onChange={(opt) => {
        if (opt) {
          router.push(`${basePath}?breed=${encodeURIComponent(opt.value)}`);
        }
      }}
      placeholder="Jump to breed..."
      isClearable
      classNames={{
        control: (state) =>
          `!min-h-[36px] !w-full sm:!min-w-[260px] !rounded-lg !border-gray-200 !shadow-none !text-sm ${state.isFocused ? "!border-[var(--color-primary)] !ring-1 !ring-[var(--color-primary)]" : ""}`,
        menu: () =>
          "!rounded-lg !border !border-gray-200 !shadow-lg !z-50",
        option: (state) =>
          `!text-sm ${state.isSelected ? "!bg-[var(--color-primary)] !text-white" : state.isFocused ? "!bg-gray-100" : ""}`,
        placeholder: () => "!text-gray-400 !text-sm",
        singleValue: () => "!text-sm",
        input: () => "!text-sm",
      }}
      unstyled={false}
    />
  );
}
