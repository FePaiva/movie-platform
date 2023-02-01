const addMovieBtn = document.getElementById('add-movie-btn');
const searchMovieBtn = document.getElementById('search-btn');
const userInputs = document.querySelectorAll('input');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function clearUserInput() {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
}

const renderNewMovieElement = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.toLowerCase().includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    let text = movie.info.title + ' - ';
    for (const key in movie.info) {
      if (key !== 'title') {
        text = text + `${key}: ${movie.info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

function addMovieHandler() {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;
  if (
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random(),
  };

  movies.push(newMovie);
  localStorage.setItem('movies', JSON.stringify(movies));
  console.log(newMovie);
  renderNewMovieElement();
  clearUserInput();
}

const searchMovieHandler = () => {
  const filterTerm = document
    .getElementById('filter-title')
    .value.toLowerCase();
  clearUserInput();
  renderNewMovieElement(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchMovieBtn.addEventListener('click', searchMovieHandler);
// localStorage.clear();

renderNewMovieElement();
