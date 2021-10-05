// Importing stylesheet 
import './App.css';
// Importing useState and useEffect functions
import { useState, useEffect, useRef } from 'react';
// Importing realtime function from firebase module
import realtime from './firebase.js';
// Importing functions from firebase database, ref 
import { ref, push, onValue } from 'firebase/database';

import Reactions from './Reaction.js';

function App() {
  // This state is created to be used later to map through and print on the page
  const [ userCommentList, setUserCommentList ] = useState([]); 

  // This state is created to capture user name input
  const [ userName, setUserName ] = useState('');

  // This state is created to capture user input in textarea
  const [ userComment, setUserComment ] = useState('');

  // calling useEffect function so we can set up Firebase subscription inside it and also pass it an empty dependecy array so it only runs once when the app loads
  useEffect( function() {

    // Making reference to our realtime database
    const dbRef = ref(realtime);

    // Setting up Firebase subscription using onValue function, passing it dbRef(reference to realtime database) and a callback function that will run every time there's a change to the database
    onValue(dbRef, function(snapshot) {
      // console.log(snapshot.val()); // Checking to see if it works and it did work

      // Creating a variable to store our database snapshot whenever a change in the database occurs and use the .val() method to parse out just the JSON object that is in the database
      const myData = snapshot.val();
      console.log(myData);

      // Creating an empty array to hold the list of comments, that will be mapped through to be printed on the page
      const newArray = [];

      // Looping through myData object to get each property-value key and store it in its own object then push each individual object into the empty array
      for (let property in myData) {
        const commentObject = {
          key: property,
          message: myData[property].message,
          username: myData[property].username
        }

        // console.log(commentObject);
        // Pushing each comment object after user submits into newArray, which will be mapped through to print on the page
        newArray.push(commentObject);
      }
      // console.log(newArray);
      // Setting newArray, which contains individual user comment object, into state 
      setUserCommentList(newArray);
    });
  }, []);

  // Creating a function to pass to setUserInput function so it listens for any changes in the user name input
  const userNameChange = function (event) {
    // This sets the default value of userInput whenever the handleChange function runs
      setUserName(event.target.value);
    // console.log(event.target.value);
  }

  // Creating a function to pass to setUserComment function so it listens for any changes in the user comment textarea
  const userCommentChange = function (event) {
     // This sets the default value of userComment whenever the handleChange function runs
    setUserComment(event.target.value);

    // console.log(event.target.value);
  }

  // Creating this function to pass to form element so it gets triggered whenever the user submits
  const submitEvent = function (event) {
    event.preventDefault();
    
    
    // Since providing username is optional, the default 
    if (userName && userComment) {
      // Creating a reference to realtime database because the previous reference is within another function, thus making it out of scope
      const dbRef = ref(realtime);

      // Creating a new variable to hold user name and user comment values in and push the variable to firebase
      const userObject = {
        message: userComment,
        username: userName
      }
      // Calling Firebase's push function, passing it dbRef function and the user input value that is being pushed to the referenced database
      push(dbRef, userObject)

      // Clears the input after each submit
      setUserName('');
      setUserComment('');

    } else {
      alert(`Sorry, it seems like we didn't recieve your message!`)
    }
  }

  const commentsSectionScroll = useRef(null);

  const scrollToComments = function() {
    window.scrollTo({top: commentsSectionScroll.current.offsetTop, behavior: 'smooth'});
  }

  return (
    <div className="app">
        <div className="wrapper">
          <div className="hero">
            <header>
              <h1>Safespace</h1>
            </header>

            <form onSubmit={ submitEvent }>
              
              <label htmlFor="userName" className="sr-only">Name</label>
              <input 
              type="text" 
              id="userName" 
              placeholder='Name (Optional)'
              onChange={ userNameChange }
              value={ userName } />

              <label htmlFor="messageInput" className="sr-only">Write your message here..</label>
              <textarea 
              id="messageInput" 
              placeholder="Type your message here..."
              onChange={ userCommentChange }
              value={ userComment } ></textarea>

              <button onClick={scrollToComments}>Post</button>

            </form>
          </div>
        </div>

        <div className="wrapper">
          <ul ref={commentsSectionScroll}>
            {
              // Mapping through the array and printing each userObject on the page
                userCommentList.map( function (individualComment) {
                  return (
                    <li key={individualComment.key}>
                      <h3>{individualComment.username}</h3>
                      <p>{individualComment.message}</p>
                      
                      <Reactions />

                    </li>
                  )
                })
              }
          </ul>
        </div>
        <footer>Created by Sara Amiri</footer>
    </div>
  );
}

export default App;
// - Start with a basic markup, have a form for user input
  // - A text input for name, a textarea for message and a button for submitting 
// - Set up firebase to store data and print it on the page
// - Import useState then call it and store the data we receieve from Firebase
// - Import useEffect to make a subscription to firebase so it run once when the app loads
// - Access user input and push to firebase to store so we can get it back and print it on the pages
