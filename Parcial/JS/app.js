var matriz = [];
// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');
// ----------------------------------------

// Functions
const createCards = (quantity) => {
  matriz = []; 
  let cards = '';
  let row = 1;

  if (quantity < 51 && quantity >= 0) {
    for (let i = 0; i < quantity; i++) {
      matriz[i] = [];
      cards += `<div class="row">`;
      for (let j = 0; j < row; j++) {
        const random = Math.floor(Math.random() * 100);
        cards += `
          <div class="square">${random}</div>
        `;
        matriz[i].push(random);
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
  for (let i = matriz.length - 2; i >= 0; i--) {
    for (let j = 0; j < matriz[i].length; j++) {
      matriz[i][j] += Math.max(matriz[i + 1][j], matriz[i + 1][j + 1]);
    }
  }
  return matriz[0][0];
}

// ----------------------------------------

// Event Handlers
const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const cards = createCards(parseInt(formData.get('quantity')));
  drawCards(cards);
  const bestPathSum = encontrarMejorCamino(matriz);
  document.getElementById("sumas").innerHTML = "Sumas: " + bestPathSum;
}

// ----------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);
