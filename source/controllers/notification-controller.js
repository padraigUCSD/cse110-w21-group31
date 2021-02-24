const normalAlarm = new Audio("audio/alarm.mp3");
const altAlarm = new Audio("audio/alarm2.mp3");
const screamingAlarm = new Audio("audio/alarm2.mp3");


export function soundAlarm(type){
    if(type === "normal"){
        normalAlarm.play();
    }else if(type === "alt"){
        altAlarm.play();
    }else if(type === "screaming"){
        screamingAlarm.play();
    }
    else{
        altAlarm.play();
    }
} 