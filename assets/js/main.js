// const _getData = (url) =>
//   new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.send();
//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         const json = JSON.parse(xhr.response);
//         resolve(json.Search);
//       } else reject(xhr.status);
//     };
//     xhr.onerror = (err) => reject(err);
//   });
let movielist = null;
const styleStr = `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: arial ;
  font-weight: 400;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.movie {
  position: relative;
}
.movie__type {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: antiquewhite;
}

.movie__img {

  width: 100%;
}

.movie__type-img {
  width: 80%;

  display: block;
  margin: 2px auto;
  border-radius: 3px;
}

.movie__title {
  width: 100%;
  height: 15%;
  background-color: blue;
  color: tomato;
  
  display: flex;
  justify-content: center;
  align-items: center;
}`;

const _createElement = ({
  type,
  attrs,
  container = null,
  position = 'append',
}) => {
  const element = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    key !== 'innerHTML'
      ? element.setAttribute(key, attrs[key])
      : (element.innerHTML = attrs[key]);
  });

  switch (position) {
    case 'append':
      container.append(element);
      break;
    case 'prepend':
      container.prepend(element);
      break;
  }
};

const _createMarkup = () => {
  const container = document.createElement('div');
  // const movies = document.createElement('div');

  container.setAttribute('class', 'container');
  // movies.setAttribute('class', 'movies');

  // container.append(movies);
  document.body.prepend(container);

  const movies = _createElement({
    type: 'div',
    attrs: {
      class: 'movies',
    },
    container,
  });
  movielist = document.querySelector('.movies');

  // ---------------

  _createElement({
    type: 'h1',
    attrs: { innerHTML: 'Search movie app' },
    container,
    position: 'prepend',
  });
};

const _addMovieToList = (movie) => {
  const item = document.createElement('div');
  item.setAttribute('class', 'movie');
  movielist.append(item);

  const img = document.createElement('img');
  img.setAttribute('class', 'movie__img');

  if (/^(http|https):\/\//i.test(movie.Poster)) {
    img.src = movie.Poster;
  } else {
    img.src = 'assets/img/no-pictures.png';
  }
  img.alt = `${movie.Title}, ${movie.Year}`;
  img.title = `${movie.Title}, ${movie.Year}`;
  item.append(img);

  const title = document.createElement('div');
  title.setAttribute('class', 'movie__title');
  title.innerHTML = `${movie.Title}, ${movie.Year}`;

  item.append(title);

  const type = document.createElement('div');
  type.setAttribute('class', 'movie__type');
  item.append(type);

  const typeImg = document.createElement('img');
  typeImg.setAttribute('class', 'movie__type-img');
  switch (movie.Type) {
    case 'movie':
      typeImg.src = 'assets/img/film.png';
      typeImg.alt = 'movie';
      break;
    case 'series':
      typeImg.src = 'assets/img/series.png';
      typeImg.alt = 'series';
      break;
  }
  type.append(typeImg);
};

const _createStyle = () => {
  const style = document.createElement('style');

  style.innerHTML = styleStr;

  document.head.append(style);
};

const _getData = (url) =>
  fetch(url).then((response) => response.json().then((json) => json.Search));

const search = 'spiderman';

_createMarkup();
_createStyle();

_getData(`http://www.omdbapi.com/?apikey=5e826b4b&s=${search}`)
  .then((movies) => movies.forEach((movie) => _addMovieToList(movie)))
  .catch((err) => console.log(err));
