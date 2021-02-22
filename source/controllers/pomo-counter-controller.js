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
const LONG_BREAK_MIN_LENGTH_SEC = 15 * 60; // 15 minutes
const LONG_BREAK_MAX_EXTENDED_LENGTH_SEC = 15 * 60; // 15 minutes, max amount of time to allow the long break to be extended past LONG_BREAK_MIN_LENGTH_SEC

const POMOS_PER_LONG_BREAK = 4; // number of consecutive pomos before starting a long break

/**
 * Tracks the current stage of the pomodoro process, and the number of consecutive pomos completed.
 */
export class PomoCounterController {
  /**
   * Create a PomoCounterController
   * @param {TimerController} timerController - the source of wall-clock time
   */
  constructor(timerController) {
    this._timerController = timerController;
    this._stage = Stages.POMO;
    this._currentPomo = 1;
    this._skippable = false;
    this._skippableCallbacks = {};
    // eeeee i am #1
    // eeeee i am #2
  }

  /**
   * Starts the Pomodoro cycle
   */
  start() {
    this._currentPomo = 1;
    this._stage = Stages.POMO;
    this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
    this._timerController.set(POMO_LENGTH_SEC);
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
          this._stage = Stages.LONG_BREAK;

          this._timerController.addAlarmCallback('pcc', () => this._allowSkip.call(this));
          this._timerController.set(LONG_BREAK_MIN_LENGTH_SEC);
        } else {
          this._stage = Stages.BREAK;
          this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
          this._timerController.set(BREAK_LENGTH_SEC);
        }
        break;

      case Stages.BREAK:
        this._stage = Stages.POMO;
        this._currentPomo++;
        this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
        this._timerController.set(POMO_LENGTH_SEC);
        break;

      case Stages.LONG_BREAK:
        this._setSkippable(false);
        this._stage = Stages.POMO;
        this._currentPomo = 1;
        this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
        this._timerController.set(POMO_LENGTH_SEC);
        break;

      default:
        throw new Error(`unable to advance, invalid stage ${this._stage}`);
    }
  }

  /**
   * Callback to unlock the "skip long break" functionality after 15 minutes.
   * @private
   */
  _allowSkip() {
    this._setSkippable(true);
    this._timerController.addAlarmCallback('pcc', () => this._advance.call(this));
    this._timerController.set(LONG_BREAK_MAX_EXTENDED_LENGTH_SEC);
  }
}
