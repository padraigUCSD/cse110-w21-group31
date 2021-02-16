const MS_PER_SECOND = 1000;

/**
 * Provides wall-clock time, and callbacks for timed events
 */
export class TimerController {
  /**
   * Creates a TimerController
   */
  constructor() {
    this.timeCallbacks = {};
    this.alarmCallbacks = {};
    this.timeRemaining = 0;
    this.ticker = setInterval(() => this._tick.call(this), MS_PER_SECOND);
  }

  /**
   * Registers a callback to be called once a second, on every tick of the timer
   * @param id - unique ID to refer to this callback
   * @param callback - callback to be run every second
   * @returns {function(): boolean} - call to clear the callback
   */
  addTimeCallback(id, callback) {
    this.timeCallbacks[id] = callback;
    return () => delete this.timeCallbacks[id];
  }

  /**
   * Registers a callback to be called when the timer reaches 0
   * @param id - unique ID to refer to this callback
   * @param callback - callback to be run when the timer reaches 0
   * @returns {function(): boolean} - call to clear the callback
   */
  addAlarmCallback(id, callback) {
    this.alarmCallbacks[id] = callback;
    return () => delete this.alarmCallbacks[id];
  }

  /**
   * Sets the timer to some number of seconds
   * @param timeSeconds - time in seconds
   */
  set(timeSeconds) {
    this.timeRemaining = timeSeconds;
    clearInterval(this.ticker);
    this.ticker = setInterval(() => this._tick.call(this), MS_PER_SECOND);
  }

  /**
   * Called every second to decrement the timer and fire callbacks
   * @private
   */
  _tick() {
    this.timeRemaining--;
    for (const callback of Object.values(this.timeCallbacks)) {
      callback(this.timeRemaining);
    }

    if (this.timeRemaining === 0) {
      clearInterval(this.ticker);
      for (const callback of Object.values(this.alarmCallbacks)) {
        callback();
      }
    }
  }
}
