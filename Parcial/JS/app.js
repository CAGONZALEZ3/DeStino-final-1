
var piramide = [];
let idealPath = [];
let quantity;

// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');
const camino = document.querySelector('#camino');
const reset = document.querySelector('#reset-btn');

// Functions
const createCards = (quantity) => {
  piramide = []; 
  let cards = '';
  let row = 1;

  if (quantity < 51 && quantity >= 0) {
    for (let i = 0; i < quantity; i++) {
      piramide[i] = [];
      cards += `<div class="row">`;
      for (let j = 0; j < row; j++) {
        const random = Math.floor(Math.random() * 100);
        cards += `
          <div class="square">${random}</div>
        `;
        piramide[i].push(random);
      }
      row += 1;
      cards += `</div>`;
    }
  } else {
    alert("Las filas deben estar en la cantidad correcta");
  }

  return cards;
}

const drawCards = (cards) => {
  response.innerHTML = cards;
}


const encontrarMejorCamino = (matriz) => {
  const n = matriz.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let mejorCamino = [];
  let fila = 0;
  let xedin = 0;

  for (let i = 0; i < n; i++) {
    dp[n - 1][i] = matriz[n - 1][i];
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] = matriz[i][j] + Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }

  

  while (fila < n - 1) {
    mejorCamino.push(matriz[fila][xedin]);
    if (dp[fila + 1][xedin] > dp[fila + 1][xedin + 1]) {
      xedin = xedin; 
    } else {
      xedin = xedin + 1; 
    }
    fila = fila + 1;
  }

  mejorCamino.push(matriz[n - 1][xedin]); 

  return { bestPathSum: dp[0][0], camino: mejorCamino };
}

const createBestWay = (way) =>{
  let cards='';
  cards += `<div class="row">`;
  console.log(way,"bestway");
  for (let i = 0; i < way.length; i++) {
    cards += `
          <div class="square">${way[i]}</div>
        `;
    idealPath[i] = way[i];
  }
  cards += `</div>`;
  return cards;
}

const drawBestWay = (cards) =>{
  camino.innerHTML = cards;
}

const colorWay = (idealPath) => {
  const rows = document.querySelectorAll('.row');
  for (let i = 0; i < idealPath.length; i++) {
    for (let j = 0; j < rows.item(i+1).childElementCount; j++) {
      if( idealPath[i] == parseInt(rows.item(i+1).children.item(j).innerText) )
        rows.item(i+1).children.item(j).classList.replace("square", "square-color-way");
    }
  }
}

// Event Handlers

const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  quantity = formData.get('quantity');
  const cards = createCards(parseInt(quantity));
  reset.style.display = 'block';
  drawCards(cards);
  const {bestPathSum, camino } = encontrarMejorCamino(piramide);
  const ways = createBestWay(camino);
  drawBestWay(ways);
  colorWay(idealPath);
  document.getElementById("sumas").innerHTML = "Sumas: " + bestPathSum; 
}

const resetPyramid = (e) => {
  e.preventDefault();
  const cards = createCards(parseInt(quantity));
  drawCards(cards);
  const {bestPathSum, camino } = encontrarMejorCamino(piramide);
  const ways = createBestWay(camino);
  drawBestWay(ways);
  colorWay(idealPath);
  document.getElementById("sumas").innerHTML = "Sumas: " + bestPathSum; 
}

// Event Listeners
form.addEventListener('submit', onFormSubmit);
reset.addEventListener('click', resetPyramid);