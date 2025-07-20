import { useState } from 'react'
import Die from "./components/Die"
import './App.css'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())  // Array of objects

  // All dice must be held & have the same value to win the game
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  function generateAllNewDice() {
    const newDice = []

    for (let i = 0; i < 10; i++) {
      const randNum = Math.ceil(Math.random() * 6)
      newDice.push({
        value: randNum,
        isHeld: false,
        id: nanoid()  // unique string ID generator
      })
    }

    return newDice
  }

  function rollDice() {
    if (gameWon) {setDice(generateAllNewDice)}
    else {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
        })
      })
    }
  }

  function hold(id) {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ? {...die, isHeld:!die.isHeld} : die
      })
    })
  }

  const diceElements = dice.map((diceObject) => (
  <Die 
    key={diceObject.id}
    value={diceObject.value}
    isHeld={diceObject.isHeld}
    hold={() => hold(diceObject.id)}
  />))

  return (
    <main>
      {gameWon && <Confetti/>}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
