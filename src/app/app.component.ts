import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponentConst } from './Shared/const/common.constant';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { CommonService } from './Core/services/common.service';
import { LocationConstant } from './Feature/location/const/location.const';
import { InactivityService } from './Core/services/inactivity.service';
import { SubMenuArray } from './Shared/common-interface/common.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule,FormsModule,CommonModule, ResizableModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers : [LocationConstant,AppComponentConst]
})
export class AppComponent implements OnInit ,OnDestroy {
  title = 'Restaurant ';
  isSubMenuClick : boolean = false;
  isCatalogueClick : boolean = false;
  isOrderDetails : boolean = false;
  isDrawerOpen = false;
  activeLinkName : string = '';

  subMenuArray : SubMenuArray[] = []
  subCatalogueArray : SubMenuArray[] = []
  subOrderArray : SubMenuArray[] = []
  subAnalyticsArray : SubMenuArray[] = []

  showDrawer = false;
  isSubAnalyticsClick: any;
  
  constructor(public route : Router,public commonService:CommonService , private readonly inactivityService : InactivityService,public appCompConst:AppComponentConst){
    this.activeLinkName = this.route.url
    this.subMenuArray = this.appCompConst.subMenuArray;
    this.subCatalogueArray = this.appCompConst.subCatalogueArray;
    this.subOrderArray = this.appCompConst.subOrderArray;
    this.subAnalyticsArray = this.appCompConst.subAnalyticsArray;

    this.route.events.subscribe(() => {
      this.changeTitle(this.route.url)
    });
    this.commonService.isLogIn = true;
    // if (typeof localStorage !== 'undefined') {
    //   this.commonService.isLogIn = !!localStorage.getItem('Token');  
    // }
  }

  ngOnInit(): void {
    this.inactivityService.monitorToken();
  }
 
  ngOnDestroy(): void {
    this.inactivityService.stopMonitoringToken();
  }

  toggleDrawer(event: Event): void {
    event.stopPropagation();
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  empty():void{
    console.log('empty function');
  }
  clearStorage():void{
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    this.commonService.isLogIn = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInside = (event.target as HTMLElement).closest('.profile-section');
    if (!clickedInside) {
      this.isDrawerOpen = false;
    }
  }
  showSubMenu():void{
    this.isSubMenuClick = !this.isSubMenuClick
  }
  showAnalytics():void{
    this.isSubAnalyticsClick = !this.isSubAnalyticsClick
  }
  showCatalogue():void{
    this.isCatalogueClick = !this.isCatalogueClick;
  }

  showOrderDetails():void{
    this.isOrderDetails = !this.isOrderDetails
  }


  navigateTo(linkName:string):void{
    if(linkName){
      this.activeLinkName = linkName;
      switch(linkName){
        case 'Location' : 
        this.title = 'Location';
        void this.route.navigateByUrl('view/location')
        break;
        case 'dashboard' : 
        this.title = 'Dashboard';
        void this.route.navigateByUrl('view/dashboard')
        break;
        case 'orders' : 
        this.title = 'Order List';
        void this.route.navigateByUrl('view/orders')
        break;
        case 'order-error' : 
        this.title = 'Order Error';
        void this.route.navigateByUrl('view/order-error')
        break;
        case 'menu-syncError' : 
        this.title = 'Menu Error';
        void this.route.navigateByUrl('view/menu-syncError')
        break;
        case 'create-outlets' : 
        this.title = 'create-outlets';
        void this.route.navigateByUrl('view/create-outlets')
        break;
        case 'api-setting' : 
        void this.route.navigateByUrl('view/api-setting')
        break;
        case 'sync-menu' : 
        this.title = 'Restaurant';
        void this.route.navigateByUrl('view/sync-menu');
        break;
        case 'Change-Password' : 
        void this.route.navigateByUrl('view/change-password');
        break;
        case 'category' : 
        this.title = 'Category';
        void this.route.navigateByUrl('view/category');
        break;
        case 'items' : 
        void this.route.navigateByUrl('view/items');
        break;
        case 'modifier-group' : 
        void this.route.navigateByUrl('view/modifier-group');
        break;
        case 'taxes' : 
        void this.route.navigateByUrl('view/taxes');
        break;
        case 'modifiers' : 
        void this.route.navigateByUrl('view/modifiers');
        break;
        case 'tags' : 
        void this.route.navigateByUrl('view/tags');
        break;
        case 'backups' : 
        void this.route.navigateByUrl('view/backups');
        break;
        case 'analytics/home-analytics' : 
        void this.route.navigateByUrl('view/analytics/home-analytics');
        break;
        case 'analytics/revenue':
        void this.route.navigateByUrl('view/analytics/revenue');
        break;
        case 'analytics/operations':
        void this.route.navigateByUrl('view/analytics/operations');
        break;
        case 'analytics/catalogue':
        void this.route.navigateByUrl('view/analytics/catalogue');
        break;
        case 'logout' : 
        this.clearStorage();
        void this.route.navigateByUrl('/login');
        break;
      }
    }
  }

  changeTitle(linkName: string): void {
    if (linkName) {
      this.activeLinkName = linkName;
      switch (linkName) {
        case '/view/orders' : 
          this.title = 'Order List';
          break;
        case '/view/location' : 
        case '/view/add-location' : 
          this.title = 'Location';
          break;
        case '/view/dashboard':
          this.title = 'Dashboard';
          break;
        case '/view/order-error':
          this.title = 'Order Error';
          break;
        case '/view/menu-syncError':
          this.title = 'Menu Error';
          break;
          case '/view/create-outlets':
          this.title = 'Create Outlets';
          break;
        case '/view/api-setting':
          this.title = 'Aggregator Configuration';
          break;
        case '/view/sync-menu':
          this.title = 'Menu Sync';
          break;
          case '/view/category':
          this.title = 'Category';
          break;
        case '/view/items':
          this.title = 'Items';
          break;
        case '/view/modifier-group':
          this.title = 'Modifier Group';
          break;
        case '/view/taxes':
        this.title = 'Taxes';
        break;
        case '/view/modifiers':
          this.title = 'Modifiers';
          break;
        case '/view/backups':
          this.title = 'Backups';
          break;
        case '/view/analytics/home-analytics':
          this.title = 'Home-Analytics';
          break;
        case '/view/analytics/revenue':
          this.title = 'Revenue';
          break;
        case '/view/analytics/operations':
          this.title = 'Operations';
          break;
        case '/view/analytics/catalogue':
          this.title = 'Catalogue';
          break;
        case '/view/tags':
          this.title = 'Tags';
          break;
      }
    }
  }
  onResizeEnd(event: ResizeEvent): void {
    document.documentElement.style.setProperty('--sidebar-width', event.rectangle.width + 'px');
  }

  closeBar(event: Event): void {
    event.stopPropagation()
    this.showDrawer = false;
    document.documentElement.style.setProperty('--sidebar-width', 0 + 'px');
  }

  openSideBar(): void {
    this.toggleTabs();
    this.showDrawer = true
    if(this.showDrawer){
      document.documentElement.style.setProperty('--sidebar-width', 310 + 'px');
    }else{
      document.documentElement.style.setProperty('--sidebar-width', 0 + 'px');
    }
  }

  toggleRightDrawer(event: Event): void {
    if (this.showDrawer) {
      this.hideSubMenu('All');
      this.closeBar(event)
    } else {
      this.openSideBar()
    }
  }

  toggleTabs(): void {
    const activeRoute = this.route.url;
    if (['/view/sync-menu', '/view/menu-syncError', 'Menu'].includes(activeRoute)) {
      this.activeLinkName = 'Menu'
      this.isSubMenuClick = true
    }
    if (['/view/order-error', '/view/orders'].includes(activeRoute)) {
      this.activeLinkName = 'Order'
      this.isOrderDetails = true
    }
    if (['/view/category', '/view/items'].includes(activeRoute)) {
      this.activeLinkName = 'Catalogue'
      this.isCatalogueClick = true;
    }
    if (['/view/analytics/home-analytics'].includes(activeRoute)) {
      this.activeLinkName = 'Home-Analytics'
      this.isSubAnalyticsClick = true;
    }
  }
  onResizing(event:ResizeEvent):void{
    document.documentElement.style.setProperty('--sidebar-width', event.rectangle.width + 'px');
  }
  hideSubMenu(name:string):void{
    if(name === 'orders'){
      this.isSubMenuClick = false;
      this.isCatalogueClick = false;
      this.isSubAnalyticsClick = false;
    }
    if(['All','changePassword', 'location', 'apiSetting', 'syncMenu'].includes(name)){
      this.isSubMenuClick=false;
      this.isOrderDetails=false;
      this.isCatalogueClick = false;
      this.isSubAnalyticsClick = false;
    }
    if(name === 'subMenu'){
      this.isSubMenuClick = false;
      this.isCatalogueClick = false;
      this.isSubAnalyticsClick = false;
    }
    if(name === 'Menu' ){
      this.isOrderDetails = false;
      this.isCatalogueClick = false;
      this.isSubAnalyticsClick = false;
    }
    if(name === 'Catalogue'){
      this.isOrderDetails = false;
      this.isSubMenuClick = false;
      this.isSubAnalyticsClick = false;
    }
    if(name === 'Analytics'){
      this.isOrderDetails = false;
      this.isSubMenuClick = false;
      this.isCatalogueClick = false;
    }
  }
}


