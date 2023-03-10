import React from "react"

export default function Die(props) {
    
    const Styles = {
        backgroundColor : props.isheld ? "#59E391" : "white"
    }
    
    return(
        <div style = {Styles} className="die-comp" onClick = {() => props.holddice(props.ID)}>{props.value}</div>
    )
}