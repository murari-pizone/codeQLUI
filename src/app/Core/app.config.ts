import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import GlobalInterceptor from './interceptors/global.interceptor';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()),
  provideClientHydration(),provideHttpClient(withFetch()), provideAnimationsAsync(),
  importProvidersFrom(ToastrModule.forRoot()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GlobalInterceptor, // Register your interceptor here
    multi: true, // Allow multiple interceptors
  },
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
