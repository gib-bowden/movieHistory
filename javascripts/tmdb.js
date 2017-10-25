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
    dom.domString(arr, imgBaseURL, 'movies'); 
};

const getImgConfig = () => {
    return imgConfig; 
}; 

module.exports = {
    searchMovies,
    setKey,
    getImgConfig
};