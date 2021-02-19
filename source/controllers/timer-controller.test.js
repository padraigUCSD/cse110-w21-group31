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
})
