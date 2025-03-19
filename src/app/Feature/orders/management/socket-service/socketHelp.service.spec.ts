import { TestBed } from '@angular/core/testing';
import { SocketHelpService } from './socketHelpService';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';

describe('SocketHelpService', () => {
  let service: SocketHelpService;
  let mockSocket: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    // Create a mock Socket service
    mockSocket = jasmine.createSpyObj<Socket>('Socket', ['fromEvent', 'emit']);

    TestBed.configureTestingModule({
      providers: [
        SocketHelpService,
        { provide: Socket, useValue: mockSocket }
      ]
    });
    service = TestBed.inject(SocketHelpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onNewData', () => {
    it('should listen for "dataUpdate" event', () => {
      const mockData = { key: 'value' };
      // Mocking the behavior of fromEvent to return an observable with mockData
      mockSocket.fromEvent.and.returnValue(of(mockData));

      service.onNewData().subscribe((data) => {
        expect(data).toEqual(mockData); // Verifying that the emitted data matches mockData
      });

      // Assert that fromEvent was called with the correct event name
      expect(mockSocket.fromEvent.bind(mockSocket)).toHaveBeenCalledWith('dataUpdate');
    });
  });

  describe('emitInitial', () => {
    it('should emit an "initialData" event with correct message', () => {
      // Call emitInitial method
      service.emitInitial();

      // Assert that the emit method was called with correct parameters
      expect(mockSocket.emit.bind(mockSocket)).toHaveBeenCalledWith('initialData', { message: 'Client connected' });
    });
  });
});
