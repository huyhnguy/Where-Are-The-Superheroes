import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";


export default function Replay() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
    }
    
    return(
            <button className="replay" onClick={handleClick}>
                <FontAwesomeIcon className="replay-icon" spin icon={faRotateRight} />            
            </button>
    )
}