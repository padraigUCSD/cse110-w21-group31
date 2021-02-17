import { TimerController } from './controllers/timer-controller.js';
import { PomoCounterController } from './controllers/pomo-counter-controller.js';
import { TimerControlsView } from './views/timer-controls-view.js';

const timerController = new TimerController();
const pomoCounterController = new PomoCounterController(timerController);
pomoCounterController.start();

const timerControlsView = new TimerControlsView(pomoCounterController);
timerControlsView.bind();