const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2UxYTY0MDViYmYyYWE2MGFiMTQzZGY2NWU3NWFhNiIsInN1YiI6IjY2MjllODU3ZGM4NjQ3MDBhYjUyNTJkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W8gLLUeYNGzuKKwoIl0uk8MXc3QaaBf7Ech-mEE5woc'
    }
};
  
const list = document.querySelector('.list-container');
const input = document.querySelector('input');
const enter = document.querySelector('.enter');

function getMovies(){
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            response.results.forEach((movie)=>{
                let card = document.createElement('div');
                card.classList.add('card');
                card.id = movie['title'];

                let img = document.createElement('img');

                let card_bottom = document.createElement('div');
                card_bottom.classList.add('card_bottom');

                let title = document.createElement('h1');
                let releaseYear = document.createElement('p');

                card_bottom.append(title, releaseYear);
                card.append(img, card_bottom);
                list.appendChild(card);

                title.textContent = movie['title'];
                img.src = `https://image.tmdb.org/t/p/w200${movie['poster_path']}`
                releaseYear.textContent = `${movie['release_date'].slice(0,4)}.`

                card.addEventListener('click',function(){
                    alert(`영화 id : ${movie['id']}`)
                })
            })
            
        })
        .catch(err => console.error(err));
}

getMovies();

function searchMovie(){
    if(input.value.trim() !== ''){
        let count = 0;
        for(let j=1; j<=list.childElementCount; j++){
            list.childNodes[j].style.display = 'none';
            if(list.childNodes[j].id.toLowerCase().includes(input.value.toLowerCase())){
                list.childNodes[j].style.display = 'block';
                count++;
                scrollTo(0,300);
            }
        }
        if (count === 0){alert('검색 결과가 없습니다.')};
    }
};

enter.addEventListener('click',function(event){
    event.preventDefault();
    searchMovie();
});

function enterkey(){
    if(window.event.keyCode===13){
    searchMovie();
    }
};
