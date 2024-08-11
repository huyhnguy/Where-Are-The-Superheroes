import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ScoreboardPopup() {
    const time = document.querySelector(".timer").textContent;
    const timeArray = time.split(":");
    const minutes = Number(timeArray[0]);
    const seconds = Number(timeArray[1]);
    const duration = minutes * 60 + seconds;
    
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
        
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;

        const data = JSON.stringify({
            name: name,
            time: duration,
        });

        fetch('https://wheres-waldo-backend-531ef25fc781.herokuapp.com/scoreboard/score', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: data,
          })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Score saved") {
                    localStorage.setItem("scoreId", data.id);
                    navigate("/scoreboard");
                }
            })
            .catch(err => console.log(err));

    }

    return(
        <div className="scoreboard-popup" >
            <h1>Congratulations!</h1>
            <p>You found everyone in <strong>{formatTime(duration)}</strong>.</p>
            <p>Put your score on the scoreboard.</p>
            <form action="" method="POST" style={{ display: "flex", flexDirection: "column",}}>
                <div style={{display: "flex", justifyContent: "space-around", gap: "15px", width: "100%"}}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required style={{width: "100%"}}/>
                </div>
                <input className="submit" type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </div>
    )
}