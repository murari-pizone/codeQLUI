// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { OrderErrorComponent } from './order-error.component';
// import { of, throwError } from 'rxjs';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { OrderErrorConst } from './const/orderError.const';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';  // Importing HttpClientTestingModule
// import { CommonResponseJson } from '../../../Shared/const/common.constant';
// // import { CustomError } from '../../authentication/login/interface/login-interface';
// import { Sort } from '@angular/material/sort';
// import { ItemData } from '../../sync-menu/management/interface/sync-menu-interface';
// import { orderService } from '../management/service/order-service';

// describe('OrderErrorComponent', () => {
//   let component: OrderErrorComponent;
//   let fixture: ComponentFixture<OrderErrorComponent>;
//   // let popupOpenSpy: jasmine.Spy;
//   let orderErrorService: orderService;
//   // let router: Router;
//   // let httpMock: HttpTestingController; // For mocking HTTP requests

//   // Setup TestBed and mock services
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],  // Importing HttpClientTestingModule to handle HTTP requests
//       providers: [
//         orderService,
//         MatDialog,
//         OrderErrorConst,
//         Router
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(OrderErrorComponent);
//     component = fixture.componentInstance;
//     orderErrorService = TestBed.inject(orderService);
//     router = TestBed.inject(Router);
//     httpMock = TestBed.inject(HttpTestingController);  // Inject HttpTestingController

//   });

//   beforeEach(() => {
//     fixture.detectChanges(); // Trigger ngOnInit lifecycle hook
//   });

//   // Test Case 1: Check Component Initialization
//   it('should initialize with default values', () => {
//     expect(component.syncErrorData).toEqual([]);
//     expect(component.syncErrorDataClone).toEqual([]);
//     expect(component.errorMessage).toBe('');
//   });
  
//   it('should handle successful response and set syncErrorData', () => {
//     const response: CommonResponseJson = {
//       success: 'OK',
//       data: [],
//       message : 'success fully connected',
//       statusCode : 200,
//       pagination:{
//         pageSize: 0,
//         totalItems: 0,
//         currentPage: 0
//       }
//     };

//     // Spy on the getOrderError method and mock its return value
//     spyOn(orderErrorService, 'getOrderError').and.callFake(() => of(response));

//     // Call the method
//     component.getSyncError();

//     // Verify that syncErrorData and syncErrorDataClone are updated
//     expect(component.syncErrorData).toEqual(response.data);
//     expect(component.syncErrorDataClone).toEqual(response.data);
//     expect(component.loadingSpinner).toBeFalse();  // Spinner should be set to false
//   });

//   it('should handle "Incorrect password." error message correctly', () => {
//     const error = { customMessage: 'Incorrect password.'};

//     // Spy on the getOrderError method and mock its error
//     spyOn(orderErrorService, 'getOrderError').and.callFake(() => throwError(() => error));

//     // Call the method
//     component.getSyncError();

//     // Verify that the error message is set
//     expect(component.isErrorOccur).toBeTrue();
//     expect(component.errorMessage).toBe('Incorrect password.');
//     expect(component.loadingSpinner).toBeFalse();  // Spinner should be set to false
//   });

//   it('should call getSyncError when retry is called', () => {
//     // Arrange
//     spyOn(component, 'getSyncError'); // Spy on the getSyncError method
    
//     // Act
//     component.retry();  // Call the retry method
    
//     // Assert
//     expect(component.getSyncError()).toHaveBeenCalled(); // Verify that getSyncError was called
//   });

//   it('should log sort data to the console', () => {
//     // Arrange
//     const consoleSpy = spyOn(console, 'log'); // Spy on console.log
//     const mockSort: Sort = { active: 'name', direction: 'asc' }; // Mock sort object
  
//     // Act
//     component.sortData(mockSort);
  
//     // Assert
//     expect(consoleSpy).toHaveBeenCalledWith('ero', mockSort); // Verify that console.log was called with the sort data
//   });
  
//   it('should log onPushButtonClick message to the console', () => {
//     // Arrange
//     const consoleSpy = spyOn(console, 'log'); // Spy on console.log
  
//     // Act
//     component.onPushButtonClick();
  
//     // Assert
//     expect(consoleSpy).toHaveBeenCalledWith('onPushButtonClick'); // Verify that console.log was called with the expected message
//   });


  
//   it('should open the popup with correct support data and title', () => {
//     // Arrange: Mock the input data
//     const mockContactData:any = {
//       CategoryId: 'error123',
//       syncTime: '2024-11-20T10:00:00',
//     };

//     // Act: Call the contactSupport method with the mock data
//     component.contactSupport(mockContactData as ItemData);

//     // Assert: Check that popup.open was called with the correct parameters
//     // expect(popupOpenSpy).toHaveBeenCalledWith(SuccessComponent, {
//     //   data: {
//     //     description: 'Were here to help! Please provide the following details to our support team for faster assistance:',
//     //     title: 'Contact Support',
//     //     contactData: {
//     //       ErrorCode: 'error123',
//     //       Timestamp: '2024-11-20T10:00:00',
//     //     }
//     //   }
//     // });
//   });

//   it('should set page number and item per page and set loading spinner true', () => {
//     // Arrange
//     component.page = { pageNumber: 1, itemPerPage: 10,totalItems:10 }; // Mock the current page object
//     // const event = { PageNumber: 2, itemPerPage: 20 }; // Mock event with new page values
  
//     // Spy on the setTimeout used to simulate completion of the service call
//     // spyOn(window, 'setTimeout').and.callFake((fn:any) => fn()); // Call the callback immediately for testing purposes
  
//     // Act
//     // component.setPage(event);
  
//     // Assert
//     expect(component.page.pageNumber).toBe(2); // Ensure page number is updated
//     expect(component.page.itemPerPage).toBe(20); // Ensure itemPerPage is updated
//     expect(component.loadingSpinner).toBe(true); // Ensure spinner is true (loading state)
//   });
  
//   it('should set loading spinner to false after complete', (done) => {
//     // Arrange
//     component.page = { pageNumber: 1, itemPerPage: 10,totalItems:10 }; // Mock the current page object
//     // const event = { PageNumber: 2, itemPerPage: 20 }; // Mock event with new page values
  
//     // Act
//     // component.setPage(event);
  
//     // Use setTimeout to simulate the async behavior
//     setTimeout(() => {
//       // Assert
//       expect(component.loadingSpinner).toBe(false); // Ensure spinner is false after the call
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//       done(); // Signal that the test is complete
//     }, 500); // Use a delay to simulate the async behavior of the service
//   });
  


//   it('should update itemPerPage when dropDownSelectedValue is different from current itemPerPage', () => {
//     // Arrange
//     component.page = { itemPerPage: 10, pageNumber: 1,totalItems:10 }; // Mock the current page object
//     component.dropDownSelectedValue = '20'; // Mock new value from dropdown
  
//     // Act
//     component.RecordPerPage();
  
//     // Assert
//     expect(component.page.itemPerPage).toBe(20); // Ensure itemPerPage is updated to 20
//   });
  
//   it('should not update itemPerPage when dropDownSelectedValue is the same as current itemPerPage', () => {
//     // Arrange
//     component.page = { itemPerPage: 10, pageNumber: 1 ,totalItems:10}; // Mock the current page object
//     component.dropDownSelectedValue = '10'; // Mock same value as itemPerPage
  
//     // Act
//     component.RecordPerPage();
  
//     // Assert
//     expect(component.page.itemPerPage).toBe(10); // Ensure itemPerPage remains unchanged
//   });
  

//   it('should clear the debounce timer if it is already set', () => {
//     // Arrange
//     component.debounceTimer = 0;  // Set a fake debounce timer
    
//     spyOn(window, 'clearTimeout');  // Spy on the clearTimeout function
    
//     // Act
//     component.debounceSearchByCode();  // Call the method

//     // Assert
//     expect(window.clearTimeout).toHaveBeenCalledWith(component.debounceTimer);
//   });

//   it('should not call clearTimeout if debounceTimer is not set', () => {
//     // Arrange
//     component.debounceTimer = undefined;  // No timer set

//     spyOn(window, 'clearTimeout');  // Spy on the clearTimeout function
    
//     // Act
//     component.debounceSearchByCode();  // Call the method

//     // Assert
//     expect(window.clearTimeout).not.toHaveBeenCalled();  // It should not be called
//   });

//   it('should handle "User not found." error message correctly', () => {
//     // const error: any = { customMessage: 'User not found.' };

//     // Spy on the getOrderError method and mock its error
//     // spyOn(orderErrorService, 'getOrderError').and.callFake(() => throwError(() => (error as CustomError)));

//     // Call the method
//     component.getSyncError();

//     // Verify that the error message is set correctly
//     expect(component.isErrorOccur).toBeTrue();
//     expect(component.errorMessage).toBe('User not found.');
//     expect(component.loadingSpinner).toBeFalse();  // Spinner should be set to false
//   });

//   it('should handle any other error message correctly', () => {
//     // const error: any = { customMessage: 'Some unknown error' };

//     // Spy on the getOrderError method and mock its error
//     // spyOn(orderErrorService, 'getOrderError').and.callFake(() => throwError(() => (error as CustomError)));

//     // Call the method
//     component.getSyncError();

//     // Verify that the error message is set correctly
//     expect(component.isErrorOccur).toBeTrue();
//     expect(component.errorMessage).toBe('Some unknown error');
//     expect(component.loadingSpinner).toBeFalse();  // Spinner should be set to false
//   });

//   it('should handle the case where the error customMessage is undefined', () => {
//     // const error: any = { customMessage: undefined };

//     // Spy on the getOrderError method and mock its error
//     // spyOn(orderErrorService, 'getOrderError').and.callFake(() => throwError(() => (error as CustomError)));

//     // Call the method
//     component.getSyncError();

//     // Verify that the error message is set correctly
//     expect(component.isErrorOccur).toBeTrue();
//     expect(component.errorMessage).toBe('');  // No customMessage, so default behavior
//     expect(component.loadingSpinner).toBeFalse();  // Spinner should be set to false
//   });

//   it('should log "changeCalled" when changeCalled is called', () => {
//     // Call the method
//     component.changeCalled();
//   });

//   it('should not throw an error when changeCalled is called', () => {
//     // Ensure no error is thrown when calling the method
//     expect(() => component.changeCalled()).not.toThrow();
//   });

//   // Test Case 2: Test syncItem method
//   it('should change the status of item to "syncing" and then back to "NotSync"', () => {
//     const mockItem = {
//       Icode: 123, // Required property
//       CategoryName: 'Test Category', // Optional property
//       status: 'NotSync', // Optional property
//       Brcode: 456, // Required property
//       MainCategorySortOrder: 1, // Required property
//       CategorySortOrder: 2, // Required property
//     };
//     const index = 0;
//     component.syncErrorData = [mockItem]; // Assign to the syncErrorData array
//     component.syncItem(mockItem, index);

//     // After syncItem is called, status should be 'syncing' initially
//     expect(component.syncErrorData[index].status).toBe('syncing');

//     // After 2 seconds, status should be 'NotSync'
//     setTimeout(() => {
//       expect(component.syncErrorData[index].status).toBe('NotSync');
//     }, 2000);
//   });

//   // Test Case 3: Test changeOrder method
//   it('should toggle sorting order between Ascending and Descending', () => {
//     // Initially, sorting order is 'Descending'
//     expect(component.sortingOrder).toBe('Descending');

//     // Call changeOrder to toggle the sorting order
//     component.changeOrder();
//     expect(component.sortingOrder).toBe('Ascending');

//     // Call changeOrder again to toggle back
//     component.changeOrder();
//     expect(component.sortingOrder).toBe('Descending');
//   });

//   // Test Case 5: Test debounceSearchByCode method
//   it('should call searchByCode after a debounce delay', (done) => {
//     spyOn(component, 'searchByCode').and.callThrough();
//     component.errorCode = 123;

//     // Trigger debounce search by code
//     component.debounceSearchByCode();

//     // Give it time to debounce
//     setTimeout(() => {
//       expect(component.searchByCode()).toHaveBeenCalled();
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//       done();
//     }, 300);
//   });

//   it('should clear previous timer when debounceSearchByCode is called multiple times', () => {
//     spyOn(window, 'clearTimeout'); // Spy on clearTimeout

//     // Call the method twice in quick succession
//     component.debounceSearchByCode();
//     component.debounceSearchByCode();

//     // Check that clearTimeout was called once
//     expect(window.clearTimeout).toHaveBeenCalled();
//   });

//   it('should set a new timer every time debounceSearchByCode is called', () => {
//     spyOn(window, 'setTimeout'); // Spy on setTimeout

//     // Call the method
//     component.debounceSearchByCode();

//     // Check that setTimeout was called once
//     expect(window.setTimeout).toHaveBeenCalled();
//   });

//   it('should call the search function after debounce delay', done => {

//     // Call the method
//     component.debounceSearchByCode();

//     // Set a timeout to verify after debounce delay
//     setTimeout(() => {
//       expect(window.setTimeout).toHaveBeenCalled(); // Ensure setTimeout was called
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//       done(); // Indicate that the test is complete
//     }, 500);
//   });

//   // Test Case 6: Test toggle method
//   it('should toggle between Card and Table views', () => {
//     // expect(component.toggleTableCard).toBe('Card');
//     // component.toggle();
//     // expect(component.toggleTableCard).toBe('Table');
//     // component.toggle();
//     // expect(component.toggleTableCard).toBe('Card');
//   });

//   // Test Case 7: Test syncAllData method
//   it('should show loading spinner when syncAllData is called', () => {
//     component.syncAllData();
//     expect(component.loadingSpinner).toBeTrue();

//     // After the timeout, spinner should be false
//     setTimeout(() => {
//       expect(component.loadingSpinner).toBeFalse();
//     }, 3000);
//   });

//   // it('should handle error response with user not found and set error message', () => {
//   //   const mockError = {
//   //     customMessage: 'User not found.'
//   //   };

//   //   // Spy on the service method and simulate an error response
//   //   // const getOrderErrorSpy = spyOn(orderErrorService, 'getOrderError').and.returnValue(throwError(mockError));

//   //   // Spy on the error handling logic
//   //   const isErrorOccurSpy = spyOnProperty(component, 'isErrorOccur', 'set');
//   //   const errorMessageSpy = spyOnProperty(component, 'errorMessage', 'set');

//   //   // Call the getSyncError method
//   //   component.getSyncError();

//   //   // Simulate the error response from the service
//   //   // getOrderErrorSpy.calls.mostRecent().returnValue.subscribe({
//   //     // error: () => {
//   //     //   // Check if the error message is set correctly for user not found
//   //     //   expect(isErrorOccurSpy).toHaveBeenCalledWith(true);
//   //     //   expect(errorMessageSpy).toHaveBeenCalledWith(mockError.customMessage);

//   //     //   // Ensure loadingSpinner is set to false after the error
//   //     //   expect(component.loadingSpinner).toBeFalse();
//   //     // }
//   //   });
//   // });
  
//   it('should handle error response with incorrect password and set error message', () => {
//     // const mockError = {
//     //   customMessage: 'Incorrect password.'
//     // };

//     // Spy on the service method and simulate an error response
//     // const getOrderErrorSpy = spyOn(orderErrorService, 'getOrderError').and.returnValue(throwError(mockError));

//     // // Spy on the error handling logic
//     // const isErrorOccurSpy = spyOnProperty(component, 'isErrorOccur', 'set');
//     // const errorMessageSpy = spyOnProperty(component, 'errorMessage', 'set');

//     // Call the getSyncError method
//     // component.getSyncError();

//     // Simulate the error response from the service
//     // getOrderErrorSpy.calls.mostRecent().returnValue.subscribe({
//     //   error: () => {
//     //     // Check if the error message is set correctly for incorrect password
//     //     expect(isErrorOccurSpy).toHaveBeenCalledWith(true);
//     //     expect(errorMessageSpy).toHaveBeenCalledWith(mockError.customMessage);

//     //     // Ensure loadingSpinner is set to false after the error
//     //     expect(component.loadingSpinner).toBeFalse();
//     //   }
//     // });
//   });

//   // it('should call changeCalled method when it is invoked', () => {
//   //   // Spy on the changeCalled method
//   //   spyOn(component, 'changeCalled');

//   //   // Call the method (or trigger the event that leads to it)
//   //   component.changeCalled();

//   //   // Verify that changeCalled was called
//   //   expect(component.changeCalled()).toHaveBeenCalled();
//   // });

//   // it('should update page.pageNumber when changePage is called with a valid page number', () => {
//   //   const pageNumber = 3;

//   //   // Call the changePage method
//   //   component.changePage(pageNumber);

//   //   // Verify if page.pageNumber is updated
//   //   expect(component.page.pageNumber).toBe(pageNumber);
//   // });

//   // it('should not update page.pageNumber when changePage is called with an invalid page number', () => {
//   //   const invalidPageNumber:number = 1;  // You can also try undefined or any other invalid value

//   //   // Call the changePage method
//   //   component.changePage(invalidPageNumber);

//   //   // Verify if page.pageNumber is not updated
//   //   expect(component.page.pageNumber).toBeUndefined();  // Assuming the default value is undefined
//   // });
//   // // Test Case 8: Test navigateBack method
//   // it('should navigate back to the dashboard', () => {
//   //   const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();
//   //   component.navigateBack();
//   //   expect(navigateByUrlSpy).toHaveBeenCalledWith('view/dashboard');
//   // });
  

//   // Test Case 9: Test syncError method
//   // it('should update sync status after calling the syncError method', () => {
//   //   const mockIndex = 0;
//   //   component.syncErrorData = [
//   //     { Icode: 123,  // Required property
//   //       CategoryName: 'Test Category',  // Optional property
//   //       status: 'NotSync',  // Optional property
//   //       Brcode: 456,  // Required property
//   //       MainCategorySortOrder: 1,  // Required property
//   //       CategorySortOrder: 2,  // Required property
//   //     },
//   //   ];


    
//     // Mock the getOrderError method to return a mock response
//     // spyOn(orderErrorService, 'getOrderError').and.returnValue(of({
//     //   statusCode: 200,
//     //   data: [{ Icode: 123, CategoryName: 'Test Category', status: 'NotSync' }],
//     //   message: 'Success',
//     //   success: 'OK',
//     // }));

//   //   component.syncError(mockIndex);
//   //   expect(component.syncErrorData[mockIndex].status).toBe('NotSync');

//   //   setTimeout(() => {
//   //     expect(component.syncErrorData[mockIndex].status).toBe('syncing');
//   //   }, 2000);
//   // });

//   // Clean up HTTP mock after each test
//   // afterEach(() => {
//   //   httpMock.verify(); // Ensure there are no outstanding HTTP requests
//   // });
// });
