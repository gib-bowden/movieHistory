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
            localStorage.setItem("googleAuthUserUid", authData.user.uid); 
            resolve(authData.user);
        }).catch((error) => {
            reject(error);
        });
    });
  };


  const checkForStoredUserUid = () => {
    if (localStorage.getItem("googleAuthUserUid")) {
        userUid = localStorage.getItem("googleAuthUserUid");
    }
}; 

  const getMovieList = () => {
    let movies = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        $.ajax(`${firebaseObj.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((fbMovies) => {
            if (fbMovies !== null) {
                Object.keys(fbMovies).forEach((key) => {
                    fbMovies[key].id = key;
                    movies.push(fbMovies[key]);
                }); 
            }
            resolve(movies); 
        }).catch((err) => {
            reject(err); 
        });
    });
  };


  const saveMovie = (newMovieObj) => {
    newMovieObj.uid = userUid;
    return new Promise ((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: `${firebaseObj.databaseURL}/movies.json`,
            data: JSON.stringify(newMovieObj)
        }).then((result) => {
            resolve(result); 
        }).catch((err) => {
            reject(err); 
        });
    });
  };

module.exports = {
    setObject,
    authenticateGoogle,
    getMovieList,
    checkForStoredUserUid,
    saveMovie
};

