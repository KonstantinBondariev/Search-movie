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
let movieList = null;
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
let searchInput = 'game';
const searchLast = null;
// let btn = null; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// let serchWithBtn = null; !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
    case container && 'append':
      container.append(element);
      break;
    case container && 'prepend':
      container.prepend(element);
      break;
  }
  return element;
};

const _createMarkup = () => {
  const container = _createElement({
    type: 'div',
    attrs: {
      class: 'container',
    },
    container: document.body,
    position: 'prepend',
  });

  const movies = _createElement({
    type: 'div',
    attrs: {
      class: 'movies',
    },
    container,
  });
  movieList = document.querySelector('.movies');

  const searchForm = _createElement({
    type: 'div',
    attrs: {
      class: 'search',
    },
    container,
    position: 'prepend',
  });

  const searchGroup1 = _createElement({
    type: 'div',
    attrs: {
      class: 'search__group',
    },
    container: searchForm,
  });

  const searchGroup2 = _createElement({
    type: 'div',
    attrs: {
      class: 'search__group',
    },
    container: searchForm,
  });

  _createElement({
    type: 'lable',
    attrs: {
      class: 'search__lable',
      for: 'inputSearch',
      innerHTML: 'Enter movie title',
    },
    container: searchGroup1,
  });

  searchInput = _createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'inputSearch',
      type: 'search',
      placeholder: 'Enter movie title',
    },
    container: searchGroup1,
  });

  _createElement({
    type: 'lable',
    attrs: {
      class: 'search__lable',
      for: 'select',
      innerHTML: 'choise movie Year',
    },
    container: searchGroup2,
  });

  const selectYear = _createElement({
    type: 'select',
    attrs: {
      class: 'search__input',
      id: 'select',
    },
    container: searchGroup2,
  });

  _createElement({
    type: 'option',
    attrs: {
      value: 'all',
      innerHTML: `all`,
    },
    container: selectYear,
  });

  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    _createElement({
      type: 'option',
      attrs: {
        value: `${i}`,
        innerHTML: `${i}`,
      },
      container: selectYear,
    });
  }

  // btn = _createElement({
  //   type: 'button',
  //   attrs: {
  //     class: 'search__input',
  //     id: 'btn',
  //     type: 'button',
  //     innerHTML: 'Serch',
  //   },
  //   container: searchForm,
  // });

  _createElement({
    type: 'h1',
    attrs: { innerHTML: 'Search movie app' },
    container,
    position: 'prepend',
  });
};

const _checkYear = (movie) => {
  let select = document.getElementById('select');
  select.addEventListener('change', function () {
    select.value = this.value;
  });
  return select.value == 'all'
    ? true
    : select.value == movie.Year
    ? true
    : false;
};

// const _checkYear = (movies) => {
//   let cureantMoviesArr = [];
//   let enteredMoviesArr = movies;
//   let select = document.getElementById('select');
//   select.addEventListener('change', function () {
//     select.value = this.value;
//   });
//   if (select.value == 'all') return true;

//   ((movies) => {
//     movies.forEach((movie) => {
//       if (movie.Year == select.velue) cureantMoviesArr.push(movie);
//     });
//   })(enteredMoviesArr);

//   _clearMoviesMarckup(movieList);

//   ((cureantMoviesArr) => {
//     cureantMoviesArr.forEach((movie) => {
//       _addMovieToList(movie);
//     });
//   })(cureantMoviesArr);
// };

const _addMovieToList = (movie) => {
  const item = _createElement({
    type: 'a',
    attrs: {
      href: '#',
      class: 'movie',
    },
    container: movieList,
  });

  _createElement({
    type: 'img',
    attrs: {
      class: 'movie__img',
      src: /^(http|https):\/\//i.test(movie.Poster)
        ? movie.Poster
        : 'assets/img/no-pictures.png',
      alt: `${movie.Title}, ${movie.Year}`,
      title: `${movie.Title}, ${movie.Year}`,
    },
    container: item,
  });

  _createElement({
    type: 'div',
    attrs: {
      class: 'movie__title',
      innerHTML: `${movie.Title}, ${movie.Year}`,
    },
    container: item,
  });

  const type = _createElement({
    type: 'div',
    attrs: {
      class: 'movie__type',
    },
    container: item,
  });
  _createElement({
    type: 'img',
    attrs: {
      class: 'movie__type-img',
      src:
        movie.Type == 'movie'
          ? 'assets/img/film.png'
          : movie.Type == 'series'
          ? 'assets/img/series.png'
          : null,
      alt:
        movie.Type == 'movie'
          ? 'movie'
          : movie.Type == 'series'
          ? 'series'
          : null,
    },
    container: type,
  });
};

const _createStyle = () => {
  const style = document.createElement('style');

  style.innerHTML = styleStr;

  document.head.append(style);
};

const _clearMoviesMarckup = (el) => el && (el.innerHTML = '');

const _getData = (url) =>
  fetch(url).then((response) => response.json().then((json) => json.Search));

_createMarkup();
// _createStyle();

const _debounce = (() => {
  let timer = null;

  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(cb, ms);
  };
})();

const inputSearchHendler = (e) => {
  _debounce(() => {
    const searchStr = e.target.value.trim();

    if (searchStr && searchStr.length > 3 && searchStr !== searchLast) {
      _clearMoviesMarckup(movieList);

      _getData(`http://www.omdbapi.com/?apikey=5e826b4b&s=${searchStr}`)
        .then((movies) =>
          movies.forEach((movie) => {
            if (_checkYear(movie)) {
              _addMovieToList(movie);
              movies;
            }
          })
        )
        .catch((err) => console.log(err));
    }
  }, 1000);
};

// const btnSerch = () => {
//   _getData(`http://www.omdbapi.com/?apikey=5e826b4b&s=${serchWithBtn}`).then(
//     (movies) =>
//       movies.forEach((movie) => {
//         if (_checkYear(movie)) _addMovieToList(movie);
//       })
//   );
// };

searchInput.addEventListener('keyup', inputSearchHendler);
// btn.addEventListener('click', btnSerch); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
