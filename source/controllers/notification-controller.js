const normalAlarm = new Audio('audio/alarm.mp3');
const altAlarm = new Audio('audio/alarm2.mp3');

export class NotifController{
    soundAlarm(type) {
        if (type === 'normal') {
            console.log('normal');
            normalAlarm.play();
        } else {
            console.log('alt');
            altAlarm.play();
        }
    }
}

