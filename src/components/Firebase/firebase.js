import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import { runInThisContext } from 'vm';
// import addAdminRole from '../functions';
// import * as admin from "firebase-admin";

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
        this.functions = app.functions();

    }

    // Admin Functions

    storage = this.storage

    getCurrentUser = () => {
        alert(this.auth.currentUser.uid);
    }

    listenChatChanges = (id) => this.db.collection('chats').doc(id).collection('messages');

    // Post Approval

    approvePost = (userId, postId, approve) => this.db.collection('users').doc(userId)
        .collection('posts').doc(postId).update({
            approved: approve
        })

    getSinglePost = (userId, month, day, title) => this.db.collection('users').doc(userId)
        .collection('posts').where('month', '==', month)
        .where('day', '==', day).get();

    getPostImages = () => this.storage.refFromURL('gs://skylar-social-17190.appspot.com/test123/logo');

    addLogoUrl = (user, logoUrl) => this.db.collection('users').doc(user).add({
        logoUrl: logoUrl
    }, err => {
        console.log(err, 'err')
    });

    getMessages = (id, month, day) => this.db.collection('chats').doc(id).collection('messages').where('month', '==', month).where('day', '==', day).get();

    sendCategories = (user, categories) => this.db.collection('users').doc(user).collection('categories').add({
        categories: categories
    });


    getAll = user => this.db.collection('users').doc(user).get();

    getUserCategories = (user) => this.db.collection('users').doc(user).collection('categories').get();

    postMessage = (id, month, day, title, message) => this.db.collection('chats').doc(id).collection('messages').add({
        month: month,
        day: day,
        title: title,
        message: message,
        user: 'Admin',
        logo: 'https://skylarmedia.ca/wp-content/uploads/2018/12/SkylarMG_Icon_RGB-1.svg'
    });


    getUniqueClientPosts = (id, currentMonth) => this.db.collection('users').doc(id).collection('posts').where('month', '==', currentMonth).get();

    deletePost = (id, postId) => this.db.collection('users').doc(id).collection('posts').doc(postId).delete()

    getPostId = id => this.db.collection('clients').doc(id).collection('posts');

    client = clientId => this.db.ref(`clients/${clientId}`);

    getSocialPosts = (id, month) => this.db.collection('users').doc(id).collection('posts').get();

    getClients = () => this.db.collection('users').where('status', '==', 1).where('admin', '==', 0).get();

    getPostId = (id) => this.db.collection('clients').doc(id).collection('posts').get();

    addClient = () => this.db.collection('clients');

    getDates = (id) => this.db.collection('users').doc(id).collection('dates').get()

    addDate = (urlName, month, year) => this.db.collection('users').where('urlName', '==', urlName).collection('dates').set({
        month: month,
        year: year
    });

    getUID = (urlName) => this.db.collection('users').where('urlName', '==', urlName).get()

    addUser = (email, password, name, logo) => this.auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return this.db.collection('users').doc(cred.user.uid).set({
            name: name,
            logo: logo,
            status: 1,
            userId: cred.user.uid,
            admin: 0,
            urlName: name.toLowerCase().replace(/ /g, '-')
        })
    })

    // Posts Function

    editPostFirebase = (id, postId) => this.db.collection('users').doc(id).collection('posts').doc(postId).get();


    editPostFirebase = (id, postId) => this.db.collection('users').doc(id).collection('posts').doc(postId).get();

    editPostSubmit = (id, postId, editedTitle, postCopy, postHashtags, editedTime, links, selectedCategory) => this.db.collection('users').doc(id).collection('posts').doc(postId).update({
        title: editedTitle,
        copy: postCopy,
        hashtags: postHashtags,
        time: editedTime,
        links: links,
        selectedCategory
    });

    addPost = (id, title, copy, hashtags, time, day, month, links, metaImageFiles, friendlyUrl, approved) => this.db.collection('users').doc(id).collection('posts').add({
        title: title,
        copy: copy,
        hashtags: hashtags,
        time: time,
        day: day,
        month: month,
        links: links,
        metaImageFiles: metaImageFiles,
        friendlyUrl: friendlyUrl,
        approved: approved
    });

    // Get UID





    // End of posts functions


    deleteClient = (id) => this.db.collection('users').doc(id).update({
        status: 0
    });

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password).then(res => {
            return this.db.collection('users').doc(res.user.uid).get();
        })

    doSignOut = () => this.auth.signOut().then(() => { })

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