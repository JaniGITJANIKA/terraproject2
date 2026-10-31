import { useState } from 'react'
import './App.css'

//Mindig elkezdeni a legnehezebb.

const Memorycardimages = [
  { src: "public/apple.jpg"},
  { src: "public/bird.jpg"},
  { src: "public/cloud.jpg"},
  { src: "public/mountain.jpg"},
  { src: "public/sun.jpg"},
  { src: "public/tree.jpg"}
]

function Memorycardgames() {

  const [cards, setcards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)


  const shuffleCards = () => {
    const shuffledCards = [...Memorycardimages, ...Memorycardimages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

  setcards(shuffledCards)
  setTurns(0)
  }

  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prewTruns => prewTruns + 1)
  }





function Onecard({ card, handleChoice }) {

  const handleClick = () => {
    handleChoice(card)
  }

    return (
        <div className='card' key={card.id}>
            <div>
                <img className='front' src={card.src} alt='card front' />
                <img className='back' src="/public/main.jpg" onClick={handleClick} alt='card back' />
            </div>
        </div>
    )
  }


  console.log(cards, turns)

  return (
    <div className='memorycardstyle'>
      <button onClick={shuffleCards}>új játék</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Onecard key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  )
}



export default function website() {
  return (
  <div className='background'>
    <h1>Az én kis játék gyüjteményem.</h1>
    <p>Most tanulok Reactben játékot készíteni és most fogok először is játékot létrehozni.</p>
    <Memorycardgames />
  </div>




  )
}