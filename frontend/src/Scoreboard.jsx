import { useEffect, useState } from "react";

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

    return(
        <dialog open>
            { scores &&
                <ul>
                    {scores.map(score => <li key={score._id}>{score.name} | {score.time}</li>)}
                </ul>
            }
        </dialog>
    )
}