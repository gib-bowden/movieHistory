"use strict"; 

const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const movieSearchField = $("#movie-search-field"); 

const pressEnter = () => {
    $('body').keypress((e) => {
        if (e.which === 13) {
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

const googleAuth = () => {
    $('#google-btn').click((e) => {
        firebaseApi.authenticateGoogle().then((results) => {
            console.log(results); 
        }).catch((error) => {
            console.log(error); 
        }); 
    });
};


module.exports = {pressEnter, myLinks, googleAuth
}; 