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

const POMO_LENGTH_SEC = 25 * 60; // 25 minutes
const BREAK_LENGTH_SEC = 5 * 60; // 5 minutes
// eslint-disable-next-line no-unused-vars
const LONG_BREAK_MIN_LENGTH_SEC = 15 * 60; // 15 minutes
// eslint-disable-next-line no-unused-vars
const LONG_BREAK_MAX_LENGTH_SEC = 30 * 60; // 30 minutes

const POMOS_PER_LONG_BREAK = 4; // number of consecutive pomos before starting a long break

const DOT = 'dot'; //to get the name for the bubble
var setbackgr = document.body.style.background; // set background color
const setbubble0 = document.getElementById(DOT + Indicator.ZERO).style.backgroundColor;
const setbubble1 = document.getElementById(DOT + Indicator.ONE).style.backgroundColor;
const setbubble2 = document.getElementById(DOT + Indicator.TWO).style.backgroundColor;
const setbubble3 = document.getElementById(DOT + Indicator.THREE).style.backgroundColor;
const emptybubble = '#bbb'; //color of normal bubble
const darkbubble = '#1155cc'; //color of blue bubble
const startcolor = '#cfe2f3'; //color of light blue for start stage
const breakcolor = '#d9ead3'; //color of light green for short break stage
const longcolor = '#b6d7a8'; //color of dark green for long break stage

/**
 * @readonly
 * @enum{int}
 */
export const Indicator = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
}


/**
 * Tracks the current stage of the pomodoro process, and the number of consecutive pomos completed.
 */
export class PomoCounterController {
  /**
   * Create a PomoCounterController
   * @param {TimerController} timerController - the source of wall-clock time
   */
  constructor(timerController) {
    this.timerController = timerController;
    this.stage = Stages.POMO;
    this.currentPomo = 0;
  }

  /**
   * Starts the Pomodoro cycle
   */
  start() {
    this.currentPomo = 0;
    this.stage = Stages.POMO;
    this.timerController.addAlarmCallback('tc_advance', this._advance.call(this));
    this.timerController.set(POMO_LENGTH_SEC);

  }
  /**
   * Reset all the bubbles 
   * Reset the background color
   * Also it could change the timer display here and button text!!!
   */
  reset() {
    setbubble0 = emptybubble;
    setbubble1 = emptybubble;
    setbubble2 = emptybubble;
    setbubble3 = emptybubble;
    setbackgr = startcolor;
  }
  /**
   * Advances the cycle to the next stage, i.e. pomo to break or long break,
   * and break or long break to pomo.
   * @private
   */
  _advance() {
    switch (this.stage) {
      case Stages.POMO:
        if (this.currentPomo === POMOS_PER_LONG_BREAK) {
          this.stage = Stages.LONG_BREAK;

          //change the color for the long break
          setbackgr = longcolor;

          // TODO make long break skippable, set up callback for ending the long break after 30 min
        } else {
          this.stage = Stages.BREAK;

          //change the color for the short break
          setbackgr = breakcolor;
          //set the bubbles color base on the currentPomo
          if (this.currentPomo === Indicator.ZERO){
            setbubble0 = darkbubble;
          } else if (this.currentPomo === Indicator.ONE){
            setbubble1 = darkbubble;
          } else if (this.currentPomo === Indicator.TWO){
            setbubble2 = darkbubble;
          } else {
            setbubble3 = darkbubble;
          }

          this.timerController.addAlarmCallback('tc_advance', this._advance.call(this));
          this.timerController.set(BREAK_LENGTH_SEC);
        }
        break;

      case Stages.BREAK:
        this.stage = Stages.POMO;
        this.currentPomo++;

        //change background color to light blue
        setbackgr = startcolor;

        this.timerController.addAlarmCallback('tc_advance', this._advance.call(this));
        this.timerController.set(POMO_LENGTH_SEC);
        break;

      case Stages.LONG_BREAK:
        this.stage = Stages.POMO;
        this.currentPomo = 0;

        //change background color to light blue and reset the bubbles color
        this.reset();

        this.timerController.addAlarmCallback('tc_advance', this._advance.call(this));
        this.timerController.set(POMO_LENGTH_SEC);
        break;

      default:
        throw new Error(`unable to advance, invalid stage ${this.stage}`);
    }
  }
}