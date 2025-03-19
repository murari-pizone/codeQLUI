import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SyncMenuRoutingModule } from './sync-menu.routing.module';
import { ICreateOutlets, IEGetSyncData, IGetSyncError } from './error-handling/service/menu-error.interface';
import { MenuErrorDashboardService } from './error-handling/service/menu-error-dashboard.service';
import { SyncMenuService } from './management/service/sync-menu-service';
import { IApplyFilter, IFetchFromERP, IGetDataOutLet, IGetMenuData, IGetSyncData, IPublishRecord, IVerifyRecords } from './management/service/sync-menu-service-interface';

export const SYNC_ERROR_DASHBOARD_SERVICE_TOKEN = new InjectionToken<IGetSyncError & IEGetSyncData & ICreateOutlets>('SYNC_ERROR_DASHBOARD_SERVICE_TOKEN');
export const SYNC_MENU_SERVICE_TOKEN = new InjectionToken<IGetDataOutLet & IGetSyncData & IGetMenuData & IPublishRecord & IFetchFromERP & IVerifyRecords & IApplyFilter >('SYNC_MENU_SERVICE_TOKEN');
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SyncMenuRoutingModule,
    // BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot() 
  ],
  providers: [
      { provide: SYNC_ERROR_DASHBOARD_SERVICE_TOKEN, useClass: MenuErrorDashboardService  },
      { provide: SYNC_MENU_SERVICE_TOKEN, useClass: SyncMenuService  }
    ]
})
export class SyncMenuModule { }