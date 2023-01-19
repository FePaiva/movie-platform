const addMovieBtn = document.getElementById('add-movie-btn');
const searchMovieBtn = document.getElementById('search-btn');
const userInputs = document.querySelectorAll('input');

let movies = JSON.parse(localStorage.getItem('movies')) || [];

function clearUserInput() {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
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
}

addMovieBtn.addEventListener('click', addMovieHandler);
