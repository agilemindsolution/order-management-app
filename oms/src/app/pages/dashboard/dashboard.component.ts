import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../features/dashboard/services/dashboard.service';
import { CommonUtilsService } from '../../shared/utils/common.utils';
import { Subject, takeUntil } from 'rxjs';
import { DecimalPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// import { NgModule } from '@angular/core';
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

// @NgModule({
//   imports: [
//     DecimalPipe,
//     CommonModule,
//     MatIconModule,
//     MatCardModule,
//     MatProgressSpinnerModule,
//     FormsModule,
//     NgChartsModule, // For Chart.js
//     // ... other imports
//   ],
//   // ... declarations
// })

@Component({
  selector: 'app-dashboard',
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
        display: false, // We'll use custom legend
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
    cutout: '60%', // Makes it a doughnut instead of pie
  };

  constructor(private dashboardService: DashboardService, private utils: CommonUtilsService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData() {
    this.isLoading = true;

    this.dashboardService
      .fetchDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.metrics = data.metrics;
          this.status = data.status;
          this.recentOrders = data.recentOrders;
          this.updateChartData();
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Failed to load dashboard data:', error);
          this.isLoading = false;
        },
      });
  }

  private updateChartData() {
    // Update chart data with actual values
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
    return this.utils.formatDate(dateString);
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
