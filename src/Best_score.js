import React from "react"

export default function BestScore(props) {
    
    
    return(
        <div className="best-dad">
        <p className="best-para">Best Score:</p>
        <div className = "best"> {props.mins} : {props.secs} Sec</div>
        </div>
    )
}