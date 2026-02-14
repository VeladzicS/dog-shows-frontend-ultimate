"use client";

import { FilterBar } from "@/components/filters";

interface JudgeListFiltersProps {
  breeds: string[];
}

export default function JudgeListFilters({ breeds }: JudgeListFiltersProps) {
  return (
    <FilterBar>
      <FilterBar.Search placeholder="Search judges..." />
      <FilterBar.Select
        paramName="specialty"
        placeholder="All Specialties"
        options={breeds}
      />
    </FilterBar>
  );
}
