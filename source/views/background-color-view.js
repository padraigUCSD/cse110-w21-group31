export const Stages = {
    POMO: 'pomo',
    BREAK: 'break',
    LONG_BREAK: 'long_break',
}
const startcolor = '#cfe2f3'; //color of light blue for start stage
const breakcolor = '#d9ead3'; //color of light green for short break stage
const longcolor = '#b6d7a8'; //color of dark green for long break stage
/**
* Set the background base on the stage
*/
export class BackgroundColorView {
    /**
    * Create Pomo counter control
    * @param {PomoCounterController} PomoCounterController - the stage of the timer
    */
    constructor(PomoCounterController) {
        this.PomoCounterController = PomoCounterController;
        this.background = document.body.style.background;
    }

    bind() {
        this.PomoCounterController.start();
        this._setBackground(this.PomoCounterController.stage, this._setBackground);
    }
    /**
     * Set the background color base on the current stage
     * @param {stage} stage what stage are we on
     */
    _setBackground(stage, callback) {
        if (stage === Stages.POMO) {
            this.background = startcolor;
        } else if (stage === Stages.BREAK) {
            this.background = breakcolor;
        } else if (stage === Stages.LONG_BREAK) {
            this.background = longcolor;
        }
    }
}