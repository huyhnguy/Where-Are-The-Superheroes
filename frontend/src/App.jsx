import waldoPic from "./assets/wheres_waldo_pic.webp"
import deadpool from "./assets/deadpool.jpg"
import flash from "./assets/flash.jpg"
import spiderman from "./assets/spiderman.jpg"
import checkmark from "./assets/circle-check-regular.svg"
import "./index.css"
import { useState } from "react";

function App() {
  const [boxCoordinates, setBoxCoordinates] = useState(null);
  const [coordinatePercentages, setCoordinatePercentages] = useState(null);
  const [deadpoolFound, setDeadpoolFound] = useState(false);
  const [flashFound, setFlashFound] = useState(false);
  const [spidermanFound, setSpidermanFound] = useState(false);

  function handleClick(e) {
    const targetingBox = document.querySelector(".targeting-box");

    if (targetingBox.open) {
      setCoordinatePercentages(null);
      setBoxCoordinates(null);
      targetingBox.close();
    } else {
      const pictureContainer = document.querySelector(".picture-container");
      const pictureDimensions = pictureContainer.getBoundingClientRect();
      const leftPosition = e.pageX - (pictureContainer.offsetLeft);
      const topPosition = e.pageY - (pictureContainer.offsetTop);
      const xCoordinatePercentage = leftPosition / pictureDimensions.width;
      const yCoordinatePercentage = topPosition / pictureDimensions.height;
      setCoordinatePercentages([xCoordinatePercentage, yCoordinatePercentage]);
      setBoxCoordinates([leftPosition, topPosition]);
      targetingBox.show();
    }
  }

  function handleCharacter(character) {
    const url = 'http://localhost:3000/api/characters/' + character;

    const data = JSON.stringify({
      xCoordinatePercentage: coordinatePercentages[0],
      yCoordinatePercentage: coordinatePercentages[1],
    })

    console.log(data);

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
          if (character === "deadpool") {setDeadpoolFound(true)};
          if (character === "flash") {setFlashFound(true)};
          if (character === "spiderman") {setSpidermanFound(true)}
        }
        const targetingBox = document.querySelector(".targeting-box");
        setCoordinatePercentages(null);
        setBoxCoordinates(null);
        targetingBox.close();
      })
      .catch(err => console.log(err));

  }

  return (
    <>
      <h1 className="title">Where Are The Superheroes?</h1>
      <section style={{ margin: "1rem"}}>
        <p style={{textAlign: "center"}}>Find all of them!</p>
        <div className="characters">
          <div style={{ position: "relative" }}>
            <img src={deadpool} alt="deadpool" className="main-character-image" style={{ opacity: deadpoolFound && "50%" }}/>
            <p className="character-name">Deadpool</p>
            {deadpoolFound && 
              <img src={checkmark} alt="checkmark" className="checkmark" />
            }
          </div>
          <div style={{ position: "relative" }}>
            <img src={flash} alt="flash" className="main-character-image" style={{ opacity: flashFound && "50%" }}/>
            <p className="character-name">Flash</p>
            {flashFound && 
              <img src={checkmark} alt="checkmark" className="checkmark" />
            }
          </div>
          <div style={{ position: "relative" }}>
            <img src={spiderman} alt="spiderman" className="main-character-image" style={{ opacity: spidermanFound && "50%" }}/>
            <p className="character-name">Spiderman</p>
            {spidermanFound && 
              <img src={checkmark} alt="checkmark" className="checkmark" />
            }
          </div>
        </div>
      </section>
      <main className="picture-container">
        <img src={waldoPic} alt="" className="picture" onClick={(e) => {handleClick(e)}}/>
        <dialog className="targeting-box" style={{ "top": boxCoordinates && `${boxCoordinates[1]}px`, "left": boxCoordinates && `${boxCoordinates[0]}px` }}>
          {!deadpoolFound && 
            <div>
              <button className="character-button" onClick={() => {handleCharacter("deadpool")}}>
                <img src={deadpool} alt="deadpool" className="character-image"/>
              </button>
              <p className="character-name">Deadpool</p>
            </div>
          }
          {!flashFound && 
            <div>
              <button className="character-button" onClick={() => {handleCharacter("flash")}}>
                <img src={flash} alt="flash" className="character-image"/>
              </button>
              <p className="character-name">Flash</p>
            </div>
          }
          {!spidermanFound &&
            <div>
              <button className="character-button" onClick={() => {handleCharacter("spiderman")}}>
                <img src={spiderman} alt="spiderman" className="character-image"/>
              </button>
              <p className="character-name">Spiderman</p>
            </div>
          }
        </dialog>
        { boxCoordinates &&
          <span className="dot" style={{ "top": `calc(${boxCoordinates[1]}px - 12.5px)`, "left": `calc(${boxCoordinates[0]}px - 12.5px)` }}></span>
        }

      </main>

    </>
  )
}

export default App
