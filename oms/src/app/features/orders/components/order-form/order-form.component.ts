import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../../customers/services/customer.service';
import { ProductService } from '../../../products/services/product.service';
import { Order } from '../../../../shared/models/order.model';
import { Customer } from '../../../../shared/models/customer.model';
import { Product } from '../../../../shared/models/product.model';
import { NotificationService } from '../../../../shared/services/notification.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    DecimalPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class OrderFormComponent implements OnInit {
  @Input() order: Order | null = null;
  @Output() close = new EventEmitter<void>();

  orderForm: FormGroup;
  customers: Customer[] = [];
  products: Product[] = [];
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this.orderForm = this.createForm();
  }

  ngOnInit() {
    this.loadCustomers();
    this.loadProducts();
    if (this.order) {
      this.populateForm();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      client_id: ['', Validators.required],
      order_date: [new Date().toISOString().split('T')[0], Validators.required],
      expected_delivery_date: [''],
      shipping_status: ['pending'],
      payment_status: ['pending'],
      courier_name: [''],
      tracking_number: [''],
      items: this.fb.array([]),
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  private loadCustomers() {
    this.customerService.fetchCustomers().subscribe({
      next: (customers: any) => {
        this.customers = customers;
      },
    });
  }

  private loadProducts() {
    this.productService.fetchProducts().subscribe({
      next: (products: any) => {
        this.products = products;
      },
    });
  }

  private populateForm() {
    if (this.order) {
      this.orderForm.patchValue({
        client_id: this.order.client_id,
        order_date: this.order.order_date?.split('T')[0],
        expected_delivery_date: this.order.expected_delivery_date?.split('T')[0],
        shipping_status: this.order.shipping_status,
        payment_status: this.order.payment_status,
        courier_name: this.order.courier_name,
        tracking_number: this.order.tracking_number,
      });

      // Populate items
      if (this.order.items) {
        this.order.items.forEach((item) => {
          this.addItem(item);
        });
      }
    }
  }

  addItem(existingItem?: any) {
    const itemForm = this.fb.group({
      product_id: [existingItem?.product_id || '', Validators.required],
      product_name: [existingItem?.product_name || ''],
      quantity: [existingItem?.quantity || 1, [Validators.required, Validators.min(1)]],
      price: [existingItem?.price || 0, [Validators.required, Validators.min(0)]],
      discount: [existingItem?.discount || 0, Validators.min(0)],
      total: [existingItem?.total || 0],
    });

    // Calculate total when quantity, price, or discount changes
    itemForm.valueChanges.subscribe(() => {
      this.calculateItemTotal(itemForm);
    });

    this.items.push(itemForm);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onProductSelect(index: number, productId: string) {
    const product = this.products.find((p) => p.product_id === productId);
    if (product) {
      const itemForm = this.items.at(index);
      itemForm.patchValue({
        product_id: product.product_id,
        product_name: product.product_name,
        price: product.price_per_unit,
      });
    }
  }

  private calculateItemTotal(itemForm: FormGroup) {
    const quantity = itemForm.get('quantity')?.value || 0;
    const price = itemForm.get('price')?.value || 0;
    const discount = itemForm.get('discount')?.value || 0;
    const total = quantity * price - discount;
    itemForm.get('total')?.setValue(total, { emitEvent: false });
  }

  getTotalAmount(): number {
    return this.items.controls.reduce((sum, control) => {
      return sum + (control.get('total')?.value || 0);
    }, 0);
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      this.notificationService.error('Please fill in all required fields correctly.');
      return;
    }

    if (this.items.length === 0) {
      this.notificationService.error('Please add at least one product.');
      return;
    }

    this.isSaving = true;
    const formValue = this.orderForm.value;
    const orderData = {
      ...formValue,
      total_amount: this.getTotalAmount(),
    };

    const operation = this.order
      ? this.orderService.updateOrder(this.order.order_id, orderData)
      : this.orderService.addOrder(orderData);

    operation.subscribe({
      next: () => {
        this.notificationService.success(
          this.order ? 'Order updated successfully' : 'Order created successfully'
        );
        this.close.emit();
      },
      error: () => {
        this.notificationService.error('Failed to save order. Please try again.');
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
