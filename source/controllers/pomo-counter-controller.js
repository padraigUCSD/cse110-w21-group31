
var lap = 1; // this variable to keep track what lap we are on
var skip;
document.getElementById("control").addEventListener("click",bubble);
function bubble(){
	var x = document.getElementById("control").innerHTML;
	if (x == "Start" || x == "Start Pomo"){
		document.body.style.background = "#cfe2f3";
		StartPomo();
	} else if (x == "ShortBreak"){
		document.body.style.background = "#cfe2f3";
		ShortBreak();
	} else if (x == "LongBreak"){
		LongBreak();
	} else if (x == "Skip"){
		Skip();
	}	
}
function StartPomo(){
	document.getElementById("control").style.display = "none";
	document.body.style.background = "#cfe2f3";
	if (lap == "4"){
		document.getElementById("control").innerHTML= "LongBreak";
	} else {
		document.getElementById("control").innerHTML= "ShortBreak";
	}
	setTimeout(function(){
		document.getElementById("dot" + lap).style.backgroundColor = "#1155cc";
		document.getElementById("control").style.display = "block";	
		lap = parseInt(lap);
		lap = lap + 1;
		
	}, 3000);	
}
function ShortBreak(){
	document.getElementById("control").style.display = "none";
	document.body.style.background = "#d9ead3";
	setTimeout(function(){
		
		document.getElementById("control").style.display = "block";
		document.getElementById("control").innerHTML = "Start Pomo";	
		
		
	}, 3000);
}

function Skip(){
	clearTimeout(skip);
	clear();	
}
function LongBreak(){
	document.getElementById("control").style.display = "none";
	document.body.style.background = "#b6d7a8";
	setTimeout(function(){
		document.getElementById("control").style.display = "block";
		document.getElementById("control").innerHTML = "Skip";
	}, 6000);
	
	skip = setTimeout(function(){	
		clear();
	}, 20000);
	
}
function clear(){
	lap = 1;
	for (let i = 1; i < 5; i ++){
		document.getElementById("dot" + i).style.backgroundColor = "#bbb";
	}
	document.getElementById("control").innerHTML= "Start";
	document.body.style.background = "#cfe2f3";
}

//timer display
var second;
var minute;
var timeOut;
function timer(){
	
}
