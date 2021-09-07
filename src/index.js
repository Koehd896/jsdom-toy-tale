let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
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

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(function(toys) {
    const toyDiv = document.getElementById("toy-collection");
    for (const toy of toys) {
      const card = createCard();
      updateCard(card, toy);
      toyDiv.appendChild(card);
    }
  })
}

function createCard() {
  const card = document.createElement("div");
  card.className = "card";
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like";
  card.append(h2, img, p, button);
  return card;
}

function updateCard(card, toy) {
  card.querySelector("h2").innerText = toy.name;
  card.querySelector("img").src = toy.image;
  card.querySelector("p").innerText = toy.likes;
}

function addToy() {
  fetch("http://localhost:3000/toys", toyConfig)
}

let toyConfig = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(toyData)
}
// make toyData function

function setToyData(name, image) {

}

const toyForm = document.querySelector("form");
toyForm.addEventListener("submit", event => {
  event.preventDefault();
  const toyName = toyForm.elements["name"].value;
  const toyImg = toyForm.elements["image"].value;
  setToyData(toyName, toyImg);
})