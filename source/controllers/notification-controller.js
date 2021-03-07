/**
 * Enum of labels for notifcation sounds that can be played
 * @readonly
 * @enum {string}
 */
export const Sounds = {
  NORMAL: 'normal',
  ALT: 'alt',
  SCREAMING: 'screaming',
}

const NORMAL_ALARM = new Audio('audio/alarm2.mp3');
const ALT_ALARM = new Audio('audio/alarm.mp3');
const SCREAMING_ALARM = new Audio('audio/wilhelm.mp3');

/**
 * Plays a sound when an event happens
 */
export class NotificationController {
  /**
   * Creates a NotificationController
   */
  constructor() {
    this._sound = Sounds.NORMAL;
  }

  /**
   * Sets the sound to be played when events occur
   * @param {Sounds} sound - determine which notification sound to set
   */
  setSound(sound) {
    this._sound = sound;
  }

  /**
   * Plays a sound based on the current configuration
   */
  playSound() {
    switch (this._sound) {
      case Sounds.NORMAL:
        NORMAL_ALARM.play();
        return Sounds.NORMAL;

      case Sounds.ALT:
        ALT_ALARM.play();
        return Sounds.ALT;

      case Sounds.SCREAMING:
        SCREAMING_ALARM.play();
        return Sounds.SCREAMING;

      default:
        ALT_ALARM.play();
        return Sounds.ALT;
    }
  }
}
