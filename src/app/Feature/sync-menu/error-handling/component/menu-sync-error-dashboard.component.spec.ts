import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuSyncErrorDashboardComponent } from './menu-sync-error-dashboard.component';
import { SyncMenuErrorConst } from '../const/syncMenuError.const';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonResponseJson } from '../interface/menuSyncError-interface';
import { MenuErrorDashboardService } from '../service/menu-error-dashboard.service';

describe('MenuSyncErrorDashboardComponent', () => {
  let component: MenuSyncErrorDashboardComponent;
  let fixture: ComponentFixture<MenuSyncErrorDashboardComponent>;
  let syncService: jasmine.SpyObj<MenuErrorDashboardService>;

  beforeEach(async () => {
    syncService = jasmine.createSpyObj<MenuErrorDashboardService>('MenuErrorDashboardService', ['getSyncError']);

    await TestBed.configureTestingModule({
      imports: [
        MenuSyncErrorDashboardComponent,
        HttpClientTestingModule  // Add HttpClientTestingModule here
      ],
      providers: [
        { provide: MenuErrorDashboardService, useValue: syncService },
        SyncMenuErrorConst
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSyncErrorDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isErrorOccur).toBeFalse();
  });

  it('should call getSyncError on ngOnInit and populate syncErrorData', () => {
    const mockResponse: CommonResponseJson = {
      success: 'OK',
      data: [],  
      message: 'Request successful', 
      statusCode: 200 ,
      pagination:{
        pageSize: 0,
        totalItems:0,
        currentPage:0,
      }
    };
    syncService.getSyncError.and.returnValue(of(mockResponse));
    expect(syncService.getSyncError.bind(syncService)).toHaveBeenCalled();
  });

  it('should handle error when getSyncError API fails', () => {
    const mockError = { customMessage: 'User not found.' };
    syncService.getSyncError.and.returnValue(throwError(() => mockError));
    expect(component.isErrorOccur).toBeTrue();
    expect(component.errorMessage).toBe('User not found.');
  });


  it('should handle page changes correctly in changePage()', () => {
    component.changePage(2);
    expect(component.page.currentPage).toBe(2);
  });

  it('should update records per page in RecordPerPage()', () => {
    component.RecordPerPage();
    expect(component.page.currentPage).toBe(20);
  });

  it('should reset inline error state when closeInlineError() is called', () => {
    component.isErrorOccur = true;
    component.errorMessage = 'Some error';
    component.closeInlineError();
    expect(component.isErrorOccur).toBeFalse();
    expect(component.errorMessage).toBe('');
  });
});
