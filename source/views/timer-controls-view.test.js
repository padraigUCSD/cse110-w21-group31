import { TimerControlsView } from './timer-controls-view.js';
import { PomoCounterController } from '../controllers/pomo-counter-controller.js';


test('Start hides', () => {
  const counter = new PomoCounterController();
  const timerControl = new TimerControlsView(counter);
  timerControl._onStartPressed(new Event(onclick));
  // Assertions
  expect(timerControl._startButton.style.visibility).toBe('hidden');
})
