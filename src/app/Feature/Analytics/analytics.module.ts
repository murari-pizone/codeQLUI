import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AnalyticsRoutingModule } from './analytics.routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    // BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot() 
  ],
  providers: []
})
export class AnalyticsModule { }