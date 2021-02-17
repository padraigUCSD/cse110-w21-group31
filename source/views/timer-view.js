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
  }
  
  