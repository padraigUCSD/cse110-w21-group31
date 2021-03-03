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
  const timer = new TimerController();
  let count = 0;
  timer.addAlarmCallback('test', () => {
    count = 2;
  });
  timer.set(2);

  expect(count).toBe(2);
});

test('check constructor correctly', () => {
  const timer = new TimerController();

  expect(timer._timeRemaining).toBe(0);
  expect(timer._timeCallbacks.length).toBe(0);
  expect(timer._alarmCallbacks.length).toBe(0);
});
