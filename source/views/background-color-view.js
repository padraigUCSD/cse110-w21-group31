import { Stages } from '../controllers/pomo-counter-controller.js'

const startcolor = '#cfe2f3'; // color of light blue for start stage
const breakcolor = '#d9ead3'; // color of light green for short break stage
const longcolor = '#b6d7a8'; // color of dark green for long break stage
/**
* Set the background base on the stage
*/
export class BackgroundColorView {
  /**
   * @param {PomoCounterController} PomoCounterController get the right stage of pomo
   */
  constructor(PomoCounterController) {
    this._PomoCounterController = PomoCounterController;
    this._background = document.body;
  }

  bind() {
    this._PomoCounterController.addChangeStageCallback('bcv', stage => this._set.call(this, stage));
  }

  /**
   * Set the background color base on the current stage
   * @param {stage} stage what stage are we on
   * @private
   */
  _set(stage) {
    if (stage === Stages.POMO) {
      console.log('pomo');
      this._background.style.backgroundColor = startcolor;
    } else if (stage === Stages.BREAK) {
      console.log('break');
      this._background.style.backgroundColor = breakcolor;
    } else if (stage === Stages.LONG_BREAK) {
      console.log('long break');
      this._background.style.backgroundColor = longcolor;
    }
  }
}
