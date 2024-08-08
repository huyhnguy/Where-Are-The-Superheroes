import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import deadpool from "./assets/deadpool.jpg"
import flash from "./assets/flash.jpg"
import spiderman from "./assets/spiderman.jpg"
import Timer from "./Timer"


export default function StickyHeader({ deadpoolCoordinates, flashCoordinates, spidermanCoordinates }) {
    const [minimize, setMinimize] = useState(false);

    function handleMinimize() {
        if (minimize) {
            setMinimize(false);
        } else {
            setMinimize(true);
        }
    }

    return(
        <section className="sticky-header">
        <div className="first-row">
          <h1 className="title">Where Are These Superheroes?</h1>
          { minimize ? 
            <button className="minimize" onClick={handleMinimize}>
                <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
            </button>
            :
            <button className="minimize" onClick={handleMinimize}>
                <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
            </button>
          }
        </div>
        <div className="second-row" style={{ visibility: minimize && "hidden", position: minimize && "absolute" }}>
            <div className="characters">
            <div style={{ position: "relative" }}>
                <img src={deadpool} alt="deadpool" className="main-character-image" style={{ opacity: deadpoolCoordinates && "50%" }}/>
                <p className="character-name">Deadpool</p>
                {deadpoolCoordinates && 
                <FontAwesomeIcon icon={faCircleCheck} beat className="checkmark" />
                }
            </div>
            <div style={{ position: "relative" }}>
                <img src={flash} alt="flash" className="main-character-image" style={{ opacity: flashCoordinates && "50%" }}/>
                <p className="character-name">Flash</p>
                {flashCoordinates && 
                <FontAwesomeIcon icon={faCircleCheck} beat className="checkmark" />
                }
            </div>
            <div style={{ position: "relative" }}>
                <img src={spiderman} alt="spiderman" className="main-character-image" style={{ opacity: spidermanCoordinates && "50%" }}/>
                <p className="character-name">Spiderman</p>
                {spidermanCoordinates && 
                <FontAwesomeIcon icon={faCircleCheck} beat className="checkmark" />
                }
            </div>
            </div>
            { spidermanCoordinates && flashCoordinates && deadpoolCoordinates ? 
                <Timer isRunning={false} /> 
                : 
                <Timer isRunning={true} />
            }
        </div>


      </section>
    )
}