import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, throwError, forkJoin } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { API_ROUTES } from '../../../core/constants/api-routes';
import { HttpClient } from '@angular/common/http';

export interface DashboardMetrics {
  orderCount: number;
  clientCount: number;
  productCount: number;
  totalRevenue: number;
}

export interface OrderStatusSummary {
  pending: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  status: OrderStatusSummary;
  recentOrders: any[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardDataSubject = new BehaviorSubject<DashboardData>({
    metrics: { orderCount: 0, clientCount: 0, productCount: 0, totalRevenue: 0 },
    status: { pending: 0, shipped: 0, delivered: 0, cancelled: 0 },
    recentOrders: [],
  });
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public dashboardData$ = this.dashboardDataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private httpService: HttpService) {}

  fetchDashboardData(): Observable<DashboardData> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return forkJoin({
      metrics: this.httpService.get<DashboardMetrics>(API_ROUTES.dashboard.metrics),
      status: this.httpService.get<OrderStatusSummary>(API_ROUTES.dashboard.status),
      recentOrders: this.httpService.get<any[]>(API_ROUTES.dashboard.recent),
    }).pipe(
      tap((data) => {
        this.dashboardDataSubject.next(data);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        this.errorSubject.next(error.message || 'Failed to fetch dashboard data');
        this.loadingSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  getDashboardData(): DashboardData {
    return this.dashboardDataSubject.value;
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
