import { Stages } from '../controllers/pomo-counter-controller.js'

const emptybubble = '#bbb'; // color of normal bubble
const darkbubble = '#1155cc'; // color of blue bubble

/**
* get the current stage to update the bubbles indicator
*/
export class PomoCycleView {
  /**
   * @param {PomoCounterController} PomoCounterController get the right stage and pomo number
   */
  constructor(PomoCounterController) {
    this._bubbles = [];
    for (let i = 1; i < 5; i++){
      let x = document.getElementById('dot' + i);
      this._bubbles.push(x);
    }
    this._PomoCounterController = PomoCounterController;
  }

  /**
   * Binds the right color to the right bubble at the right stage
   */
  bind(){
    this._PomoCounterController.start();
    this._PomoCounterController.addChangeBubbles('pcv_setbubble', stage , currentpomo => this._setBubble.call(this, stage, currentpomo));
  }

  /**
   * Update the color bubble for each stage
   * @param {stage} stage to define what stage are we on
   * @param {currentpomo} currentpomo to define what lap are we on
   */
  _setBubble(stage, currentpomo) {
    if (stage === 'break' || stage === 'long_break'){
      this._bubbles[currentpomo] = darkbubble;
    } else if (state === 'pomo' && currentpomo === 1){
      for (let i = 1; i < 5; i++){
        this._bubbles[i] = emptybubble;
      }
    }
  }
}
