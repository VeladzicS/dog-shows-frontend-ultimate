import FilterBar from "./filter-bar";
import { FilterControls, FilterResults } from "./filter-bar";
import FilterSearch from "./filter-search";
import FilterSelect from "./filter-select";
import FilterDateRange from "./filter-date-range";

const FilterBarWithParts = Object.assign(FilterBar, {
  Controls: FilterControls,
  Results: FilterResults,
  Search: FilterSearch,
  Select: FilterSelect,
  DateRange: FilterDateRange,
});

export { FilterBarWithParts as FilterBar };
export { useFilterBar } from "./filter-bar";
