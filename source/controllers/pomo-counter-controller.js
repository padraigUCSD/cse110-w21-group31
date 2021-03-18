/**
 * Enum of stages of the Pomodoro cycle
 * @readonly
 * @enum {string}
 */
export const Stages = {
  POMO: 'pomo',
  BREAK: 'break',
  LONG_BREAK: 'long_break',
}

const POMO_LENGTH_SEC = 25 * 60; // 25 minutes
const BREAK_LENGTH_SEC = 5 * 60; // 5 minutes
const LONG_BREAK_LENGTH_SEC = 30 * 60; // 30 minutes
const LONG_BREAK_ALLOW_SKIP_SEC = 15 * 60; // 15 minutes

const POMOS_PER_LONG_BREAK = 4; // number of consecutive pomos before starting a long break

/**
 * Tracks the current stage of the pomodoro process, and the number of consecutive pomos completed.
 */
export class PomoCounterController {
  /**
   * Create a PomoCounterController
   * @param {TimerController} timerController - the source of wall-clock time
   * @param {NotificationController} notificationController - plays sounds when events happen
   */
  constructor(timerController, notificationController) {
    this._timerController = timerController;
    this._notificationController = notificationController;
    this._stage = Stages.POMO;
    this._currentPomo = 1;
    this._skippable = false;
    this._skippableCallbacks = {};
    this._changeStageCallbacks = {};
    this._changePomosCallbacks = {};

    this.autoBreak = false;
    this.autoPomo = false;
  }

  /**
   * Starts the Pomodoro cycle
   */
  start() {
    this._currentPomo = 1;
    this._stage = Stages.POMO;
    this._timerController.set(POMO_LENGTH_SEC);
    this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
  }

  /**
   * Manually skips a long break if the minimum amount of time has passed.
   */
  skipLongBreak() {
    if (this._stage !== Stages.LONG_BREAK) {
      throw new Error('Not in a long break, unable to skip');
    }
    if (!this._skippable) {
      throw new Error('Minimum long break time has not passed, unable to skip');
    }

    this._timerController.set(Number(0));

    this._advance();
  }

  /**
   * Registers a callback to be called when a long break is allowed or disallowed to be skipped
   * @param id {string} unique ID to refer to this callback
   * @param callback {function(boolean)} called with true if skipping is allowed, or false if skipping is not allowed
   * @returns {function(): boolean} call to clear the callback
   */
  addSkippableCallback(id, callback) {
    this._skippableCallbacks[id] = callback;
    return () => delete this._skippableCallbacks[id];
  }

  /**
   * Registers a callback to be called when a stage is changed
   * @param {string} id unique ID to refer to this callback
   * @param {function(boolean)} callback called with true if we need to change the stage
   * @return {function(): boolean} call to clear the callback
   */
  addChangeStageCallback(id, callback) {
    this._changeStageCallbacks[id] = callback;
    return () => delete this._changeStageCallbacks[id];
  }

  /**
   * Registers a callback to be called when a pomo is changed
   * @param {string} id unique ID to refer to this callback
   * @param {function(boolean)} callback called with true if we need to change the pomo
   * @return {function(): boolean} call to clear the call back
   */
  addChangePomoCallback(id, callback) {
    this._changePomosCallbacks[id] = callback;
    return () => delete this._changePomosCallbacks[id];
  }

  /**
   * Sets the current stage of the Pomodoro cycle
   * @param {Stages} stage determine which stage to change to correct color
   * @private
   */
  _setStage(stage) {
    this._stage = stage;
    for (const callback of Object.values(this._changeStageCallbacks)) {
      callback(stage);
    }
  }

  /**
   * Sets the current Pomodoro (of 4) of the 100-minute Pomodoro cycle
   * @param {int} currentPomo current pomo counter
   * @private
   */
  _setPomo(currentPomo) {
    this._currentPomo = currentPomo;
    for (const callback of Object.values(this._changePomosCallbacks)) {
      callback(this._stage, currentPomo);
    }
  }

  /**
   * Sets whether the current long break can be skipped or not, and notify callbacks
   * @param skippable true to allow the long break to be skipped, false to disallow
   * @private
   */
  _setSkippable(skippable) {
    this._skippable = skippable;
    for (const callback of Object.values(this._skippableCallbacks)) {
      callback(skippable);
    }
  }

  /**
   * Advances the cycle to the next stage, i.e. pomo to break or long break,
   * and break or long break to pomo.
   * @private
   */
  _advance() {
    switch (this._stage) {
      case Stages.POMO:
        if (this._currentPomo === POMOS_PER_LONG_BREAK) {
          this._setStage(Stages.LONG_BREAK);

          // pause right before state change if AutoBreak disabled
          if (!this.autoBreak) {
            this._timerController.pause();
          }

          // state change, play alarm
          this._notificationController.playSound();

          // do NOT advance a move moving from pomo to break
          this._setPomo(this._currentPomo);
          this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
          this._deleteTimeCB = this._timerController.addTimeCallback('pcc', t => this._checkSkippable.call(this, t));
          this._timerController.set(LONG_BREAK_LENGTH_SEC);
        } else {
          this._setStage(Stages.BREAK);

          // pause right before state change if AutoBreak disabled
          if (!this.autoBreak) {
            this._timerController.pause();
          }

          // state change, play alarm
          this._notificationController.playSound();

          // do NOT advance a move moving from pomo to break
          this._setPomo(this._currentPomo);
          this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
          this._timerController.set(BREAK_LENGTH_SEC);
        }
        break;

      case Stages.BREAK:
        this._setStage(Stages.POMO);

        // pause right before state change if AutoPomo disabled
        if (!this.autoPomo) {
          this._timerController.pause();
        }

        // state change, play alarm
        this._notificationController.playSound();

        // advance a pomo moving from break to pomo
        this._setPomo(this._currentPomo + 1);
        this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
        this._timerController.set(POMO_LENGTH_SEC);
        break;

      case Stages.LONG_BREAK:
        this._setSkippable(false);
        this._setStage(Stages.POMO);

        // pause right before state change if AutoPomo disabled
        if (!this.autoPomo) {
          this._timerController.pause();
        }

        // state change, play alarm
        this._notificationController.playSound();
        this._setPomo(Number(1));
        this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
        this._deleteTimeCB();
        this._timerController.set(POMO_LENGTH_SEC);
        break;

      default:
        throw new Error(`unable to advance, invalid stage ${this._stage}`);
    }
  }

  /**
   * Callback to check time on the timer, and unlock the "skip long break" functionality after 15 minutes.
   * @param time {number} Time left on the timer
   * @private
   */
  _checkSkippable(time) {
    if (time <= LONG_BREAK_LENGTH_SEC - LONG_BREAK_ALLOW_SKIP_SEC) {
      this._setSkippable(true);
    }
  }
}
