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