import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
  });

  // Test Case 1: Valid Date Input with 'Date' conversion type
  it('should format the date correctly when convertTo is "Date"', () => {
    const inputDate = '2024-10-15T10:30:00';  // ISO format string
    const result = pipe.transform(inputDate, 'Date');
    expect(result).toBe('15 Oct, 2024');
  });

  // Test Case 2: Valid Date Input with 'Time' conversion type
  it('should format the time correctly when convertTo is "Time"', () => {
    const inputDate = '2024-10-15T10:30:00';  // ISO format string
    const result = pipe.transform(inputDate, 'Time');
    expect(result).toBe('10:30 AM');
  });

  // Test Case 3: Invalid Date Input (undefined or incorrect format)
  it('should return an empty string when the input date is invalid', () => {
    const result = pipe.transform(undefined, 'Date');
    expect(result).toBe('');

    const result2 = pipe.transform('invalid-date', 'Date');
    expect(result2).toBe('');
  });

  // Test Case 4: No 'convertTo' argument provided
it('should return the input value if no convertTo argument is provided', () => {
  const result = pipe.transform('2024-10-15T10:30:00');
  expect(result).toBe('2024-10-15T10:30:00'); // Should return the original value as no convertTo argument is provided
});

  // Test Case 5: Empty String as Input
  it('should return an empty string if the input value is an empty string', () => {
    const result = pipe.transform('', 'Date');
    expect(result).toBe('');
  });

  // Test Case 6: Ensure pipe works with both date and time formats (handling both cases)
  it('should return the correct date format', () => {
    const inputDate = '2024-10-15T10:30:00';
    const result = pipe.transform(inputDate, 'Date');
    expect(result).toBe('15 Oct, 2024');
  });

  it('should return the correct time format', () => {
    const inputDate = '2024-10-15T10:30:00';
    const result = pipe.transform(inputDate, 'Time');
    expect(result).toBe('10:30 AM');
  });
});
