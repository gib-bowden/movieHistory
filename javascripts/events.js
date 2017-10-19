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


module.exports = {pressEnter}; 