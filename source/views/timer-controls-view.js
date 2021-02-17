/**
 * View-binding logic for timer controls such as buttons
 */
export class TimerControlsView {
  /**
   * Creates a TimerControlsView and binds the UI to controller events
   * @param pomoCounterController {PomoCounterController}
   */
  constructor(pomoCounterController) {
    this._pomoCounterController = pomoCounterController;
    this._skipButton = document.getElementById('skip-long-break-btn');
    //
    this._startButton = document.getElementById('control');
    //
  }

  /**
   * Binds the view to the actual HTML elements of the page.
   */
  bind() {
    this._pomoCounterController.addSkippableCallback('tcv_display_button', skippable => this._onSkippableChanged.call(this, skippable))
    this._skipButton.onclick = e => this._onSkipPressed.call(this, e);
    //
    this._startButton.onclick = e => this._onStartPressed.call(this, e);
    //
  }

  /**
   * Called when a long break becomes skippable, or unskippable, in order to show or hide the skip button.
   * @param skippable {boolean}
   * @private
   */
  _onSkippableChanged(skippable) {
    this._skipButton.style.visibility = skippable ? 'visible' : 'hidden';
  }

  /**
   * Called when the skip button is pressed, to skip the long break.
   * @param e {Event}
   * @private
   */
  _onSkipPressed(e) {
    e.preventDefault();
    this._pomoCounterController.skipLongBreak();
  }

  //memes below
  /**
   * Called when the start button is pressed, to start the pomo process
   * @param e {Event}
   * @private
   */
  _onStartPressed(e) {
    e.preventDefault();
    this._pomoCounterController.start(); //!!!controller only starts cycle onClick!!!
    this._startButton.style.visibility = 'hidden';
  }
}
