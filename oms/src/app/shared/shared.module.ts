import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';

@NgModule({
  // declarations: [LoadingSpinnerComponent, StatusBadgeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
  ],
  exports: [LoadingSpinnerComponent, StatusBadgeComponent],
})
export class SharedModule {}
