var matriz = [];
var caminosPosibles;
// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');
// ----------------------------------------

// Functions
const createCards = (quantity) => {
  matriz.splice(0, matriz.length); // Eliminar todos los elementos

  let cards = '';
  let square =1;
  let random;
  if(quantity<51 && quantity>=0){
    
    
    for(let i = 0; i < +quantity; i++) {
      matriz[i] = [];
      cards +=`<div class="row">`;
      for (let j = 0; j < square; j++) {
        random= Math.floor(Math.random() * 100);
        cards += `
        <div class="square">${random}</div>
      `; 
        matriz[i].push(random);
      }
      square+=1;
      cards +=`</div>`;


    }
    
    
  }else{
    alert("Las fila deben estar en la cantidad correcta");
  }
  return cards;
}

const drawCards = (cards) => {
  response.innerHTML = cards;
}

const encontrarCaminos = (matriz, fila, indice, caminoActual, caminos) =>{
  // Agregar el nodo actual al camino
  caminoActual.push(matriz[fila][indice]);

  // Si llegamos a la base, agregar este camino a la lista de caminos
  if (fila === matriz.length - 1) {
      caminos.push(caminoActual.slice()); // Usamos slice para copiar el camino
  } else {
      // Recursión hacia abajo
      encontrarCaminos(matriz, fila + 1, indice, caminoActual, caminos);
      encontrarCaminos(matriz, fila + 1, indice + 1, caminoActual, caminos);
  }

  // Eliminar el nodo actual del camino para retroceder
  caminoActual.pop();
}

const encontrarTodosLosCaminos = (matriz) => {
  var caminos = [];
  encontrarCaminos(matriz, 0, 0, [], caminos);
  return caminos;
}

const MejorCamino = () =>{
  let result=0;
  let sum=0;
  let camino;
  for (let i =0; i < caminosPosibles.length; i++){
    sum=0;
    for (let j = 0; j < caminosPosibles[i].length; j++) {
      sum += caminosPosibles[i][j];
      
    }
    if(result<=sum){
      result=sum;
      camino= caminosPosibles[i];
    }
  }
  document.getElementById("sumas").innerHTML = ("Sumas: "+result);
  console.log("suma",result);
  console.log("camino bueno",camino);
  document.getElementById("camino").innerHTML = ("Camino Bueno : "+camino);
}
// ----------------------------------------

// Event Handlers
const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const cards = createCards(formData.get('quantity'));
  drawCards(cards);
  caminosPosibles = encontrarTodosLosCaminos(matriz);
  console.log(caminosPosibles);
  MejorCamino();
}
// ----------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);
// ----------------------------------------



