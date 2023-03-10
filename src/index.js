import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.css'
import { initializeApp } from "firebase/app"
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtGbG1sh1qmb40hmGGXMeXHV1e_Kuz0Pw",
  authDomain: "employers-a2049.firebaseapp.com",
  projectId: "employers-a2049",
  storageBucket: "employers-a2049.appspot.com",
  messagingSenderId: "798000200297",
  appId: "1:798000200297:web:67f1ec2e3a1bded47980f8",
  databaseURL: "https://employers-a2049-default-rtdb.asia-southeast1.firebasedatabase.app"
};
const app = initializeApp(firebaseConfig);







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
);


