import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../../../Core/guards/auth.guard';
import { DashboardComponent } from '../dashboard/component/dashboard.component';
import { aggregatorListComponent } from '../aggregator-config/list-aggregator/component/list-aggregator.component';
import { OrdersComponent } from '../orders/management/component/orders.component';
import { CanDeactivateGuard } from '../../Core/guards/can-deactivate.guard';
import { AuthGuard } from '../../Core/guards/auth.guard';
import { OrderErrorComponent } from '../orders/error-handling/order-error.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'api-setting' , component : aggregatorListComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard]},
  { path: 'orders', component: OrdersComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard]},
  { path: 'order-error', component: OrderErrorComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
