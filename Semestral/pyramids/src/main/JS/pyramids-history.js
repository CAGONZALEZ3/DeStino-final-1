
// Global variables
let pyramidList;

//HTML elements
const list = document.querySelector("#list-pyramids");
const canvasTittle = document.querySelector("#canvas-tittle");
const canvas = document.querySelector(".content");
const canvasFooter = document.querySelector("#canvas-footer");

// Functions
const listPyramids = (number) => {
    let items = '';
    for (let i = 0; i < number; i++) {
        items += `<div class = "list-items" > Piramide #${(i+1)}</div> `
    }
    return items;
}

const renderList = (items) => {
    list.innerHTML = items;
}

const addListnnersToList = (items, array) => {
    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            canvasTittle.innerHTML = array.pyramids[i].totalSum;
            canvas.innerHTML = array.pyramids[i].draw;
            canvasFooter.innerHTML = array.pyramids[i].path;
        });
    });
}

// Event handlers
const test = (e) => {
    e.preventDefault();

    const url = "http://localhost:4567/pyramids";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            pyramidList = data;
            console.log(pyramidList);

            renderList(listPyramids(pyramidList.pyramids.length ));

            const items = document.querySelectorAll('.list-items');

            addListnnersToList(items, pyramidList);

            



        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Event listeners
window.addEventListener('load',test);
