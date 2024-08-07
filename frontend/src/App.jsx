import waldoPic from "./assets/wheres_waldo_pic.webp"
import deadpool from "./assets/deadpool.jpg"
import flash from "./assets/flash.jpg"
import spiderman from "./assets/spiderman.jpg"
import "./index.css"
import { useState } from "react";
import ScoreboardPopup from "./ScoreboardPopup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import StickyHeader from "./StickyHeader"


function App() {
  const [boxCoordinates, setBoxCoordinates] = useState(null);
  const [coordinatePercentages, setCoordinatePercentages] = useState(null);
  const [deadpoolCoordinates, setDeadpoolCoordinates] = useState(null);
  const [flashCoordinates, setFlashCoordinates] = useState(null);
  const [spidermanCoordinates, setSpidermanCoordinates] = useState(null);
  const [fail, setFail] = useState(false);

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
          <FontAwesomeIcon icon={faXmark} className="fail-mark" style={{"top": `calc(${fail[1]}px - 12.5px)`, "left": `calc(${fail[0]}px - 12.5px)`}}/>
        }
        { boxCoordinates &&
          <span className="dot" style={{ "top": `calc(${boxCoordinates[1]}px - 12.5px)`, "left": `calc(${boxCoordinates[0]}px - 12.5px)` }}></span>
        }
        { deadpoolCoordinates &&
          <span className="dot-green" style={{ "top": `${deadpoolCoordinates[1]}px`, "left": `${deadpoolCoordinates[0]}px` }}></span>
        }
        { flashCoordinates &&
          <span className="dot-green" style={{ "top": `${flashCoordinates[1]}px`, "left": `${flashCoordinates[0]}px` }}></span>
        }
        { spidermanCoordinates &&
          <span className="dot-green" style={{ "top": `${spidermanCoordinates[1]}px`, "left": `${spidermanCoordinates[0]}px` }}></span>
        }

      </main>
      {deadpoolCoordinates && flashCoordinates && spidermanCoordinates &&
        <ScoreboardPopup />
      }

    </>
  )
}

export default App
