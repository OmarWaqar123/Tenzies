import React from "react"
import Die from "./Die.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Time from "./Time.js"
import BestScore from "./Best_score.js"
import "./GameStyles.css"

export default function Game () {
    
    const [diceNum, SetdiceNum] = React.useState(allNewDice())
    const [tenzies, settenzies] = React.useState(false)
    const [time, Settime] = React.useState(0)
    const [Mins, SetMins] = React.useState(0)
    const intervalRef = React.useRef();
    const [bestSec, SetbestSec] = React.useState(() => localStorage.getItem("Time") || 0);
    const [bestMins, SetbestMins] = React.useState(() => localStorage.getItem("Minutes") || 0);
    
    React.useEffect(() => {
        Start()
    }, [])
    
    function Start() {
        Settime(0)
        SetMins(0)
       intervalRef.current =  setInterval(() => {
            Settime(prevtime => {
                if (prevtime === 59) {
                    SetMins(prevMins => prevMins + 1)
                    return 0
                }else {
                    return prevtime + 1
                }
                
                })
        }, 1000)
        
    }
    
    // function Stop() {
    //     if(tenzies === true) {
    //     clearInterval(intervalRef.current)
    //     intervalRef.current = null
    //     }
    // }
    
    function Check() {
        console.log(tenzies)

        
        if(bestSec != 0 && bestMins != 0) {
        
        if(time < bestSec){
            localStorage.setItem("Time", time)
            SetbestSec(localStorage.getItem("Time"))
            
        }
        
        if(Mins < bestMins) {
            localStorage.setItem("Minutes", Mins)
            SetbestMins(localStorage.getItem("Minutes"))
        }
        }else {
            localStorage.setItem("Time", time)
            SetbestSec(localStorage.getItem("Time"))

            localStorage.setItem("Minutes", Mins)
            SetbestMins(localStorage.getItem("Minutes"))
        }
       clearInterval(intervalRef.current)
    
    }
    
    React.useEffect(()=> {
        // console.log("Dice State changed")
        let Valv = diceNum[0].value
       const Won_or_Not1 = diceNum.every(obj => obj.value === Valv)
       const Won_orNot2 = diceNum.every(obj => obj.isHeld === true)
       if(Won_or_Not1 === true && Won_orNot2 === true) {
        //    console.log("WON THE GAME")
           settenzies(true)
           clearInterval(intervalRef.current)

        //    Stop()
           Check()
           settenzies(false)



       }
    
    },[diceNum])
    
    function allNewDice() {
        let randomArr = [];
        for (let i = 1; i <= 10; i++) {
            const rand = Math.ceil(Math.random() * 6)
            randomArr.push({value: rand, isHeld: false, Id: nanoid()})
        }
        return randomArr
    }
    
    function Resetting_Dice_When_Won () {
        SetdiceNum(allNewDice)
        settenzies(false)
        Start()
    }

    function newdice() {
        // SetdiceNum(allNewDice)
        const ar = allNewDice()
        // let diceAR = []
        SetdiceNum(prevDice => prevDice.map((die, index) => {
            return die.isHeld === true ? die : ar[index]
        }
        )
        )

    }
    

    function holdDice(id) {
        SetdiceNum((prevDice) =>prevDice.map(die => {
           return die.Id === id ?  {...die , isHeld: !die.isHeld} : die
        }) )
    }
    
    const DiceComponent = diceNum.map((randomObject) => (
        <Die 
        value={randomObject.value} 
        key={randomObject.Id} 
        isheld={randomObject.isHeld}
        holddice = {holdDice}
        ID = {randomObject.Id}
        />) 
        
        )
    return(
        
        <div className="game-body">
        <div>
        
        <Time Minutes={Mins} Seconds={time} />
        <main>
        <h1 className="tenz-head">Tenzies</h1>
        <p className="tenz-para">Roll until all dice are the same.Click each die to freeze
        it at its current value between rolls.</p>
        <div className="die-dad">
        {DiceComponent}
        </div>
        <button className="roll" onClick={tenzies ? Resetting_Dice_When_Won : newdice }>{tenzies ? "New Game" : "Roll"}</button>
        
        <BestScore mins = {bestMins} secs = {bestSec} />
        </main>
       {tenzies && <Confetti className="flowers"/>}
       </div>
        </div>
        
    )
}