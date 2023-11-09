var piramide = [];
// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');
const camino = document.querySelector('#camino');
// ----------------------------------------

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

const encontrarMejorCamino1 = (matriz) => {
  for (let i = matriz.length - 2; i >= 0; i--) {
    for (let j = 0; j < matriz[i].length; j++) {
      matriz[i][j] += Math.max(matriz[i + 1][j], matriz[i + 1][j + 1]);
    }
  }
  return matriz[0][0];
}
const encontrarMejorCamino = (matriz) => {
  const n = matriz.length;
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let mejorCamino = [];
  let fila = 0;
  let indice = 0;

  for (let i = 0; i < n; i++) {
    dp[n - 1][i] = matriz[n - 1][i];
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] = matriz[i][j] + Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }

  

  while (fila < n - 1) {
    mejorCamino.push(matriz[fila][indice]);
    if (dp[fila + 1][indice] > dp[fila + 1][indice + 1]) {
      indice = indice; 
    } else {
      indice = indice + 1; 
    }
    fila = fila + 1;
  }

  mejorCamino.push(matriz[n - 1][indice]); 

  return { bestPathSum: dp[0][0], camino: mejorCamino };
}

const createBestWay =(way) =>{
  let cards='';
  cards += `<div class="row">`;
  console.log(way,"bestway");
  for (let i = 0; i < way.length; i++) {
    
    cards += `
          <div class="square">${way[i]}</div>
        `;
  }
  cards += `</div>`;
  return cards;
}

const drawBestWay = (cards) =>{
  camino.innerHTML = cards;
}

// ----------------------------------------

// Event Handlers
const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const cards = createCards(parseInt(formData.get('quantity')));
  drawCards(cards);
  const {bestPathSum, camino } = encontrarMejorCamino(piramide);
  const ways = createBestWay(camino);
  drawBestWay(ways);
  document.getElementById("sumas").innerHTML = "Sumas: " + bestPathSum;
  
}

// ----------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);