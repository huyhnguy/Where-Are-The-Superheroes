import waldoPic from "./assets/wheres_waldo_pic.webp"
import deadpool from "./assets/deadpool.jpg"
import flash from "./assets/flash.jpg"
import spiderman from "./assets/spiderman.jpg"
import "./index.css"
import { useState } from "react";

function App() {
  const [coordinates, setCoordinates] = useState(null);

  function handleClick(e) {
    const targetingBox = document.querySelector(".targeting-box");

    if (targetingBox.open) {
      targetingBox.close();
    } else {
      const pictureContainer = document.querySelector(".picture-container");
      const pictureDimensions = pictureContainer.getBoundingClientRect();
      const leftPosition = e.pageX - (pictureContainer.offsetLeft);
      const topPosition = e.pageY - (pictureContainer.offsetTop);
      const widthPercentage = leftPosition / pictureDimensions.width;
      const heightPercentage = topPosition / pictureDimensions.height;

      if (widthPercentage > 0.42 && widthPercentage < 0.44 && heightPercentage > 0.59 && heightPercentage < 0.63) {
        console.log ("You found Flash!");
      }
  
      if (widthPercentage > 0.73 && widthPercentage < 0.75 && heightPercentage > 0.72 && heightPercentage < 0.77) {
        console.log ("You found Deadpool!");
      }
  
      if (widthPercentage > 0.75 && widthPercentage < 0.77 && heightPercentage > 0.18 && heightPercentage < 0.21) {
        console.log ("You found Spiderman!");
      }

      setCoordinates([leftPosition, topPosition]);
      targetingBox.show();
    }
  }

  return (
    <>
      <h1 className="title">Where Are The Superheroes?</h1>
      <section style={{ margin: "1rem"}}>
        <p style={{textAlign: "center"}}>Find all of them!</p>
        <div className="characters">
          <div >
            <img src={deadpool} alt="deadpool" className="main-character-image"/>
            <p className="character-name">Deadpool</p>
          </div>
          <div>
            <img src={flash} alt="flash" className="main-character-image"/>
            <p className="character-name">Flash</p>
          </div>
          <div>
            <img src={spiderman} alt="spiderman" className="main-character-image"/>
            <p className="character-name">Spiderman</p>
          </div>
        </div>
      </section>
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
