"use strict"; 

const tmdb = require('./tmdb');

const movieSearchField = $("#movie-search-field"); 

const pressEnter = () => {
    $('body').keypress((e) => {
        if (e.which === 13) {
            console.log(movieSearchField.val()); 
            let searchString = movieSearchField.val();
            tmdb.searchMovies(searchString); 
        }
    });
};

const myLinks = () => {
    $('#navbar').click((e) => {
        if (e.target.id === 'nav-auth-btn') {
            $('#auth-screen').removeClass("hide");
            $('#my-movies').addClass("hide");
            $('#search').addClass("hide");
        }
        else if (e.target.id === 'nav-my-movies-btn') {
            $('#auth-screen').addClass("hide");
            $('#my-movies').removeClass("hide");
            $('#search').addClass("hide"); 
        }
        else if (e.target.id === 'nav-search-btn') {
            $('#auth-screen').addClass("hide");
            $('#my-movies').addClass("hide");
            $('#search').removeClass("hide");
        }
    });
};


module.exports = {pressEnter, myLinks
}; 