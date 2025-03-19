import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule as ToasterModule } from 'ngx-toastr';
import { IAddAggregator, IGetAggregators, IUpdateAggregator } from './service/aggregators-service.interface';
import { aggregatorService } from './service/aggregators-service';
// import { BrowserModule } from '@angular/platform-browser';

export const AGGREGATOR_SERVICE_TOKEN = new InjectionToken<IGetAggregators & IUpdateAggregator & IAddAggregator>('AGGREGATOR_SERVICE_TOKEN');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToasterModule.forRoot() 
  ],
  providers: [
    { provide: AGGREGATOR_SERVICE_TOKEN, useClass: aggregatorService  }
  ]
})
export class AuthenticationModule { }