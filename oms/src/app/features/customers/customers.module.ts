import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CustomersRoutingModule } from './customers-routing-module';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { CustomerTableComponent } from '../customers/components/customer-table/customer-table.component';
import { CustomerFormComponent } from '../customers/components/customer-form/customer-form.component';
import { CustomerDetailComponent } from '../customers/components/customer-detail/customer-detail.component';

@NgModule({
  // declarations: [
  //   CustomersComponent,
  //   CustomerTableComponent,
  //   CustomerFormComponent,
  //   CustomerDetailComponent,
  // ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CustomersComponent,
    CustomerTableComponent,
    CustomerFormComponent,
    CustomerDetailComponent,
  ],
})
export class CustomersModule {}
