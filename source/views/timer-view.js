/**
 * View-binding logic for timer view
 */
export class TimerView {
    /**
     * Creates a TimerView and binds the UI to timer controller 
     * @param timerController {TimerController}
     */
    constructor(timerController) {
      this._timerController = timerController;
      this._timeLabel = document.getElementById('counter');
    }
  
    /**
     * Binds the view to the actual HTML elements of the page.
     */
    bind() {
      //
    }

    ///memes below
    /**
     * Called as the timer ticks, to update what is says.
     * @param e {Event}
     * @private
     */
    _onTickElapsed(e) {
      e.preventDefault();
      this._startButton.textConent = '333';
    }
  }
  
  