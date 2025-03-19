import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
// import { BrowserModule } from '@angular/platform-browser';
const config: SocketIoConfig = { url: 'https://dev-middleware.aabsweets.com:8081', options: {reconnectionAttempts: 3} };
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot() 
  ]
})
export class dashboardModule { }
