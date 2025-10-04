import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../../shared/models/order.model';
import { DecimalPipe, CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  imports: [DecimalPipe, CommonModule, MatIcon, MatProgressSpinnerModule],
  // standalone: true,
})
export class OrderTableComponent {
  @Input() orders: Order[] = [];
  @Input() isLoading = false;
  @Output() edit = new EventEmitter<Order>();
  @Output() delete = new EventEmitter<string>();
  @Output() view = new EventEmitter<Order>();

  displayedColumns: string[] = [
    'order_id',
    'client_name',
    'shipping_status',
    'total_amount',
    'actions',
  ];

  onEdit(order: Order) {
    this.edit.emit(order);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }

  onView(order: Order) {
    this.view.emit(order);
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
