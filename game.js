// JavaScript Document
		

		//var audio4 = new Audio('images/level1_main.mp3');
		var mybb = document.getElementById("myBrickBreaker");
		var ctx = mybb.getContext("2d");

        //ball default declarations
        var xAxis = mybb.width/2; //ball x-axis position
        var yAxis = mybb.height-50; //ball y-axis position
        var radius = 21; //ball radius
        var ballMotionX = 3; // plus value indicates the right direction of x-axis and vice-versa
        var ballMotionY = -3; // minus value indicates the top direction of y-axis and vice-versa

        //paddle default declarations
        //paddle image
        var pimg = document.getElementById("paddle");
        var pHeight = 15; //paddle height
        var pWidth = 101; //paddle width
        var pX = (mybb.width-pWidth)/2; 
        //paddle control arrows default values
        var rightArrowPressed = false;
        var leftArrowPressed = false;
        
        var ballRows = 5;
        var ballColumns = 15;
        var ballPadding = 0;
        var ballOffsetTop = 30;
        var ballOffsetLeft = 0;
        var rand_row = [];
        for(i=0;i<ballColumns;i++) {
            rand_row[i]=Math.floor((Math.random() * 14));
        }
        var balls=[] ;

        for(c=0; c<ballRows; c++) {
            balls[c] = [];
            for(r=0; r<ballColumns; r++) {
                balls[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        var ballX;
        var ballY;
        var score = 0;
        var lives = 3;

        imgbb = new Image();
        imgbb.src = 'images/bubble.png';
        imgmb = new Image();
        imgmb.src = 'images/sea_horse.png';

        var requestId = 1;//its for play the ball by default value

        //event listeners to handle the left and right motion for the paddle
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("mousemove", mouseMoveHandler, false);
        

        //fucntions to handle the paddle motions using left and right arrows
        function keyDownHandler(e) {
            if(e.keyCode == 39) { // 39 defines as right arrow
                rightArrowPressed = true;
            }
            else if(e.keyCode == 37) { //37 defines as left arrow
                leftArrowPressed = true;
            }
        }

        function keyUpHandler(e) {
            if(e.keyCode == 39) {
                rightArrowPressed = false;
            }
            else if(e.keyCode == 37) {
                leftArrowPressed = false;
            }
        }
        //mouse move logic here
		function mouseMoveHandler(e) {
		    var relativeX = e.clientX - c.offsetLeft;
		    if(relativeX > 0 && relativeX < c.width) {
		        pX = relativeX - pWidth/2;
		    }
		}

        //draw ball logic
        function drawBall() {
            ctx.beginPath();
            var bimg = document.getElementById("ball")
            ctx.drawImage(bimg, xAxis, yAxis);
            ctx.closePath();
        }
    
        function drawPaddle() {
            ctx.beginPath();
            ctx.drawImage(pimg, pX, mybb.height-pHeight);
            ctx.closePath();
        }
        var imgbb;
		var imgmb;
        function drawBalls() {
            for (var c = 0; c< ballRows; c++ ) {
                for (var r = 0; r < ballColumns; r++) {                    
                    if(balls[c][r].status == 1){
                        if(rand_row[c]==r){
							imgmb = document.getElementById("magic_src")
                            ballX = (r*(imgmb.width+ballPadding))+ballOffsetLeft;
                            ballY = (c*(imgmb.height+ballPadding))+ballOffsetTop;
                            
                            balls[c][r].x = ballX;
                            balls[c][r].y = ballY;
                        
                            ctx.drawImage(imgmb,ballX,ballY);
                        } else {  
							imgbb = document.getElementById("ball_src")
                            ballX = (r*(imgbb.width+ballPadding))+ballOffsetLeft;
                            ballY = (c*(imgbb.height+ballPadding))+ballOffsetTop;
                        
                            balls[c][r].x = ballX;
                            balls[c][r].y = ballY;
                            ctx.drawImage(imgbb, ballX, ballY);
                        }
                    }
                }
            }
        }

        function collisionDetection() {
            for(c=0; c<ballRows; c++) {
                for(r=0; r<ballColumns; r++) {       
                    var b = balls[c][r];
                    if(b.status == 1) {
                        if(xAxis > b.x-radius && xAxis < b.x+40 && yAxis > b.y-radius && yAxis < b.y+40) {   
                            var audio1 = new Audio('images/comical_drip_sound.wav');
                            audio1.play();                      
                            if(rand_row[c] == r){
								var audio2 = new Audio('images/up.mp3');
                                 audio2.play();
                                if(c!= 0 && balls[c-1][r].status ==1){
                                    balls[c-1][r].status = 0;
                                    score++;
                                }
                                
                                if(r!= 0 && balls[c][r-1].status==1)   
                                {
                                    balls[c][r-1].status=0;
                                    score++;
                                }
                        
                                if(c!=4 && balls[c+1][r].status == 1)
                                {
                                    balls[c+1][r].status = 0;
                                    score++;
                                }

                                if(r!=13 && balls[c][r+1].status == 1 )
                                {
                                    balls[c][r+1].status = 0;
                                    score++;
                                }
                    
                            }
                            ballMotionY = -ballMotionY;
                            b.status = 0;
                            score++;                        
                            
                            if(score == 75) {
                                setTimeout(function(){
                                    //document.getElementById('demo').src= "congrats.gif";
                                },1000);
                            }
                        }
                    }
                }
            }
        }

        function drawScore() {
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText("Score: "+score, 8, 20);					
           
        }

        function drawLives() {
            heart = new Image();
            heart.src='images/heart.png';
            for(i=0;i<lives;i++)
            {
                ctx.drawImage(heart,i*40+(mybb.width-120),5,20,20);
            }
        }
		
		

        function saveHighscore(highscore){
            //console.log(localStorage.getItem("BreakerUsername"));
            // Store
			var hscore = localStorage.getItem("BreakerScore1");
			var user = localStorage.getItem("BreakerUsername");
			if(highscore>=hscore){
				localStorage.setItem("HighscoreUsername", user);
				localStorage.setItem("BreakerScore1", highscore);
			}
			ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
			ctx.fillText("HighScore: "+hscore, 250, 20);
        }

        function motionBall(){
            //clears the path background colour the in which the ball moved
            ctx.clearRect(0, 0, mybb.width, mybb.height);
            if(lives>0 && score <75) {
	            drawBall();
	            drawPaddle();
	            drawBalls();
	            drawScore();       
	            drawLives();
				saveHighscore();
	        } 
			if(lives==0)
				//else
				{
				//audio4.muted=true; 								
	        	ctx.clearRect(480, 5, 20, 20 );
                saveHighscore(score);
                var gradient = ctx.createLinearGradient(0, 0, 0,mybb.width);
                //console.log(mybb.width);
                ctx.font = "30px Verdana";
                gradient.addColorStop("0", "black");
                //gradient.addColorStop("0.5", "red");
                gradient.addColorStop("1.0", "red");
                // Fill with gradient
                ctx.fillStyle = gradient; 
				ctx.fillText("You Lost! Please Retry", 130, 190);
				 ctx.fillText("Score: "+score, 250, 250);
                var retry = document.createElement("A");
				var t = document.createTextNode("Retry");
				retry.setAttribute("href", "level1.html");
				retry.appendChild(t);
				retry.className = "main-button";
				document.getElementById('failure_msg').appendChild(retry);               

	        }  
			
			
            if(score == 75)	
			{ 
			 window.location.href= "success.html";
			}	
           	
		  			   
	        collisionDetection(); 
            //if player is still alive;
            if(lives>0 ){
                //bouncing ball back from left and right walls
                if(xAxis + ballMotionX > mybb.width-radius || xAxis + ballMotionX+30 < radius) {
                    ballMotionX = -ballMotionX; 
                }
                //bouncing ball back from top and bottom walls
                if(yAxis + ballMotionY+30 < radius) {
                    ballMotionY = -ballMotionY; 
                } else if(yAxis + ballMotionY+30 > mybb.height-radius) {
                    if(xAxis > pX-radius && xAxis < pX + pWidth) {
                        ballMotionY = -ballMotionY;
                    } else {
                        lives--;
                        console.log('life:'+lives);
                        if(lives!=0) {
                            xAxis = mybb.width/2;
                            yAxis = mybb.height-50;
                            pX = (mybb.width-pimg.width)/2;
                        }
                    }
                }

                if(rightArrowPressed && pX < mybb.width-pWidth) {
                    pX += 7;
                }
                else if(leftArrowPressed && pX > 0) {
                    pX -= 7;
                }

                //sets the motion of the ball at the starting in which direction to move
                xAxis += ballMotionX;
                yAxis += ballMotionY;
                start();
            }           
        }

        function start() {
			
            requestId = requestAnimationFrame(motionBall);
			//audio4.play();
        }

        function stop() {
            window.cancelAnimationFrame(requestId);  
			//audio4.pause();	 			
        }

        //Play and pause condition logic here
        document.body.onkeyup = function(e){
            if(e.keyCode == 32){
                if (!requestId) {
                    requestId = 1;
                    start();
                } else {
                    stop();
                    requestId = 0;
                }
            }
        }

		function reload(){
			console.log('reload reload!1');
			ctx.clearRect(0, 0, mybb.width, mybb.height);
			//setTimeout(myFunction, 6000);
        }
        function myFunction(){
        
			//motionBall();
        }