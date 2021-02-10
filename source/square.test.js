import { square } from './square.js';

test('5 squared is 25', () => {
  expect(square(5)).toBe(25);
});

test('-1 squared is 1', () => {
  expect(square(-1)).toBe(1);
})
