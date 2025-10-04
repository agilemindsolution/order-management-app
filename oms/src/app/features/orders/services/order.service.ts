import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { API_ROUTES } from '../../../core/constants/api-routes';
import { Order } from '../../../shared/models/order.model';

// import { Order } from '../';
@Injectable({ providedIn: 'root' })
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private currentOrderSubject = new BehaviorSubject<Order | null>(null);

  public orders$ = this.ordersSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public currentOrder$ = this.currentOrderSubject.asObservable();

  constructor(private httpService: HttpService) {}

  fetchOrders(): Observable<Order[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.httpService.get<Order[]>(API_ROUTES.orders).pipe(
      tap((orders) => {
        this.ordersSubject.next(orders);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.errorSubject.next(error.message || 'Failed to fetch orders');
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  addOrder(orderData: Partial<Order>): Observable<Order> {
    return this.httpService.post<Order>(API_ROUTES.orders, orderData).pipe(
      tap((newOrder) => {
        const currentOrders = this.ordersSubject.value;
        this.ordersSubject.next([newOrder, ...currentOrders]);
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to add order');
        return throwError(() => error);
      })
    );
  }

  updateOrder(id: string, orderData: Partial<Order>): Observable<Order> {
    return this.httpService.put<Order>(API_ROUTES.orderById(id), orderData).pipe(
      tap((updatedOrder) => {
        const currentOrders = this.ordersSubject.value;
        const index = currentOrders.findIndex((order) => order.order_id === id);
        if (index !== -1) {
          currentOrders[index] = updatedOrder;
          this.ordersSubject.next([...currentOrders]);
        }
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to update order');
        return throwError(() => error);
      })
    );
  }

  deleteOrder(id: string): Observable<void> {
    return this.httpService.delete<void>(API_ROUTES.orderById(id)).pipe(
      tap(() => {
        const currentOrders = this.ordersSubject.value;
        this.ordersSubject.next(currentOrders.filter((order) => order.order_id !== id));
      }),
      catchError((error) => {
        this.errorSubject.next('Failed to delete order');
        return throwError(() => error);
      })
    );
  }

  setCurrentOrder(order: Order | null): void {
    this.currentOrderSubject.next(order);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  getOrders(): Order[] {
    return this.ordersSubject.value;
  }
}
