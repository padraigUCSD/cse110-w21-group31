import { Stages } from '../controllers/pomo-counter-controller.js'

/**
* View to bind the current stage of the pomodoro cycle to UI elements
*/
export class PomoCycleView {
  /**
   * @param {PomoCounterController} pomoCounterController Global controller for counting pomos
   */
  constructor(pomoCounterController) {
    this._bubbles = [];
    for (let i = 1; i < 5; i++) {
      this._bubbles.push(document.getElementById(`dot${i}`));
    }
    this._pomoCounterController = pomoCounterController;
  }

  /**
   * Registers callbacks to update UI on stage change
   */
  bind() {
    this._pomoCounterController.addChangePomoCallback('pcv', (stage, currentpomo) => this._onStageChanged.call(this, stage, currentpomo));
  }

  /**
   * Updates the color of the bubbles on each stage change
   * @param {Stages} stage to define what stage are we on
   * @param {number} currentpomo to define what lap are we on
   * @private
   */
  _onStageChanged(stage, currentpomo) {
    if (stage === Stages.BREAK || stage === Stages.LONG_BREAK) {
      // On transition to a break, fill the bubble of the previous pomo
      this._bubbles[currentpomo - 1].classList.add('dot-filled');
    } else if (stage === Stages.POMO && currentpomo === 1) {
      // When the counter wraps back around to the first pomo, clear all of the bubbles
      for (const bubble of this._bubbles) {
        bubble.classList.remove('dot-filled');
      }
    }
  }
}
