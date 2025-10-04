import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../features/orders/services/order.service';
import { Order } from '../../shared/models/order.model';
import { CommonUtilsService } from '../../shared/utils/common.utils';
import { NotificationService } from '../../shared/services/notification.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderDetailComponent } from '../../features/orders/components/order-detail/order-detail.component';
import { OrderFormComponent } from '../../features/orders/components/order-form/order-form.component';
import { OrderTableComponent } from '../../features/orders/components/order-table/order-table.component';
import { MatCard } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports: [
    OrderDetailComponent,
    OrderFormComponent,
    OrderTableComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
  ],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading = false;
  isRefreshing = false;
  searchTerm = '';
  showForm = false;
  editingOrder: Order | null = null;
  viewingOrder: Order | null = null;

  constructor(
    private orderService: OrderService,
    private utils: CommonUtilsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.setupOrdersSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupOrdersSubscription() {
    this.orderService.orders$.pipe(takeUntil(this.destroy$)).subscribe((orders) => {
      this.orders = orders;
      this.filterOrders();
    });

    this.orderService.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  loadOrders() {
    this.isRefreshing = true;

    this.orderService
      .fetchOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.success('Orders loaded successfully');
          this.isRefreshing = false;
        },
        error: (error) => {
          this.notificationService.error('Failed to load orders. Please try again.');
          this.isRefreshing = false;
        },
      });
  }

  onSearchChange() {
    this.filterOrders();
  }

  private filterOrders() {
    if (!this.searchTerm) {
      this.filteredOrders = [...this.orders];
      return;
    }

    const searchFields = ['order_id', 'client_name', 'shipping_status'];
    this.filteredOrders = this.orders.filter((order) =>
      searchFields.some((field) =>
        this.utils.safeIncludes(order[field as keyof Order] as string, this.searchTerm)
      )
    );
  }

  handleAddOrder() {
    this.editingOrder = null;
    this.showForm = true;
  }

  handleEditOrder(order: Order) {
    this.editingOrder = order;
    this.showForm = true;
  }

  handleDeleteOrder(id: string) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService
        .deleteOrder(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.success('Order deleted successfully');
          },
          error: () => {
            this.notificationService.error('Failed to delete order. Please try again.');
          },
        });
    }
  }

  handleViewOrder(order: Order) {
    this.viewingOrder = order;
  }

  handleCloseForm() {
    this.showForm = false;
    this.editingOrder = null;
  }

  handleCloseDetail() {
    this.viewingOrder = null;
  }
}
