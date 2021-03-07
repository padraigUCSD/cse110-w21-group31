import { NotificationController } from './notification-controller.js';

const notif = new NotificationController();

describe('tests playSound()', () => {

    test('test case Sounds.NORMAL', ()=> {
        notif.setSound('normal');
        let sound = notif.playSound();
        expect(sound).toBe('normal');
    });

    test('test case Sounds.ALT', ()=> {
        notif.setSound('alt');
        let sound = notif.playSound();
        expect(sound).toBe('alt');
    });
});