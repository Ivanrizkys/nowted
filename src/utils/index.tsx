import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using Tailwind CSS and clsx.
 *
 * @param {...ClassValue} inputs - An array of class values (strings or objects) to be merged.
 * @returns {string} - A string representing the merged class names.
 *
 * @example
 * const combinedClasses = cn("bg-blue-500", "text-white", { "font-bold": true });
 * console.log(combinedClasses); // Output: "bg-blue-500 text-white font-bold"
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
