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
    // TODO - get toggle switches by ID once they are HTML'd 
    // this._autoPomoToggle = document.getElementById('TODO')
    // this._autoBreakToggle = document.getElementById('TODO')
    this._noMercyToggle = document.getElementById('no-mercy-toggle');
  }

  /**
   * Binds the view to the actual HTML elements of the page.
   */
  bind() {
    // TODO - set bindings for event calls
    // NOTE - the toggle switches are really just styles checkboxes
    // this._autoPomoToggle.onclick = e => this._onAutoPomoPressed.call(this, e);
    // this._autoBreakToggle.onclick = e => this.onAutoBreakPressed.call(this, e);
    this._noMercyToggle.onchange = e => this._onNoMercyPressed.call(this, e);
  }

  _onNoMercyPressed(e){
    if (e.target.checked) {
      console.log("NoMercy Checkbox is checked..");
      this._notificationController.setSound(Sounds.SCREAMING);
    } else {
      console.log("NoMercy Checkbox is not checked..");
      this._notificationController.setSound(Sounds.NORMAL);
    }
  }

  /**
   * Called when the autoPomoToggle switch is thrown, to change the autoPomo behavior
   * @param autoPomo {boolean}
   * @private
   */
  _onAutoPomoChanged(autoPomo){
    // TODO implement
  }

  /**
   * Called when the autoPBreakToggle switch is thrown, to change the autoBreak behavior
   * @param autoBreak {boolean}
   * @private
   */
  _onAutoBreakChanged(autoBreak){
    // TODO implement
  }

  /**
   * Called when the noMercyToggle switch is thrown, to change the autoPomo behavior
   * @param noMercy {boolean}
   * @private
   */
  _onNoMercyChanged(noMercy){
    if(noMercy){
      this._notificationController.setSound(Sounds.SCREAMING);
    }else{
      this._notificationController.setSound(Sounds.NORMAL);
    }
  }

  

}