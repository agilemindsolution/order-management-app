import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex items-center justify-center" [ngClass]="containerClass">
      <div
        class="animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
        [ngClass]="spinnerClass"
      ></div>
      <span *ngIf="message" class="ml-3 text-gray-400 text-sm">{{ message }}</span>
    </div>
  `,
  imports: [CommonModule],
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() message?: string;

  get spinnerClass(): string {
    switch (this.size) {
      case 'sm':
        return 'h-4 w-4';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-8 w-8';
    }
  }

  get containerClass(): string {
    switch (this.size) {
      case 'sm':
        return 'py-2';
      case 'lg':
        return 'py-12';
      default:
        return 'py-8';
    }
  }
}
