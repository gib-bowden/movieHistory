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