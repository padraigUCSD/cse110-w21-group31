import { NotificationController } from './notification-controller.js';

const notif = new NotificationController();

describe('tests constructor', () => {
  test('constructor', () => {
    // Assertions
    expect(notif._sound).toBe('normal');
  });
});

describe('tests setSound', () => {
  test('set sound to normal', () => {
    notif.setSound('normal');

    // Assertions
    expect(notif._sound).toBe('normal');
  });

  test('set sound to alt', () => {
    notif.setSound('alt');

    // Assertions
    expect(notif._sound).toBe('alt');
  });

  test('set sound to screaming', () => {
    notif.setSound('screaming');

    // Assertions
    expect(notif._sound).toBe('screaming');
  });

  test('set sound to error', () => {
    notif.setSound('error sound');
    notif.setSound(notif.playSound());

    // Assertions
    expect(notif._sound).toBe('error sound');
    expect(notif._sound).toBe('alt');
  });
});

describe('tests playSound', () => {
  test('test case Sounds.NORMAL', () => {
    notif.setSound('normal');
    const sound = notif.playSound();

    // Assertions
    expect(sound).toBe('normal');
  });

  test('test case Sounds.ALT', () => {
    notif.setSound('alt');
    const sound = notif.playSound();

    // Assertions
    expect(sound).toBe('alt');
  });

  test('test case Sounds.SCREAMING', () => {
    notif.setSound('screaming');
    const sound = notif.playSound();

    // Assertions
    expect(sound).toBe('screaming');
  });

  test('test case Sounds default', () => {
    notif.setSound('error sound');
    const sound = notif.playSound();

    // Assertions
    expect(sound).toBe('alt');
  });
});
