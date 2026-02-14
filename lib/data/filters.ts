import { apiFetch } from "@/lib/api";
import type { DateRange } from "@/lib/types";

export async function getBreeds(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/breeds", undefined, [
    "filters",
  ]);
}

export async function getLocations(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/locations", undefined, [
    "filters",
  ]);
}

export async function getShowTypes(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/show-types", undefined, [
    "filters",
  ]);
}

export async function getJudgeNames(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>("/filters/judges", undefined, [
    "filters",
  ]);
}

export async function getDateRange(): Promise<{ data: DateRange }> {
  return apiFetch<{ data: DateRange }>("/filters/date-range", undefined, [
    "filters",
  ]);
}
