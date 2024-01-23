const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

//func to fetch movie details using omdb api
const getMovieInfo = async (movie)=>{

    try{
    const myApiKey = "7826e522";
    const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`; // myapikey will match with movie name and t is used to specify title of movie & is used to separate both

    const response = await fetch(url);  //return a promise in form of response...await is used because it will take time
    
    if(!response.ok){
        throw new Error("Unable to fetch movie data");
    }
    const data = await response.json(); //json is type of data format..js object notation
    
    showMovieData(data);
    }
    catch(error){
        movieContainer.classList.add('noBackground');
        showErrorMessage("No movie Found!!")
    }
    
}

//func to show moviedata on screen

const showMovieData = (data)=>{

    movieContainer.innerHTML=""; //remove previous data
    movieContainer.classList.remove('noBackground');

    
    // destructuring assignment to extract properties from data object in form of array
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Director, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title} </h2> 
                              <p><strong>Rating: &#11088; </strong>${imdbRating} </p>`;
    
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre'); //added class to style in css

    Genre.split(",").forEach(element=> {
        const p = document.createElement('p');
        p.innerText= element;
        movieGenreElement.appendChild(p);

    });

    movieElement.appendChild(movieGenreElement);

    
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released} </p>
                              <p><strong>Duration: </strong>${Runtime} </p>  
                              <p><strong>Cast: </strong>${Actors} </p>
                              <p><strong>Director: </strong>${Director} </p>
                              <p><strong>Plot:  </strong>${Plot} </p>`;
                              
    
    //creating div for movie poster

    const moviePosterElement=document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
    
}


//func to display error msg

const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message} </h2>`;
    
    
}

//func to handle form submission

const handleFormSubmission = (e)=>{
    e.preventDefault(); //prevent to autosubmit
    const movieName = inputBox.value.trim(); //remove extra space before and after
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get information");
        movieContainer.classList.add('noBackground');
    }
}
// adding event listner
searchForm.addEventListener('submit' ,handleFormSubmission);
