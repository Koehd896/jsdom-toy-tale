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
  button.addEventListener("click", addLike);
  return card;
}

function updateCard(card, toy) {
  card.querySelector("h2").innerText = toy.name;
  card.querySelector("img").src = toy.image;
  card.querySelector("p").innerText = toy.likes;
}

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
  console.log(event.target.parentNode)
  const id = event.target.parentNode.id
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      // object with new number of likes
    })
  }
  fetch(`http://localhost:3000/toys/${id})`, configObj)
  .then(rsp => rsp.json())
  .then(data => console.log(data));
}