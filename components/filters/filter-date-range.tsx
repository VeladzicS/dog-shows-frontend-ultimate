import Link from "next/link";
import { Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import EventSearchForm from "./event-search-form";

const MONTHS = [
  { label: "Jan", num: "01" },
  { label: "Feb", num: "02" },
  { label: "Mar", num: "03" },
  { label: "Apr", num: "04" },
  { label: "May", num: "05" },
  { label: "Jun", num: "06" },
  { label: "Jul", num: "07" },
  { label: "Aug", num: "08" },
  { label: "Sep", num: "09" },
  { label: "Oct", num: "10" },
  { label: "Nov", num: "11" },
  { label: "Dec", num: "12" },
];

interface FilterDateRangeProps {
  currentYear?: number;
  currentMonth?: string;
}

export default function FilterDateRange({
  currentYear,
  currentMonth,
}: FilterDateRangeProps) {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const displayYear = currentYear ?? thisYear;
  const isAll = !currentMonth;

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition",
            isAll
              ? "border-primary bg-primary text-white"
              : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary",
          )}
        >
          All
        </Link>
        {MONTHS.map(({ label, num }) => {
          const monthNum = Number(num);
          const isFuture = displayYear === thisYear && monthNum > thisMonth;
          const isActive = currentMonth === num && currentYear === displayYear;

          if (isFuture) {
            return (
              <span
                key={num}
                className="cursor-not-allowed rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-300"
              >
                {label}
              </span>
            );
          }

          return (
            <Link
              key={num}
              href={`/events/month/${displayYear}/${num}`}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary",
              )}
            >
              {label}
            </Link>
          );
        })}

        {/* <Link
          href="/events/archive"
          className="ml-1 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:border-primary hover:text-primary"
        >
          <Archive size={14} />
          Archive
        </Link> */}
      </div>

      <EventSearchForm />
    </div>
  );
}
