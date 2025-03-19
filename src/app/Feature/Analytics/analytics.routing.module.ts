import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCardComponent } from './analytics-home/components/home-card/home-card.component';
import { AuthGuard } from '../../Core/guards/auth.guard';
import { CanDeactivateGuard } from '../../Core/guards/can-deactivate.guard';
import { RevenueComponent } from './Revenue/components/revenue-menu/revenue.component';
import { OperationsComponent } from './operations/components/operations.component';
import { AnaCatalogueComponent } from './ana-catalogue/components/ana-catalogue.component';

const routes: Routes = [
    { path: 'home-analytics', component: HomeCardComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
    { path: 'revenue', component: RevenueComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
    { path: 'operations', component: OperationsComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
    { path: 'catalogue', component:AnaCatalogueComponent ,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}