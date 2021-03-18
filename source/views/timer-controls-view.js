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
    this._startButton.style.visibility = 'visible';
    this._pomoCounterController.addSkippableCallback('tcv_display_button', skippable => this._onSkippableChanged.call(this, skippable))
    this._skipButton.onclick = e => this._onSkipPressed.call(this, e);
    this._startButton.onclick = e => this._onStartPressed.call(this, e);

    this._pomoCounterController.addChangeStageCallback('tcv_display_transition_button', stage => this._onStageChanged.call(this, stage))
    this._transitionButton.onclick = e => this._onTransitionPressed.call(this, e);

    // Add keyboard shortcut for buttons
    document.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        // Find the currently visible button and call its callback
        if (this._skipButton.style.visibility === 'visible') {
          this._onSkipPressed(e);
        } else if (this._startButton.style.visibility === 'visible') {
          this._onStartPressed(e);
        } else if (this._transitionButton.style.visibility === 'visible') {
          this._onTransitionPressed(e);
        }
      }
    })
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
   * @param {Stages} stage - new stage of the cycle
   * @private
   */
  _onStageChanged(stage) {
    // stageIndicator: set the innerText
    if (stage === Stages.LONG_BREAK) {
      // work around for presenting Stages.LONG_BREAK as long_break
      this._stageIndicator.innerText = 'Long Break';
    } else {
      // Capitalize stage
      this._stageIndicator.innerText = `${stage}`.charAt(0).toUpperCase() +
      `${stage}`.slice(1);
    }
    // transitonButton: set the inner text
    if (stage === Stages.POMO && !this._pomoCounterController.autoPomo) {
      this._transitionButton.style.visibility = 'visible';
      this._transitionButton.innerText = 'Start Pomo'
    } else if (stage === Stages.BREAK && !this._pomoCounterController.autoBreak) {
      this._transitionButton.style.visibility = 'visible';
      this._transitionButton.innerText = 'Start Break'
    } else if (stage === Stages.LONG_BREAK && !this._pomoCounterController.autoBreak) {
      this._transitionButton.style.visibility = 'visible';
      this._transitionButton.innerText = 'Start Long Break'
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
