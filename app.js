const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐻', '🐰'];

const matrixDom = document.getElementById('matrix');

const matrix_size = 9;
const cell_size = 56;
const matrix = [];

let previousClickCell = null;

const clickCell = (e) => {
  const nextClickCell = e.target;

  if (previousClickCell === nextClickCell) {
    blurCell();
  } else if (previousClickCell) {
    const columnPrevious = previousClickCell.dataset.column;
    const columnNext = nextClickCell.dataset.column;
    const rowPrevius = previousClickCell.dataset.row;
    const rowNext = nextClickCell.dataset.row;

    if (!isAdjacent(rowPrevius, rowNext, columnPrevious, columnNext)) {
      return;
    }

    nextClickCell.classList.add('cell--selected');

    moveToCell(nextClickCell, columnPrevious, rowPrevius);
    moveToCell(previousClickCell, columnNext, rowNext);

    const rowMatcing = getRowMatching();
    const columnMatcing = getColumnMatching();
    console.log(rowMatcing);
    console.log(columnMatcing);

    if (rowMatcing.length || columnMatcing.length) {
      console.log('eat');
    } else {
      setTimeout(
        (
          columnPrevious,
          rowPrevius,
          columnNext,
          rowNext,
          previousClickCell,
          nextClickCell
        ) => {
          moveToCell(previousClickCell, columnPrevious, rowPrevius);
          moveToCell(nextClickCell, columnNext, rowNext);
        },
        500,
        columnPrevious,
        rowPrevius,
        columnNext,
        rowNext,
        previousClickCell,
        nextClickCell
      );
    }

    previousClickCell.classList.remove('cell--selected');
    nextClickCell.classList.remove('cell--selected');
    previousClickCell = null;
  } else {
    focusCell(nextClickCell);
  }
};

const blurCell = () => {
  previousClickCell.classList.remove('cell--selected');
  previousClickCell = null;
};

const focusCell = (nextClickCell) => {
  previousClickCell = nextClickCell;
  previousClickCell.classList.add('cell--selected');
};

const isAdjacent = (rowPrevius, rowNext, columnPrevious, columnNext) => {
  const diffX = rowPrevius - rowNext;
  const diffY = columnPrevious - columnNext;

  return diffX >= -1 && diffX <= 1 && diffY >= -1 && diffY <= 1;
};

const moveToCell = (cell, column, row) => {
  
  cell.style.top = `${column * cell_size}px`;
  cell.style.left = `${row * cell_size}px`;
  cell.dataset.row = row;
  cell.dataset.column = column;
  matrix[column][row] = cell.innerHTML;
};
const getRandom = () => {
  return Math.round(Math.random() * (EMOJIS.length - 1));
};

const generateMatrix = () => {
  //0,1,2,3,4,5,6,7,8
  for (let column = 0; column < matrix_size; column++) {
    matrix[column] = [];
    //0,1,2,3,4,5,6,7,8
    for (let row = 0; row < matrix_size; row++) {
      const indexEmoji = getRandom();
      const emoji = EMOJIS[indexEmoji];

      matrix[column][row] = emoji;
      matrixDom.append(generateCells(column, row, emoji));
    }
  }
};

const generateCells = (column, row, emoji) => {
  const square = document.createElement('div');
  square.classList.add('cell');
  square.innerHTML = emoji;

  square.addEventListener('click', clickCell);

  square.style.top = `${column * cell_size}px`;
  square.style.left = `${row * cell_size}px`;
  square.style.width = `${cell_size - 2}px`;
  square.style.height = `${cell_size - 2}px`;

  square.dataset.row = row;
  square.dataset.column = column;
  // square.id=`${row}-${column}`

  return square;
};

const getRowMatching = () => {
  const coords=[];
  for (let column = 0; column < matrix_size; column++) {
    let previous = null;
    let cont;
    for (let row = 0; row < matrix_size; row++) {
      if (previous != matrix[column][row]) {
        previous = matrix[column][row];
        cont = 0;
      } else {
        cont++;
      }
      if (cont >= 2) {
        let subRow = row;
        while(subRow < matrix_size && previous == matrix[column][subRow]){
          subRow++;
        }
        coords.push([[column, row-2],[column,subRow-1]]);
      }
    }
  }
  return coords;
};

const getColumnMatching = () => {
  const coords=[];
  for (let row = 0; row < matrix_size; row++) {
    let previous = null;
    let cont;
    for (let column = 0; column < matrix_size; column++) {
      if (previous != matrix[column][row]) {
        previous = matrix[column][row];
        cont = 0;
      } else {
        cont++;
      }
      if (cont >= 2) {
        const init = column-2;
        while(column < matrix_size && previous == matrix[column][row]){
          column++;
        }
        coords.push([[init, row],[column-1,row]]);
      }
    }
  }
  return coords;
};

// const drawMatrix = () =>{
//   for (let i = 0; i < grilla.length; i++) {
//     for (let j = 0; j < grilla[i].length; j++) {
//       if (grilla[i][j]) {
//         const cuadrado = generarCuadrado(j, i)

//         $grilla.appendChild(cuadrado)
//       }
//     }
//   }
// }

do {
  matrixDom.innerHTML = '';
  generateMatrix();
} while (getRowMatching().length || getColumnMatching().length);
