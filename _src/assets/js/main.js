/* eslint-disable no-inner-declarations */
'use strict';

const button = document.querySelector('.search');
const input = document.querySelector('.input');
const list = document.querySelector('.list');
let listFavourites = document.querySelector ('.myFavourites');
const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let favourites = [];

const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
if (savedFavourites) {
  saveData();
}

function search () {
  list.innerHTML = '';
  const url = `http://api.tvmaze.com/search/shows?q=${input.value}`;
  fetch(url)
    .then (response => response.json())
    .then (data => {
      console.log(data);

      for (const result of data) {
        if (result.show.image === null) {
          list.innerHTML += `<li class="serie"><img class="photo" src="${imgDefault}"<br><h3 class="title_serie">${result.show.name}</h3></li>`;
        } else {
          list.innerHTML += `<li class="serie"><img class="photo" src="${result.show.image.medium}"<br><h3 class="title_serie">${result.show.name}</h3></li>`;
        }
      }
      const everyShow = document.querySelectorAll('li');
      for (const li of everyShow) {
        li.addEventListener('click', fav);
      }
    });
}

function fav(event) {
  const li = event.currentTarget;
  const photo = li.querySelector('.photo').src;
  const titleSerie = li.querySelector('.title_serie').innerHTML;
  li.classList.toggle('favourite');
  if (li.classList.contains('favourite')) {
    favourites.push({photo, titleSerie});
    console.log(favourites);
  }
  listFavourites.innerHTML = '';
  for (let i=0; i<favourites.length; i++) {
    listFavourites.innerHTML += `<li class="favourite_serie"><img class="favourite_photo" src="${favourites[i].photo}"><br><h3 class="favourite_title_serie">${favourites[i].titleSerie}</h3></li>`;
    //   const newItem = document.createElement('li');
    //   const newContent = document.createTextNode(`${favourites[i].innerHTML}`);
    //   newItem.appendChild(newContent);
    //   listFavourites.appendChild(newItem);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
}

button.addEventListener('click', search);

function saveData() {
  const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
  console.log(savedFavourites.length);
  if (listFavourites.innerHTML === ''){
    favourites = savedFavourites;
    for (let i=0; i<savedFavourites.length; i++) {
      listFavourites.innerHTML += `<li class="favourite_serie"><img class="favourite_photo" src="${savedFavourites[i].photo}"><br><h3 class="favourite_title_serie">${savedFavourites[i].titleSerie}</h3></li>`;
    }
  }
}
//node modules