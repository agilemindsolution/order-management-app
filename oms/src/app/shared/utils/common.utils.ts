import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilsService {
  cn(...inputs: (string | undefined | null)[]): string {
    return inputs.filter(Boolean).join(' ');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  generateOrderId(): string {
    const prefix = 'ORD';
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return `${prefix}-${randomPart}`;
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  safeIncludes(source: any, search: string): boolean {
    if (!search) return true;
    if (typeof source !== 'string' && typeof source !== 'number') return false;
    const normalizedSource = String(source).toLowerCase().trim();
    const normalizedSearch = search.toLowerCase().trim();
    return normalizedSource.includes(normalizedSearch);
  }
}
