import { NotificationController } from './notification-controller.js';
import { PomoCounterController } from './pomo-counter-controller.js';
import { TimerController } from './timer-controller.js';

const notif = new NotificationController();

describe('test constructor and setSound function', () => {
    test('constructor', () => {
        expect(notif._sound).toBe('normal');
    });

    test('setSound', () => {
        notif.setSound('normal');
        expect(notif._sound).toBe('normal');

        notif.setSound('alt');
        expect(notif._sound).toBe('alt');

        notif.setSound('screaming');
        expect(notif._sound).toBe('screaming');

        notif.setSound('error sound');
        expect(notif._sound).toBe('error sound');
        notif.setSound(notif.playSound());
        expect(notif._sound).toBe('alt');
    });
});

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

    test('test case Sounds.CREAMING', () => {
        notif.setSound('screaming');
        const sound = notif.playSound();
        expect(sound).toBe('screaming');
    });

    test('test case Sounds default', () => {
        notif.setSound('error sound');
        const sound = notif.playSound();
        expect(sound).toBe('alt');
    });
});
