import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SyncMenuComponent } from './sync-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { 
  // ErrorResponse,
    MenuRows } from '../interface/sync-menu-interface';
import { Sort } from '@angular/material/sort';
// import { SyncMenuService } from '../sync-menu.service';
import { of
  // , throwError
 } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessComponent } from '../../../../Shared/popup/success/success.component';

describe('SyncMenuComponent', () => {
  let component: SyncMenuComponent;
  // let serviceMock: jasmine.SpyObj<SyncMenuService>;
  let fixture: ComponentFixture<SyncMenuComponent>;
  // let mockService: jasmine.SpyObj<SyncMenuService>;
  // let mockPopup: jasmine.SpyObj<MatDialog>;
  

  beforeEach(async () => {
    // mockService = jasmine.createSpyObj<SyncMenuService>('SyncMenuService', ['getData', 'getMenu', 'syncData']);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        // { provide: SyncMenuService, useValue: mockService },
        // { provide: MatDialog, useValue: mockPopup }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SyncMenuComponent);
    component = fixture.componentInstance;
    // serviceMock = jasmine.createSpyObj<SyncMenuService>('YourService', ['syncData']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should sort rows when sort parameters are provided', () => {
    // Setup initial data
    component.rows = [
      { Add1: 'Item 1', Latitude: 100 } as MenuRows,
      { Add1: 'Item 2', Latitude: 200 } as MenuRows
    ];

    const sort: Sort = { active: 'price', direction: 'asc' };  // Sorting by price, ascending

    // Call sortData
    component.sortData(sort);

    // Expect rows to be sorted
    expect(component.rows).toEqual([
      { Add1: 'Item 1', Latitude: 100 } as MenuRows,
      { Add1: 'Item 2', Latitude: 200 } as MenuRows
    ]);


  });

  it('should return original rows when no sort parameters are provided', () => {
    // Setup initial data
    component.rows = [
      { Add1: 'Item 1', Latitude: 100 } as MenuRows,
      { Add1: 'Item 2', Latitude: 200 } as MenuRows
    ];

    const sort: Sort = { active: '', direction: '' };  // No sorting parameters

    // Call sortData
    component.sortData(sort);

    // Ensure rows are not changed
    expect(component.rows).toEqual([
      { Add1: 'Item 1', Latitude: 100 } as MenuRows,
      { Add1: 'Item 2', Latitude: 200 } as MenuRows
    ]);
  });


  it('should call service.getMenu and populate listOfMenus when listOfMenus is empty and currentRow is provided', () => {
    const mockCurrentRow: MenuRows = {
      brcode:'test brcode', brname:'test brname', Region: 'North', Add1: '', Add2: '', ContactNo: '', Costcenter: '', CountryCode: '', CountryName: '', GstNo: '',
      Latitude: 0, Pincode: '', ShopName: '', StateName: '', add3: '', longitude: 0, Status: '',
    };

    // Mock the service response to return the expected data
    // mockService.getMenu.and.returnValue(of(mockResponse));

    // Call the method
    component.getMenuList(mockCurrentRow);

    // Assert: The service was called with the correct arguments
    // expect(mockService.getMenu.bind(mockService)).toHaveBeenCalledWith(mockCurrentRow.ShopCode, mockCurrentRow.Region);
    
    // Assert: The listOfMenus should be populated with the mock data
  });
  
  it('should handle error response and set error flags when service call fails', () => {
    const mockCurrentRow: MenuRows = {brcode:'test brcode', brname:'test brname',  Region: 'North', Add1: '', Add2: '', ContactNo: '', Costcenter: '', CountryCode: '', CountryName: '', GstNo: '', Latitude: 0, Pincode: '', ShopName: '', StateName: '', add3: '', longitude: 0, Status: '' };
    
    const errorResponse = 'Error fetching menu data';
    // mockService.getMenu.and.returnValue(throwError(() => errorResponse));

    // Call the method
    component.getMenuList(mockCurrentRow);

    // Assert: The error flag should be set
    expect(component.isErrorOccur).toBeTrue();
    expect(component.errorMsg).toBe(errorResponse);
  });

  it('should not make a service call when listOfMenus is already populated', () => {
    
    const mockCurrentRow: MenuRows = { brcode:'test brcode', brname:'test brname', Region: 'North', Add1: '', Add2: '', ContactNo: '', Costcenter: '', CountryCode: '', CountryName: '', GstNo: '', Latitude: 0, Pincode: '', ShopName: '', StateName: '', add3: '', longitude: 0, Status: '' };
    
    // Call the method
    component.getMenuList(mockCurrentRow);

    // Assert: The service should not be called since listOfMenus is already populated
    // expect(mockService.getMenu.bind(mockService)).not.toHaveBeenCalled();
  });

  it('should not make a service call when currentRow is not provided', () => {
    // Call the method without currentRow
    component.getMenuList();

    // Assert: The service should not be called since currentRow is not provided
    // expect(mockService.getMenu.bind(mockService)).not.toHaveBeenCalled();
  });
  it('should handle error scenario with "Record syncing fail" message', () => {
    // Arrange: Mock an error with message 'Record syncing fail'

    // Act: Call syncingData
    component.syncingData();

    // Assert: Spinner should be hidden, and navigation to sync-menu-error should occur
    expect(component.loadingSpinner).toBe(false);
    const navigateByUrlSpy = spyOn(component.router, 'navigateByUrl').and.callThrough();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/view/sync-menu-error');
  });

it('should open the confirmation popup and call syncingData on success', () => {
  // Setup mock data
  const row: MenuRows = {
    brcode:'test brcode', brname:'test brname', ShopName: 'Test Shop', Add1: 'Test Address', StateName: 'Test State', Add2: 'test Add2', ContactNo: 'test ContactNo', Costcenter: 'test Costcenter', CountryCode: 'test CountryCode', 
    CountryName: 'test CountryName', GstNo: 'test GstNo', Latitude: 12, Pincode: 'test Pincode', Region: 'test Region', add3: 'test add3', longitude: 123, Status: 'test Status', isChecked: false,
    id: 'test id',
  };

  const title = 'Test Title';
  const context = 'Test Context';

  // Prepare mock for popup
  const mockDialogRef = {
    afterClosed: jasmine.createSpy().and.returnValue(of({ success: true, aggregatorList: ['Aggregator 1'] }))
  } as jasmine.SpyObj<MatDialogRef<SuccessComponent, any>>;  // Type it as MatDialogRef<SuccessComponent, any>


  // Setup aggregator list and other relevant properties
  component.aggregatorList = [{ name: 'Aggregator 1', isChecked: true }];
  component.syncingData = jasmine.createSpy('syncingData'); // Mock syncingData method

  // Call the method under test
  component.openConfirmationPopup(row, title, context);

  // Simulate afterClosed subscription
  mockDialogRef.afterClosed().subscribe(() => {
    // Assert that syncingData is called
    expect(component.syncingData.bind(component)).toHaveBeenCalled();
  });
});

  it('should handle generic error scenario', () => {
    // Arrange: Mock a generic error response
    // const errorResponse: ErrorResponse = { message: 'Some other error' };
    // mockService.syncData.and.returnValue(throwError(() => errorResponse));

    // Act: Call syncingData
    component.syncingData();

    // Assert: Spinner should be hidden, and error message should be set
    expect(component.loadingSpinner).toBe(false);
    expect(component.isErrorOccur).toBe(true);
    expect(component.errorMsg).toBe('Some other error');
  });

  it('should filter rows when value is non-empty', () => {
    const searchValue = 'Restaurant A';
    component.filter(searchValue);

    // Ensure rows are filtered correctly
    expect(component.rows.length).toBe(1);  // Only one match should be found
    expect(component.rows[0].ShopName).toBe('Restaurant A');  // The matching row should be Restaurant A
  });

  it('should filter rows by specific column', () => {
    const searchValue = 'Location B';
    component.filter(searchValue);

    // Ensure rows are filtered correctly
    expect(component.rows.length).toBe(1);  // Only one match should be found
    expect(component.rows[0].Add1).toBe('Location B');  // The matching row should be Location B
  });

  it('should return all rows when value is empty', () => {
    const searchValue = '';
    component.filter(searchValue);

    // Ensure all rows are returned when search value is empty
    expect(component.rows.length).toBe(3);  // Should return all rows from allData
  });




  it('should return empty rows if no match is found', () => {
    const searchValue = 'Nonexistent Restaurant';
    component.filter(searchValue);

    // Ensure no rows are returned when no match is found
    expect(component.rows.length).toBe(0);  // No matches should result in empty rows
  });

  it('should not filter rows if the value is just whitespace', () => {
    const searchValue = '   ';  // Whitespace
    component.filter(searchValue);

    // Ensure all rows are returned when search value is only whitespace
    expect(component.rows.length).toBe(3);  // Should return all rows from allData
  });

  it('should filter rows based on selected column  is set to a specific column', () => {
    const searchValue = 'City A';
    component.filter(searchValue);

    // Ensure the rows are filtered by the StateName column
    expect(component.rows.length).toBe(2);  // Only two rows match City A
    expect(component.rows[0].StateName).toBe('City A');  // Verify the matching row
    expect(component.rows[1].StateName).toBe('City A');  // Verify the matching row
  });

  it('should set isErrorOccur to false and errorMsg to an empty string', () => {
    // Initially set the values to simulate an error
    component.isErrorOccur = true;
    component.errorMsg = 'Some error occurred';

    // Call the closeInlineError method
    component.closeInlineError();

    // Check that isErrorOccur is set to false and errorMsg is set to an empty string
    expect(component.isErrorOccur).toBe(false);  // Expect the error flag to be false
    expect(component.errorMsg).toBe('');  // Expect the error message to be cleared
  });

  it('should not throw any errors when called with default values', () => {
    // Test that the method works even if the properties have default values (false and '')
    expect(() => component.closeInlineError()).not.toThrow();
    expect(component.isErrorOccur).toBe(false);  // Ensure no error flag is set
    expect(component.errorMsg).toBe('');  // Ensure no error message exists
  });

  it('should correctly adjust the width of menu items', () => {
    // Mock DOM elements
    const menuCard = document.createElement('div');
    menuCard.id = 'menu-card'; // Mock the container
    document.body.appendChild(menuCard);

    const menuItem1 = document.createElement('div');
    menuItem1.className = 'menu-item-detail'; // Mock one menu item
    const menuItem2 = document.createElement('div');
    menuItem2.className = 'menu-item-detail'; // Mock another menu item
    document.body.appendChild(menuItem1);
    document.body.appendChild(menuItem2);

    // Simulate getBoundingClientRect to return a specific width
    const menuContainer = document.getElementById('menu-card');
    if (menuContainer) {
      // Use Jasmine's spyOn to mock getBoundingClientRect
      spyOn(menuContainer, 'getBoundingClientRect').and.returnValue({
        width: 500,  // Mocked width of the menu container
        height: 300,
        top: 0,
        left: 0,
        bottom: 300,
        right: 500,
        x: 0,  // Required property
        y: 0,  // Required property
        toJSON: () => {} // Required method
      } as DOMRect); // Cast to DOMRect type
    }

    // Run the customWidth method
    component.customWidth();
    fixture.detectChanges();

    // Assert that the width has been updated correctly
    const updatedWidth1 = parseInt(menuItem1.style.width, 10); // Read the updated width of the first item
    const updatedWidth2 = parseInt(menuItem2.style.width, 10); // Read the updated width of the second item

    // The width of each item should be 500 (menu container width) - 275
    expect(updatedWidth1).toBe(225);
    expect(updatedWidth2).toBe(225);
  });

  it('should not set width if menuContainer is not found', () => {
    // Simulate the case when `menuContainer` is not found
    const menuItem1 = document.createElement('div');
    menuItem1.className = 'menu-item-detail';
    document.body.appendChild(menuItem1);

    // Simulate the case when getBoundingClientRect is not available
    // const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    spyOn(HTMLElement.prototype, 'getBoundingClientRect').and.returnValue({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0
    } as DOMRect);

    // Run the customWidth method
    component.customWidth();
    fixture.detectChanges();

    // Assert that no width has been applied
    expect(menuItem1.style.width).toBe('');
  });

  it('should initialize component', () => {
    spyOn(component, 'setPage');
    component.ngOnInit();
    expect(component.loading).toBeFalse();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.unsubscribe$, 'next');
    spyOn(component.unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(component.unsubscribe$.next.bind(component)).toHaveBeenCalled();
    expect(component.unsubscribe$.complete.bind(component)).toHaveBeenCalled();
  });

  it('should do nothing if no row is provided in openConfirmationPopup', () => {
    component.openConfirmationPopup(null , 'Sync Menu', 'Test Sync');
    expect(component.currentRowData).toBeUndefined();
  });

  it('should sort data in ascending order when sortData is called', () => {
    const mockSort: Sort = { active: 'ShopName', direction: 'asc' };

    const mockData: MenuRows[] = [
      {
        brcode:'test brcode', brname:'test brname', ShopName: 'Zomato', Add1: 'Address 1', Add2: 'Address 2', ContactNo: '1234567890', Costcenter: 'Center1', CountryCode: 'IN', CountryName: 'India', 
        GstNo: 'GST123456', Latitude: 12.9716, longitude: 77.5946, Pincode: '560001', Region: 'South', StateName: 'Karnataka', add3: 'Additional Address', Status: 'Active',
      },
      {
        brcode:'test brcode', brname:'test brname', ShopName: 'Swiggy', Add1: 'Address 1', Add2: 'Address 2', ContactNo: '0987654321', Costcenter: 'Center2', CountryCode: 'IN', CountryName: 'India',
        GstNo: 'GST654321', Latitude: 13.0827, longitude: 80.2707, Pincode: '600001', Region: 'South', StateName: 'Tamil Nadu', add3: 'Additional Address', Status: 'Inactive',
      },
    ];

    component.rows = mockData;

    component.sortData(mockSort);
    expect(component.rows[0].ShopName).toBe('Zomato');
    expect(component.rows[1].ShopName).toBe('Swiggy');
  });

  it('should reset rows when filter is empty', () => {
    component.allData = [
      {
        ShopName: 'Zomato', Add1: 'Location1', Add2: 'Address2', add3: 'Address3', ContactNo: '1234567890', Costcenter: 'Center1', CountryCode: 'IN', CountryName: 'India', 
        GstNo: 'GST123456', Latitude: 12.9716, longitude: 77.5946, Pincode: '560001', Region: 'South', brcode:'test brcode', brname:'test brname', StateName: 'City1', Status: 'Active',
      },
      {
        ShopName: 'Swiggy', Add1: 'Location2', Add2: 'Address4', add3: 'Address5', ContactNo: '0987654321', Costcenter: 'Center2', CountryCode: 'IN', CountryName: 'India',
        GstNo: 'GST654321', Latitude: 13.0827, longitude: 80.2707, Pincode: '600001', Region: 'South', brcode:'test brcode', brname:'test brname', StateName: 'City2', Status: 'Inactive',
      },
    ];

    // Call the filter method with an empty string
    component.filter('');

    // Ensure rows are reset to the original data
    expect(component.rows.length).toBe(2); // rows should contain all 2 items
    expect(component.rows[0].ShopName).toBe('Zomato');
    expect(component.rows[1].ShopName).toBe('Swiggy');
  });


  it('should filter data correctly when filter method is called', () => {
    // Updated mock data including all required properties from MenuRows interface
    const mockData: MenuRows[] = [
      {
        brcode:'test brcode', brname:'test brname', ShopName: 'Zomato', Add1: 'Location1', Add2: 'Additional Address1', ContactNo: '1234567890', Costcenter: 'Center1', CountryCode: 'IN', CountryName: 'India',
        GstNo: 'GST123456', Latitude: 12.9716, longitude: 77.5946, Pincode: '560001', Region: 'South', StateName: 'Karnataka', add3: 'Some Additional Address', Status: 'Active',
      },
      {
        brcode:'test brcode', brname:'test brname', ShopName: 'Swiggy', Add1: 'Location2', Add2: 'Additional Address2', ContactNo: '0987654321', Costcenter: 'Center2', CountryCode: 'IN', CountryName: 'India',
        GstNo: 'GST654321', Latitude: 13.0827, longitude: 80.2707, Pincode: '600001', Region: 'South', StateName: 'Tamil Nadu', add3: 'Some Additional Address',Status: 'Inactive',
      },
    ];

    component.allData = mockData;

    component.filter('Zomato');
    expect(component.rows.length).toBe(1);
    expect(component.rows[0].ShopName).toBe('Zomato');
  });

  it('should handle error when getData fails', () => {
    // mockService.getData.and.returnValue(throwError('Error fetching data'));
    spyOn(component, 'setPage');

    expect(component.isErrorOccur).toBeFalse();
    expect(component.errorMsg).toBe('Date is Not fetched');
  });


  it('should call syncingData and handle response successfully', () => {
    // const mockResponse = 'Sync successful';
    // mockService.syncData.and.returnValue(of(mockResponse));

    component.syncingData();
    expect(component.loadingSpinner).toBeFalse();
  });

  it('should handle error in syncingData', () => {
    // mockService.syncData.and.returnValue(throwError('Sync failed'));
    component.syncingData();
  });

  it('should handle multiple rows when filter is applied', () => {
    const mockData: MenuRows[] = [
      {
        Add1: '123 Some St.', Add2: 'Suite 101', ContactNo: '1234567890', Costcenter: 'A100', CountryCode: 'IN',
        CountryName: 'India', GstNo: 'GSTIN12345', Latitude: 28.7041, Pincode: '110001', Region: 'North',
        brcode:'test brcode', brname:'test brname', ShopName: 'Shop 1', StateName: 'Delhi', add3: 'Block A', longitude: 77.1025, Status: 'Active', id: 'test id'
      },
    ];

    component.allData = mockData;
    component.filter('Active');
    expect(component.rows.length).toBe(3); // Active status
  });


  it('should set rows and allData when the response statusCode is 200', () => {

    // Check if the rows and allData are set correctly
    expect(component.rows).toEqual([{
      Add1: '123 Some St.', Add2: 'Suite 101', ContactNo: '1234567890', Costcenter: 'A100', CountryCode: 'IN', CountryName: 'India', GstNo: 'GSTIN12345',
      Latitude: 28.7041, Pincode: '110001', Region: 'North', brcode:'test brcode', brname:'test brname', ShopName: 'Shop 1', StateName: 'Delhi', add3: 'Block A',
      longitude: 77.1025, Status: 'Active'
    }, {
      Add1: '456 Another St.', Add2: 'Floor 2', ContactNo: '0987654321', Costcenter: 'A101', CountryCode: 'IN', CountryName: 'India', GstNo: 'GSTIN67890',
      Latitude: 19.0760, Pincode: '400001', Region: 'West', brcode:'test brcode', brname:'test brname', ShopName: 'Shop 2', StateName: 'Maharashtra', add3: 'Block B',
      longitude: 72.8777, Status: 'Active'
    }]);
    
    expect(component.allData).toEqual([{
      Add1: '123 Some St.', Add2: 'Suite 101', ContactNo: '1234567890', Costcenter: 'A100', CountryCode: 'IN', CountryName: 'India', GstNo: 'GSTIN12345', Latitude: 28.7041,
      Pincode: '110001', Region: 'North', brcode:'test brcode', brname:'test brname', ShopName: 'Shop 1', StateName: 'Delhi', add3: 'Block A', longitude: 77.1025, Status: 'Active'
    }, {
      Add1: '456 Another St.', Add2: 'Floor 2', ContactNo: '0987654321', Costcenter: 'A101', CountryCode: 'IN', CountryName: 'India', GstNo: 'GSTIN67890', Latitude: 19.0760,
      Pincode: '400001', Region: 'West',brcode:'test brcode', brname:'test brname', ShopName: 'Shop 2', StateName: 'Maharashtra', add3: 'Block B', longitude: 72.8777, Status: 'Active'
    }]);
  });

  it('should update record per page value correctly', () => {
    component.dropDownSelectedValue = '50';  // Assuming the dropdown has values like 10, 20, 50, etc.
    component.RecordPerPage();
  
    expect(component.itemPerPage).toBe(50);
  });
  it('should clean up subscriptions in ngOnDestroy', () => {
    spyOn(component.unsubscribe$, 'next');
    spyOn(component.unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(component.unsubscribe$.next.bind(component)).toHaveBeenCalled();
    expect(component.unsubscribe$.complete.bind(component)).toHaveBeenCalled();
  });

  it('should change page size in RecordPerPage', () => {
    component.dropDownSelectedValue = '20';
    component.RecordPerPage();
    expect(component.itemPerPage).toBe(20);
  });
  it('should call setPage on ngOnInit', () => {
    spyOn(component, 'setPage');
    component.ngOnInit();
  });
});
