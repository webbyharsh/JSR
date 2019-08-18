import * as firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCVC2GlV0H7JahYk_jiyrTpnJFlVgmHHgQ",
    authDomain: "opinions-10b60.firebaseapp.com",
    databaseURL: "https://opinions-10b60.firebaseio.com",
    projectId: "opinions-10b60",
    storageBucket: "opinions-10b60.appspot.com",
    messagingSenderId: "434351700255",
    appId: "1:434351700255:web:be97cee5610d4ed9"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export default firebase