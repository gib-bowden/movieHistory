(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const tmdb = require('./tmdb');

const apiKeys = () => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `db/apiKeys.json`
        }).done((data) => {
            resolve(data.apiKeys); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const retrieveKeys = () => {
    apiKeys().then((data) => {        
        tmdb.setKey(data.tmdb.apiKey); 
    }).catch((error) => {
        console.log(error); 
    });
};

module.exports = {retrieveKeys};
},{"./tmdb":5}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./tmdb":5}],4:[function(require,module,exports){
"use strict";

const dom = require('./dom');
const apiKeys = require('./apiKeys');
const events = require('./events');


$(document).ready(() => {
    apiKeys.retrieveKeys(); 
    events.pressEnter(); 
});
},{"./apiKeys":1,"./dom":2,"./events":3}],5:[function(require,module,exports){
"use strict";

const dom = require('./dom');

let tmdbKey = ''; 

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
        showResults(data.results);
    }).catch((error) => {
        console.log(error); 
    });
};

const setKey = (str) => {
    tmdbKey= str; 
};

const showResults = (arr) => {
    dom.domString(arr); 
};

module.exports = {
    searchMovies,
    setKey
};
},{"./dom":2}]},{},[4]);
