
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

export function generateOrderId(): string {
  const prefix = 'ORD';
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${randomPart}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function safeIncludes(source: any, search: string): boolean {
  if (!search) return true; // If search is empty, match everything
  if (typeof source !== 'string' && typeof source !== 'number') return false;

  const normalizedSource = String(source).toLowerCase().trim();
  const normalizedSearch = search.toLowerCase().trim();

  return normalizedSource.includes(normalizedSearch);
}

