import { Stages } from '../controllers/pomo-counter-controller.js'

const startcolor = '#cfe2f3'; // color of light blue for start stage
const breakcolor = '#d9ead3'; // color of light green for short break stage
const longcolor = '#b6d7a8'; // color of dark green for long break stage
/**
* Set the background base on the stage
*/
export class BackgroundColorView {
  /**
   * 
   * @param {PomoCounterController} PomoCounterController get the right stage of pomo 
   */
  constructor(PomoCounterController) {
    this._PomoCounterController = PomoCounterController;
    this._background = document.body.style.background;
  }

  bind() {
    this._PomoCounterController.addChangeBackground('bcv_setbackground', stage => this._setBackground.call(this, stage));
  }
  /**
   * Set the background color base on the current stage
   * @param {stage} stage what stage are we on
   */
  _setBackground(stage) {
    if (stage === Stages.POMO) {
      this._background = startcolor;
    } else if (stage === Stages.BREAK) {
      this._background = breakcolor;
    } else if (stage === Stages.LONG_BREAK) {
      this._background = longcolor;
    }
  }
}
