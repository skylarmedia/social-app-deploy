import * as firebase from 'firebase';

const config = {
    apiKey: "some_random_key",
    authDomain: "some_random_authDomain",
    databaseURL: "some_random_databaseURL",
    projectId: "some_random_projectId",
    storageBucket: "some_random_bucket",
    messagingSenderId: "some_random_Id"
};

export const firebaseApp = firebase.initializeApp(config);