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