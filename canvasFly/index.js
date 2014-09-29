getCanvas.cid = 0;
function getCanvas(width, height){
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	height && (canvas['height'] = height);
	width && (canvas['width'] = width);
	return canvas;
}
function firstDraw(){
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');
	ctx.fillRect(25,25,100,100);
	ctx.clearRect(45,45,60,60);
	ctx.strokeRect(50,50,50,50);
}
firstDraw();
function drawPlay(){
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(50,20);
	ctx.lineTo(50,40);
	ctx.lineTo(30,30);
	 ctx.fill();
	// ctx.closePath();
	// ctx.stroke();
}
drawPlay();
function drawSmile(){
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');
	var Pi = Math.PI;

	ctx.beginPath();
	//face

	ctx.arc(75, 75, 50, 0, Pi*2,true);
	//ctx.moveTo(110,75);
	//mouth
	ctx.arc(75, 75, 35, 0, Pi, false);
	ctx.moveTo(65,65);
	//left eye
	ctx.arc(60, 65, 5, 0, Pi*2, true);
	ctx.moveTo(95,65);
	//right eye
	ctx.arc(90, 65, 5, 0, Pi*2, true);
	ctx.stroke();


}
drawSmile();

(function(){
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.moveTo(25,25);
	ctx.lineTo(125, 25);
	ctx.lineTo(25,125);
	//ctx.closePath();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(135,40);
	ctx.lineTo(135,140);
	ctx.lineTo(35,140);
	//ctx.lineTo(135,40);
	ctx.closePath();
	ctx.stroke();

})()

function circleOne(){
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');

	ctx.beginPath();
	ctx.arc(50, 50, 10, 0, 1/4*Math.PI, true);
	ctx.stroke();
}
circleOne();

(function(){
	var canvas = getCanvas(null,200);
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');

		for(var i=0;i<4;i++){
			for(var j=0;j<3;j++){
				ctx.beginPath();
				var x              = 25+j*50;               // x coordinate
				var y              = 25+i*50;               // y coordinate
				var radius         = 20;                    // Arc radius
				var startAngle     = 0;                     // Starting point on circle
				var endAngle       = Math.PI+(Math.PI*j)/2; // End point on circle
				var anticlockwise  = i%2==0 ? false : true; // clockwise or anticlockwise
				
				ctx.moveTo(x,y);
				ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

				if (i>1){
					ctx.fill();
				} else {
					ctx.stroke();
				}
			}
		}
}
})()

function popup(){
	 var canvas = getCanvas();
	if (canvas.getContext) {
		var ctx = canvas.getContext('2d');

		// Quadratric curves example
		ctx.beginPath();
		ctx.moveTo(75,25);
		ctx.quadraticCurveTo(25,25,25,62.5);
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(25,62.5);
		ctx.quadraticCurveTo(25,100,50,100);
		ctx.strokeStyle = "yellow";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(50,100);
		ctx.quadraticCurveTo(50,120,30,125);
		ctx.strokeStyle = "green";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(30,125);
		ctx.quadraticCurveTo(60,120,65,100);
		ctx.strokeStyle = "orange";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(65,100);
		ctx.quadraticCurveTo(125,100,125,62.5);
		ctx.strokeStyle = "blue";
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(125,62.5);
		ctx.quadraticCurveTo(125,25,75,25);
		ctx.strokeStyle = "pink";
		ctx.stroke();
		
	}
}
popup();

function roundedRect(ctx,x,y,width,height,radius){
	ctx.beginPath();
	ctx.moveTo(x,y+radius);
	ctx.lineTo(x,y+height-radius);
	ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
	ctx.lineTo(x+width-radius,y+height);
	ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
	ctx.lineTo(x+width,y+radius);
	ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
	ctx.lineTo(x+radius,y);
	ctx.quadraticCurveTo(x,y,x,y+radius);
	ctx.stroke();
}

function radiusBox(){
	var canvas = getCanvas();
	var ctx = canvas.getContext('2d');
	roundedRect(ctx, 25, 25, 30, 30, 10);
}
radiusBox();
function basicImage(){
	var ctx = getCanvas().getContext('2d');
	var img = new Image();
	img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
	img.onload = function(){
		ctx.drawImage(img, 0, 0);
		ctx.beginPath();
		ctx.moveTo(40, 50);
		ctx.lineTo(50, 10);
		ctx.lineTo(58, 45);
		ctx.lineTo(70, 2);
		ctx.lineTo(95, 10);
		ctx.stroke();
	}
}
basicImage();
function tileImage(){
	var ctx = getCanvas().getContext('2d');
	var img = new Image();
	img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
	img.onload = function(){
		for(var i = 0;i<4;i++) {
			for(var j = 0;j<3;j++) {
				ctx.drawImage(img, i*50, j*38,50,38);
			}
		}
	}
}
tileImage();
function gallery(){
	var ctx = getCanvas().getContext('2d');
	var img1 = new Image();
	var img2 = new Image();
	img1.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
	
	img1.onload = function(){
		img2.src = 'https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png';
	}
	img2.onload = function(){
		ctx.drawImage(img1, 33, 71, 104, 124, 21, 20, 87, 104);
		ctx.drawImage(img2, 0, 0);
	}
}
gallery();
function lineToAfterclosePath(){
	var ctx = getCanvas().getContext('2d');
	ctx.beginPath();
	ctx.moveTo(80,40);
	ctx.lineTo(100,100);
	ctx.lineTo(50,50);
	ctx.closePath();
	ctx.lineTo(70,70);
	ctx.stroke();
}
lineToAfterclosePath();
function colorMap(){
	var ctx = getCanvas().getContext('2d');
	for(var i = 0 ;i<6;i++) {
		for(var j = 0;j<6;j++) {
			//console.log('rgb(' + Math.floor(255-42.5*i) + ',0,' + Math.floor(255-42.5*j) + ')');
			ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',0,' + Math.floor(255-42.5*j) + ')';
			ctx.fillRect(j*25,i*25,25,25);
		}
	}
}
colorMap();
function colorCube(){
	var ctx = getCanvas().getContext('2d');
	for(var i = 0;i<6;i++) {
		for(var j =0;j<6;j++) {
			ctx.strokeStyle = 'rgb(' + Math.floor(255-42.5*i) + ','+(220 - i*j*5)+',' + Math.floor(255-42.5*j) + ')';
			ctx.strokeRect(j*25,i*25,20,20);
		}
	}
}
colorCube();
function colorCircle(){
	var ctx = getCanvas().getContext('2d');
	for(var i =0;i<6;i++) {
		for(var j = 0;j<6;j++) {
			ctx.beginPath();
			ctx.strokeStyle = 'rgb(0,' + Math.floor(255-42.5*i) + ',' + 
												 Math.floor(255-42.5*j) + ')';
			// ctx.moveTo(12.5 + j*25, 12.5 + i*25);
			ctx.lineTo(12.5 + j*25, 12.5 + i*25);

			ctx.arc(12.5 + j*25, 12.5 + i*25, 10,0,Math.PI*2,true);
			ctx.stroke();
		}
	}
}
//TODO: 貌似调用arc时，浏览器会在canvas所有操作之前调用moveTo?
colorCircle();
function lineToVsMoveTo(){
	var ctx = getCanvas().getContext('2d');
	ctx.beginPath();
	ctx.strokeStyle = 'red';
	ctx.lineTo(50,50);
 // ctx.moveTo(60,60);
 // ctx.lineTo(50,50);
	ctx.stroke();
}

lineToVsMoveTo();

function circleInRect(){
	var ctx = getCanvas().getContext('2d');
	ctx.fillStyle = '#FD0';
	ctx.fillRect(10,10,30,30);
	ctx.fillStyle = '#6C0';
	ctx.fillRect(40,10,30,30);
	ctx.fillStyle = '#09F';
	ctx.fillRect(10,40,30,30);
	ctx.fillStyle = '#F30';
	ctx.fillRect(40,40,30,30);

	ctx.fillStyle = 'rgba(255,255,255,0.1)'

	for(var i = 0;i<10;i++) {
		ctx.beginPath();
		ctx.arc(40,40,10+2*i,0,Math.PI*2);
		ctx.fill();
	}
}
circleInRect();

function rectLine(){
	var ctx = getCanvas().getContext('2d');
	ctx.fillStyle = 'rgba(255,255,0,1)';
	ctx.fillRect(0,0,100,30);
	ctx.fillStyle = 'rgba(0,255,0,1)';
	ctx.fillRect(0,30,100,30);
	ctx.fillStyle = 'rgba(0,0,255,1)';
	ctx.fillRect(0,60,100,30);
	ctx.fillStyle = 'rgba(255,0,0,1)';
	ctx.fillRect(0,90,100,30);


	for(var i = 0;i<4;i++) {
		for(var j = 0;j<10;j++) {
			ctx.fillStyle = 'rgba(255,255,255,'+(1-0.1*j)+')';
			ctx.fillRect(85-j*10,5+i*30,10,20);
		}
	}
}
rectLine();