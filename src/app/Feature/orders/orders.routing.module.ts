import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { OrderErrorComponent } from './error-handling/order-error.component';
// import { AuthGuard } from '../../Core/guards/auth.guard';
// import { CanDeactivateGuard } from '../../Core/guards/can-deactivate.guard';

const routes: Routes = [
  // { path: 'order-error', component: OrderErrorComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}