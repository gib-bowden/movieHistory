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

