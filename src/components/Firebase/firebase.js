import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB4seBRXpVJ3dZDfCddTWze8UCYEVZ8qkc",
    authDomain: "skylar-social-17190.firebaseapp.com",
    databaseURL: "https://skylar-social-17190.firebaseio.com",
    projectId: "skylar-social-17190",
    storageBucket: "skylar-social-17190.appspot.com",
    messagingSenderId: "861778122764",
    appId: "1:861778122764:web:682881979cd4294e"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    uploadPostFiles = () => this.storage;

    getPostImages = () => this.storage.ref();

    deletePost = (id, postId) => this.db.collection('clients').doc(id).collection('posts').doc(postId).delete()

    getPostId = id => this.db.collection('clients').doc(id).collection('posts');

    client = clientId => this.db.ref(`clients/${clientId}`);

    getSocialPosts = (id) => this.db.collection('clients').doc(id).collection('posts').get();

    getClients = () => this.db.collection('clients').get();

    getPostId = (id) => this.db.collection('clients').doc(id).collection('posts').get();

    addClient = () => this.db.collection('clients');

    getDates = (id) => this.db.collection('clients').doc(id).collection('dates').get()

    addDate = (id, month, year) => this.db.collection('clients').doc(id).collection('dates').add({
        month: month,
        year: year
    });

    // Posts Function

    editPostFirebase = (id, postId) => this.db.collection('clients').doc(id).collection('posts').doc(postId).get();

    editPostSubmit = (id, postId, editedTitle, postCopy, postHashtags, editedTime) => this.db.collection('clients').doc(id).collection('posts').doc(postId).update({
        title: editedTitle,
        copy: postCopy,
        hashtags: postHashtags,
        time: editedTime
    })

    addPost = (id, title, copy, hashtags, time, day, month, year, links, metaFileInfo) => this.db.collection('clients').doc(id).collection('posts').add({
        title: title,
        copy: copy,
        hashtags: hashtags,
        // links: links,
        time: time,

        day: day,
        month: month,
        year: year,
        links: links,
        meta_file_fields: metaFileInfo
    });




    // End of posts functions



    deleteClient = (id) => this.db.collection('clients').doc(id).delete();

    //   addDates = () => this.db.collections('clients')

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    writeUserData = (image, name) => {
        this.database().ref().set({
            image: image,
            name: name
        })
    }






}



export default Firebase;