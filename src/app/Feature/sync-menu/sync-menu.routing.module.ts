import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSyncErrorDashboardComponent } from './error-handling/component/menu-sync-error-dashboard.component';
import { SyncMenuComponent } from './management/component/sync-menu.component';
import { CreateOutletsComponent } from './create-outlets/create-outlets.component';

const routes: Routes = [
  { path: 'menu-syncError', component: MenuSyncErrorDashboardComponent },
  { path: 'sync-menu' , component : SyncMenuComponent},
  { path: 'create-outlets' , component : CreateOutletsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncMenuRoutingModule {}