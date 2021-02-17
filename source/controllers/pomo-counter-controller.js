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
    this.currentPomo = 0;         //is it for current lap - asked my Nhat Nguyen
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
    for (let i = 0; i < POMOS_PER_LONG_BREAK; i++) {
      document.getElementById(DOT + i).style.backgroundColor = "#bbb";
    }
    document.body.style.background = "#cfe2f3";
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
          document.body.style.background = "#b6d7a8";

          // TODO make long break skippable, set up callback for ending the long break after 30 min
        } else {
          this.stage = Stages.BREAK;

          //change the color for the short break
          document.body.style.background = "#d9ead3";
          //increase the bubbles base on the currentPomo
          document.getElementById(DOT + this.currentPomo).style.backgroundColor = "#1155cc";

          this.timerController.addAlarmCallback('tc_advance', this._advance.call(this));
          this.timerController.set(BREAK_LENGTH_SEC);
        }
        break;

      case Stages.BREAK:
        this.stage = Stages.POMO;
        this.currentPomo++;

        //change background color to light blue
        document.body.style.background = "#cfe2f3";

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