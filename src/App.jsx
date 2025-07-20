import { useState } from 'react'
import Die from "./components/Die"
import './App.css'

function App() {

  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    const newDice = []

    for (let i = 0; i < 10; i++) {
      const randNum = Math.ceil(Math.random() * 6)  // Between 1-6
      newDice.push(randNum)
    }

    return newDice
  }

  function rollDice() {
    setDice(generateAllNewDice)
  }

  const diceElements = dice.map((num, index) => <Die key={index} val={num}/>)

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
