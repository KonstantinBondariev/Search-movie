class MovieSerch {
  constructor(debaunce) {
    this.movieList = null
    this._debaunce = debaunce
    this.styleStr = `* {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: arial ;
          font-weight: 400;
          background-color: #F1F3F4;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px;
        }

        .movies {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-template-rows: 400px;
          grid-row-gap: 20px;
          gap: 20px;
        }

        .movie {
          display: block;
          position: relative;
          text-decoration: none;
          background-color: #FFFFFF;
        }
        .movie__type {
          position: absolute;
          width: 30px;
          height: 30px;
          background-color: antiquewhite;
          z-index: 2;
          top: 0;
        }

        .movie__img {
          width: 100%;
          min-height: 85%;
          max-height: 85%;  
          object-fit: cover;
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
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
        }

        .search {
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
        }

        .search__group {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-bottom: 20px;
          width: 100%;
        }

        .search__input {
          display: block;
          max-width: 400px;
          width: 100%;
          height: 2rem;
          border-color: grey;
          border-radius: 5px; 
        }

        .search__input--select {  
          max-width: 80px;
        }

        .search__lable {
          font-size: 1.2rem; 
        }`
  }

  _createElement({ type, attrs, container = null, position = "append" }) {
    const element = document.createElement(type)

    Object.keys(attrs).forEach((key) => {
      key !== "innerHTML"
        ? element.setAttribute(key, attrs[key])
        : (element.innerHTML = attrs[key])
    })

    switch (position) {
      case container && "append":
        container.append(element)
        break
      case container && "prepend":
        container.prepend(element)
        break
    }
    return element
  }

  _createMarkup() {
    this.container = this._createElement({
      type: "div",
      attrs: {
        class: "container",
      },
      container: document.body,
      position: "prepend",
    })

    this.movies = this._createElement({
      type: "div",
      attrs: {
        class: "movies",
      },
      container: this.container,
    })
    this.movieList = document.querySelector(".movies")

    this.searchForm = this._createElement({
      type: "div",
      attrs: {
        class: "search",
      },
      container: this.container,
      position: "prepend",
    })

    this.searchGroup1 = this._createElement({
      type: "div",
      attrs: {
        class: "search__group",
      },
      container: this.searchForm,
    })

    this.searchGroup2 = this._createElement({
      type: "div",
      attrs: {
        class: "search__group",
      },
      container: this.searchForm,
    })

    this._createElement({
      type: "lable",
      attrs: {
        class: "search__lable",
        for: "inputSearch",
        innerHTML: "Enter movie title",
      },
      container: this.searchGroup1,
    })

    this.searchInput = this._createElement({
      type: "input",
      attrs: {
        class: "search__input",
        id: "inputSearch",
        type: "search",
        placeholder: "Enter movie title",
      },
      container: this.searchGroup1,
    })

    this._createElement({
      type: "lable",
      attrs: {
        class: "search__lable",
        for: "select",
        innerHTML: "Filter movies by release year (executed on request ;) )",
      },
      container: this.searchGroup2,
    })

    this.selectYear = this._createElement({
      type: "select",
      attrs: {
        class: "search__input search__input--select",
        id: "select",
      },
      container: this.searchGroup2,
    })

    this._createElement({
      type: "option",
      attrs: {
        value: "all",
        innerHTML: `all`,
      },
      container: this.selectYear,
    })

    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      this._createElement({
        type: "option",
        attrs: {
          value: `${i}`,
          innerHTML: `${i}`,
        },
        container: this.selectYear,
      })
    }

    this._createElement({
      type: "h1",
      attrs: { innerHTML: "Search movie app" },
      container: this.container,
      position: "prepend",
    })
  }

  _checkYear(movie) {
    this.select = document.getElementById("select")
    this.select.addEventListener("change", function () {
      this.select.value = this.value
    })
    return this.select.value == "all"
      ? true
      : select.value == movie.Year
      ? true
      : false
  }

  _addMovieToList(movie) {
    console.log(movie)
    this.item = this._createElement({
      type: "a",
      attrs: {
        href: "#",
        class: "movie",
      },
      container: this.movieList,
    })

    this._createElement({
      type: "img",
      attrs: {
        class: "movie__img",
        src: /^(http|https):\/\//i.test(movie.Poster)
          ? movie.Poster
          : "assets/img/no-pictures.png",
        alt: `${movie.Title}, ${movie.Year}`,
        title: `${movie.Title}, ${movie.Year}`,
      },
      container: this.item,
    })

    this._createElement({
      type: "div",
      attrs: {
        class: "movie__title",
        innerHTML: `${movie.Title}, ${movie.Year}`,
      },
      container: this.item,
    })

    this.type = this._createElement({
      type: "div",
      attrs: {
        class: "movie__type",
      },
      container: this.item,
    })
    this._createElement({
      type: "img",
      attrs: {
        class: "movie__type-img",
        src:
          movie.Type == "movie"
            ? "assets/img/film.png"
            : movie.Type == "series"
            ? "assets/img/series.png"
            : null,
        alt:
          movie.Type == "movie"
            ? "movie"
            : movie.Type == "series"
            ? "series"
            : null,
      },
      container: this.type,
    })
  }

  _createStyle() {
    let style = document.createElement("style")

    style.innerHTML = this.styleStr

    document.head.append(style)
  }

  _clearMoviesMarckup(el) {
    el && (el.innerHTML = "")
  }

  data(data) {}
  //  так и несмог разобраться, вероятно потеря контекста
  _getData(url) {
    fetch(url)
      // todo обработка запроса
      .then((response) => response.json())
      .then((json) => json.Search)
      .then(this._addMovieToList)
    // then((movies) =>
    //   movies.forEach((movie) => {
    //     if (this._checkYear(movie)) {
    //       this._addMovieToList(movie)
    //       movies
    //     }
    //   })
    // ).catch((err) => console.log(err))
  }

  _inputSearchHendler(e) {
    this._debaunce(() => {
      const searchStr = e.target.value.trim()

      if (searchStr && searchStr.length > 3 && searchStr !== this.searchLast) {
        this._clearMoviesMarckup(this.movieList)
        let url = `https://www.omdbapi.com/?apikey=5e826b4b&s=${searchStr}`
        this._getData(url)
        // fetch(`https://www.omdbapi.com/?apikey=5e826b4b&s=${searchStr}`)
        //   .then((response) => response.json().then((json) => json.Search))
        //   .then((movies) =>
        //     movies.forEach((movie) => {
        //       if (this._checkYear(movie)) {
        //         this._addMovieToList(movie)
        //         movies
        //       }
        //     })
        //   )
        //   .catch((err) => console.log(err))
      }
    }, 500)
  }

  init() {
    this._createMarkup()
    this._createStyle()

    this.searchInput.addEventListener(
      "keyup",
      this._inputSearchHendler.bind(this)
    )
    this._debaunce.bind(this)
  }
}

export default MovieSerch
