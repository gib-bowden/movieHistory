"use strict";

const movieDiv = $('#movies');

const domString = (arr, imgBaseURL, divName) => {
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
                    <div class="thumbnail">
                        <img class="poster-path" src="${imgBaseURL + posterSize + movie.poster_path}" alt="poster">
                        <div class="caption">
                            <h3 class="title">${movie.title}</h3>
                            <p class="overview">${movie.overview}</p>
                            <p><a class="btn btn-primary review-btn" role="button">Review</a> <a class="btn btn-default wishlist-btn" role="button">Wishlist</a></p>
                        </div>
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