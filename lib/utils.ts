import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SMALL_WORDS = new Set([
  "a","an","the","and","but","or","nor","for","yet","so",
  "in","on","at","to","by","of","up","as","is","if","it",
]);

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i === 0 || !SMALL_WORDS.has(word)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(" ");
}
