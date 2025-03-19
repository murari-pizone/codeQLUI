import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Feature/authentication/login/login.component';
import { NotFoundComponent } from './404-page/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from '../Feature/authentication/forgot-password/forgot-password.component';

export const routes: Routes = [
  // Add other loaded modules here

  { path: 'login', component: LoginComponent}, // Default route that redirects to login
  { path: 'forgot-password', component: ForgotPasswordComponent }, // route to forgot password
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route that redirects to login
  {
    path: 'view',
    loadChildren: () =>
      import('../Feature/authentication/authentication.module').then(
        (m) => m.AuthenticationModule

      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    loadChildren: () =>
      import('../Feature/dashboard/dashboard.module').then(
        (m) => m.dashboardModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    loadChildren: () =>
      import('../Feature/location/location.module').then(
        (m) => m.LocationModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    loadChildren: () =>
      import('../Feature/orders/orders.module').then(
        (m) => m.OrdersModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    loadChildren: () =>
      import('../Feature/sync-menu/sync-menu.module').then(
        (m) => m.SyncMenuModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    loadChildren: () =>
      import('../Feature/Catalogue/catalogue.module').then(
        (m) => m.CatalogueModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: 'view/analytics',
    loadChildren: () =>
      import('../Feature/Analytics/analytics.module').then(
        (m) => m.AnalyticsModule
      ),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }, // Wildcard route to catch any invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
