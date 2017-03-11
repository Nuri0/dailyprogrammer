// https://www.reddit.com/r/dailyprogrammer/comments/5nciz5/20170111_challenge_299_intermediate_from_maze_to/

const fs = require('fs');
const path = require('path');

var isIntersectionNode = function(grid,i,j) {
	if (grid[i][j] != '.') {
		return false;
	}
	
	var freeSides = 0;
	if ((i < grid.length) && grid[i+1][j] == '.') freeSides++;
	if ((i > 0) && grid[i-1][j] == '.') freeSides++;
	if ((j < grid[i].length-1) && grid[i][j+1] == '.') freeSides++;
	if ((j > 0) && grid[i][j-1] == '.') freeSides++;
	
	return freeSides >= 3;
}

fs.readFile(path.join(__dirname,'maze.txt'), 'utf-8', function(err, data) {
	
	var rows = data.split("\n");
	var grid = [];
	for (var i=0; i<rows.length; i++) {
		var row = [];
		for (var j=0; j<rows[i].length; j++) {
			// replacing the numbers, as they aren't needed for this challenge
			switch(rows[i][j]) {
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
					row.push('.');
					break;
				default:
					row.push(rows[i][j]);
			}
		}
		grid.push(row);
	}

	nodes = [];
	var rowSum = 0;
	var colSum = 0;
	for (var i=0; i<grid.length; i++) {
		for (var j=0; j<grid[i].length; j++) {
			
			if (isIntersectionNode(grid,i,j)) {
				nodes.push({
					"i": i,
					"j": j
				});
				rowSum += i;
				colSum += j;
			}
		}
	}

	console.log("Number of intersections: " + nodes.length);

});
