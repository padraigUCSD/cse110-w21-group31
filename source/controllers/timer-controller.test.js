import { TimerController } from './timer-controller.js';
import { jest } from '@jest/globals';

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}

test('Timer can count to 10 seconds', async () => {
  // Setup
  const timer = new TimerController();
  timer.set(2);
  let seconds = 0;

  timer.addTimeCallback('test', () => {
    seconds++;
  });

  await sleep(2_010);

  // Assertions
  expect(seconds).toBe(2);
});

test('check alarm call back in 2s', async () => {
  // Setup
  const timer = new TimerController();
  const alarm = jest.fn();
  timer.addAlarmCallback('test', alarm);
  timer.set(2);
  await sleep(2_010);

  // Assertions
  expect(alarm).ToHaveBeenCalled();
});

test('check constructor correctly', () => {
  const timer = new TimerController();

  expect(timer._timeRemaining).toBe(0);
  const expected = {};
  expect(timer._timeCallbacks).toEqual(expected);
  expect(timer._alarmCallbacks).toEqual(expected);
});
