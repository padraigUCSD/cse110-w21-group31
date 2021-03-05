import { TimerController } from './timer-controller.js';

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
  let checker = 0;
  timer.addAlarmCallback('test', () => {
    checker = 2;
  });
  timer.set(2);
  expect(checker).toBe(0);
  await sleep(2_010);
  expect(checker).toBe(2);
});

test('check constructor correctly', () => {
  const timer = new TimerController();

  expect(timer._timeRemaining).toBe(0);
  const expected = {};
  expect(timer._timeCallbacks).toEqual(expected);
  expect(timer._alarmCallbacks).toEqual(expected);
});
