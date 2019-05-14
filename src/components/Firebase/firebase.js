import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
      constructor(){
          app.initializeApp(config);

          this.auth = app.auth();
          this.db = app.firestore();
      }

      client = clientId => this.db.ref(`clients/${clientId}`);

      getClients = () => this.db.collection('clients').get();

      addClient = () => this.db.collection('clients');

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
              image:image,
              name:name
          })
      }

  

    
  }



export default Firebase;