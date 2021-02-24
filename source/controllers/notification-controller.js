const normalAlarm = new Audio("audio/alarm.mp3");
const altAlarm = new Audio("audio/alarm2.mp3");

export function soundAlarm(type) {
    if (type === "normal") {
        normalAlarm.play();
    } else {
        altAlarm.play();
    }
}
