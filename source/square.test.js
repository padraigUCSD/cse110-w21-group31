import { square } from './square.js';

describe('Positive numbers', () => {
  test('5 squared is 25', () => {
    expect(square(5)).toBe(25);
  });
  test('3 squared is not 10', () => {
    expect(square(3)).not.toBe(10);
  })
});

describe('Negative numbers', () => {
  test('-1 squared is 1', () => {
    expect(square(-1)).toBe(1);
  })
})
