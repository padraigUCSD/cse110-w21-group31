/**
* @readonly
* @enum{int}
*/
export const Indicator = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
}
/**
* Enum of stages of the Pomodoro cycle
* @readonly
* @enum {string}
*/
export const Stages = {
  POMO: 'pomo',
  BREAK: 'break',
  LONG_BREAK: 'long_break',
}
const DOT = 'dot'; // to get the name for the bubble
const emptybubble = '#bbb'; // color of normal bubble
const darkbubble = '#1155cc'; // color of blue bubble

/**
* get the current stage to update the bubbles indicator
*/
export class PomoCycleView {
  /**
   * 
   * @param {PomoCounterController} PomoCounterController get the right stage and pomo number
   */
  constructor(PomoCounterController) {
    this._bubbles = ['document.getElementById(DOT + Indicator.ONE)',
      'document.getElementById(DOT + Indicator.ONE)',
      'document.getElementById(DOT + Indicator.ONE)',
      'document.getElementById(DOT + Indicator.ONE)'];
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
