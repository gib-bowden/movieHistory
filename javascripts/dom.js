"use strict";

const movieDiv = $('#movies');

const domString = (arr, imgBaseURL, divName, search) => {
    let movieString = '';
    let posterSize = 'w342';
    if (arr.length === 0) {
        movieString += `<h3 style="text-align:center;">No Results Found</h3>`; 
    } 
    else {
        arr.forEach((movie, i) => {
            if (i % 3 === 0) {
                movieString += `<div class="row">`;
            }
            movieString += 
                `<div class="col-sm-6 col-md-4 movie">
                    <div class="thumbnail">`;
                    if (search === false) {
                        movieString += `<button data-firebase-id=${movie.id} class="btn btn-default delete-btn">X</button>`;
                    }
                    movieString +=                         
                        `<img class="poster-path" src="${imgBaseURL + posterSize + `/` + movie.poster_path}" alt="poster">
                        <div class="caption">
                            <h3 class="title">${movie.title}</h3>
                            <p class="overview">${movie.overview}</p>`;
                    if (search === true) {
                        movieString += `<p><a class="btn btn-primary review-btn" role="button">Review</a> <a class="btn btn-default wishlist-btn" role="button">Wishlist</a></p>`;
                    } else {
                        movieString += `<p>Rating:${movie.rating}</p>`;
                    }
                    movieString +=    
                        `</div>
                    </div>
                </div>`;
            if (i % 3 === 2 || i === arr.length - 1 ) {
                movieString += `</div>`;
            }
        });
    }
    printToDom(movieString, divName); 
};



const printToDom = (str, divName) => {
    $(`#${divName}`).html(str);
};

module.exports = {
    domString
};