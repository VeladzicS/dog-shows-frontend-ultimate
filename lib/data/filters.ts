import { apiFetch } from "@/lib/api";
import type { DateRange } from "@/lib/types";

export async function getBreeds(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/breeds", undefined, [
    "filters",
  ], { revalidate: 900 });
}

export async function getLocations(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/locations", undefined, [
    "filters",
  ], { revalidate: 900 });
}

export async function getShowTypes(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/show-types", undefined, [
    "filters",
  ], { revalidate: 900 });
}

export async function getJudgeNames(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/judges", undefined, [
    "filters",
  ], { revalidate: 900 });
}

export async function getDateRange(): Promise<{ data: DateRange }> {
  return apiFetch<{ data: DateRange }>("/filters/date-range", undefined, [
    "filters",
  ], { revalidate: 900 });
}
