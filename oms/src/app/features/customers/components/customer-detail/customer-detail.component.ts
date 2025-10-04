import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from '../../../../shared/models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  imports: [MatIconModule, MatButtonModule],
})
export class CustomerDetailComponent {
  @Input() customer!: Customer;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Customer>();

  onClose() {
    this.close.emit();
  }

  onEdit() {
    this.edit.emit(this.customer);
  }
}
