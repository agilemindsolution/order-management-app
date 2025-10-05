import { Component, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { DashboardService } from '../../features/dashboard/services/dashboard.service';
// Remove CommonUtilsService since it doesn't exist
import { Subject, takeUntil } from 'rxjs';
import { DecimalPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

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

@Component({
  selector: 'app-dashboard',
  standalone: true, // ✅ Add this
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    DecimalPipe,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BaseChartDirective,
    FormsModule,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  metrics: DashboardMetrics = {
    orderCount: 0,
    clientCount: 0,
    productCount: 0,
    totalRevenue: 0,
  };

  status: OrderStatusSummary = {
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  recentOrders: any[] = [];
  isLoading = false;

  // Chart.js Configuration
  public doughnutChartType = 'doughnut' as const;
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: [
          '#f59e0b', // Pending - Yellow
          '#3b82f6', // Shipped - Blue
          '#10b981', // Delivered - Green
          '#ef4444', // Cancelled - Red
        ],
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: '#ffffff',
      },
    ],
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
    cutout: '60%',
  };

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.dashboardService
      .fetchDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Dashboard data received:', data);
          this.metrics = data.metrics;
          this.status = data.status;
          this.recentOrders = data.recentOrders;
          this.updateChartData();
          console.log("here loading false");
          
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.error('Failed to load dashboard data:', error);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  private updateChartData() {
    this.doughnutChartData = {
      labels: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      datasets: [
        {
          data: [
            this.status.pending,
            this.status.shipped,
            this.status.delivered,
            this.status.cancelled,
          ],
          backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
          borderWidth: 0,
          hoverBorderWidth: 2,
          hoverBorderColor: '#ffffff',
        },
      ],
    };
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getStatusClass(status: string): string {
    let status1 = status || ''
    const baseClass = 'status-badge';
    switch (status1.toLowerCase()) {
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
