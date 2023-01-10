import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLUmgJkQ4Yr7sJJFUIGQ9F6kSRQQu9ZAs",
  authDomain: "my-react-blog-dcb49.firebaseapp.com",
  projectId: "my-react-blog-dcb49",
  storageBucket: "my-react-blog-dcb49.appspot.com",
  messagingSenderId: "714575516751",
  appId: "1:714575516751:web:06846739071b3611d0063a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
