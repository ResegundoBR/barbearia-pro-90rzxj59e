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

export function getContrastColor(hexcolor: string) {
  if (!hexcolor) return '#ffffff'
  let c = hexcolor.replace('#', '')

  if (c.startsWith('hsl') || c.startsWith('rgb') || c.startsWith('var')) {
    return '#ffffff'
  }

  if (c.length === 3) {
    c = c
      .split('')
      .map((x) => x + x)
      .join('')
  }

  if (c.length !== 6) return '#ffffff'

  const r = parseInt(c.substr(0, 2), 16)
  const g = parseInt(c.substr(2, 2), 16)
  const b = parseInt(c.substr(4, 2), 16)
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '#ffffff'

  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}
