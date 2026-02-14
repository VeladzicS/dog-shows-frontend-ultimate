"use client";

import { FilterBar } from "@/components/filters";

interface DogListFiltersProps {
  breeds: string[];
}

export default function DogListFilters({ breeds }: DogListFiltersProps) {
  return (
    <FilterBar>
      <FilterBar.Search placeholder="Search dogs..." />
      <FilterBar.Select
        paramName="breed"
        placeholder="All Breeds"
        options={breeds}
      />
    </FilterBar>
  );
}
