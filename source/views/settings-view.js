import { Sounds } from '../controllers/notification-controller.js'

/**
 * View-binding logic for settings controls such as toggle switches
 */
export class SettingsView {
  /**
   * Creates a SettingsView and binds the UI to controller events
   * @param pomoCounterController {PomoCounterController}
   * @param notificationController {NotificationController}
   */
  constructor(pomoCounterController, notificationController) {
    this._pomoCounterController = pomoCounterController;
    this._notificationController = notificationController;
    this._autoPomoToggle = document.getElementById('auto-pomo-toggle');
    this._autoBreakToggle = document.getElementById('auto-break-toggle');
    this._noMercyToggle = document.getElementById('no-mercy-toggle');
  }

  /**
   * Binds the view to the actual HTML elements of the page.
   */
  bind() {
    // NOTE - the toggle switches are really just styles checkboxes
    this._autoPomoToggle.onchange = e => this._onAutoPomoPressed.call(this, e);
    this._autoBreakToggle.onchange = e => this._onAutoBreakPressed.call(this, e);
    this._noMercyToggle.onchange = e => this._onNoMercyPressed.call(this, e);
  }

  /**
   * Called when the autoPomoToggle switch is thrown, to change the autoPomo behavior
   * @param e {Event}
   * @private
   */
  _onAutoPomoPressed(e){
    if (e.target.checked) {
      // AutoPomo Checkbox is checked
      // TODO implementation: this._pomoCounterController.TODO
    } else {
      // AutoPomo Checkbox is NOT checked
      // TODO implementation: this._pomoCounterController.TODO
    }
  }

  /**
   * Called when the autoPBreakToggle switch is thrown, to change the autoBreak behavior
   * @param e {Event}
   * @private
   */
  _onAutoBreakPressed(e){
    if (e.target.checked) {
      // AutoBreak Checkbox is checked
      // TODO implementation: this._pomoCounterController.TODO
    } else {
      // AutoBreak Checkbox is NOT checked
      // TODO implementation: this._pomoCounterController.TODO
    }
  }

  /**
   * Called when the noMercyToggle switch is thrown, to change the noMercy behavior
   * @param e {Event}
   * @private
   */
  _onNoMercyPressed(e){
    if (e.target.checked) {
      // NoMercy Checkbox is checked
      this._notificationController.setSound(Sounds.SCREAMING);
    } else {
      // NoMercy Checkbox is NOT checked
      this._notificationController.setSound(Sounds.NORMAL);
    }
  }
  

}