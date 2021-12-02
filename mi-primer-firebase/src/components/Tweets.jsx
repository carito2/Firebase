import React from "react"
import dislike from "../images/dislike.png"
import like from "../images/like.png"

function Tweets ({tweets, deleteTweet, updateTweet}) {
    return (
        <div className="resultTweets">
            <h1>Tweets:</h1>
            {tweets.map((tweet) => {
                console.log(tweets);
                return(
                <div key={tweet.id} className="tweetsCard">
                    <div className="tweet">
                        <p>{tweet.tweet} </p>
                        <p>Por: @{tweet.autor}</p>
                    </div>
                    <div className="editTweet">
                        <img src={tweet.like ? like : dislike} alt="Imagen de corazón" className="liked" name="like" onClick={() => updateTweet(tweet.id, tweet.numLike)}/> <span>{tweet.numLike && tweet.numLike}</span>
                        <button className="deleteTweet" onClick={() => deleteTweet(tweet.id)}>Borrar</button>
                    </div>
                </div>
                )  
            })
            }
        </div>
    ) 
}

export default Tweets;