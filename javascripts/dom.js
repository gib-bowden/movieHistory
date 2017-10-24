"use strict";

const movieDiv = $('#movies');

const domString = (arr, imgBaseURL) => {
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
                `<div class="col-sm-6 col-md-4">
                    <div class="thumbnail">
                        <img src="${imgBaseURL + posterSize + movie.poster_path}" alt="poster">
                        <div class="caption">
                            <h3>${movie.original_title}</h3>
                            <p>${movie.overview}</p>
                            <p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Wishlist</a></p>
                        </div>
                    </div>
                </div>`;
            if (i % 3 === 2 || i === arr.length - 1 ) {
                movieString += `</div>`;
            }
        });
    }
    printToDom(movieString); 
};



const printToDom = (str) => {
    movieDiv.html(str);
};

module.exports = {
    domString
};