const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐻', '🐰'];

const matrixDom = document.getElementById('matrix');

const matrix_size = 9;
const cell_size = 56;
const matrix = [];

let previousClickCell = null;

const clickCell =(e) =>{
  const nextClickCell = e.target;

  if(previousClickCell === nextClickCell){
    console.log("same");
    previousClickCell.classList.remove("cell--selected");
    previousClickCell = null;
  }else if(previousClickCell){
    console.log("new");

    const diffX = previousClickCell.dataset.row - nextClickCell.dataset.row;
    const diffY = previousClickCell.dataset.column - nextClickCell.dataset.column;
    console.log({diffX,diffY},(diffX >= -1 && diffX <=1),(diffY >= -1 && diffY <=1));
    if((diffX >= -1 && diffX <=1) && (diffY >= -1 && diffY <=1)){
      nextClickCell.classList.add("cell--selected");

      const columnPrevious = previousClickCell.dataset.column;
      const columnNext = nextClickCell.dataset.column;
      const rowPrevius = previousClickCell.dataset.row;
      const rowNext = nextClickCell.dataset.row;

      nextClickCell.style.top = `${ columnPrevious * cell_size}px`
      nextClickCell.style.left = `${ rowPrevius * cell_size}px`
      previousClickCell.style.top = `${ columnNext * cell_size}px`
      previousClickCell.style.left = `${ rowNext * cell_size}px`

      nextClickCell.dataset.row = rowPrevius
      nextClickCell.dataset.column = columnPrevious

      previousClickCell.dataset.row = rowNext
      previousClickCell.dataset.column = columnNext
      previousClickCell.classList.remove("cell--selected");
      nextClickCell.classList.remove("cell--selected");

      previousClickCell = null;
    }
  }else{
    console.log("old");
    previousClickCell = nextClickCell;
    previousClickCell.classList.add("cell--selected");
  }
}


const getRandom = () => {
  return Math.round(Math.random() * (EMOJIS.length - 1));
};

const generateMatrix = () => {
  for (let column = 0; column < matrix_size; column++) {
    matrix[column] = [];
    for (let row = 0; row < matrix_size; row++) {
      const indexEmoji = getRandom();
      const emoji = EMOJIS[indexEmoji];

      matrix[column][row] = indexEmoji;

      matrixDom.append(generateCells(column, row, emoji));

    }
  }
};

const generateCells = (column,row,emoji) => {
  const square = document.createElement('div')

  square.classList.add('cell')
  square.dataset.row = row
  square.dataset.column = column
  square.id=`${row}-${column}`

  square.innerHTML = emoji

  square.addEventListener('click',clickCell)

  square.style.top = `${column * cell_size}px`
  square.style.left = `${row * cell_size}px`
  square.style.width = `${cell_size  -2}px`
  square.style.height = `${cell_size  -2}px`

  return square;
}

generateMatrix();


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
