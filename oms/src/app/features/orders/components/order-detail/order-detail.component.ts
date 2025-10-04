import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../../../shared/models/order.model';
import { CommonUtilsService } from '../../../../shared/utils/common.utils';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  imports: [DecimalPipe, MatIconModule, MatButtonModule, CommonModule],
})
export class OrderDetailComponent {
  @Input() order!: Order;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Order>();

  constructor(private utils: CommonUtilsService) {}

  onClose() {
    this.close.emit();
  }

  onEdit() {
    this.edit.emit(this.order);
  }

  formatDate(dateString: string): string {
    return this.utils.formatDate(dateString);
  }

  getStatusClass(status: string): string {
    const baseClass = 'status-badge';
    switch (status.toLowerCase()) {
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
  }
}
