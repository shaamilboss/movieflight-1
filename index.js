const autoConfig = {
    renderOption(movie){
        const imgSrc=movie.Poster =='N/A'?'':movie.Poster
        return `
            <img src ="${imgSrc}" width="50"/>
            ${movie.Title} ${movie.Year}
        `
    },
    inputValue(movie) {
        return movie.Title
    },
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com', {
            params: {
                apikey: '4d953df8',
                s: searchTerm
            }
        })
        if(response.data.Error) {
            return [];
        }
        return response.data.Search;
    }

}
createSomething({
    ...autoConfig,
    root:document.querySelector('#left-autocomplete'),
    optionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        movieSelector(movie,document.querySelector('#left-summary'))
    },
})
createSomething({
    ...autoConfig,
    root:document.querySelector('#right-autocomplete'),
    optionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden')
        movieSelector(movie,document.querySelector('#right-summary'))
    },
})
const movieSelector= async (movie,whichSummary) =>{
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '4d953df8',
            i: movie.imdbID
        }
    })
    whichSummary.innerHTML=movieTemplate(response.data)
}
const movieTemplate =movieDetail=>{
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notificaton is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">awards</p>
    </article>
    <article class="notificaton is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">box office</p>
    </article>
    <article class="notificaton is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">meta score</p>
    </article>
    <article class="notificaton is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notificaton is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB VOtes</p>
    </article>
    `
}