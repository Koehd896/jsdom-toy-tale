let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  addLikeListener();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyDiv = document.getElementById("toy-collection");
const cards = toyDiv.children;
function addLikeListener() {
  for (card of cards) {
    // card.children[3].addEventListener("click", addLike);
    console.log(card.children[3])
  }
}

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(function(toys) {
    for (const toy of toys) {
      const id = toy.id;
      toyDiv.innerHTML += `
        <div class="card" id=${id}>
        <h2>${toy.name}</h2>
        <img src="${toy.image}"/>
        <p>${toy.likes}</p>
        <button class='like-btn'>Like</button>
        </div>`;
    }
  })
}

// function createCard(id) {
//   // const card = document.createElement("div");
//   // card.className = "card";
//   // const h2 = document.createElement("h2");
//   // const img = document.createElement("img");
//   // const p = document.createElement("p");
//   // const button = document.createElement("button");
//   // button.className = "like-btn";
//   // button.innerText = "Like";
//   // card.append(h2, img, p, button);
//   // button.addEventListener("click", addLike(id, card));
//   // return card;

  

  

// }



function newToy(name, image) {
  const toyData = {
    "name": name,
    "image": image,
    "likes": 0
  }
  let toyConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  }
  fetch("http://localhost:3000/toys", toyConfig)
  .then(rsp => rsp.json())
  .then(function(toyObj) {
  const newCard = createCard();
  updateCard(newCard, toyObj);
  });
}

const toyForm = document.querySelector("form");
toyForm.addEventListener("submit", event => {
  event.preventDefault();
    console.log(event.target)
  const toyName = toyForm.name.value;
  const toyImg = toyForm.image.value;
  newToy(toyName, toyImg);
})

function addLike(event) {
  const id = event.target.id;
  const add = event.target.children[2].value + 1;
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      likes: add
    })
  }
  fetch(`http://localhost:3000/toys/${id})`, configObj)
  .then(rsp => rsp.json())
  .then(data => event.target.children[2].value = add);
}