import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CatalogueRoutingModule } from './catalogue.routing.module';
import { IGetAllItems } from './items/service/Item-list/item-service.interface';
import { ItemsService } from './items/service/Item-list/items-service';
import { ModifierGroupService } from './modifier-group/service/modifier-group-list/modifier-group-service';
import { IGetAllModifierGroupRecords } from './modifier-group/service/modifier-group-list/modifier-group-interface-service';
import { IGetAllItemsTabRecords } from './modifier-group/service/modifier-group-modal/modifier-group-tabs-interface-service';
import { ModifierTabsService } from './modifier-group/service/modifier-group-modal/modifier-group-tabs-service';
import { IGetAllTaxes } from './taxes/service/taxes-interface-service';
import { TaxesListService } from './taxes/service/taxes-service';
import { IGetAllModifiers } from './modifiers/modifiers-service/modifiers-service.interface';
import { ModifiersService } from './modifiers/modifiers-service/modifiers-service.service';


export const ITEM_LIST_TOKEN = new InjectionToken<IGetAllItems>('ITEM_LIST_TOKEN');
export const MODIFIER_GROUP_LIST_TOKEN = new InjectionToken<IGetAllModifierGroupRecords>('MODIFIER_GROUP_LIST_TOKEN');
export const MODIFIER_GROUP_TABS_SERVICE_TOKEN = new InjectionToken<IGetAllItemsTabRecords>('MODIFIER_GROUP_TABS_SERVICE_TOKEN');
export const TAXES_LIST_TOKEN = new InjectionToken<IGetAllTaxes>('TAXES_LIST_TOKEN');
export const MODIFIER_LIST_TOKEN = new InjectionToken<IGetAllModifiers>('MODIFIER_LIST_TOKEN');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: ITEM_LIST_TOKEN, useClass: ItemsService },
    { provide: MODIFIER_GROUP_LIST_TOKEN, useClass: ModifierGroupService },
    { provide: MODIFIER_LIST_TOKEN, useClass: ModifiersService },
    { provide: MODIFIER_GROUP_TABS_SERVICE_TOKEN, useClass: ModifierTabsService },
    { provide: TAXES_LIST_TOKEN, useClass: TaxesListService },
  ]
 
})
export class CatalogueModule { }
