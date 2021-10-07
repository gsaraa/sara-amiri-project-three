// Function for user input submission, with props passed to access 
function Form (props) {
    const { submitHandle, userNameValue, userNameChangeHandle, userTextValue, userTextChangeHandle, scroll } = props;
    return (
        <>
            <form onSubmit={ submitHandle }>
                <label htmlFor="userName" className="sr-only">Name</label>
                <input 
                type="text" 
                id="userName" 
                placeholder='Name (Optional)'
                onChange={ userNameChangeHandle }
                value={ userNameValue } />

                <label htmlFor="messageInput" className="sr-only">Write your message here..</label>
                <textarea 
                id="messageInput" 
                placeholder="Type your message here..."
                onChange={ userTextChangeHandle }
                value={ userTextValue } ></textarea>

                <button type="submit" onClick={ scroll }>Post</button>

            </form>
        </>
    )
}
export default Form;