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
    //this._ticker = setInterval(() => this._tick.call(this), MS_PER_SECOND); //remove to prevent start by default - only controls can start it
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
   * Sets the timer to some number of seconds
   * @param timeSeconds - time in seconds
   */
  set(timeSeconds) {
    this._timeRemaining = timeSeconds;
    clearInterval(this._ticker);
    this._ticker = setInterval(() => this._tick.call(this), MS_PER_SECOND);
  }

  /**
   * Called every second to decrement the timer and fire callbacks
   * @private
   */
  _tick() {
    this._timeRemaining--;
    console.log(this._timeRemaining);
    // TODO HELP!!! - should controller know about view?
    // beware of garbage
    document.getElementById('counter').textContent = this._timeRemaining;
    // end garbage
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
