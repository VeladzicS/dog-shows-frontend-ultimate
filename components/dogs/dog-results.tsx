import { Calendar } from "lucide-react";
import Badge from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import type { DogResult, PaginationMeta } from "@/lib/types";

interface DogResultsProps {
  results: DogResult[];
  meta: PaginationMeta;
  slug: string;
}

export default function DogResults({ results, meta, slug }: DogResultsProps) {
  if (results.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-400">
        No show results available.
      </p>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">Show Results</h2>

      <div className="space-y-3">
        {results.map((result) => (
          <div
            key={result.show_id}
            className="rounded-xl border border-gray-200 bg-white px-5 py-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {result.show_name}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {result.show_date}
                  </span>
                  {/* <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {result.location}
                  </span> */}
                  <span>Judge: {result.judge}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">{result.breed}</Badge>
                <Badge variant="secondary">{result.show_type}</Badge>
              </div>
            </div>

            {result.results.length > 0 && (
              <div className="mt-3 border-t border-gray-100 pt-3">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase text-gray-400">
                      <th className="w-full py-1 pr-4 font-medium">Class</th>
                      <th className="whitespace-nowrap py-1 pr-4 text-right font-medium">Entry</th>
                      <th className="whitespace-nowrap py-1 text-right font-medium">Place</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.results.map((entry, i) => (
                      <tr key={i}>
                        <td className="py-1 pr-4 text-gray-700">
                          {entry.class_name || "—"}
                        </td>
                        <td className="whitespace-nowrap py-1 pr-4 text-right text-gray-500">
                          {entry.entry_number || "—"}
                        </td>
                        <td className="whitespace-nowrap py-1 text-right font-medium text-gray-900">
                          {entry.placement || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      <Pagination
        meta={meta}
        baseUrl={`/dogs/${slug}`}
        className="mt-8"
      />
    </div>
  );
}
