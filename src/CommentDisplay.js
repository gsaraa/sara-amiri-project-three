function CommentDisplay (props) {

    console.log(props);
    const { commentProp, deleteComment} = props;
    return (
    <div className="commentsSection">
        <ul>
            {/* // Mapping through the array and printing each userObject on the page */}
            { 
                commentProp.map( function (individualComment)  {
                    return (
                    <li key={individualComment.key}>
                        <h3>{individualComment.username}</h3>
                        <p>{individualComment.message}</p>
                        
                        {/* <Reactions /> */}
                        <button className="delete" onClick={() => deleteComment(individualComment.key)}>✖️</button>
                    </li>
                )
                })
            }
        </ul>
    </div>
    )
}

export default CommentDisplay;