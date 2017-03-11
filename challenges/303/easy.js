/*
 * Returns the corner (as "UR","DR" or "DL") if any is reached, false otherwise
 * 
 */
var endReached = function(x,y,height, width) {
	if (x == width && y == 0) {
		return "UR";
	}
	if (x == width && y == height) {
		return "LR";
	}
	if (x == 0 && y == height) {
		return "LL";
	}
	return false;
}

var borderReached = function(x,y,height, width) {
	if ((x == 0) || (x == width)) {
		return "VERTICAL";
	}
	if ((y == 0) || (y == height)) {
		return "HORIZONTAL";
	}
	
	return false;
}

var simulateParticle = function(height, width, velocity) {
	var direction = {
		x: 1,
		y: 1
	}
	var stepCounter = 0;
	var elapsedTime = 0;
	var bounced = 0;
	var x = 0, y = 0;
	
	while(!endReached(x,y, height, width)) {
		x += direction.x;
		y += direction.y;
		
		//console.log(x + "/" + y);
		
		stepCounter++;
		if (stepCounter == velocity) {
			stepCounter = 0;
			elapsedTime++;
		}
		
		switch (borderReached(x,y,height,width)) {
			case "HORIZONTAL":
				direction.y = direction.y * -1;
				bounced++;
				break;
			case "VERTICAL":
				direction.x = direction.x * -1;
				bounced++;
				break;
		}
	}
	
	bounced--;
	
	return endReached(x,y,height,width) + " " + bounced + " " + elapsedTime;
}

var simulateRectangleParticle = function(height,width,m,n,velocity) {
	return simulateParticle(height-m,width-n,velocity);
}

console.log(simulateParticle(8,3,1));
console.log(simulateParticle(15,4,2));

console.log(simulateRectangleParticle(10,7,3,2,1));
