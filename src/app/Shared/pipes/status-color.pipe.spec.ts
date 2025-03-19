import { StatusColorPipe } from './status-color.pipe';

describe('StatusColorPipe', () => {
  let pipe: StatusColorPipe;
  beforeEach(() => {
    pipe = new StatusColorPipe();
  });

  it('create an instance', () => {
    const pipe = new StatusColorPipe();
    expect(pipe).toBeTruthy();
  });
   // Test Case 1: Test 'Cancelled' status
   it('should return "Cancelled" when the status is "Cancelled"', () => {
    expect(pipe.transform('Cancelled')).toBe('Cancelled');
  });

  // Test Case 2: Test 'Pending' status
  it('should return "Pending" when the status is "Pending"', () => {
    expect(pipe.transform('Pending')).toBe('Pending');
  });

  // Test Case 3: Test 'Delivered' status
  it('should return "Delivered" when the status is "Delivered"', () => {
    expect(pipe.transform('Delivered')).toBe('Delivered');
  });

  // Test Case 4: Test 'Dispatched' status
  it('should return "Dispatched" when the status is "Dispatched"', () => {
    expect(pipe.transform('Dispatched')).toBe('Dispatched');
  });

  // Test Case 5: Test 'Confirmed' status
  it('should return "Confirmed" when the status is "Confirmed"', () => {
    expect(pipe.transform('Confirmed')).toBe('Confirmed');
  });

  // Test Case 6: Test 'Initiated' status
  it('should return "Initiated" when the status is "Initiated"', () => {
    expect(pipe.transform('Initiated')).toBe('Initiated');
  });

  // Test Case 7: Test 'Prepared' status
  it('should return "Prepared" when the status is "Prepared"', () => {
    expect(pipe.transform('Prepared')).toBe('Prepared');
  });

  // Test Case 8: Test 'PICKUP' status
  it('should return "Pending" when the status is "PICKUP"', () => {
    expect(pipe.transform('PICKUP')).toBe('Pending');
  });

  // Test Case 9: Test unknown status
  it('should return an empty string when the status is unknown', () => {
    expect(pipe.transform('UnknownStatus')).toBe('');
  });

  // Test Case 10: Test empty string
  it('should return an empty string when the status is an empty string', () => {
    expect(pipe.transform('')).toBe('');
  });
});
