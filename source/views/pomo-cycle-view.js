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
* Enum of stages of the Pomodoro cycle
* @readonly
* @enum {string}
*/
export const Stages = {
    POMO: 'pomo',
    BREAK: 'break',
    LONG_BREAK: 'long_break',
}
const DOT = 'dot'; //to get the name for the bubble
const emptybubble = '#bbb'; //color of normal bubble
const darkbubble = '#1155cc'; //color of blue bubble

/**
* get the current stage to update the bubbles indicator
*/
export class PomoCycleView {
    /**
     * Create a PomoCycleView
     * @param {PomoCounterController} PomoCounterController determine the stage and pomocurrent
     */
    constructor(PomoCounterController) {
        this.PomoCounterController = PomoCounterController;
        this.Bubble0 = document.getElementById(DOT + Indicator.ZERO);
        this.Bubble1 = document.getElementById(DOT + Indicator.ONE);
        this.Bubble2 = document.getElementById(DOT + Indicator.TWO);
        this.Bubble3 = document.getElementById(DOT + Indicator.THREE);
    }

    bind() {
        this.PomoCounterController.start();
        this._setBubble(this.PomoCounterController.stage,
            this.PomoCounterController.currentPomo, this._setBubble);
    }
    /**
     * Update the color bubble for each stage
     * @param {stage} stage 
     * @param {currentpomo} currentpomo 
     */
    _setBubble(stage, currentpomo, callback) {
        if (stage === Stages.BREAK && currentpomo === Indicator.ZERO) {
            this.Bubble0 = darkbubble;
        } else if (stage === Stages.BREAK && currentpomo === Indicator.ONE) {
            this.Bubble1 = darkbubble;
        } else if (stage === Stages.BREAK && currentpomo === Indicator.TWO) {
            this.Bubble2 = darkbubble;
        } else if (stage === Stages.LONG_BREAK && currentpomo === Indicator.THREE) {
            this.Bubble3 = darkbubble;
        } else if (stage === Stages.POMO && currentpomo === Indicator.ZERO) {
            this.Bubble0 = emptybubble;
            this.Bubble1 = emptybubble;
            this.Bubble2 = emptybubble;
            this.Bubble3 = emptybubble;
        }
    }
}