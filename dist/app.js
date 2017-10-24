(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi'); 

const apiKeys = () => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `db/config.json`
        }).done((data) => {
            resolve(data.config); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((results) => {        
        tmdb.setKey(results.tmdb.apiKey);
        firebaseApi.setObject(results.firebase);
        firebase.initializeApp(results.firebase); 
    }).catch((error) => {
        console.log(error); 
    });
};

module.exports = {retrieveKeys};
},{"./firebaseApi":4,"./tmdb":6}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./firebaseApi":4,"./tmdb":6}],4:[function(require,module,exports){
"use strict";

let firebaseObj = {};
let userUid = ''; 

const setObject = (obj) => {
    firebaseObj = obj;
};

//Firebase: GOOGLE - Use input credentials to authenticate user.
let authenticateGoogle = () => {
    return new Promise((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
        	userUid = authData.user.uid;
            resolve(authData.user);
        }).catch((error) => {
            reject(error);
        });
    });
  };


module.exports = {
    setObject,
    authenticateGoogle
};


},{}],5:[function(require,module,exports){
"use strict";

const dom = require('./dom');
const apiKeys = require('./apiKeys');
const events = require('./events');


$(document).ready(() => {
    apiKeys.retrieveKeys(); 
    events.myLinks();
    events.googleAuth(); 
    events.pressEnter(); 
});


},{"./apiKeys":1,"./dom":2,"./events":3}],6:[function(require,module,exports){
"use strict";

const dom = require('./dom');

let tmdbKey = ''; 
let imgConfig = {}; 

const searchTMDB = (searchString) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/search/movie`,
            data: {
                "api_key": tmdbKey,
                "language": "en-US",
                "page": 1,
                "include_adult": false,
                "query": searchString
            }
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const searchMovies = (searchString) => {
    searchTMDB(searchString).then((data) => {
        showResults(data.results, imgConfig.base_url);
    }).catch((error) => {
        console.log(error); 
    });
};

const tmdbConfiguration = () => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.themoviedb.org/3/configuration`,
            data: {
                "api_key": tmdbKey
            }
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const getConfig = () => {
    tmdbConfiguration().then((result) => {
        setImgConfig(result.images);
    }).catch((error) => {
        console.log(error); 
    });
};

const setKey = (keyString) => {
    tmdbKey = keyString; 
    getConfig(); 
};

const setImgConfig = (obj) => {
    imgConfig = obj; 
};

const showResults = (arr, imgBaseURL) => {
    dom.domString(arr, imgBaseURL); 
};

module.exports = {
    searchMovies,
    setKey
};
},{"./dom":2}]},{},[5]);
