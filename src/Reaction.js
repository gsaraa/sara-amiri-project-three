import {useState} from 'react';

function Reactions() {
    const [heartCounter, setHeartCounter] = useState(0);
    const [fistCounter, setFistCounter] = useState(0);
    const [strongCounter, setStrongCounter] = useState(0);
    const [clapCounter, setClapCounter] = useState(0);

    const heartClick = function() {
        let newCounter = heartCounter + 1;
        setHeartCounter(newCounter);
    }
    const fistClick = function() {
        let newCounter = fistCounter + 1;
        setFistCounter(newCounter);
    }
    const strongClick = function() {
        let newCounter = strongCounter + 1;
        setStrongCounter(newCounter);
    }
    const clapClick = function() {
        let newCounter = clapCounter +1;
        setClapCounter(newCounter);
    }

    return (
        <div>
            <button onClick={heartClick}>💕 {heartCounter}</button>
            <button onClick={fistClick}>✊ {fistCounter}</button>
            <button onClick={strongClick}>💪{strongCounter}</button>
            <button onClick={clapClick}>👏 {clapCounter}</button>
    
            {/* <p>It is increasing {counter} </p> */}

        </div>
    )
}
export default Reactions;
