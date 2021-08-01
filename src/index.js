import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import 'firebase/firestore';
// const firebase = require('firebase');
// require('firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyCMn3b963cGabu4syt8cHHqDyHdbqdPQ78",
  authDomain: "ever-notes-f2c69.firebaseapp.com",
  projectId: "ever-notes-f2c69",
  storageBucket: "ever-notes-f2c69.appspot.com",
  messagingSenderId: "360369617291",
  appId: "1:360369617291:web:8e79129e55de6145dc578e",
  measurementId: "G-X5LV6D04KC"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
