"use strict";

const dom = require('./dom');
const apiKeys = require('./apiKeys');
const events = require('./events');


$(document).ready(() => {
    apiKeys.retrieveKeys(); 
    events.pressEnter(); 
});