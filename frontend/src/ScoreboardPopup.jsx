import { useNavigate } from "react-router-dom";

export default function ScoreboardPopup() {
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const time = document.querySelector(".timer").textContent;
        const timeArray = time.split(":");
        const minutes = Number(timeArray[0]);
        const seconds = Number(timeArray[1]);
        const duration = minutes * 60 + seconds;

        const data = JSON.stringify({
            name: name,
            time: duration,
        });

        fetch('http://localhost:3000/api/scoreboard/score', {
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
                    /*document.querySelector(".scoreboard-popup").close();
                    document.querySelector(".scoreboard").show();*/
                    console.log(data.message);
                    localStorage.setItem("scoreId", data.id);
                    navigate("/scoreboard");
                }
            })
            .catch(err => console.log(err));

    }

    return(
        <div className="scoreboard-popup" >
            <p style={{marginTop: "0", textAlign: "center", fontSize: "1.25rem"}}>Put your score on the scoreboard!</p>
            <form action="" method="POST">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" required />
                <input className="submit" type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </div>
    )
}