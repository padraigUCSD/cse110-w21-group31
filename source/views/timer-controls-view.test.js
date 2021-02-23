import { TimerControlsView } from './timer-controls-view.js';
import { PomoCounterController, Stages } from '../source/pomo-counter-controller.js';

const counter = new PomoCounterController(timer);
const timerControl=new TimerControlsView(counter);
test('Start hides', () => {
    timerControl._startButton.click();
    // Assertions
    expect(timerControl._startButton.style.visibility).toBe('hidden');;
  })