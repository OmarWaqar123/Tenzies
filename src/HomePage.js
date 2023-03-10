
import React from "react"
import {Link} from "react-router-dom"
import "./HomeStyles.css"

export default function HomePage() {
    return(
        <div className="home-body">
        <div className="Home">
        
        <h1>Tenzies</h1>
        <p className="home-p">Tenzies is a fun and easy-to-learn dice game where the objective is to roll the best combination of five dice, using a mix of luck and strategy. With various gameplay options and endless entertainment for all ages and skill levels, Tenzies encourages players to beat their best time as it comes with a best-time functionality. So, gather your friends and family, roll the dice, and try to improve your best time with Tenzies!
</p>
        <Link to="/game" className="game-btn-dad"><button className="game-btn">PLAY</button></Link>
        
        </div>
        </div>
    )
   
}