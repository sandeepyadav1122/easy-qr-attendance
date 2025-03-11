
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to display in a readable format
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

// Format time to display in a readable format
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Generate a fake QR code data URL
export function generateQRPlaceholder(): string {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="white"/>
      <path d="M40 40h40v40h-40z" fill="black"/>
      <path d="M120 40h40v40h-40z" fill="black"/>
      <path d="M40 120h40v40h-40z" fill="black"/>
      <path d="M100 100h20v20h-20z" fill="black"/>
      <path d="M140 120h20v20h-20z" fill="black"/>
      <path d="M120 160h20v-20h20v20h-20z" fill="black"/>
      <path d="M100 140h20v20h-20z" fill="black"/>
      <path d="M100 40h20v20h-20z" fill="black"/>
      <path d="M40 100h20v20h-20z" fill="black"/>
      <path d="M160 40h-20v20h20z" fill="black"/>
      <path d="M140 100h20v-20h-20z" fill="black"/>
    </svg>
  `)
}

// Generate a random ID
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length)
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Calculate time difference and format it
export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + ' years ago'
  
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + ' months ago'
  
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + ' days ago'
  
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + ' hours ago'
  
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + ' minutes ago'
  
  return Math.floor(seconds) + ' seconds ago'
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

// Generate a temporary authentication token (for demo purposes only)
export function generateTempToken(): string {
  return 'temp_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
