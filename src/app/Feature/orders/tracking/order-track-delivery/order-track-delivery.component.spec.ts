/* eslint-disable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderTrackDeliveryComponent } from './order-track-delivery.component';
import { Order } from '../interface/trackOrder-interface';
import { SmallMapComponent } from '../small-map/small-map.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('OrderTrackDeliveryComponent', () => {
  let component: OrderTrackDeliveryComponent;
  let fixture: ComponentFixture<OrderTrackDeliveryComponent>;
  const orders: Order[] = [
    {
      id: 1,
      status: 'Delivered',
      customerName: 'John Doe',
      estimatedDelivery: new Date('2024-11-15'),
      driverName: 'Driver 1',
      driverContact: '1234567890',
      timeline: [],
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: 2,
      status: 'En Route',
      customerName: 'Jane Smith',
      estimatedDelivery: new Date('2024-12-01'),
      driverName: 'Driver 2',
      driverContact: '0987654321',
      timeline: [],
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: 3,
      status: 'Out for Delivery',
      customerName: 'Alice Johnson',
      estimatedDelivery: new Date('2024-11-25'),
      driverName: 'Driver 3',
      driverContact: '1122334455',
      timeline: [],
      coordinates: { lat: 51.5074, lng: -0.1278 }
    }
  ];
  beforeEach(async () => {
    // Mocking window.bootstrap globally before the component is created
    const bootstrapMock = {
      Modal: class {
        show = jasmine.createSpy('show');
        hide = jasmine.createSpy('hide');
      }
    };
    window.bootstrap = bootstrapMock as any;
    
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, SmallMapComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(OrderTrackDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should return all orders if filterStatus is "All"', () => {
    component.filterStatus = 'All';
    component.sortBy = 'status';  // We can sort by status to check if it works
    component.applyFilter();

    expect(component.filteredOrders).toEqual(orders);  // Should return all orders
  });

  it('should filter orders by status', () => {
    component.filterStatus = 'Shipped';
    component.sortBy = 'status';  // Sorting by status just to be thorough
    component.applyFilter();

    expect(component.filteredOrders).toEqual([
      {
        id: 2,
        status: 'Order Processed',
        customerName: 'Jane Smith',
        estimatedDelivery: new Date('2024-12-01'),
        driverName: 'Driver 2',
        driverContact: '0987654321',
        timeline: [],
        coordinates: { lat: 34.0522, lng: -118.2437 }
      }
    ]);  // Should only return the order with status 'Shipped'
  });

  it('should sort by status when sortBy is "status"', () => {
    component.filterStatus = 'All';  // No filter applied
    component.sortBy = 'status';  // Sorting by status
    component.applyFilter();

    expect(component.filteredOrders).toEqual([
      {
        id: 2,
        status: 'Order Placed',
        customerName: 'Jane Smith',
        estimatedDelivery: new Date('2024-12-01'),
        driverName: 'Driver 2',
        driverContact: '0987654321',
        timeline: [],
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      {
        id: 3,
        status: 'Out for Delivery',
        customerName: 'Alice Johnson',
        estimatedDelivery: new Date('2024-11-25'),
        driverName: 'Driver 3',
        driverContact: '1122334455',
        timeline: [],
        coordinates: { lat: 51.5074, lng: -0.1278 }
      },
      {
        id: 1,
        status: 'Delivered',
        customerName: 'John Doe',
        estimatedDelivery: new Date('2024-11-15'),
        driverName: 'Driver 1',
        driverContact: '1234567890',
        timeline: [],
        coordinates: { lat: 40.7128, lng: -74.0060 }
      }
    ]);  // The orders should be sorted alphabetically by status
  });

  it('should sort by estimatedDelivery when sortBy is not "status"', () => {
    component.filterStatus = 'All';  // No filter applied
    component.sortBy = 'estimatedDelivery';  // Sorting by estimated delivery
    component.applyFilter();

    expect(component.filteredOrders).toEqual([
      {
        id: 1,
        status: 'Delivered',
        customerName: 'John Doe',
        estimatedDelivery: new Date('2024-11-15'),
        driverName: 'Driver 1',
        driverContact: '1234567890',
        timeline: [],
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: 3,
        status: 'Out for Delivery',
        customerName: 'Alice Johnson',
        estimatedDelivery: new Date('2024-11-25'),
        driverName: 'Driver 3',
        driverContact: '1122334455',
        timeline: [],
        coordinates: { lat: 51.5074, lng: -0.1278 }
      },
      {
        id: 2,
        status: 'Delayed',
        customerName: 'Jane Smith',
        estimatedDelivery: new Date('2024-12-01'),
        driverName: 'Driver 2',
        driverContact: '0987654321',
        timeline: [],
        coordinates: { lat: 34.0522, lng: -118.2437 }
      }
    ]);  // The orders should be sorted by estimated delivery in ascending order
  });
  it('should load orders on initialization', () => {
    const mockOrder: Order = {
      id: 1,
      status: 'Order Placed',
      customerName: 'John Doe',
      driverName: 'Mike Smith',
      driverContact: '+1 555-1234',
      currentLocation: '123 Main St',
      estimatedDelivery: new Date(Date.now() + 60 * 60000),
      timeline: [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 30 * 60000) },
        { status: 'Order Processed', timestamp: '' },
        { status: 'Out for Delivery', timestamp: '' },
        { status: 'Delivered', timestamp: '' },
      ],
      coordinates: { lat: 40.7128, lng: -74.0060 },
    };
    
    spyOn(component, 'createOrder').and.returnValue(mockOrder);
    
    component.ngOnInit();
    expect(component.orders.length).toBe(1);
    expect(component.filteredOrders.length).toBe(1);
  });

  it('should simulate real-time updates on orders', () => {
    const mockOrder: Order = {
      id: 1,
      status: 'Order Placed',
      customerName: 'John Doe',
      driverName: 'Mike Smith',
      driverContact: '+1 555-1234',
      currentLocation: '123 Main St',
      estimatedDelivery: new Date(Date.now() + 60 * 60000),
      timeline: [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 30 * 60000) },
        { status: 'Order Processed', timestamp: '' },
        { status: 'Out for Delivery', timestamp: '' },
        { status: 'Delivered', timestamp: '' },
      ],
      coordinates: { lat: 40.7128, lng: -74.0060 },
    };
    
    component.orders = [mockOrder];
    component.simulateRealTimeUpdates();

    expect(component.orders[0].status).toBe('Order Processed');
  });

  it('should correctly return the next status in the order lifecycle', () => {
    const mockOrderStatus = 'Order Placed';
    const nextStatus = component.getNextStatus(mockOrderStatus);
    
    expect(nextStatus).toBe('Order Processed');
  });

  it('should apply filter and sort orders correctly', () => {
    const mockOrder1: Order = {
      id: 1,
      status: 'Order Placed',
      customerName: 'John Doe',
      driverName: 'Mike Smith',
      driverContact: '+1 555-1234',
      currentLocation: '123 Main St',
      estimatedDelivery: new Date(Date.now() + 60 * 60000),
      timeline: [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 30 * 60000) },
        { status: 'Order Processed', timestamp: '' },
        { status: 'Out for Delivery', timestamp: '' },
        { status: 'Delivered', timestamp: '' },
      ],
      coordinates: { lat: 40.7128, lng: -74.0060 },
    };
    
    const mockOrder2: Order = {
      id: 2,
      status: 'Delivered',
      customerName: 'Jane Doe',
      driverName: 'Sam Brown',
      driverContact: '+1 555-5678',
      currentLocation: '456 Elm St',
      estimatedDelivery: new Date(Date.now() + 120 * 60000),
      timeline: [
        { status: 'Order Placed', timestamp: new Date(Date.now() - 60 * 60000) },
        { status: 'Order Processed', timestamp: '' },
        { status: 'Out for Delivery', timestamp: '' },
        { status: 'Delivered', timestamp: '' },
      ],
      coordinates: { lat: 40.7128, lng: -74.0060 },
    };
    
    component.orders = [mockOrder1, mockOrder2];
    component.filterStatus = 'Delivered';
    component.sortBy = 'status';
    component.applyFilter();
    
    expect(component.filteredOrders.length).toBe(1);
    expect(component.filteredOrders[0].status).toBe('Delivered');
  });

  it('should return the correct color for each order status', () => {
    const statusColors: { [key: string]: string } = {
      'Order Placed': 'bg-teal-500',
      'Order Processed': 'bg-yellow-500',
      'Out for Delivery': 'bg-blue-500',
      'Delivered': 'bg-green-500',
      'Delayed': 'bg-red-500',
    };

    for (const [status, expectedColor] of Object.entries(statusColors)) {
      expect(component.getStatusColor(status)).toBe(expectedColor);
    }
  });

  it('should return the correct icon for each order status', () => {
    const statusIcons: { [key: string]: string } = {
      'Order Placed': 'bi bi-box-seam',
      'Order Processed': 'bi bi-truck',
      'Out for Delivery': 'bi bi-truck',
      'Delivered': 'bi bi-check2-circle',
      'Delayed': 'bi bi-exclamation-circle',
    };

    for (const [status, expectedIcon] of Object.entries(statusIcons)) {
      expect(component.getStatusIcon(status)).toBe(expectedIcon);
    }
  });

  it('should open and close the modal', () => {
    const mockModal = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide'),
    };
    
    component['modal'] = mockModal as any;
    component.openModal();
    expect(mockModal.show).toHaveBeenCalled();
    
    component.closeModal();
    expect(mockModal.hide).toHaveBeenCalled();
  });

  it('should handle ngAfterViewInit without errors', () => {
    const modalElement = document.createElement('div');
    modalElement.id = 'orderTrackId';
    document.body.appendChild(modalElement);
    
    component.ngAfterViewInit();
    expect(component['modal']).toBeDefined();
  });

  it('should handle the case when modal element is not found in ngAfterViewInit', () => {
    const consoleErrorSpy = spyOn(console, 'error');
    
    // Remove the modal element to simulate the error scenario
    const modalElement = document.getElementById('orderTrackId');
    if (modalElement) {
      modalElement.remove();
    }

    component.ngAfterViewInit();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Modal element not found or bootstrap not available!');
  });

  it('should log empty message when empty is called', () => {
    const consoleSpy = spyOn(console, 'log');
    component.empty();
    expect(consoleSpy).toHaveBeenCalledWith('empty');
  });
});
