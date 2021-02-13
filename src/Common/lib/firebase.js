import firebase from "firebase";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, //process.env.REACT_APP_API_KEY
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const fire = firebase.initializeApp(firebaseConfig);

const SignIn = async (email, password) => {
  await fire.auth().signInWithEmailAndPassword(email, password);
};

const SignUp = async (email, password, data) => {
  try {
    const userCredential = await fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        fire.firestore().collection("users").doc(result.user.uid).set(data);
        fire.auth().currentUser.sendEmailVerification({
          url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });
      })
      .catch((err) => {
        return err;
      });
    // await userCredential.user.sendEmailVerification();
    return userCredential;
  } catch {
    console.log("err");
  }

  // fire
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     return user;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
};

const SignOut = () => {
  fire.auth().signOut();
};

export { SignIn, SignUp, SignOut };

export default fire;
