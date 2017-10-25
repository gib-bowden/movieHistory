"use strict";

const dom = require('./dom');
const apiKeys = require('./apiKeys');
const events = require('./events');
const firebaseApi = require('./firebaseApi');


$(document).ready(() => {
    apiKeys.retrieveKeys(); 
    firebaseApi.checkForStoredUserUid(); 
    events.init();
});



