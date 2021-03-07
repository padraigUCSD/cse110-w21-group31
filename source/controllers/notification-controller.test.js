import { NotificationController } from './notification-controller.js';

const notif = new NotificationController();

describe('tests constructor', () => {
    test('constructor', () => {
        expect(notif._sound).toBe('normal');
    });
});

describe('tests setSound', () => {
    test('set sound to normal', () => {
        notif.setSound('normal');
        expect(notif._sound).toBe('normal');
    });

    test('set sound to alt', () => {
        notif.setSound('alt');
        expect(notif._sound).toBe('alt');
    });

    test('set sound to screaming', () => {
        notif.setSound('screaming');
        expect(notif._sound).toBe('screaming');
    });

    test('set sound to error', () => {
        notif.setSound('error sound');
        expect(notif._sound).toBe('error sound');
        notif.setSound(notif.playSound());
        expect(notif._sound).toBe('alt');
    });
});

describe('tests playSound', () => {
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

    test('test case Sounds.SCREAMING', () => {
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
