import { Stages } from '../controllers/pomo-counter-controller.js';

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
    this._startButton = document.getElementById('control');
    this._transitionButton = document.getElementById('transition-btn');
    this._stageIndicator = document.getElementById('stage-indicator');
  }

  /**
   * Binds the view to the actual HTML elements of the page.
   */
  bind() {
    this._pomoCounterController.addSkippableCallback('tcv_display_button', skippable => this._onSkippableChanged.call(this, skippable))
    this._skipButton.onclick = e => this._onSkipPressed.call(this, e);
    this._startButton.onclick = e => this._onStartPressed.call(this, e);

    this._pomoCounterController.addChangeStageCallback('tcv_display_transition_button', () => this._onStageChanged.call(this))
    this._transitionButton.onclick = e => this._onTransitionPressed.call(this, e);
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

  /**
   * Called when the start button is pressed, to start the pomo process
   * This includes starting the PomoCounterController.
   * @param e {Event}
   * @private
   */
  _onStartPressed(e) {
    e.preventDefault();
    // controller only starts cycle onClick
    this._pomoCounterController.start();
    this._startButton.style.visibility = 'hidden';
  }

  /**
   * Called when the stage button is pressed, to show the transition button if allowed,
   * and change the text content of the stageIndicator
   * @private
   */
  _onStageChanged() {
    // work around for presenting Stages.LONG_BREAK as long_break
    if (this._pomoCounterController._stage === Stages.LONG_BREAK) {
      this._stageIndicator.innerText = 'stage: long break';
    } else {
      this._stageIndicator.innerText = `stage: ${this._pomoCounterController._stage}`;
    }

    if (this._pomoCounterController._stage === Stages.POMO && this._pomoCounterController._allowAutoPomo === false) {
      this._transitionButton.style.visibility = 'visible';
    } else if (this._pomoCounterController._stage === Stages.BREAK && this._pomoCounterController._allowAutoBreak === false) {
      this._transitionButton.style.visibility = 'visible';
    } else if (this._pomoCounterController._stage === Stages.LONG_BREAK && this._pomoCounterController._allowAutoBreak === false) {
      this._transitionButton.style.visibility = 'visible';
    } else {
      this._transitionButton.style.visibility = 'hidden';
    }
  }

  /**
   * Called when the transition button is pressed, to transition states manually, if enabled.
   * @param e {Event}
   * @private
   */
  _onTransitionPressed(e) {
    e.preventDefault();
    this._pomoCounterController._timerController.resume();
    this._transitionButton.style.visibility = 'hidden';
  }
}
