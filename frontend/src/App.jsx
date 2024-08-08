import waldoPic from "./assets/wheres_waldo_pic.webp"
import deadpool from "./assets/deadpool.jpg"
import flash from "./assets/flash.jpg"
import spiderman from "./assets/spiderman.jpg"
import "./index.css"
import { useState, useEffect } from "react";
import ScoreboardPopup from "./ScoreboardPopup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import StickyHeader from "./StickyHeader"
import Hint from "./Hint"
import correct from "./assets/audio/correct.mp3"
import incorrect from "./assets/audio/incorrect.mp3"
import win from "./assets/audio/win.wav"


function App() {
  const [boxCoordinates, setBoxCoordinates] = useState(null);
  const [coordinatePercentages, setCoordinatePercentages] = useState(null);
  const [deadpoolCoordinates, setDeadpoolCoordinates] = useState(null);
  const [flashCoordinates, setFlashCoordinates] = useState(null);
  const [spidermanCoordinates, setSpidermanCoordinates] = useState(null);
  const [fail, setFail] = useState(false);
  const [hint, setHint] = useState(null);

  useEffect(()=>{
    const timer = setTimeout( () => setHint(true) , 120000);
    console.log(timer);
    return () => clearTimeout(timer);
  }, [hint])

  function startHintTimer() {
    console.log("hi!")
    if (hint) setHint(false)
    if (hint === null) setHint(false);
  }

  function handleClick(e) {
    if (boxCoordinates) {
      setCoordinatePercentages(null);
      setBoxCoordinates(null);
    } else {
      const pictureContainer = document.querySelector(".picture-container");
      const pictureDimensions = pictureContainer.getBoundingClientRect();
      const leftPosition = e.pageX - (pictureContainer.offsetLeft);
      const topPosition = e.pageY - (pictureContainer.offsetTop);
      const xCoordinatePercentage = leftPosition / pictureDimensions.width;
      const yCoordinatePercentage = topPosition / pictureDimensions.height;
      setCoordinatePercentages([xCoordinatePercentage, yCoordinatePercentage]);
      setBoxCoordinates([leftPosition, topPosition]);
      setFail(false);
    }
  }

  function handleCharacter(character) {
    const url = 'http://localhost:3000/api/characters/' + character;

    const data = JSON.stringify({
      xCoordinatePercentage: coordinatePercentages[0],
      yCoordinatePercentage: coordinatePercentages[1],
    })

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Pass") {
          if (character === "deadpool") {
            setDeadpoolCoordinates([boxCoordinates[0] - 12.5, boxCoordinates[1] - 12.5])
          };
          if (character === "flash") {
            setFlashCoordinates([boxCoordinates[0] - 12.5, boxCoordinates[1] - 12.5])
          };
          if (character === "spiderman") {
            setSpidermanCoordinates([boxCoordinates[0] - 12.5, boxCoordinates[1] - 12.5])
          }
          startHintTimer();
        } else {
          setFail(boxCoordinates);
        }

      })
      .catch(err => console.log(err));

      const targetingBox = document.querySelector(".targeting-box");
      setCoordinatePercentages(null);
      setBoxCoordinates(null);
      targetingBox.close();

  }

  return (
    <>
      {hint && 
        <Hint startHintTimer={startHintTimer} characterCoordinates={[deadpoolCoordinates, flashCoordinates, spidermanCoordinates]}/>
      }
      <StickyHeader deadpoolCoordinates={deadpoolCoordinates} flashCoordinates={flashCoordinates} spidermanCoordinates={spidermanCoordinates}/>
      <main className="picture-container">
        <img src={waldoPic} alt="" className="picture" onClick={(e) => {handleClick(e)}}/>
        { boxCoordinates &&
          <dialog className="targeting-box" open style={{ "top": `${boxCoordinates[1]}px`, "left": `${boxCoordinates[0]}px` }}>
            {!deadpoolCoordinates && 
              <div>
                <button className="character-button" onClick={() => {handleCharacter("deadpool")}}>
                  <img src={deadpool} alt="deadpool" className="character-image"/>
                </button>
                <p className="character-name">Deadpool</p>
              </div>
            }
            {!flashCoordinates && 
              <div>
                <button className="character-button" onClick={() => {handleCharacter("flash")}}>
                  <img src={flash} alt="flash" className="character-image"/>
                </button>
                <p className="character-name">Flash</p>
              </div>
            }
            {!spidermanCoordinates &&
              <div>
                <button className="character-button" onClick={() => {handleCharacter("spiderman")}}>
                  <img src={spiderman} alt="spiderman" className="character-image"/>
                </button>
                <p className="character-name">Spiderman</p>
              </div>
            }
          </dialog>
        }
        { fail && 
          <>
            <FontAwesomeIcon shake icon={faXmark} className="fail-mark" style={{"top": `calc(${fail[1]}px - 12.5px)`, "left": `calc(${fail[0]}px - 12.5px)`, color: "red" }}/>
            <audio autoPlay>
              <source src={incorrect} type="audio/mp3"></source>
            </audio>
          </>

        }
        { boxCoordinates &&
          <span className="dot" style={{ "top": `calc(${boxCoordinates[1]}px - 12.5px)`, "left": `calc(${boxCoordinates[0]}px - 12.5px)` }}></span>
        }
        { deadpoolCoordinates &&
          <>
            <FontAwesomeIcon icon={faCircleCheck} bounce className="fail-mark" style={{ "top": `${deadpoolCoordinates[1]}`, "left": `${deadpoolCoordinates[0]}`, color: "#00ff00" }} />
            <audio autoPlay>
              <source src={correct} type="audio/mp3"></source>
            </audio>
          </>

        }
        { flashCoordinates &&
          <>
            <FontAwesomeIcon icon={faCircleCheck} bounce className="fail-mark" style={{ "top": `${flashCoordinates[1]}`, "left": `${flashCoordinates[0]}`, color: "#00ff00" }} />
            <audio autoPlay>
              <source src={correct} type="audio/mp3"></source>
            </audio>
          </>

        }
        { spidermanCoordinates &&
          <>
            <FontAwesomeIcon icon={faCircleCheck} bounce className="fail-mark" style={{ "top": `${spidermanCoordinates[1]}`, "left": `${spidermanCoordinates[0]}`, color: "#00ff00" }} />
            <audio autoPlay>
              <source src={correct} type="audio/mp3"></source>
            </audio>
          </>
          
        }

      </main>
      {deadpoolCoordinates && flashCoordinates && spidermanCoordinates &&
        <>
          <ScoreboardPopup />
          <audio autoPlay>
              <source src={win} type="audio/wav"></source>
            </audio>
        </>

      }

    </>
  )
}

export default App
