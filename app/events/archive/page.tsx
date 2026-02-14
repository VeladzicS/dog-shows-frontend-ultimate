import Link from "next/link";
import { getDateRange } from "@/lib/data/filters";
import PageHeader from "@/components/ui/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Archive | Dog Show Results",
  description: "Browse dog show events from previous years.",
};

const MONTHS = [
  { label: "January", num: "01" },
  { label: "February", num: "02" },
  { label: "March", num: "03" },
  { label: "April", num: "04" },
  { label: "May", num: "05" },
  { label: "June", num: "06" },
  { label: "July", num: "07" },
  { label: "August", num: "08" },
  { label: "September", num: "09" },
  { label: "October", num: "10" },
  { label: "November", num: "11" },
  { label: "December", num: "12" },
];

export default async function ArchivePage() {
  let years: number[] = [];

  try {
    const { data: dateRange } = await getDateRange();
    const minYear = new Date(dateRange.min).getFullYear();
    const maxYear = new Date(dateRange.max).getFullYear();
    for (let y = maxYear; y >= minYear; y--) {
      years.push(y);
    }
  } catch {
    // API unavailable
  }

  const thisYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="container-screen px-4 py-10">
        <PageHeader
          breadcrumbs={[
            { label: "Events", href: "/" },
            { label: "Archive" },
          ]}
        />
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Event Archive</h1>

        {years.length === 0 ? (
          <p className="py-16 text-center text-gray-400">No archive data available.</p>
        ) : (
          <div className="space-y-8">
            {years.map((year) => (
              <div key={year}>
                <h2 className="mb-3 text-xl font-bold text-gray-800">{year}</h2>
                <div className="flex flex-wrap gap-2">
                  {MONTHS.map(({ label, num }) => {
                    const monthNum = Number(num);
                    const isFuture =
                      year === thisYear && monthNum > new Date().getMonth() + 1;

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
                        href={`/events/month/${year}/${num}`}
                        className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition hover:border-primary hover:text-primary"
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
