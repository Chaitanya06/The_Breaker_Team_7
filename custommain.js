// JavaScript Document
var themeval;
window.onload = function() {
	document.querySelector('.logo img').className = "";
	var intro = document.getElementById("intro");
	var highscore = document.getElementById("highscore");
	var settings = document.getElementById("settings");
	var content = document.getElementById("content");
	var huser = localStorage.getItem("HighscoreUsername");
	if(document.querySelector('#highscore label.husername')){
	if(huser){
		document.querySelector('#highscore label.husername').innerHTML = huser;
	} else {
		document.querySelector('#highscore label.husername').innerHTML = "Player 1";
	}
	}
	
	var hscore = localStorage.getItem("BreakerScore1");
	console.log("Highscore:"+hscore);
	if(document.querySelector('#highscore label.hscore')){
	if(hscore){
		document.querySelector('#highscore label.hscore').innerHTML = hscore;
	} else {
		document.querySelector('#highscore label.hscore').innerHTML = '0';
	}
	}
	var tval = localStorage.getItem("themevalue");
	if(tval){
		window.setTimeout(ChangeTheme(tval),6000);
	}
};

function ChangeTheme(val) {
	window.localStorage.setItem("suc_theme",val);
	var content = document.getElementById('mainbody');
	var ballImg = document.getElementById('ball');
	var paddleImg = document.getElementById('paddle');
	var ballsrc = document.getElementById('ball_src');
	var magicsrc = document.getElementById('magic_src');
	var text = document.getElementById('content')
	content.removeAttribute("class");
	if(val==2) {
		content.className = 'content-wrap2';
		paddleImg.src = "images/paddle_new.png";
		ballImg.src = "images/star.png";
		ballsrc.src = "images/fish.png";
		magicsrc.src = "images/water_plant2.png";
		text.style.color = "black";
	} else if(val==3) {
		content.className = 'content-wrap3';
		paddleImg.src = "images/paddle_new_cons.png";
		ballImg.src = "images/rabbit_final.png";
		ballsrc.src = "images/Carrot_final.png";
		magicsrc.src = "images/strawberry.png";
		text.style.color = "black";
	} else if(val==4) {
		content.className = 'content-wrap4';
		paddleImg.src = "images/paddle_new_cons.png";
		ballImg.src = "images/wheel_1.png";
		ballsrc.src = "images/car_7.png";
		magicsrc.src = "images/magic_cyclone_1.png";
		text.style.color = "white";
	} else {
		content.className = 'content-wrap1'; 
		paddleImg.src = "images/paddle_new.png";
		ballImg.src = "images/nemo.png";
		ballsrc.src = "images/bubble.png";
		magicsrc.src = "images/sea_horse.png";
		text.style.color = "black";           
	}
}
function showGame(){
	var person = prompt("Please enter your name", "Player1");
	if (person != null) {
		//console.log('Username:'+person);
		// Store
		localStorage.setItem("BreakerUsername", person);
		location.href="level1.html";
	}
}
function startGame(){
	document.querySelector('.start_btn').style.display="none";
	document.querySelector('.levels').style.display="block";
	var audio3 = new Audio('images/level2_start.mp3');
           audio3.play();
	window.setTimeout(motionBall,2000);
}

function showHighScore(){
	var btnclasses = document.getElementById('mainbody').classList;
	if(btnclasses.contains('intro')){
		btnclasses.remove('intro');
		btnclasses.add('content-wrap1');
	}
	document.querySelector('#highscore img').className = "";

	intro.style.display=content.style.display=settings.style.display='none';
	highscore.style.display='block';
}
function showSettings(){
	var btnclasses = document.getElementById('mainbody').classList;
	if(btnclasses.contains('intro')){
		btnclasses.remove('intro');
		btnclasses.add('content-wrap1');
	}
	document.querySelector('#settings img').className = "";
	intro.style.display=content.style.display=highscore.style.display='none';
	//var themeval = document.querySelector('input[name="changeTheme"]:checked').value;
	//document.querySelector('[name="changeTheme"][value="'+themeval+'"]').checked=true;
	settings.style.display='block';
}
function back(){
	document.getElementById('mainbody').removeAttribute("class");
	document.getElementById('mainbody').className = 'intro';
	intro.style.display='block';
	var themeval = document.querySelector('input[name="changeTheme"]:checked').value;
	document.querySelector('[name="changeTheme"][value="'+themeval+'"]').checked=true;
	content.style.display=highscore.style.display=settings.style.display='none';
}
function savetheme(){            
	themeval = document.querySelector('input[name="changeTheme"]:checked').value;
	localStorage.setItem("themevalue", themeval);
	console.log(themeval);
	document.querySelector('[name="changeTheme"][value="'+themeval+'"]').checked=true;
	window.location.href="level1.html";
	back();
}