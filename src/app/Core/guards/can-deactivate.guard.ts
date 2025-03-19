import { CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from '../../Feature/authentication/auth-service/auth.service';
import { inject } from '@angular/core';

// Define a generic interface for components that require CanDeactivate checks
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const CanDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
    console.log('Current Route:', currentRoute);
    console.log('Next State:', nextState);
    console.log('component:', component);
    console.log('Current St ate:', currentState);
    const authService = inject(AuthService);
    const router = inject(Router);
    const token: boolean = authService.getToken();

    // Check if the component implements the CanComponentDeactivate interface
    if(nextState.url === '/login' && token){ 
      void router
      // .navigateByUrl(currentState.url)
      return false
    }else{
      return true;
    }
    // if (component && component.canDeactivate) {
    //     return component.canDeactivate();
    // }

    // Allow navigation by default if no canDeactivate method is defined
    // return true;
};