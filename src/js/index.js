/* =====================================================
=============IMPORTS
========================================================*/
import ApiServise from './moduls/cat-api.js';
import Marcup from './moduls/marcup.js';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
/* =====================================================
=============initialization
========================================================*/
const API = new ApiServise();
const marc = new Marcup();
/* =====================================================
=============Object of referense
========================================================*/
const refs = {
  select: document.querySelector('.breed-select'),
  infoContainer: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

/* =====================================================
=============Main Code
========================================================*/
API.fetchBreeds()
  .then(data => {
    refs.select.classList.remove('visually-hidden');
    refs.loader.classList.add('visually-hidden');
    refs.select.insertAdjacentHTML('beforeend', marc.createMarcupSelect(data));
    refs.select.addEventListener('change', onChange);
  })
  .catch(() => {
    refs.select.classList.add('visually-hidden');
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

function onChange(event) {
  refs.loader.classList.remove('visually-hidden');
  refs.infoContainer.innerHTML = '';

  API.fetchCatByBreed(event.target.selectedOptions[0].dataset.value)
    .then(data => {
      const { url } = data[0];
      const option = data[0].breeds[0];
      refs.infoContainer.innerHTML = marc.createMarcupForDiv(url, option);
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    )
    .finally(() => refs.loader.classList.add('visually-hidden'));
}
