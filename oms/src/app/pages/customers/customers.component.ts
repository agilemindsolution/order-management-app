import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../features/customers/services/customer.service';
import { Customer } from '../../shared/models/customer.model';
import { CommonUtilsService } from '../../shared/utils/common.utils';
import { NotificationService } from '../../shared/services/notification.service';
import { CUSTOMER_CONFIG } from '../../features/customers/config/customer.config';
import { Subject, takeUntil } from 'rxjs';
import { CustomerDetailComponent } from '../../features/customers/components/customer-detail/customer-detail.component';
import { CustomerFormComponent } from '../../features/customers/components/customer-form/customer-form.component';
import { CustomerTableComponent } from '../../features/customers/components/customer-table/customer-table.component';
import { MatCard } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  imports: [
    CustomerDetailComponent,
    CustomerFormComponent,
    CustomerTableComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
  ],
})
export class CustomersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  isLoading = false;
  isRefreshing = false;
  searchTerm = '';
  showForm = false;
  editingCustomer: Customer | null = null;
  viewingCustomer: Customer | null = null;

  constructor(
    private customerService: CustomerService,
    private utils: CommonUtilsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.setupCustomersSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupCustomersSubscription() {
    this.customerService.customers$.pipe(takeUntil(this.destroy$)).subscribe((customers) => {
      this.customers = customers;
      this.filterCustomers();
    });

    this.customerService.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  loadCustomers() {
    this.isRefreshing = true;

    this.customerService
      .fetchCustomers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.success('Customers loaded successfully');
          this.isRefreshing = false;
        },
        error: () => {
          this.notificationService.error('Failed to load customers. Please try again.');
          this.isRefreshing = false;
        },
      });
  }

  onSearchChange() {
    this.filterCustomers();
  }

  private filterCustomers() {
    if (!this.searchTerm) {
      this.filteredCustomers = [...this.customers];
      return;
    }

    this.filteredCustomers = this.customers.filter((customer) =>
      CUSTOMER_CONFIG.searchFields.some((field) =>
        this.utils.safeIncludes(customer[field as keyof Customer] as string, this.searchTerm)
      )
    );
  }

  handleAddCustomer() {
    this.editingCustomer = null;
    this.showForm = true;
  }

  handleEditCustomer(customer: Customer) {
    this.editingCustomer = customer;
    this.showForm = true;
  }

  handleDeleteCustomer(id: string) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService
        .deleteCustomer(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.success('Customer deleted successfully');
          },
          error: () => {
            this.notificationService.error('Failed to delete customer. Please try again.');
          },
        });
    }
  }

  handleViewCustomer(customer: Customer) {
    this.viewingCustomer = customer;
  }

  handleCloseForm() {
    this.showForm = false;
    this.editingCustomer = null;
  }

  handleCloseDetail() {
    this.viewingCustomer = null;
  }
}
