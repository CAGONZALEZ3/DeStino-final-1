
// Global variables
let height;

//HTML elements
const form = document.querySelector('form');
const btn_history = document.querySelector('#right-side-top-right'); // new
const btn_rst = document.querySelector('#right-side-top-left');
const canvasPyramid = document.querySelector('#content');
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
    btn_history.innerHTML = '<button> <a href="pyramids-history.html" target="_blank"> <h1>Ver Historial de Piramides</h1> </a> </button>';    
    btn_rst.innerHTML = '<button id="reset-btn">  <h1>&#x27F3;</h1> </button> ';
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
  let bestPath = '<div id="gran-total-path" class="row-ideal-path">';
  for (let i = 0; i < bestPathValues.length; i++) {
    bestPath += ` <div class="square"> ${bestPathValues[i]} </div> `;
  }
  bestPath += `</div>`;
  return bestPath;
}

const paintCanvasBestPath = (bestPathSumValue, bestPath) => {
  canvasBestPath.innerHTML = ` <div id="gran-total" class="row-ideal-path"> <h1>Sumatoria: ${bestPathSumValue}</h1> </div> `;
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

    const temp1 = document.querySelector('#content');
    const temp2 = document.querySelector('#gran-total');
    const temp3 = document.querySelector('#gran-total-path');

    const pyramidGenerated = temp1.innerHTML;
    const pyramidGrantTotal = temp2.innerHTML;
    const pyramidBestPath = temp3.innerHTML;

    const url = 'http://localhost:4567/pyramids';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
      },
      body: JSON.stringify({
        pyramid: pyramidGenerated,
        total: pyramidGrantTotal,
        path: pyramidBestPath
      }) // Convert data to JSON format
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => { // Work with the retrieved data
        console.log(data);
      })
      .catch(error => { // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
      });

}

const showPyramids = (e) =>{
  e.preventDefault();
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
