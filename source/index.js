import { TimerController } from './controllers/timer-controller.js';
import { PomoCounterController } from './controllers/pomo-counter-controller.js';
import { TimerControlsView } from './views/timer-controls-view.js';
import { TimerView } from './views/timer-view.js';

const timerController = new TimerController();
const pomoCounterController = new PomoCounterController(timerController);
//pomoCounterController.start(); - dont start by default

const timerControlsView = new TimerControlsView(pomoCounterController);
timerControlsView.bind();
