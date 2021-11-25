import React from "react"

function Tweets ({tweets, deleteTweet}) {
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
                    <button className="deleteTweet" onClick={() => deleteTweet(tweet.id)}>Borrar</button>
                </div>
                )  
            })
            }
        </div>
    ) 
}

export default Tweets;