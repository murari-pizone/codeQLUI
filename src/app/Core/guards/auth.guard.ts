import { ActivatedRouteSnapshot, CanActivateFn
    // , Router
    , RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CommonService } from '../services/common.service';

export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
    
    console.log(state)
    console.log(route)
    const authService = inject(CommonService);
    // const router = inject(Router);
    // const protectedRoute:string[] = ['/login']

    // Simulate an async token check, you can replace this with an actual observable if necessary
    const token: boolean = authService.getToken();

    if (token) {
        // return protectedRoute.includes(state.url) ? router.navigate(['/']): false
        // router.navigateByUrl('/login');
        // void router
        // .navigateByUrl('view/dashboard')
        return true;  // If the token is present, allow route access
    } else {
        // Add logic to display a loader or block the navigation until token retrieval is confirmed
        // router.navigateByUrl('/login');
        return true;
    }
};
