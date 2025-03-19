import { TestBed } from '@angular/core/testing';
import { GlobalErrorHandler } from './global-error-handler.service';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler],
    });
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log an error to the console when handleError is called', () => {
    const error = new Error('Test error');
    
    // Spy on console.error to check if it is called
    const consoleSpy = spyOn(console, 'error');

    service.handleError(error); // Call the handleError method

    expect(consoleSpy).toHaveBeenCalledWith('An unexpected error occurred:handleglobal error', error);
  });

  it('should log a custom error message when handleError is called with a string', () => {
    const errorMessage = 'Test error message';
    
    // Spy on console.error to check if it is called
    const consoleSpy = spyOn(console, 'error');

    service.handleError(errorMessage); // Call with a string instead of an Error object

    expect(consoleSpy).toHaveBeenCalledWith('An unexpected error occurred:handleglobal error', errorMessage);
  });

  it('should handle undefined errors gracefully', () => {
    // Spy on console.error to check if it is called
    const consoleSpy = spyOn(console, 'error');

    service.handleError(undefined); // Call with undefined error

    expect(consoleSpy).toHaveBeenCalledWith('An unexpected error occurred:handleglobal error', undefined);
  });

  it('should handle null errors gracefully', () => {
    // Spy on console.error to check if it is called
    const consoleSpy = spyOn(console, 'error');

    service.handleError(null); // Call with null error

    expect(consoleSpy).toHaveBeenCalledWith('An unexpected error occurred:handleglobal error', null);
  });

  // Optionally, you can add tests for additional actions like notifying a service or redirecting to an error page
});
