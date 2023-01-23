const addMovieBtn = document.getElementById('add-movie-btn');
const searchMovieBtn = document.getElementById('search-btn');
const userInputs = document.querySelectorAll('input');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function clearUserInput() {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
}

function renderNewMovieElement(id, title, extraName, extraValue) {
  const movieList = document.getElementById('movie-list');
  const newMovieElement = document.createElement('li');
  newMovieElement.innerHTML = `
  <div>
  <h2>${title}</h2>
  <p>${extraName}: ${extraValue}</p>
  </div>
  `;
  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }

  movieList.append(newMovieElement);
}

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
  clearUserInput();
  localStorage.setItem('movies', JSON.stringify(movies));
  console.log(newMovie);
  renderNewMovieElement(
    newMovie.id,
    newMovie.info.title,
    extraName,
    extraValue
  );
}

movies.forEach((movie) => {
  for (let key in movie.info) {
    if (key !== 'title') {
      renderNewMovieElement(movie.id, movie.info.title, key, movie.info[key]);
    }
  }
});

// movies.forEach((movie) => {
//   renderNewMovieElement(
//     movie.id,
//     movie.info.title,
//     movie.info.extraName,
//     movie.info.extraValue
//   );
// });

addMovieBtn.addEventListener('click', addMovieHandler);
// localStorage.clear();
