/**
 * View-binding logic for the timer itself
 */
export class TimerView {
    /**
     * Creates a TimerView and binds the UI to controller events.
     * @param timerController {TimerController}
     */
    constructor(timerController) {
        this._timerController = timerController;
        this._timeDisplay = document.getElementById('counter');
    }

    /**
     * Binds the view to the actual HTML elements of the page.
     */
    bind() {
        this._timerController.addTimeCallback('tv_tick_update', timeRemaining => this._onTick.call(this, timeRemaining)) //TODO
    }

    /**
     * Updates the HTML counter text in minutes:seconds format.
     * @param timeRemaining {int}
     */
    _onTick(timeRemaining) {
        const minutes = parseInt(timeRemaining / 60);
        const seconds = (timeRemaining % 60).toString().padStart(2, "0");
        const timeString = minutes + ":" + seconds;
        this._timeDisplay.textContent = timeString;
    }
}