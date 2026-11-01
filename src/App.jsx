import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import './App.css'

//Mindig elkezdeni a legnehezebb.

const Memorycardimages = [
  { src: "apple.jpg", matched: false},
  { src: "bird.jpg", matched: false},
  { src: "cloud.jpg", matched: false},
  { src: "mountain.jpg", matched: false},
  { src: "sun.jpg", matched: false},
  { src: "tree.jpg", matched: false}
]

function Onecard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
    
  }

  return (
    <div className='card' key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt='card front' />
        <img className='back' src="main.jpg" onClick={handleClick} alt='card back' />
      </div>
    </div>
  )
}

function Memorycardgames({ onTreeMatched, onAppleMatched, onMountainMatched, onCloudMatched, onBirdMatched, onSunMatched, onGameComplete }) {

  const [cards, setcards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...Memorycardimages, ...Memorycardimages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setcards(shuffledCards)
    setTurns(0)
    onTreeMatched(false)
    onAppleMatched(false)
    onMountainMatched(false)
    onCloudMatched(false)
    onBirdMatched(false)
    onSunMatched(false)
    if (onGameComplete) onGameComplete(false)
  }

  useEffect(() => {
    if (cards.length === 0) return

    const allMatched = cards.every((card) => card.matched)
    if (allMatched && onGameComplete) {
      onGameComplete(true)
    }
  }, [cards, onGameComplete])

  const handleChoice = (card) => {
    if (choiceOne?.id === card.id) return
    if (choiceOne && card.src === choiceOne.src) {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.65 },
      })
      if (card.src === 'tree.jpg') onTreeMatched(true)
      if (card.src === 'apple.jpg') onAppleMatched(true)
      if (card.src === 'mountain.jpg') onMountainMatched(true)
      if (card.src === 'cloud.jpg') onCloudMatched(true)
      if (card.src === 'bird.jpg') onBirdMatched(true)
      if (card.src === 'sun.jpg') onSunMatched(true)
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return

    setDisabled(true)

    if (choiceOne.src === choiceTwo.src) {
      setcards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true }
          }
          return card
        })
      })
      resetTurn()
    } else {
      setTimeout(() => resetTurn(), 1000)
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTruns => prevTruns + 1)
    setDisabled(false)
  }
  //console.log(cards, turns)

  return (
    <div className='memorycardstyle'>
      <button onClick={shuffleCards}>új játék</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Onecard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched}  disabled={disabled} />
        ))}
      </div>
    </div>
  )
}

function Tree() {
  return (
    <div>
  <h2>A fa</h2>
  <p className='texi'>A fák fontosak a természet számára ezért kell rá vigyáznunk és meg próbálni minél kevesebbet kivágni mert nem csak az álatokm élethelyét vehetjük el hanem még ránk is veszélyes mert az termeli nekünk az oxigént az ad védelmet a felmelegedés ellen ezért ójvjuk a természetünket ne szemeteljünk és legyünk környezet tudatosak a papír mind két oldalát használjuk és azért is szoktak ültetni a városokban is fákat és a fáknak is köszönhető az élet.
  </p>
  <img className='teximg' src="tree.jpg" alt="Fa" />
  </div>
  )
}

function Sun() {
  return (
    <div>
      <h2>A nap</h2>
      <p className='texi'>A nap is egy nagyon fontos eleme a naprendszerünknek mivel a nap nyújt nekünk hő energiát fényt és UV fényt ami anyira nem jó nekünk és ez azért van mert nagyon sokat szenyezük az ozon réteget amivel az keletkezik hogy felmelegszik a bolygó és nagyobb az UV fény amitől le égünk de nem csak hogy fáj hanem ellégé rák veszélyes is de a nap nélkül nem élnénk nem lenne nélküle hő vagy esetleg fény sem meg nem keringené körülöte.</p>
      <img className='teximg' src="sun.jpg" alt="Nap" />
    </div>
  )
}

function Mountain() {
  return (
    <div>
      <h2>A hegy</h2>
      <p className='texi'>A hegyek egy csomó hegy van mint pl a Mount Everest a leg magasabb hegy a Föld nevü bolygón és van egy nagyon hasznos szerepük hogy a fenti víz az ottfent van ami a víz szintet jól meg tudná tartani hogyha nem lenne ez a felmelegedés mert így most sajnos egyre kevesebb rajta a jég és a hó is ami a víz szint emelkedését eredményezi ami miatt sajnos alacsonan fekvő településeket el áraszt vízel ami ár vízet eredményez vagyis nem szabadna tovább melegednie a bolygónak hogyha meg szeretnénk tartani úgy a bolygót ahogyan van.</p>
      <img className='teximg' src='mountain.jpg' alt='Hegy'/>
    </div>
  )
}

function Apple() {
  return (
    <div>
      <h2>Az alma</h2>
      <p className='texi'>Az alma nem csak hogy finom hanem nagyon egéséges is és meg található benne az C vitamin az immunrendszerélt és az A vitamin a Bőr egéségének a védelmáben és meg található benne nem más mint a B vitamin ami jelentős mértékben tartalmaz B komplexet és egyébb vitaminokat amiket már kisebb mértékben találhatók meg benne egy Magyar mondás szerint vagy nem tudom de Magyaroszágon lehet hallani hogy minden nap egy alma az orvost távol tartja mert olyan egéséges de az alma lében előfordulhat túlzó cukor ami ugyan úgy nem jó az egéségre nézve meg hát mindent mértékel kell fogyasztani.</p>
      <img className='teximg' src="apple.jpg" alt="Alma" />
    </div>
  )
}

function Bird() {
  return (
     <div>
        <h2>A madár</h2>
        <p className='texi'>A madarak nagy szerepet játszanak az életünkben mint pl a tyúkok adják a tojásokat ami meg szoktunk enni és a természteti körforgásban is segítenek el kapni kisebb állatokat mint a sas és kb ennyi de vigyázni kell mert hogyha a villany poználra ha felszálnak akkor meg rázhatja őket az áram ami a halálukhoz vezethet vagyis valószínü akkor sajnos.</p>
        <img className='teximg' src="bird.jpg" alt="Madár" />
     </div>
  )
}

function Cloud() {
  return (
    <div>
      <h2>A felhők</h2>
      <p className='texi'>Fontos feladatuk van az eső szállítás miatt és az üvegház hatás vagy az ellen miatt mert ez fontos szerepet játszik a bolygó hőmérsékle3tére hogy süt a nap vagy az a csapadék miatt a növényeknek és még villámot is képes leadni ami miatt tüz kellethezhet de szerencsénkre a villám hárító elég el terjed ami a földbe vezeti a villámlást.
      <img className='teximg' src="cloud.jpg" alt="Felhő" />
      </p>
    </div>
  )
}

function Win() {
  return (
    <div>
   <div className='winx'>
    <h2>Gratulálok hogy nyertél a memória játékban.</h2>
    <p>Most ezért meg jutalmazlak egy kis ajándékal.</p>
    <p>Az ajándékom nem más mint egy rajz css-el.</p>
   </div>
   <div className='paper'>
    <div className='block1'></div>
    <div className='block2'></div>
    <div className='block3'></div>
    <div className='block4'></div>
    <div className='block5'></div>
    <div className='block6'></div>
    <div className='block7'></div>
    <div className='block8'></div>
    <div className='block9'></div>
    <div className='block10'></div>
    <p className='WIN'>WIN!</p>
    <div className='block11'></div>
    <div className='block12'></div>
    <div className='block13'></div>
    <div className='block14'></div>
    <div className='block15'></div>
    <div className='block16'></div>
    <div className='block17'></div>
    <div className='block18'></div>
    <div className='block19'></div>
    <div className='block20'></div>
    <div className='block21'></div>
    <table>
      <tr><td></td></tr>
      <tr><td></td></tr>
      <tr><td></td></tr>
      <tr><td></td></tr>
    </table>
    <p className='thankyou'>Köszönöm szépen<br/>a figyelmet!</p>
    </div>
    </div>
  )
}

export default function Website() {
  const [treeMatched, setTreeMatched] = useState(false)
  const [appleMatched, setAppleMatched] = useState(false)
  const [sunMatched, setSunMatched] = useState(false)
  const [mountainMatched, setMountainMatched] = useState(false)
  const [cloudMatched, setCloudMatched] = useState(false)
  const [birdMatched, setBirdMatched] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  return (
  
  <div className='background'>
    <div id='contener'>
    <HashRouter>
      {gameWon && 
      <Link to="/win"><div className='win'>
        <p>Graturálok hogy kivitted a játékot.</p>
        <img src="win-trofea.svg" alt="Trófea" />
        <img src="win-yes.svg" alt="Sikerült!" />
      </div>
      </Link>
      }
    <h1>Az első PC kártya játékom</h1>
    <p>Most tanulok Reactben játékot készíteni és most fogok először is játékot létrehozni.</p>
    <Memorycardgames
      onTreeMatched={setTreeMatched}
      onAppleMatched={setAppleMatched}
      onMountainMatched={setMountainMatched}
      onCloudMatched={setCloudMatched}
      onBirdMatched={setBirdMatched}
      onSunMatched={setSunMatched}
      onGameComplete={setGameWon}
    />
    <div className='pict'>
      {treeMatched &&
      <Link to='/tree'><img className='tree' src="tree.jpg" alt="Fa" title='Fa' /></Link>
      }
      {sunMatched &&
      <Link to='/sun'><img className='sun' src="sun.jpg" alt="Nap" title='Nap'/></Link>
      }
      {mountainMatched && 
      <Link to='/mountain'> <img className='mountain' src="mountain.jpg" alt="Hegy" title='Hegy' /></Link>
      }
      {appleMatched && 
      <div className='apple'>
      <Link to='/apple'><img className='apple1' src="apple.jpg" alt="Alma" title='Alma' /></Link>
      <Link to='/apple'><img className='apple2' src="apple.jpg" alt="Alma" title='Alma' /></Link>
      <Link to='/apple'><img className='apple3' src="apple.jpg" alt="Alma" title='Alma' /></Link>
      </div>
      }
      {birdMatched &&
      <div className='bird'>
      <Link to='/bird'><img className='bird1' src="bird.jpg" alt="Madár" title='Madár' /></Link>
      <Link to='/bird'><img className='bird2' src="bird.jpg" alt="Madár" title='Madár' /></Link>
      <Link to='/bird'><img className='bird3' src="bird.jpg" alt="Madár" title='Madár' /></Link>
      </div>
      }
      {cloudMatched &&
      <div className='cloud'>
      <Link to='/cloud'><img className='cloud1' src="cloud.jpg" alt="Felhő" title='Felhő' /></Link>
      <Link to='/cloud'><img className='cloud2' src="cloud.jpg" alt="Felhő" title='Felhő' /></Link>
      <Link to='/cloud'><img className='cloud3' src="cloud.jpg" alt="Felhő" title='Felhő' /></Link>
      </div>
      }
    </div>
    <Routes>
      <Route path='/' element={null} />
      <Route path='/tree' element={<Tree />} />
      <Route path='/sun' element={<Sun />} />
      <Route path='/mountain' element={<Mountain />}/>
      <Route path='/apple' element={<Apple />} />
      <Route path='/bird' element={<Bird />}/>
      <Route path='/cloud' element={<Cloud />} />
      <Route path='/win' element={< Win/>}/>
    </Routes>
    </HashRouter>
  </div>
</div>
  )
}