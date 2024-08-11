import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLeftAndUpRightToCenter, faUpRightAndDownLeftFromCenter, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from 'react'
import deadpool from "./assets/deadpool.jpg"
import flash from "./assets/flash.jpg"
import spiderman from "./assets/spiderman.jpg"
import Timer from "./Timer"


export default function StickyHeader({ muteFunction, deadpoolCoordinates, flashCoordinates, spidermanCoordinates }) {
    const [minimize, setMinimize] = useState(false);
    const [audio, setAudio] = useState(true);

    function handleMinimize() {
        if (minimize) {
            setMinimize(false);
        } else {
            setMinimize(true);
        }
    }

    function changeAudioIcon() {
        if (audio) {
            setAudio(false);
        } else {
            setAudio(true);
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
            <div className="third-row" style={{ visibility: minimize && "hidden", position: minimize && "absolute" }}>
                { spidermanCoordinates && flashCoordinates && deadpoolCoordinates ? 
                    <Timer isRunning={false} /> 
                    : 
                    <Timer isRunning={true} />
                }
                {audio ? 
                    <button className="volume-button" onClick={() => {
                        muteFunction();
                        changeAudioIcon();
                    }}>
                        <FontAwesomeIcon icon={faVolumeHigh} style={{color: "#000000", height: "1.5rem"}} />
                    </button>
                    :
                    <button className="volume-button" onClick={() => {
                        muteFunction();
                        changeAudioIcon();
                    }}>
                        <FontAwesomeIcon icon={faVolumeXmark} style={{color: "#000000", height: "1.5rem"}} />
                    </button>
                }
            </div>
      </section>
    )
}