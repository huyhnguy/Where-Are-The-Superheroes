import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Hint({ startHintTimer, characterCoordinates }) {
    const [giveHint, setGiveHint] = useState(null)

    function handleYes() {
        setGiveHint(true);
    }

    function handleClose() {
        setGiveHint(false);
        startHintTimer();
    }

    function chooseHint(hintArray) {
        for (let i = 0; i < hintArray.length; i++) {
            if (hintArray[i] === null) {
                if (i === 0) { return "Deadpool is near the Gadget Zone" }
                else if (i === 1) { return "Flash is near the FREAKSHOW Collectibles" }
                else if (i === 2) { return "Spiderman is near the iDeathNoteBook Air Demo" }
            }
        }
    }

    return(
        <div className="hint-popup" style={{ visibility: giveHint === false && "hidden", pointerEvents: giveHint === false && "none", display: giveHint && "flex", gap: giveHint && "10px" }}>
            {giveHint === null && 
                <>
                    <p style={{marginTop: "0"}}>Would you like a hint?</p>
                    <div className="hint-buttons">
                        <button onClick={handleClose}>No</button>
                        <button onClick={handleYes}>Yes</button>
                    </div>
                </>
            }
            {giveHint &&
                <>

                    <p style={{margin: "0"}}>
                        {chooseHint(characterCoordinates)}
                    </p>
                    <button className="close-button" onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </>

            }
        </div>
    )
}