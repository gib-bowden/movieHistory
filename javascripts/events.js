"use strict"; 

const tmdb = require('./tmdb');
const dom = require('./dom');
const firebaseApi = require('./firebaseApi');
const movieSearchField = $("#movie-search-field"); 


const getMyMovies = () => {
    firebaseApi.getMovieList().then((results) => {
        dom.domString(results, tmdb.getImgConfig().base_url, "my-movies", false);
    }).catch((error) => {
        console.log(error); 
    });
};

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
            getMyMovies(); 
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

const wishListEvents = () => {
    $("body").on("click", ".wishlist-btn", (e) => {
        let movieParent = e.target.closest('.movie');

        let newMovie = {
            "title": $(movieParent).find('.title').html(),
            "overview": $(movieParent).find('.title').html(),
            "poster_path":$(movieParent).find('.poster-path').attr("src").split("/").pop(),
            "rating": null,
            "isWatched": false,
            "uid":""
        };
        firebaseApi.saveMovie(newMovie).then((result) => {
            console.log(result); 
        }).catch((err) => {
            console.log(err);
        });
        movieParent.remove(); 
    });
};

const reviewEvents = () => {
    $("body").on("click", ".review-btn", (e) => {
        let movieParent = e.target.closest('.movie');

        let newMovie = {
            "title": $(movieParent).find('.title').html(),
            "overview": $(movieParent).find('.title').html(),
            "poster_path":$(movieParent).find('.poster-path').attr("src").split("/").pop(),
            "rating": null,
            "isWatched": true,
            "uid":""
        };
        console.log(newMovie.poster_path); 
        firebaseApi.saveMovie(newMovie).then((result) => {
            console.log(result); 
        }).catch((err) => {
            console.log(err);
        });
        movieParent.remove();
    });
};

const deleteMovie = () => {
    $('body').on('click', '.delete-btn', (e) => {
        let movieId = $(e.target).data('firebase-id'); 
        firebaseApi.deleteMovie(movieId).then(() => {
            getMyMovies(); 
        }).catch((err) => {
            console.log(err);
        });
    });
};

const init = () => {
    myLinks();
    wishListEvents();
    reviewEvents();
    googleAuth(); 
    pressEnter();
    deleteMovie(); 
};



module.exports = {
    init
};