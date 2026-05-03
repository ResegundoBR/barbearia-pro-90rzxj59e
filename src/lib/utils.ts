/* General utility functions (exposes cn) */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names into a single string
 * @param inputs - Array of class names
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function phoneMask(value: string) {
  const v = value.replace(/\D/g, '').slice(0, 11)
  if (v.length >= 11) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
  if (v.length >= 7) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`
  if (v.length >= 3) return `(${v.slice(0, 2)}) ${v.slice(2)}`
  if (v.length > 0) return `(${v}`
  return ''
}
