import React from "react"

function Tweets ({tweets}) {
    return (
        <>
            <h1>Tweets:</h1>
            {tweets.map((tweet) => {
                console.log(tweets);
                return(
                <div key={tweet.id} className="tweetsCard">
                    <h2>Autor: {tweet.autor}</h2>
                    <p>Mensaje: {tweet.tweet}</p>
                </div>
                )  
            })
            }
        </>
    ) 
}

export default Tweets;