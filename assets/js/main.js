import MovieSerch from './movieSearch.js';

const debaunce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(cb, ms);
  };
})();

const movieSerch = new MovieSerch(debaunce);

movieSerch.init();
