var sketchProc=function(processingInstance){ with (processingInstance){
var areasize = [100,100];
size(4000,4200); 
frameRate(24);
angleMode = "degrees";
var mouseIsPressed = false;
mousePressed = function() {
	mouseIsPressed = true;
};
mouseReleased = function() {
	mouseIsPressed = false;
};
var ratio = (PI/180);
var area = 0;
var areas = [
	[]
];

var createArea = function() {
	for (var j = 0; j < 100; j ++) {
		areas[0].push([]);
		for (var i = 0; i < 100; i++) {
			areas[0][j].push(0);
		}
	}
};

var keys = [];
keyPressed = function() {
    keys[keyCode] = true;
};
keyReleased = function() {
    keys[keyCode] = false;
};
var c = [125,125,125];
var wallSprite = function() {
    for (var i = 0; i < 40; i+=2) {
        stroke((40-i)*4*(c[0]/255),(40-i)*4*(c[1]/255),(40-i)*4*(c[2]/255));
        line(-20,i-20,18,i-20);
    }
    
    noStroke();
};
var outCorner = function() {
   for (var i = 0; i < 40; i+=2) {
       
        stroke((40-i)*4*(c[0]/255),(40-i)*4*(c[1]/255),(40-i)*4*(c[2]/255),300);
        line(-20,i-20,i-18,i-20);
        line(i-20,-20,i-20,20-(40-i));
    }
    noStroke();
    strokeWeight(3);
};
var inCorner = function() {
    for (var i = 0; i < 40; i+=2) {
       
        stroke((40-i)*4*(c[0]/255),(40-i)*4*(c[1]/255),(40-i)*4*(c[2]/255),300);
        line(i-20,i-20,20,i-20);
        line((i)-20,i-20,(i)-20,20);
    }
    noStroke();
    strokeWeight(3);
};
var stairs = function() {
    for (var i = 0; i < 40; i+=2) {
        stroke((40-i)*4*(c[0]/255),(40-i)*4*(c[1]/255),(40-i)*4*(c[2]/255));
        line(-20,i-20,18,i-20);
    }
    strokeWeight(10);
    for (var i = 5; i < 40; i+=12) {
        stroke((40-i)*5*(c[0]/255),(40-i)*5*(c[1]/255),(40-i)*5*(c[2]/255));
        line(-10,i-20,7,i-20);
    }
    strokeWeight(3);
    noStroke();
};


var wall = function(x,y,t) {
    if (t<=3) {
        pushMatrix();
        translate((x*40)+20,(y*40)+20);
        rotate(t*90*ratio);
        wallSprite();
        popMatrix();
    } else if (t<=7) {
        pushMatrix();
        translate(20+(x*40),20+(y*40));
        rotate(t*90*ratio);
        outCorner();
        popMatrix();
    } else if (t<=11) {
        pushMatrix();
        translate(20+(x*40),20+(y*40));
        rotate(t*90*ratio);
        inCorner();
        popMatrix();
        
    } else if (t<=15) {
        pushMatrix();
        translate(20+(x*40),20+(y*40));
        rotate(t*90*ratio);
        stairs();
        popMatrix();
    }
    
};

var tileID = 0;
var renderArea = function(a) {
    for (var j = 0; j < areas[a].length; j++) {
        for (var i = 0; i < areas[a][j].length; i++) {
			if (dist(mouseX,mouseY,i*40+20,j*40+20)<800) {
			var x = i*40;
			var y = j*40;
			
            if (areas[a][j][i]===0) {
                noStroke();
                fill(c[0]-50,c[1]-50, c[2]-50);
                rect(i*40,j*40,40,40);
				
            }
             else if (areas[a][j][i]<18) {
                 wall(i,j,areas[a][j][i]-1);
				 
             }
			 if (areas[a][j][i]===18) {
			fill(0,0,255);
			rect(x,y,40,40);
			}
			 if (dist(x+20,y+20,mouseX,mouseY)<20&&keys[SHIFT]==true) {
			 areas[a][j][i] = tileID
			}
			}
        }
    }
};
noStroke();

var buttons = function() {
	for (var i =0; i < 20; i++) {
		var x = (i)-(floor((i)/10)*10);
		var y = 10.2+floor((i)/10)+90;
		if (dist(x*40+20,y*40+20,mouseX,mouseY)<30&&keys[SHIFT]===true) {
			tileID = i;
		}
		if (i===0) {
			noStroke();
			fill(c[0],c[1],c[2]);
			rect(0,4008,40,40);
		}
		else if (i<17) {
		
		wall(x,y,i-1);
		}
		if (i===18) {
			fill(0,0,255);
			rect(x*40,y*40,40,40);
		}
		
		fill(255,255,255);
		text(i,x*40,y*40+40);
		if (keyCode===i+48) {
			tileID = i;
		}
	}
	
	
};
var print = function() {
	if (keys[ENTER]===true) {
		var exportText = "[";
        
        for (var j = 0; j < areas[area].length; j++) {
            exportText +="[";
            for (var i = 0; i < areas[area][j].length;i++) {
                exportText+="" + areas[area][j][i]+",";
            }
            exportText +="],";
        }
        
        exportText +="],";
        println(exportText);
	}
};
var cursor = function() {
	if (tileID===0) {
			noStroke();
			fill(c[0],c[1],c[2]);
			rect(mouseX-20,mouseY-20,40,40);
		}
		else if (tileID<18) {
		
		wall(mouseX/40-0.5,mouseY/40-0.5,tileID-1);
		}
		if (tileID===18) {
			fill(0,0,255);
			rect(mouseX-20,mouseY-20,40,40);
		}
	
};
var timer = 0;
draw = function() {
	if (timer === 0) {
		createArea(areasize);
	}
    timer ++;
	
    strokeWeight(3);
    background(100,100,100);
    renderArea(area);
	buttons();
	print();
	fill(255,255,255);
	text(tileID + "HI",0,height);
	text(keyCode,200,height);
	cursor();
};


}};
