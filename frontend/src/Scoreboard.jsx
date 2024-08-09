import { useEffect, useState, useRef } from "react";
import Replay from "./Replay";

export default function Scoreboard() {
    const [scores, setScores] = useState(null);
    const refContainer = useRef(null);

    useEffect(() => {
        fetch('https://wheres-waldo-backend-2-17acca0f1864.herokuapp.com/api/scoreboard', {
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

    useEffect(() => { 
        if (refContainer.current) {
            refContainer.current.scrollIntoView({ 
                behavior: "smooth",
                block: 'center',
                inline: 'center'
            }); 
        }
    })

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

    return(
            <>
                <main className="scoreboard">
                    <h1 className="title">Scoreboard</h1>
                    { scores &&
                        <div className="scoreboard-grid">
                            <h2>Rank</h2>
                            <h2>Time</h2>
                            <h2>Name</h2>
                            {scores.map((score, index) => {
                                const scoreId = localStorage.getItem("scoreId");
                                if (score._id === scoreId) {
                                    return (
                                        <>
                                            <p ref={refContainer}><strong>{index + 1}.</strong></p>
                                            <p><strong>{formatTime(score.time)}</strong></p>
                                            <p className="name"><strong>{score.name}</strong></p>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <p>{index + 1}.</p>
                                            <p>{formatTime(score.time)}</p>
                                            <p className="name">{score.name}</p>
                                        </>
                                    )
                                }
                            }

                            )}
                        </div>
                    }
                </main>
                <Replay />
            </>
            

    )
}