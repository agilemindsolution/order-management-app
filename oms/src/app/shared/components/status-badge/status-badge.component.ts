import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  template: `
    <span [ngClass]="getStatusClass()">
      {{ status }}
    </span>
  `,
  imports: [CommonModule],
})
export class StatusBadgeComponent {
  @Input() status!: string;
  @Input() type: 'order' | 'payment' = 'order';

  getStatusClass(): string {
    const baseClass = 'status-badge';

    if (this.type === 'order') {
      switch (this.status?.toLowerCase()) {
        case 'pending':
          return `${baseClass} status-pending`;
        case 'shipped':
          return `${baseClass} status-shipped`;
        case 'delivered':
          return `${baseClass} status-delivered`;
        case 'cancelled':
          return `${baseClass} status-cancelled`;
        default:
          return baseClass;
      }
    } else {
      switch (this.status?.toLowerCase()) {
        case 'pending':
          return `${baseClass} status-pending`;
        case 'paid':
          return `${baseClass} status-delivered`;
        case 'failed':
          return `${baseClass} status-cancelled`;
        case 'refunded':
          return `${baseClass} status-shipped`;
        default:
          return baseClass;
      }
    }
  }
}
