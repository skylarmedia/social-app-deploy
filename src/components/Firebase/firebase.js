import app from 'firebase/app';
import 'firebase/auth';
import FirebaseContext, { withFirebase } from './context';

const config = {
    apiKey: "AIzaSyB4seBRXpVJ3dZDfCddTWze8UCYEVZ8qkc",
    authDomain: "skylar-social-17190.firebaseapp.com",
    databaseURL: "https://skylar-social-17190.firebaseio.com",
    projectId: "skylar-social-17190",
    storageBucket: "skylar-social-17190.appspot.com",
    messagingSenderId: "861778122764",
  };

  class Firebase {
      constructor(){
          app.initializeApp(config);

          this.auth = app.auth();

      console.log(app);
      }


      doCreateUserWithEmailAndPassword = (email, password) => 
      this.auth.createUserWithEmailAndPassword(email, password);

      doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

      doSignOut = () => this.auth.signOut();

      doPasswordReset = email => this.auth.sendPasswordResetEmail(email);


      doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    
  }



export default Firebase;