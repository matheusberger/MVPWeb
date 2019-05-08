import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCEj_PrVcaIerFMtxWfVZ7_b2nDIc0K6Mc",
    authDomain: "firereact-4a755.firebaseapp.com",
    databaseURL: "https://firereact-4a755.firebaseio.com",
    projectId: "firereact-4a755",
    storageBucket: "firereact-4a755.appspot.com",
    messagingSenderId: "1033366666298",
    appId: "1:1033366666298:web:f56c01102c9894df"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
