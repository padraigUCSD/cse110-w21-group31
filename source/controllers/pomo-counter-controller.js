// timer display
let second;
let minute;
let timeOut;

let lap = 1; // this variable to keep track what lap we are on
let skip;

document.getElementById("control").addEventListener("click",bubble);

function bubble() {
	const x = document.getElementById("control").innerHTML;
	if (x == "Start" || x == "Start Pomo") {
		document.body.style.background = "#cfe2f3";
		minute = 24;			// set minute for display here
		second = 59;			// set second for display here
		timedCount();
		StartPomo();
	} else if (x == "ShortBreak") {
		document.body.style.background = "#cfe2f3";
		minute = 4;			// set minute for display here
		second = 29;			// set second for display here
		timedCount();
		ShortBreak();
	} else if (x == "LongBreak") {
		minute = 29;			// set minute for display here
		second = 59;			// set second for display here
		timedCount();
		LongBreak();
	} else if (x == "Skip") {
		Skip();
	}
}
function StartPomo() {
	document.getElementById("control").style.display = "none";
	document.body.style.background = "#cfe2f3";
	if (lap == "4") {
		document.getElementById("control").innerHTML = "LongBreak";
	} else {
		document.getElementById("control").innerHTML = "ShortBreak";
	}
	setTimeout(() => {
		document.getElementById(`dot${lap}`).style.backgroundColor = "#1155cc";
		document.getElementById("control").style.display = "block";
		lap = parseInt(lap);
		lap += 1;
	}, 1500000);
}
function ShortBreak() {
	document.getElementById("control").style.display = "none";
	document.body.style.background = "#d9ead3";
	setTimeout(() => {
		document.getElementById("control").style.display = "block";
		document.getElementById("control").innerHTML = "Start Pomo";
	}, 300000);
}

function Skip() {
	clearTimeout(skip);
	clearTimeout(timeOut);
	clear();
}
function LongBreak() {
	document.getElementById("control").style.display = "none";
	document.body.style.background = "#b6d7a8";
	setTimeout(() => {
		document.getElementById("control").style.display = "block";
		document.getElementById("control").innerHTML = "Skip";
	}, 900000);			// half of the long break is 15' * 60" * 1000 = 900000

	skip = setTimeout(() => {
		clear();
	}, 1800000);			// long break is 30' * 60" * 1000 = 1800000
}
function clear() {
	lap = 1;
	for (let i = 1; i < 5; i++) {
		document.getElementById(`dot${i}`).style.backgroundColor = "#bbb";
	}
	document.getElementById("control").innerHTML = "Start";
	document.body.style.background = "#cfe2f3";
	document.getElementById("counter").innerHTML = "25:00";
}

function timedCount() {
  if (second < 10 && minute < 10) {
  	document.getElementById("counter").innerHTML = `0${minute}:0${second}`;
  } else if (second < 10) {
  	document.getElementById("counter").innerHTML = `${minute}:0${second}`;
  } else if (minute < 10) {
  	document.getElementById("counter").innerHTML = `0${minute}:${second}`;
  } else {
  	document.getElementById("counter").innerHTML = `${minute}:${second}`;
  }
  second -= 1;
  if (second < 0) {
  	minute -= 1;
    second = 59;
  }
  if (minute >= 0) {
  	timeOut = setTimeout(timedCount, 1000);
  }
}
