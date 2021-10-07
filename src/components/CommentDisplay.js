// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Import Reactions function
import Reactions from './Reaction.js';
// Function for display user name and message on the webpage + delete the message (removing node from firebase database)
function CommentDisplay (props) {
    // Destructing props
    const { commentProp, deleteComment} = props;

    return (
    <div className="commentsSection">
        <ul>
            {/* // Mapping through the array and printing each userObject on the page */}
            { 
                commentProp.map( function (individualComment)  {
                    return (
                    <li key={individualComment.key}>
                        <h2>{individualComment.username}</h2>
                        <p>{individualComment.message}</p>
                        
                        <Reactions reactions={individualComment.reactions}
                        id={individualComment.key}/>

                        <button 
                            className="delete" 
                            onClick={() => deleteComment(individualComment.key)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                    </li>
                )
                })
            }
        </ul>
    </div>
    )
}

export default CommentDisplay;