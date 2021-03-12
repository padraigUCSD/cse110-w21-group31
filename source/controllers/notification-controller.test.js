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
    // Assertions
    expect(notif._sound).toBe('error sound');
  });
});
