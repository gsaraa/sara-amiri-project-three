import {useState, useEffect} from 'react';
import realtime from './firebase.js';
// Importing functions from firebase database, ref 
import { ref, push, onValue } from 'firebase/database';

function Reactions() {
    useEffect( function() {

        const dbRef = ref(realtime);

        onValue(dbRef, function(snapshot) {

            const myData = snapshot.val();
            // console.log(myData.key.reactions)
        })
    }, []);

    const [heartCounter, setHeartCounter] = useState(0);
    // const [heartDecrese, setHeartDescrease] = useState();
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

    const heartUnclick = function() {
        let decreaseCounter = heartCounter - 1;
        setHeartDescrease(decreaseCounter);
    }
    // const fistUnlick = function() {
    //     let decreaseCounter = fistCounter - 1;
    //     setFistCounter(decreaseCounter);
    // }
    // const strongUnclick = function() {
    //     let decreaseCounter = strongCounter - 1;
    //     setStrongCounter(decreaseCounter);
    // }
    // const clapUnclick = function() {
    //     let decreaseCounter = clapCounter - 1;
    //     setClapCounter(decreaseCounter);
    // }

    return (
        <div className='reactions'>
            <button onClick={heartClick} onChange={heartClick}>💕 {heartCounter}</button>
            <button onClick={fistClick}>👊 {fistCounter}</button>
            <button onClick={strongClick}>💪{strongCounter}</button>
            <button onClick={clapClick}>👏 {clapCounter}</button>
        </div>
    )
}

export default Reactions;
