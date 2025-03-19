import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LocationsRoutingModule } from './location.routing.module';
// import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    // BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot() 
  ]
})
export class LocationModule { }