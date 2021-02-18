import { Stages } from '../controllers/pomo-counter-controller.js'

const emptybubble = '#bbb'; // color of normal bubble
const darkbubble = '#1155cc'; // color of blue bubble

/**
* get the current stage to update the bubbles indicator
*/
export class PomoCycleView {
  /**
   * @param {PomoCounterController} pomoCounterController get the right stage and pomo number
   */
  constructor(pomoCounterController) {
    this._bubbles = [];
    for (let i = 1; i < 5; i++) {
      this._bubbles.push(document.getElementById(`dot${i}`));
    }
    this._pomoCounterController = pomoCounterController;
  }

  /**
   * Binds the right color to the right bubble at the right stage
   */
  bind() {
    this._pomoCounterController.start();
    this._pomoCounterController.addChangeBubbles('pcv_setbubble', (stage, currentpomo) => this._set.call(this, stage, currentpomo));
  }

  /**
   * Update the color bubble for each stage
   * @param {stage} stage to define what stage are we on
   * @param {currentpomo} currentpomo to define what lap are we on
   */
  _set(stage, currentpomo) {
    if (stage === Stages.BREAK || stage === Stages.LONG_BREAK) {
      this._bubbles[currentpomo] = darkbubble;
    } else if (stage === Stages.POMO && currentpomo === 1) {
      for (let i = 1; i < 5; i++) {
        this._bubbles[i] = emptybubble;
      }
    }
  }
}
