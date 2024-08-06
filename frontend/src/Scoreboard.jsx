import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'


export default function Scoreboard() {
    const [scores, setScores] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/api/scoreboard', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(data => {
                setScores(data);
            })
            .catch(err => console.log(err));
    }, [])

    function formatTime(time) {
        let formattedMinutes;
        let formattedSeconds;

        let seconds = time % 60;
        if (seconds > 1) {formattedSeconds = seconds + " seconds"}
        else {formattedSeconds = seconds + " second"}

        if (time > 60) {
            let minutes = Math.floor(time / 60);
            if (minutes > 1) {formattedMinutes = minutes + " minutes"}
            else {formattedMinutes = minutes + " minute"};

            return formattedMinutes + " " + formattedSeconds
        }

        return formattedSeconds
    }

    function handleClose() {
        document.querySelector(".scoreboard").close();
    }

    return(
        <div className="popup-container" style={{zIndex : 10}}>
            <dialog open className="scoreboard">
                <h2 className="title">Scoreboard</h2>
                <button className="close" onClick={handleClose} style={{ cursor: "pointer"}}>
                    <FontAwesomeIcon icon={faCircleXmark} style={{ height: "1.5rem"}}/>
                </button>
                { scores &&
                    <ol>
                        {scores.map(score => <li key={score._id}>{score.name} | {formatTime(score.time)}</li>)}
                    </ol>
                }
            </dialog>
        </div>

    )
}