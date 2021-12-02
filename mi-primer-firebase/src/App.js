import './App.css';
import React, {useEffect, useState} from "react";
import { firestore, loginConGoogle, auth, logout } from "./firebase.js"
import Tweets from "./components/Tweets"

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    like: false,
  });
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          console.log(doc.data())
          return {
            autor: doc.data().autor,
            tweet: doc.data().tweet,
            like: doc.data().like,
            numLike: doc.data().numLike,
            id: doc.id
          }
        })
        setTweets(tweets);
    });
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
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
        like: doc.data().like,
        numLike: doc.data().numLike,
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

  const updateTweet = (id, numLike) => {
    if (!numLike) numLike=0;
    const modifiedTweet = firestore.doc(`tweets/${id}`);
    modifiedTweet
      .update({
        like: true,
        numLike: numLike + 1
      })
      .catch((error) => {
        console.error("Error de actualización de doumento", error);
      });	
  }

  return (
    <div className="App">
      {user ? (
        <>
          <div className="userProfile">
            <img className="userProfilePicture" src={user.photoURL} alt="Foto de perfil"/>
            <p>¡Hola {user.displayName}!</p>
            <button className="logoutButton" onClick={logout}>Log Out</button>
          </div>
        </>
      ) : (
        <button className="loginButton" onClick={loginConGoogle}>Login con Google</button>
      )}
      <form className="appForm">
        <textarea cols="30" rows="5" placeholder="Escribe un tweet..." value={tweet.tweet} onChange={handleChange} name="tweet"></textarea>
        <div className="inputAndButton">
          <input type="text" className="inputAutor" placeholder="Persona autora" value={tweet.autor} onChange={handleChange} name="autor"></input>
          <button className="button" onClick={handleButton}>Enviar Tweet</button>
        </div>
      </form>
      <Tweets tweets={tweets} deleteTweet={deleteTweet} updateTweet={updateTweet}/>
    </div>
  );
}

export default App;
