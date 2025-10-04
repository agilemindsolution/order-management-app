import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../../shared/models/customer.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
  imports: [MatProgressSpinnerModule, MatIconModule, MatButtonModule, CommonModule],
})
export class CustomerTableComponent {
  @Input() customers: Customer[] = [];
  @Input() isLoading = false;
  @Output() edit = new EventEmitter<Customer>();
  @Output() delete = new EventEmitter<string>();
  @Output() view = new EventEmitter<Customer>();

  displayedColumns: string[] = ['name', 'contact_person', 'email', 'phone', 'city', 'actions'];

  onEdit(customer: Customer) {
    this.edit.emit(customer);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }

  onView(customer: Customer) {
    this.view.emit(customer);
  }
}
