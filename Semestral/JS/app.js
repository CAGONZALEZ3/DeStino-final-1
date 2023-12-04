
// Global variables
let height;

//HTML elements
const form = document.querySelector('form');
const btn_rst = document.querySelector('#right-side-top');
const canvasPyramid = document.querySelector('#right-side-bottom');
const canvasBestPath = document.querySelector('#ideal-path');

// Functions
const validateNumber = (array, value) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == value)
            return false;
    }
    return true;
}

const generatePyramidValues = (height, validateNumber) => {
  let row;
  let pyramidValues = [];
  let rndNumber = 0;
  for (let i = 0; i < height; i++){
    row = [];
    row.push(Math.floor(Math.random()*100 ) );
    for (let j = 0; j < (i+1); j++){
      do {
        rndNumber = Math.floor(Math.random()*100 );
      }while(validateNumber(row,rndNumber) == false );
      row.push(rndNumber);
    }
    pyramidValues.push(row);
  }
  return pyramidValues;
}

const drawPyramid = (height, pyramidValues) => {
  let pyramid = '';
  for (let i = 0; i < height; i++) {
    pyramid += ' <div class="row"> ';
    for (let j = 0; j < (i+1); j++) {
      pyramid += ` <div class="square"> ${pyramidValues[i][j]} </div> `;
    }
    pyramid += '</div>';
  }
  return pyramid;
}

const paintCanvasPyramid = (pyramid) => {
    btn_rst.innerHTML = ' <button id="reset-btn">&#x21bb;</button> ';
    canvasPyramid.innerHTML = pyramid;
}

const findBestPath = (pyramidValues) => {

  const n = pyramidValues.length;
  const matrixTemp = new Array(n).fill(0).map(() => new Array(n).fill(0) );
  let bestPath = [];
  let row = 0;
  let column = 0;

  for (let i = 0; i < n; i++) {
    matrixTemp[n-1][i] = pyramidValues[n-1][i];
  }

  for (let i = n-2; i >-1; i--) {
    for (let j = 0; j <= i; j++) {
      matrixTemp[i][j] = pyramidValues[i][j] + Math.max(matrixTemp[i+1][j], matrixTemp[i+1][j+1] );
    }
  }

  while (row < n-1) {
    bestPath.push(pyramidValues[row][column]);
    if (matrixTemp[row+1][column] > matrixTemp[row+1][column+1] ) {
      column = column;
    } else {
      column += 1;
    }
    row++;
  }

  bestPath.push(pyramidValues[n-1][column] ); 

  return { bestPathSumValue: matrixTemp[0][0], bestPathValues: bestPath };

}

const drawBestPath = (bestPathValues) => {
  let bestPath = '<div class="row-ideal-path">';
  for (let i = 0; i < bestPathValues.length; i++) {
    bestPath += ` <div class="square"> ${bestPathValues[i]} </div> `;
  }
  bestPath += `</div>`;
  console.log(bestPath);
  return bestPath;
}

const paintCanvasBestPath = (bestPathSumValue, bestPath) => {
  canvasBestPath.innerHTML = ` <div class="row-ideal-path"> <h1>Sumatoria: ${bestPathSumValue}</h1> </div> `;
  canvasBestPath.innerHTML += bestPath;
}

const paintBestPathPyramid = (bestPathValues) => {
  const rows = document.querySelectorAll('.row');
  for (let i = 0; i < bestPathValues.length; i++) {
    for (let j = 0; j < rows.item(i).childElementCount; j++) {
      if( bestPathValues[i] == parseInt(rows.item(i).children.item(j).innerText) )
        rows.item(i).children.item(j).classList.replace("square", "square-color-way");
    }
  }
}

// Event handlers
const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    height = formData.get('height');
    const pyramidValues = generatePyramidValues(height,validateNumber);
    const pyramid = drawPyramid(height, pyramidValues);
    paintCanvasPyramid(pyramid);
    const {bestPathSumValue, bestPathValues} = findBestPath(pyramidValues);
    const bestPath = drawBestPath(bestPathValues);
    paintCanvasBestPath(bestPathSumValue,bestPath);
    paintBestPathPyramid(bestPathValues);
}

const resetPyramid = (e) => {
  e.preventDefault();
  const pyramidValues = generatePyramidValues(height,validateNumber);
  const pyramid = drawPyramid(height, pyramidValues);
  paintCanvasPyramid(pyramid);
  const {bestPathSumValue, bestPathValues} = findBestPath(pyramidValues);
  const bestPath = drawBestPath(bestPathValues);
  paintCanvasBestPath(bestPathSumValue,bestPath);
  paintBestPathPyramid(bestPathValues);
}

// Event listeners
form.addEventListener('submit', onSubmitForm);
btn_rst.addEventListener('click', resetPyramid);
