import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../Core/guards/can-deactivate.guard';
import { AuthGuard } from '../../Core/guards/auth.guard';
import { CategoryComponent } from './category/component/category.component';
import { ItemListComponent } from './items/components/item-list/item-list.component';
import { ModifierGroupListComponent } from './modifier-group/components/modifier-group-list/modifier-group-list.component';
import { TexesListComponent } from './taxes/components/texes-list/texes-list.component';
import { ModifiersListComponent } from './modifiers/component/modifiers-list/modifiers-list.component';
import { TagsListComponent } from './tags/components/tags-list/tags-list.component';
import { BackupsComponent } from './backup-catalogue/components/backups-list/backups.component';

const routes: Routes = [
  { path: '', redirectTo: 'category', pathMatch: 'full' },
  { path: 'category' , component : CategoryComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard]},
  { path: 'items' , component : ItemListComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard]},
  { path: 'modifier-group' , component : ModifierGroupListComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard]},
  { path: 'taxes' , component : TexesListComponent,canActivate: [AuthGuard] ,canDeactivate: [CanDeactivateGuard]},
  { path: 'modifiers', component: ModifiersListComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'tags', component: TagsListComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'backups', component: BackupsComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueRoutingModule {}
