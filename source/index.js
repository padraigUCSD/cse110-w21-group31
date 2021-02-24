import { TimerController } from './controllers/timer-controller.js';
import { NotificationController } from './controllers/notification-controller.js';
import { PomoCounterController } from './controllers/pomo-counter-controller.js';
import { TimerControlsView } from './views/timer-controls-view.js';
import { TimerView } from './views/timer-view.js';
import { BackgroundColorView } from './views/background-color-view.js';
import { PomoCycleView } from './views/pomo-cycle-view.js';
import { SettingsView } from './views/settings-view.js';

const timerController = new TimerController();
const notificationController = new NotificationController();
const pomoCounterController = new PomoCounterController(timerController, notificationController);

const timerView = new TimerView(timerController);
timerView.bind();

const timerControlsView = new TimerControlsView(pomoCounterController);
timerControlsView.bind();

const backgroundColorView = new BackgroundColorView(pomoCounterController);
backgroundColorView.bind();

const pomoCycleView = new PomoCycleView(pomoCounterController);
pomoCycleView.bind();

const settingsView = new SettingsView(pomoCounterController, notificationController);
settingsView.bind();