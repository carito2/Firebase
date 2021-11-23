import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import { firestore } from "./firebase.js"

function App() {
  const [data, setData] = useState("");

  useEffect(()=>{
    firestore
    .collection("tweets")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.data())
        setData(doc.data());
      })
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>Autor: {data.autor}</h2>
          <p>Mensaje: {data.tweet}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
