import { useState } from 'react'
import Die from "./components/Die"
import './App.css'
import { nanoid } from "nanoid"

function App() {

  const [dice, setDice] = useState(generateAllNewDice())  // Array of objects

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
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
      })
    })
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
