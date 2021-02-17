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
   * Create a PomoCycleView
   */
  constructor() {
    this.Bubble1 = document.getElementById(DOT + Indicator.ONE);
    this.Bubble2 = document.getElementById(DOT + Indicator.TWO);
    this.Bubble3 = document.getElementById(DOT + Indicator.THREE);
    this.Bubble4 = document.getElementById(DOT + Indicator.FOUR);
  }

  /**
   * Update the color bubble for each stage
   * @param {stage} stage to define what stage are we on
   * @param {currentpomo} currentpomo to define what lap are we on
   */
  _setBubble(stage, currentpomo) {
    if (stage === Stages.BREAK && currentpomo === Indicator.ONE) {
      this.Bubble1 = darkbubble;
    } else if (stage === Stages.BREAK && currentpomo === Indicator.TWO) {
      this.Bubble2 = darkbubble;
    } else if (stage === Stages.BREAK && currentpomo === Indicator.THREE) {
      this.Bubble3 = darkbubble;
    } else if (stage === Stages.LONG_BREAK && currentpomo === Indicator.FOUR) {
      this.Bubble4 = darkbubble;
    } else if (stage === Stages.POMO && currentpomo === Indicator.ONE) {
      this.Bubble1 = emptybubble;
      this.Bubble2 = emptybubble;
      this.Bubble3 = emptybubble;
      this.Bubble4 = emptybubble;
    }
  }
}
