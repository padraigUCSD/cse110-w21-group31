import { TimerController } from './timer-controller.js';
import { PomoCounterController, Stages } from './pomo-counter-controller.js';

const timer = new TimerController();
const counter = new PomoCounterController(timer);

test('Counter starts in a pomo', () => {
  // Assertions
  expect(counter._stage).toBe(Stages.POMO);
})

test('Counter advances to a break', () => {
  // Setup
  counter._advance();

  // Assertions
  expect(counter._stage).toBe(Stages.BREAK);
})

test('After 4 pomos, transitions to a longer break', () => {
  // Setup
  const numAdvances = 6;
  for (let i = 0; i < numAdvances; i++) {
    counter._advance();
  }

  // Assertions
  expect(counter._stage).toBe(Stages.LONG_BREAK);
})

//stephen was here 
//padraig was here