var cols, rows;
var w = 40;
var grid = [];
var current;
var stack = [];
var j = 0;

var highlightColor = [255, 0, 0, 100];
var showColor = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255), 255];
//var showColor = [95, 0, 160, 255];

// Function to setup the canvas
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    init();
    frameRate(60);
}

// Function to draw the grid
function draw() {
    background(0);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();

    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;

        stack.push(current);

        removeWalls(current, next);

        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }

    if (stack.length == 0) {
        grid = [];
        init();
    }
}

// function to calculate the index of a cell in the grid array
function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

// function to remove walls between two cells
function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}

// function to initialize the grid and new color
function init() {
    cols = floor(width / w);
    rows = floor(height / w);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];
}

// function to get a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}