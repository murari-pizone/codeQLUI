import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// import { OrdersRoutingModule } from './orders.routing.module';
import { IGetOrderData} from './management/service/order-service.interface';
import { orderService } from './management/service/order-service';
import { orderErrorService } from './error-handling/service/order-error-service';
import { IGetOrderError } from './error-handling/service/order-error-service.interface';
// import { BrowserModule } from '@angular/platform-browser';

export const ORDERS_TOKEN = new InjectionToken<IGetOrderData>('ORDERS_TOKEN');
export const ORDERS_ERROR_TOKEN = new InjectionToken<IGetOrderError>('ORDERS_ERROR_TOKEN');
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    { provide: ORDERS_TOKEN, useClass: orderService }, 
    { provide: ORDERS_ERROR_TOKEN, useClass: orderErrorService }, 
  ]
})
export class OrdersModule { }