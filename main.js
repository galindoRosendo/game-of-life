function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let current;
let next;
let cols = 10;
let rows = 10;
let gens = 10;

function setup() {
  // First Gen
  current = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      current[i][j] = Math.round(Math.random());
    }
  }
  return current;
}

function nextGen(currentGen) {
  let next = make2DArray(cols, rows);

  // Next Gen
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = currentGen[i][j];
      let neighbors = countNeighbors(currentGen, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 0 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  return next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + i + rows) % rows;

      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}


current = setup();
console.table(current);
next = nextGen(current);
current = next;
console.table(current);
for (let i = 0; i < gens -2; i++) {
    next = nextGen(current);
    current = next;
    console.table(current);
}
