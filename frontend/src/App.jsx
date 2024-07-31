import waldoPic from "./assets/wheres_waldo_pic.webp"
import deadpool from "./assets/deadpool.jpg"
import flash from "./assets/flash.jpg"
import spiderman from "./assets/spiderman.jpg"
import "./index.css"
import { useState } from "react";

function App() {
  const [coordinates, setCoordinates] = useState(null);

  function handleClick(e) {
    console.log(e);
    const targetingBox = document.querySelector(".targeting-box");
    const pictureContainer = document.querySelector(".picture-container")

    if (targetingBox.open) {
      targetingBox.close();
    } else {
      const leftPosition = e.pageX - (pictureContainer.offsetLeft);
      const topPosition = e.pageY - (pictureContainer.offsetTop);
      setCoordinates([leftPosition, topPosition]);
      targetingBox.show();
    }
  }

  return (
    <>
      <h1 className="title">Where's Waldo?</h1>
      <main className="picture-container">
        <img src={waldoPic} alt="" className="picture" onClick={(e) => {handleClick(e)}}/>
        <dialog className="targeting-box" style={{ "top": coordinates && `${coordinates[1]}px`, "left": coordinates && `${coordinates[0]}px` }}>
          <div>
            <button className="character-button">
              <img src={deadpool} alt="deadpool" className="character-image"/>
            </button>
            <p className="character-name">Deadpool</p>
          </div>
          <div>
            <button className="character-button">
              <img src={flash} alt="flash" className="character-image"/>
            </button>
            <p className="character-name">Flash</p>
          </div>
          <div>
            <button className="character-button">
              <img src={spiderman} alt="spiderman" className="character-image"/>
            </button>
            <p className="character-name">Spiderman</p>
          </div>
        </dialog>
      </main>

    </>
  )
}

export default App
