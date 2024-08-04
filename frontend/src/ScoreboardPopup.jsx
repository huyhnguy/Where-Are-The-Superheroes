export default function ScoreboardPopup() {
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
            .then(data => console.log(data.message))
            .catch(err => console.log(err));
    }

    return(
        <dialog className="scoreboard-popup" open>
            <p>Put your score on the scoreboard!</p>
            <form action="" method="POST">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
            <input type="submit" value="submit" onClick={handleSubmit}/>
            </form>
        </dialog>
    )
}