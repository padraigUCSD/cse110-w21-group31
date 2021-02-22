import { TimerController } from './timer-controller.js';
import { PomoCounterController, Stages } from './pomo-counter-controller.js';

const timer = new TimerController();
const counter = new PomoCounterController(timer);

test('Counter starts in a pomo', () => {
  // Assertions
  expect(counter._stage).toBe(Stages.POMO);
})

test('constructor works properly', () => {
  // Assertions
  expect(counter._timerController).toBe(timer); 
  expect(counter._stage).toBe(Stages.POMO);
  expect(counter._currentPomo).toBe(Number(1));
  expect(counter._skippable).toBe(false);
})

test('Counter advances to a break', () => {
  // Setup
  counter._advance();

  // Assertions
  expect(counter._stage).toBe(Stages.BREAK);

  //should be 1 because we have not started the 2nd pomo yet
  //todo


})

test('Counter advances to 2nd break', () => {
  //Setup 
  counter._advance();
  counter._advance();

  //Assertions
  expect(counter.stage).toBe(Stages.BREAK);

  //should be 2 now that we have advances
  //todo

})

test('After 4 pomos, transitions to a longer break', () => {
  // Setup
  const numAdvances = 5; //6;
  for (let i = 0; i < numAdvances; i++) {
    counter._advance();
  }

  // Assertions
  expect(counter._stage).toBe(Stages.LONG_BREAK);
  //testing that all traits of a long break are true
  expect(counter._currentPomo).toBe(Number(4));

  
})


test ('allowSkip', () => {
  //S
  counter._allowSkip();
  
  //A
  expect(counter._skippable).toBe(true);
  //T
})

/*
test ('set skippable true', () => {
  //S
  var skip = true;
  counter._setSkippable(true);
  
  //A

  //T
})
*/