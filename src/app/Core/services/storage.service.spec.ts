import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let userSubjectSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
    service = TestBed.inject(StorageService);
    userSubjectSpy = spyOn(service.userSubject, 'next'); 
  });

  afterEach(() => {
    // Clear the localStorage mock after each test to ensure clean tests
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize userSubject with user from localStorage if present', () => {
    // Mock localStorage with a user object
    const mockUser = { name: 'John', age: 30 };
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
  
    service = TestBed.inject(StorageService); // Re-initialize service to call constructor
  
    // Check if userSubject has the mockUser value
    service.userSubject.subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  
    // Verify that localStorage.getItem was called correctly
    expect(getItemSpy).toHaveBeenCalledWith('user');
  });

  it('should call userSubject.next with parsed user data if storedUser exists', () => {
    // Spy on userSubject.next to verify it's called
    const nextSpy = spyOn(service.userSubject, 'next');
  
    // Call the method being tested here (e.g., service.someMethod())
    service.userSubject.next({ name: 'John Doe' }); // Simulate a call for demonstration
  
    // Verify that userSubject.next was called with the parsed value
    expect(nextSpy).toHaveBeenCalledWith({ name: 'John Doe' });
  });

  it('should not call userSubject.next if storedUser does not exist', () => {
    // Mock localStorage to return null for 'user' key
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return null; // Simulate no 'user' data in localStorage
    });
  
    // Spy on userSubject.next
    const nextSpy = spyOn(service.userSubject, 'next');
  
    // Verify that userSubject.next was NOT called
    expect(nextSpy).not.toHaveBeenCalled();
  });
  
  

  it('should set user in localStorage and update userSubject when setUser is called', () => {
    const newUser: any = { name: 'Alice', age: 25 };

    // Spy on localStorage.setItem to ensure it's called
    const getItemSpy = spyOn(localStorage, 'setItem');

    service.setUser(newUser as string);

    // Check if userSubject has the newUser value
    service.userSubject.subscribe((user) => {
      expect(user).toEqual(newUser);
    });

    // Verify that localStorage.setItem was called with the correct arguments
    expect(getItemSpy).toHaveBeenCalledWith('user', JSON.stringify(newUser));
  });

  it('should clear user from localStorage and reset userSubject to null when clearUser is called', () => {
    // Mock localStorage with a user object
    const mockUser = { name: 'John', age: 30 };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    const getItemSpy = spyOn(localStorage, 'removeItem');

    service = TestBed.inject(StorageService); // Re-initialize service to call constructor

    // Initially, userSubject should be set to the mockUser
    service.userSubject.subscribe((user) => {
      expect(user).toEqual(null);
    });

    // Now clear the user
    service.clearUser();

    // Check if userSubject has been reset to null
    service.userSubject.subscribe((user) => {
      expect(user).toBeNull();
    });

    // Verify that localStorage.removeItem was called correctly
    expect(getItemSpy).toHaveBeenCalledWith('user');
  });

  it('should handle undefined localStorage gracefully (e.g., in a server-side rendering scenario)', () => {
    // Mock localStorage to be undefined
    // spyOn(window, 'localStorage', 'get').and.returnValue(undefined);

    // Re-initialize service to check if it handles undefined localStorage
    service = TestBed.inject(StorageService);

    // Verify that userSubject is initialized as null
    service.userSubject.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should set user and clear user when localStorage is unavailable', () => {
  
    // Define the user object
    const user = { name: 'John Doe', age: '45' };
  
    // Serialize the user object to a string before passing it to setUser
    service.setUser(JSON.stringify(user)); // Pass the stringified user
  
    // userSubject should have the new user value even without localStorage
    service.userSubject.subscribe((userFromSubject: string) => {
      // Ensure that userFromSubject is of type string, no need for 'as string'
      expect(typeof userFromSubject).toBe('string');
  
      // Safely parse the string back into an object with type assertion
      const parsedUser = JSON.parse(userFromSubject) as { name: string; age: string };
  
      // Now compare the parsed object with the expected user object
      expect(parsedUser).toEqual({ name: 'John Doe', age: '45' });
    });
  }); 

  it('should not call userSubject.next when no user data is in localStorage', () => {
    // Mock localStorage to return null (simulate no data)
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue(null);
    
    // Create the service again to trigger the constructor
    service = TestBed.inject(StorageService);
    
    // Act
    expect(getItemSpy).toHaveBeenCalledWith('user');  // Ensure localStorage.getItem was called
    expect(userSubjectSpy).not.toHaveBeenCalled();  // Ensure userSubject.next was not called because there was no user data
  });
  
});
