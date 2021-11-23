import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import { firestore } from "./firebase.js"
import Tweets from "./components/Tweets"

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: ""
  });

  useEffect(()=>{
    firestore
    .collection("tweets")
    .get()
    .then((snapshot) => {
      const tweets = snapshot.docs.map((doc) => {
        console.log(doc.data())
        return {
          autor: doc.data().autor,
          tweet: doc.data().tweet,
          id: doc.data().id
        }
      })
      setTweets(tweets);
    });
  }, [])

  const handleChange = (e) => {
    let newTweet = {
      ...tweet,
      [e.target.name]: e.target.value
    }
    setTweet(newTweet);
  }

  return (
    <div className="App">
      <form className="appForm">
        <textarea cols="30" rows="5" placeholder="Escribe un tweet..." value={tweet.tweet} onChange={handleChange} name="tweet"></textarea>
        <div className="inputAndButton">
          <input type="text" placeholder="Persona autora" value={tweet.autor} onChange={handleChange} name="autor"></input>
          <button>Enviar Tweet</button>
        </div>
      </form>
      <Tweets tweets={tweets}/>
    </div>
  );
}

export default App;
