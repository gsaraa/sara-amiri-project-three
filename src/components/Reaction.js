// Importing realtime from firebase
import realtime from '../firebase.js';
// Importing functions from firebase database, ref 
import { ref, set } from 'firebase/database';
import { useState } from 'react';


function Reactions(props) {

    const [heartUnclick, setHeartUnclick] = useState(false);
    const [fistUnclick, setFistUnclick] = useState(false);
    const [strongUnclick, setStrongUnclick] = useState(false);
    const [clapUnclick, setClapUnclick] = useState(false);

    // Functions created for updating the number of reactions in firebase and passed to onClick
    const heartClick = function() {
        let newCounter;

        if (heartUnclick) {
            setHeartUnclick(false)
            newCounter = props.reactions.heart - 1
        } else {
            setHeartUnclick(true)
            newCounter = props.reactions.heart + 1;
        }
        const childNodeRef = ref(realtime, `${props.id}/reactions/heart`);
    
        set(childNodeRef, newCounter)
    }

    const fistClick = function() {
        let newCounter;

        if (fistUnclick) {
            setFistUnclick(false)
            newCounter = props.reactions.fist - 1
        } else {
            setFistUnclick(true)
            newCounter = props.reactions.fist + 1;
        }
        const childNodeRef = ref(realtime, `${props.id}/reactions/fist`);
    
        set(childNodeRef, newCounter)
    }

    const strongClick = function() {
        let newCounter;

        if (strongUnclick) {
            setStrongUnclick(false)
            newCounter = props.reactions.strong - 1
        } else {
            setStrongUnclick(true)
            newCounter = props.reactions.strong + 1;
        }

        const childNodeRef = ref(realtime, `${props.id}/reactions/strong`);

        set(childNodeRef, newCounter)
    }

    const clapClick = function() {
        let newCounter;

        if (clapUnclick) {
            setClapUnclick(false)
            newCounter = props.reactions.clap - 1
        } else {
            setClapUnclick(true)
            newCounter = props.reactions.clap + 1;
        }

        const childNodeRef = ref(realtime, `${props.id}/reactions/clap`);

        set(childNodeRef, newCounter)
    }

    return (
        <div className='reactions'>
            <button onClick={heartClick}>💕 {props.reactions.heart}</button>
            <button onClick={fistClick}>👊 {props.reactions.fist}</button>
            <button onClick={strongClick}>💪{props.reactions.strong}</button>
            <button onClick={clapClick}>👏 {props.reactions.clap}</button>
        </div>
    )
}

export default Reactions;
