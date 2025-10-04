import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from '../../components/layout/layout.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products-module').then((m) => m.ProductsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
