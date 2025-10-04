import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../../../shared/models/customer.model';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: Customer | null = null;
  @Output() close = new EventEmitter<void>();

  customerForm: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private notificationService: NotificationService
  ) {
    this.customerForm = this.createForm();
  }

  ngOnInit() {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      contact_person: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      alternate_phone: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pin_code: ['', Validators.required],
      gst_number: [''],
      pan_number: [''],
      website: [''],
    });
  }

  onSubmit() {
    if (this.customerForm.invalid) {
      this.notificationService.error('Please fix the errors in the form');
      return;
    }

    this.isSaving = true;
    const customerData = this.customerForm.value;

    const operation = this.customer
      ? this.customerService.updateCustomer(customerData)
      : this.customerService.addCustomer(customerData);

    operation.subscribe({
      next: () => {
        this.notificationService.success(
          this.customer ? 'Customer updated successfully' : 'Customer created successfully'
        );
        this.close.emit();
      },
      error: () => {
        this.notificationService.error('Failed to save customer. Please try again.');
      },
      complete: () => {
        this.isSaving = false;
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
