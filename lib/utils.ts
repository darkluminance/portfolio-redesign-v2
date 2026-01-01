import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMasonryColumns({ sm = 1, md = 2, lg = 3 }: { sm?: number; md?: number; lg?: number } = {}): string {
  return `columns-${sm} md:columns-${md} lg:columns-${lg}`;
}