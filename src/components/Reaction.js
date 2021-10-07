// Importing realtime from firebase
import realtime from '../firebase.js';
// Importing functions from firebase database, ref 
import { ref, set } from 'firebase/database';

function Reactions(props) {
    // Functions created for updating the number of reactions in firebase and passed to onClick

    const heartClick = function() {
        let newCounter = props.reactions.heart + 1;

        const childNodeRef = ref(realtime, `${props.id}/reactions/heart`);

        set(childNodeRef, newCounter)
    }

    const fistClick = function() {
        let newCounter = props.reactions.fist + 1;

        const childNodeRef = ref(realtime, `${props.id}/reactions/fist`);

        set(childNodeRef, newCounter)
    }

    const strongClick = function() {
        let newCounter = props.reactions.strong + 1;

        const childNodeRef = ref(realtime, `${props.id}/reactions/strong`);

        set(childNodeRef, newCounter)
    }

    const clapClick = function() {
        let newCounter = props.reactions.clap + 1;

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
