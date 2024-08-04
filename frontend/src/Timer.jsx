import { useState, useRef, useEffect } from "react"
import "./index.css"

export default function Timer({ isRunning }) {
    const [time, setTime] = useState(0);

    const timer = useRef();

    useEffect(() => {
        if (isRunning) {
            timer.current = setInterval(() => {
                setTime(pre => pre + 1)
            }, 1000)
        }
        return () => clearInterval(timer.current);

    }, [isRunning]);


    return (
        <p className="timer">{format(time)}</p>
    )
}

const format = (time) => {
    let minutes = Math.floor(time / 60 / 60);
    let seconds = Math.floor(time % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds

}