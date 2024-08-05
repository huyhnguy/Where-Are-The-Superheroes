export default function ScoreboardPopup({openPopup}) {


    function handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const time = document.querySelector(".timer").textContent;

        const data = JSON.stringify({
            name: name,
            time: time,
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
                    document.querySelector(".scoreboard-popup").close();
                    console.log(data.message);
                }
            })
            .catch(err => console.log(err));
    }

    

    return(
        <div className="popup-container" style={{zIndex : openPopup ? 10 : -1}}>
            <dialog className="scoreboard-popup" open={openPopup}>
                <p>Put your score on the scoreboard!</p>
                <form action="" method="POST">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" required />
                <input type="submit" value="submit" onClick={handleSubmit}/>
                </form>
            </dialog>
        </div>
    )
}