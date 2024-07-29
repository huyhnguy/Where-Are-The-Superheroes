import waldoPic from "./assets/wheres_waldo_pic.webp"
import "./index.css"

function App() {
  function handleClick(e) {
    console.log(e);
    const targetingBox = document.querySelector(".targeting-box");
    console.log(targetingBox);
    targetingBox.showModal();
  }

  return (
    <>
      <h1 className="title">Where's Waldo?</h1>
      <main>
        <img src={waldoPic} alt="" className="picture" onClick={(e) => {handleClick(e)}}/>
        <dialog className="targeting-box">
          <h2>Hello.</h2>
        </dialog>
      </main>

    </>
  )
}

export default App
