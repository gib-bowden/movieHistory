"use strict";

const movieDiv = $('#movies');

const domString = (arr) => {
    let movieString = '';
    arr.forEach((movie, i) => {
        if (i % 3 === 0) {
            movieString += `<div class="row">`;
        }
        movieString += 
            `<div class="col-sm-6 col-md-4">
                <div class="thumbnail">
                    <img src="..." alt="...">
                    <div class="caption">
                        <h3>${movie.original_title}</h3>
                        <p>${movie.overview}</p>
                        <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
                    </div>
                </div>
            </div>`;
        if (i % 3 === 2 || i === arr.length - 1 ) {
            movieString += `</div>`;
        }
    });
    printToDom(movieString); 
};



const printToDom = (str) => {
    movieDiv.append(str);
};

module.exports = {
    domString
};