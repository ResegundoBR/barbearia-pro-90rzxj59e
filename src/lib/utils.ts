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

export function normalizeHeader(h: string) {
  return h
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function getRowVal(row: Record<string, string>, keys: string[]) {
  const normKeys = Object.keys(row).reduce(
    (acc, k) => {
      acc[normalizeHeader(k)] = row[k]
      return acc
    },
    {} as Record<string, string>,
  )

  for (const k of keys) {
    if (normKeys[k] !== undefined) return normKeys[k]
  }
  return ''
}

export function parseImportDate(val: string) {
  if (!val) return ''
  const parts = val.includes('/') ? val.split('/') : val.includes('-') ? val.split('-') : []
  if (parts.length === 3) {
    let year = parts[2]
    if (year.length === 2) year = (parseInt(year) > 50 ? '19' : '20') + year
    return `${year}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}T12:00:00.000Z`
  }
  const clean = val.replace(/\D/g, '')
  if (clean.length === 8) {
    return `${clean.slice(4, 8)}-${clean.slice(2, 4)}-${clean.slice(0, 2)}T12:00:00.000Z`
  }
  if (clean.length === 6) {
    let year = clean.slice(4, 6)
    year = (parseInt(year) > 50 ? '19' : '20') + year
    return `${year}-${clean.slice(2, 4)}-${clean.slice(0, 2)}T12:00:00.000Z`
  }
  return ''
}

export function cpfCnpjMask(value: string) {
  if (!value) return ''
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
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
