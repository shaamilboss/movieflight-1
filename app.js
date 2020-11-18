const fetchdata=async searchTerm=>{
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '4d953df8',
            s: searchTerm
        }
    })
    if(response.data.Error){
        return [];
    }
    return response.data.Search
}
const root = document.querySelector('#left-autocomplete')
root.innerHTML=`
    <label><b>search movie in left</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `
const dropdown =document.querySelector('.dropdown')
const resultsRapper =document.querySelector('.results')
const input =document.querySelector('input')
const movieOnce=async movie=>{
    const response = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '4d953df8',
            i: movie.imdbID
        }
    })
    document.querySelector('#left-summary').innerHTML=movieTemplate(response.data)
}

const movieTemplate=movieDetail=>{
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
        <article class="notification">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">awards</p>
        </article>
        <article class="notification">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">imdbRating</p>
        </article>
        <article class="notification">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">imdbVotes</p>
        </article>
    `
}
const onInput=async event =>{
    const movies =await fetchdata(event.target.value)
    dropdown.classList.add('is-active')
    if (!movies.length){
        return '';
    }
    for (let movie of movies){
        const option =document.createElement('a')
        option.classList.add('dropdown-item')
        option.innerHTML=`
            <img src=${movie.Poster} width="50"/>
            ${movie.Title}
        `
        resultsRapper.appendChild(option)
        option.addEventListener('click',()=>{
            dropdown.classList.remove('is-active')
            const summary =document.querySelector('#left-summary')
            summary.innerHTML=`
                <img src="${movie.Poster}"/>
                <p>${movie.Title}</p>
            `

            movieOnce(movie)
        })
    }
}
input.addEventListener('input',debounce(onInput))
document.addEventListener('click', event=>{
    if(!document.contains(root)){
        dropdown.classList.remove('is-active')
    }
})
