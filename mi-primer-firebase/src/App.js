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
          id: doc.id
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

  const handleButton = (e) => {
    e.preventDefault();
//Paso 1 Enviar a la base de datos
    let sendTweet = firestore.collection("tweets").add(tweet);
//Paso 2 Traernos nuevamente
    let requestDoc = sendTweet.then((docRef) => {
      return docRef.get()
    })
//Paso 3
    requestDoc.then((doc) => {
      let newTweet = {
        autor: doc.data().autor,
        tweet: doc.data().tweet,
        id: doc.id
      }
//Paso 4 Seteamos Tweets
      setTweets([newTweet, ...tweets]);
    })
  }
  const deleteTweet = (id) => {
    const newTweets = tweets.filter((tweet) => {
      return tweet.id !== id;
    })
    setTweets(newTweets);
    firestore.doc(`tweets/${id}`).delete();
  }

  return (
    <div className="App">
      <form className="appForm">
        <textarea cols="30" rows="5" placeholder="Escribe un tweet..." value={tweet.tweet} onChange={handleChange} name="tweet"></textarea>
        <div className="inputAndButton">
          <input type="text" placeholder="Persona autora" value={tweet.autor} onChange={handleChange} name="autor"></input>
          <button onClick={handleButton}>Enviar Tweet</button>
        </div>
      </form>
      <Tweets tweets={tweets} deleteTweet={deleteTweet}/>
    </div>
  );
}

export default App;
