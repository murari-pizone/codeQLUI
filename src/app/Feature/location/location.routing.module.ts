import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './component/location.component';
import { AddLocationComponent } from './add-location/addLocation.component';
import { AuthGuard } from '../../Core/guards/auth.guard';
import { CanDeactivateGuard } from '../../Core/guards/can-deactivate.guard';
import { EditLocationComponent } from './edit-location/edit-location.component';

const routes: Routes = [
    { path: 'location', component: LocationComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
    { path: 'add-location', component: AddLocationComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
    { path: 'edit-location/:id', component: EditLocationComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}