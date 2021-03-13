const MS_PER_SECOND = 1000;

/**
 * Provides wall-clock time, and callbacks for timed events
 */
export class TimerController {
  /**
   * Creates a TimerController
   */
  constructor() {
    this._timeRemaining = 0;
    this._timeCallbacks = {};
    this._alarmCallbacks = {};
    this._isPaused = false;
  }

  /**
   * Registers a callback to be called once a second, on every tick of the timer
   * @param id - unique ID to refer to this callback
   * @param callback - callback to be run every second
   * @returns {function(): boolean} - call to clear the callback
   */
  addTimeCallback(id, callback) {
    this._timeCallbacks[id] = callback;
    return () => delete this._timeCallbacks[id];
  }

  /**
   * Registers a callback to be called when the timer reaches 0
   * @param id - unique ID to refer to this callback
   * @param callback - callback to be run when the timer reaches 0
   * @returns {function(): boolean} - call to clear the callback
   */
  addAlarmCallback(id, callback) {
    this._alarmCallbacks[id] = callback;
    return () => delete this._alarmCallbacks[id];
  }

  /**
   * Clears specified callback which was called on every tick of the timer
   */
  deleteTimeCallback(id) {
    delete this._timeCallbacks[id];
  }

  /**
   * Sets the timer (and its display) to some number of seconds
   * @param timeSeconds - time in seconds
   */
  set(timeSeconds) {
    clearInterval(this._ticker);
    this._timeRemaining = timeSeconds;
    for (const callback of Object.values(this._timeCallbacks)) {
      callback(this._timeRemaining);
    }
    this._ticker = setInterval(() => this._tick.call(this), MS_PER_SECOND);
  }

  /**
   * Called every second to decrement the timer and fire callbacks
   * @private
   */
  _tick() {
    if (!this._isPaused) {
      this._timeRemaining--;
      for (const callback of Object.values(this._timeCallbacks)) {
        callback(this._timeRemaining);
      }
      if (this._timeRemaining === 0) {
        clearInterval(this._ticker);
        for (const callback of Object.values(this._alarmCallbacks)) {
          callback();
        }
      }
    }
  }

  /**
   * Pause the clock (only used for toggling AutoBreak/AutoPomo)
   */
  pause() {
    this._isPaused = true;
  }

  /**
   * Resume the clock (only used for toggling AutoBreak/AutoPomo)
   */
  resume() {
    this._isPaused = false;
  }
}
