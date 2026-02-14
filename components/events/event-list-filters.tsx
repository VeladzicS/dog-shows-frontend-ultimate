"use client";

import { FilterBar } from "@/components/filters";

export default function EventListFilters() {
  return (
    <FilterBar className="flex-col items-start">
      <FilterBar.Search placeholder="Search events..." />
      <FilterBar.DateRange />
    </FilterBar>
  );
}
