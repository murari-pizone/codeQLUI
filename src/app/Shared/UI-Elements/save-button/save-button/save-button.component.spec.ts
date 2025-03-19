import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveButtonComponent } from './save-button.component';
import { Router } from '@angular/router';
import { ButtonConstants } from '../const/button.constant';


describe('SaveButtonComponent', () => {
  let component: SaveButtonComponent;
  let fixture: ComponentFixture<SaveButtonComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockButtonConstants: ButtonConstants;

  beforeEach(async () => {
    // Mock the Router to test navigation
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockButtonConstants = { syncMenu: 'sync' , deshboard: 'string' };

    await TestBed.configureTestingModule({

      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ButtonConstants, useValue: mockButtonConstants }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the SaveButtonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have default inputs as empty strings', () => {
    expect(component.name).toBe('');
    expect(component.navigate).toBe('');
  });

  it('should set name input property correctly', () => {
    component.name = 'Save';
    expect(component.name).toBe('Save');
  });

  it('should set navigate input property correctly', () => {
    component.navigate = 'sync';
    expect(component.navigate).toBe('sync');
  });

  it('should not call router.navigate when navigate is empty', async () => {
    component.navigate = '';
    await component.toNavigate();

    expect(mockRouter.navigate.bind(mockRouter)).not.toHaveBeenCalled();
  });

  it('should not call router.navigate when navigate does not match the constant', async () => {
    component.navigate = 'otherMenu';
    await component.toNavigate();

    expect(mockRouter.navigate.bind(mockRouter)).not.toHaveBeenCalled();
  });

  it('should call router.navigate with the correct path when navigate matches the constant', async () => {
    component.navigate = 'sync';
    await component.toNavigate();

    expect(mockRouter.navigate.bind(mockRouter)).toHaveBeenCalledOnceWith(['/' + mockButtonConstants.syncMenu]);
  });

  it('should call router.navigate only if navigate matches syncMenu and is not empty', async () => {
    component.navigate = mockButtonConstants.syncMenu;
    await component.toNavigate();

    expect(mockRouter.navigate.bind(mockRouter)).toHaveBeenCalledOnceWith(['/' + mockButtonConstants.syncMenu]);
  });

  it('should not call router.navigate if navigate is falsy', async () => {
    component.navigate = 'null';
    await component.toNavigate();

    expect(mockRouter.navigate.bind(mockRouter)).not.toHaveBeenCalled();
  });

  it('should handle edge cases in the toNavigate method (undefined)', async () => {
    component.navigate = 'undefined';
    await component.toNavigate();

    expect(mockRouter.navigate.bind(mockRouter)).not.toHaveBeenCalled();
  });

  it('should navigate to the correct path when navigate matches syncMenu', async () => {
    // Arrange
    const mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    
    // Provide a string for deshboard
    const mockButtonConstants: ButtonConstants = { 
      syncMenu: 'syncMenu', 
      deshboard: 'dashboard'  // Ensure this is a string and not undefined
    };
  
    // Initialize the component with properly typed parameters
    const component = new SaveButtonComponent(mockRouter, mockButtonConstants);
  
    component.navigate = 'syncMenu'; // Set the navigate input to match syncMenu constant
  
    // Act
    await component.toNavigate();  // Call the method that contains the line of code
  
    // Assert
    expect(mockRouter.navigate.bind(mockRouter)).toHaveBeenCalledWith(['/syncMenu']); // Ensure router.navigate was called with the correct path
  });
  
  
  
});
