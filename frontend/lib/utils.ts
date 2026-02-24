import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Resolve public asset URL with basePath (for static export deployment). */
export function getPublicUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  if (!path.startsWith("/")) return path
  return base + path
}
