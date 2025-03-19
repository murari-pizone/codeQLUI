import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonService } from './Core/services/common.service';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ResizeEvent } from 'angular-resizable-element';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let commonService: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule , HttpClientModule],
      providers: [CommonService],
      schemas: [NO_ERRORS_SCHEMA], // Avoid errors due to missing external templates and elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    commonService = TestBed.inject(CommonService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle drawer state on toggleDrawer()', () => {
    const event = new MouseEvent('click');
    component.toggleDrawer(event);
    expect(component.isDrawerOpen).toBe(true);
    component.toggleDrawer(event);
    expect(component.isDrawerOpen).toBe(false);
  });

  it('should log out and clear storage', () => {
    spyOn(router, 'navigateByUrl');
    const clearStorageSpy = spyOn(component, 'clearStorage');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    expect(clearStorageSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
  });

  it('should clear local storage and update isLogIn in CommonService on clearStorage()', () => {
    spyOn(localStorage, 'clear');
    const clearStorageSpy = spyOn(component, 'clearStorage');
    component.clearStorage();
    expect(clearStorageSpy).toHaveBeenCalled();
    expect(commonService.isLogIn).toBe(false);
  });

  it('should call navigateTo() and change title when a link is clicked', () => {
    spyOn(router, 'navigateByUrl');

    component.navigateTo('orders');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/orders');
    expect(component.title).toBe('Order List');
  });

  it('should change title based on the route in changeTitle()', () => {
    component.changeTitle('/view/orders');
    expect(component.title).toBe('Order List');

    component.changeTitle('/view/dashboard');
    expect(component.title).toBe('Dashboard');
  });
  

  it('should handle document click event and close drawer if clicked outside profile-section', () => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const profileSection = document.createElement('div');
    profileSection.classList.add('profile-section');
    document.body.appendChild(profileSection);

    spyOn(component, 'onDocumentClick').and.callThrough();
    component.onDocumentClick(event);
    expect(component.isDrawerOpen).toBe(false);

    // Simulate click inside profile-section to avoid closing the drawer
    const insideClickEvent = new MouseEvent('click');
    profileSection.dispatchEvent(insideClickEvent);
    expect(component.isDrawerOpen).toBe(true);
  });

  it('should toggle sub menu visibility on showSubMenu()', () => {
    expect(component.isSubMenuClick).toBe(false);
    component.showSubMenu();
    expect(component.isSubMenuClick).toBe(true);
    component.showSubMenu();
    expect(component.isSubMenuClick).toBe(false);
  });

  it('should toggle order details visibility on showOrderDetails()', () => {
    expect(component.isOrderDetails).toBe(false);
    component.showOrderDetails();
    expect(component.isOrderDetails).toBe(true);
    component.showOrderDetails();
    expect(component.isOrderDetails).toBe(false);
  });

  it('should resize sidebar on onResizeEnd()', () => {
    const event = {
      rectangle: { width: 200 }
    };
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');
    component.onResizeEnd(event as ResizeEvent);
    expect(setPropertySpy).toHaveBeenCalledWith('--sidebar-width', '200px');
  });

  it('should close the sidebar on closeBar()', () => {
    const event = new MouseEvent('click');
    component.closeBar(event);
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');
    expect(component.showDrawer).toBe(false);
    expect(setPropertySpy).toHaveBeenCalledWith('--sidebar-width', '0px');
  });

  it('should open the sidebar on openSideBar()', () => {
    component.openSideBar();
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');
    expect(component.showDrawer).toBe(true);
    expect(setPropertySpy).toHaveBeenCalledWith('--sidebar-width', '310px');
  });

  it('should update sidebar width during resizing', () => {
    const event = {
      rectangle: { width: 400 }
    };
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');
    component.onResizing(event as ResizeEvent);
    expect(setPropertySpy).toHaveBeenCalledWith('--sidebar-width', '400px');
  });
  it('should toggle submenu visibility when showSubMenu() is called', () => {
    component.showSubMenu();
    expect(component.isSubMenuClick).toBeTrue();
    component.showSubMenu();
    expect(component.isSubMenuClick).toBeFalse();
  });

  it('should toggle order details visibility when showOrderDetails() is called', () => {
    component.showOrderDetails();
    expect(component.isOrderDetails).toBeTrue();
    component.showOrderDetails();
    expect(component.isOrderDetails).toBeFalse();
  });

  it('should navigate to the correct route when navigateTo() is called with "dashboard"', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateTo('dashboard');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    expect(component.title).toBe('Dashboard');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/dashboard');
  });

  it('should navigate to the correct route when navigateTo() is called with "orders"', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateTo('orders');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    expect(component.title).toBe('Order List');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/orders');
  });

  it('should navigate to the correct route when navigateTo() is called with "order-error"', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateTo('order-error');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    expect(component.title).toBe('Order Error');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/order-error');
  });

  it('should navigate to the correct route when navigateTo() is called with "menu-syncError"', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateTo('menu-syncError');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    expect(component.title).toBe('Menu Error');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/menu-syncError');
  });

  it('should navigate to the correct route when navigateTo() is called with "api-setting"', () => {
    spyOn(router, 'navigateByUrl');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    component.navigateTo('api-setting');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/api-setting');
  });

  it('should navigate to the correct route when navigateTo() is called with "sync-menu"', () => {
    spyOn(router, 'navigateByUrl');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    component.navigateTo('sync-menu');
    expect(component.title).toBe('Restaurant Details');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/sync-menu');
  });

  it('should navigate to the correct route when navigateTo() is called with "Change-Password"', () => {
    spyOn(router, 'navigateByUrl');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    component.navigateTo('Change-Password');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/change-password');
  });

  it('should call clearStorage() and navigate to login when navigateTo() is called with "logout"', () => {
    const clearStorageSpy = spyOn(component, 'clearStorage');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    component.navigateTo('logout');
    expect(clearStorageSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
  });

  it('should update title correctly when changeTitle() is called with "/view/orders"', () => {
    component.changeTitle('/view/orders');
    expect(component.title).toBe('Order List');
  });

  it('should update title correctly when changeTitle() is called with "/view/dashboard"', () => {
    component.changeTitle('/view/dashboard');
    expect(component.title).toBe('Dashboard');
  });

  it('should update title correctly when changeTitle() is called with "/view/order-error"', () => {
    component.changeTitle('/view/order-error');
    expect(component.title).toBe('Order Error');
  });

  it('should update title correctly when changeTitle() is called with "/view/menu-syncError"', () => {
    component.changeTitle('/view/menu-syncError');
    expect(component.title).toBe('Menu Error');
  });

  it('should update title correctly when changeTitle() is called with "/view/api-setting"', () => {
    component.changeTitle('/view/api-setting');
    expect(component.title).toBe('Aggregator Configuration');
  });

  it('should update title correctly when changeTitle() is called with "/view/sync-menu"', () => {
    component.changeTitle('/view/sync-menu');
    expect(component.title).toBe('Restaurant Details');
  });

  
});
