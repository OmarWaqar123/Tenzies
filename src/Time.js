import React from "react"

export default function Time(props) {
    
    
    return(
        <div className="clock">{props.Minutes} : {props.Seconds} Sec</div>
    )
}