import { useState , useEffect} from 'react'
import Die from "./components/Die"
import './App.css'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())  // Array of objects

  // ---------- Timer ----------
  const [startTime, setStartTime] = useState(null)
  const [isTimeActive, setIsTimeActive] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let interval;
    if (isTimeActive) {
      interval = setInterval(() => {setElapsedTime(Date.now() - startTime)}, 50)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTimeActive])

  // Win Condition
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {setIsTimeActive(false)}
  }, [gameWon])

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
    if (gameWon) {
      setDice(generateAllNewDice)
      setElapsedTime(0)
      setStartTime(null)
      setIsTimeActive(false)
    }

    else {
      setDice(oldDice => {
        return oldDice.map(die => {
          return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
        })
      })
    }
  }

  function hold(id) {
    if (!isTimeActive) {
      setStartTime(Date.now())
      setIsTimeActive(true)
    }

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

  // mm:ss:ms format
  const totalMilliseconds = elapsedTime;
  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;


  // ---------- Return ----------
  return (
    <main>
      {gameWon && <Confetti width={1535} height={725} gravity={0.15}/>}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>

      <div className="timer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e63946"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px", verticalAlign: "middle" }}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
        {formattedTime}
      </div>

      <p className="instructions">Roll until all dice are the same. Click each die to freeze its value. Win as fast as possible!</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
