// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');
// ----------------------------------------

// Functions
const createCards = (quantity) => {
  let cards = '';
  let square =1;
  let random;
  if(quantity<51 && quantity>=0){
    
    
    for(let i = 0; i < +quantity; i++) {
        
      cards +=`<div class="row">`;
      for (let i = 0; i < square; i++) {
        random= Math.floor(Math.random() * 100);
        cards += `
        <div class="square">${random}</div>
      `; 
        
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
// ----------------------------------------

// Event Handlers
const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const cards = createCards(formData.get('quantity'));
  drawCards(cards);
}
// ----------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);
// ----------------------------------------