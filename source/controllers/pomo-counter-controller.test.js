import { TimerController } from './timer-controller.js';
import { PomoCounterController, Stages } from './pomo-counter-controller.js';
import { NotificationController } from './notification-controller.js';

const timer = new TimerController();
const notif = new NotificationController();
const counter = new PomoCounterController(timer, notif);

test('Counter starts in a pomo', () => {
  // Assertions
  expect(counter._stage).toBe(Stages.POMO);
})

test('constructor works properly', () => {
  // Assertions
  expect(counter._timerController).toBe(timer);
  expect(counter._notificationController).toBe(notif);
  expect(counter._stage).toBe(Stages.POMO);
  expect(counter._currentPomo).toBe(Number(1));
  expect(counter._skippable).toBe(false);
})

test('Counter advances to a break', () => {
  // Setup
  counter._advance();

  // Assertions
  expect(counter._stage).toBe(Stages.BREAK);

  // should be 1 because we have not started the 2nd pomo yet
  expect(counter._currentPomo).toBe(Number(1));
})

test('Counter advances to a pomo', () => {
  // Setup
  counter._advance();

  // Assertions
  expect(counter._stage).toBe(Stages.POMO);
  expect(counter._currentPomo).toBe(Number(2));
})

test('Counter advances to a second break', () => {
  // Setup
  counter._advance();

  // Assertions
  expect(counter._stage).toBe(Stages.BREAK);
  expect(counter._currentPomo).toBe(Number(2));

  function slbErr() {
    counter.skipLongBreak();
  }

  expect(slbErr).toThrowError(/^Not in a long break, unable to skip$/);
})

test('After 4 pomos, transitions to a longer break', () => {
  // Setup
  const numAdvances = 4; // 6;
  for (let i = 0; i < numAdvances; i++) {
    counter._advance();
  }

  // Assertions
  expect(counter._stage).toBe(Stages.LONG_BREAK);
  // testing that all traits of a long break are true
  expect(counter._currentPomo).toBe(Number(4));

  // should not be able to skipLongBreak if not in a long break
  function slbErr() {
    counter.skipLongBreak();
  }

  expect(slbErr).toThrowError(/^Minimum long break time has not passed, unable to skip$/);
})

describe('checkSkippable', () => {
  test('30 minutes', () => {
    counter._checkSkippable(30 * 60);
    expect(counter._skippable).toBe(false);
  });

  test('15 minutes + 1 sec', () => {
    counter._checkSkippable(15 * 60 + 1);
    expect(counter._skippable).toBe(false);
  });

  test('15 minutes', () => {
    counter._checkSkippable(15 * 60);
    expect(counter._skippable).toBe(true);
  });

  test('0 seconds', () => {
    counter._checkSkippable(0);
    expect(counter._skippable).toBe(true);
  });
})

test('set skippable true', () => {
  // Setup
  const skip = true;
  counter._setSkippable(skip);

  // Assertions
  expect(counter._skippable).toBe(true);
})

test('set skippable false', () => {
  // Setup
  const skip = false;
  counter._setSkippable(skip);

  // Assertions
  expect(counter._skippable).toBe(false);
})

test('start works properly', () => {
  // Setup
  counter.start();

  // Assertions
  expect(counter._stage).toBe(Stages.POMO);
  expect(counter._currentPomo).toBe(Number(1));
  expect(counter._skippable).toBe(false);
})
