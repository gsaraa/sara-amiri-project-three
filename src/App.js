// Importing stylesheet 
import './App.css';
// Importing useState and useEffect functions
import { useState, useEffect, useRef } from 'react';
// Importing realtime function from firebase module
import realtime from './firebase.js';
// Importing functions from firebase database, ref 
import { ref, push, onValue, remove } from 'firebase/database';

// import Reactions from './Reaction.js';
// Importing CommentDisplay function 
import CommentDisplay from './components/CommentDisplay.js';

import Form from './components/Form.js'

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
      // Creating a variable to store our database snapshot whenever a change in the database occurs and use the .val() method to parse out just the JSON object that is in the database
      const myData = snapshot.val();

      // Creating an empty array to hold the list of comments, that will be mapped through to be printed on the page
      const newArray = [];

      // Looping through myData object to get each property-value key and store it in its own object then push each individual object into the empty array
      for (let property in myData) {
        const commentObject = {
          key: property,
          message: myData[property].message,
          username: myData[property].username,
          reactions: {
            heart: myData[property].reactions.heart,
            strong: myData[property].reactions.strong,
            clap: myData[property].reactions.clap,
            fist: myData[property].reactions.fist
          }
        }

        console.log(commentObject);
        // Pushing each comment object after user submits into newArray, which will be mapped through to print on the page
        newArray.push(commentObject);
      }
      // Setting newArray, which contains individual user comment object, into state 
      setUserCommentList(newArray);
    });
  }, []);

  // Creating a function to pass to setUserInput function so it listens for any changes in the user name input
  const userNameChange = function (event) {
    // This sets the default value of userInput whenever the handleChange function runs
      setUserName(event.target.value);
  }

  // Creating a function to pass to setUserComment function so it listens for any changes in the user comment textarea
  const userCommentChange = function (event) {
     // This sets the default value of userComment whenever the handleChange function runs
    setUserComment(event.target.value);
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
        username: userName,
        reactions: {
          heart: 0,
          strong: 0,
          clap: 0,
          fist: 0
        }
      }
      // Calling Firebase's push function, passing it dbRef function and the user input value that is being pushed to the referenced database
      push(dbRef, userObject)

      // Clears the input after each submit
      setUserName('');
      setUserComment('');

    } else {
      alert(`Sorry, it seems like we didn't recieve your message!`)
    }
  };

  // Function created to remove comment/remove from firebase
  const deleteComment = function(buttonToDeleteKey) {
    const specificNode = ref(realtime, buttonToDeleteKey);

    remove(specificNode);
  }

// Function created to scroll to comment section after submit button is triggered
  const commentsSectionScroll = useRef(null);

  const scrollToComments = function() {
    window.scrollTo({top: commentsSectionScroll.current.offsetTop, behavior: 'smooth'});
  }

  return (
    <div className="app">
        <div className="wrapper">
          <div className="hero">
            <header>
              <h1>Community <span>Diary</span></h1>
              <p>Whether it's a small win you want to celebrate or rant about an inconvience, share it in this virtual community diary</p>
            </header>

            <Form 
            submitHandle={ submitEvent }
            userNameValue={ userName }
            userNameChangeHandle={ userNameChange }
            userTextValue={ userComment }
            userTextChangeHandle={ userCommentChange }
            scroll={ scrollToComments }
            />

          </div>
        </div>

        <div className="wrapper" ref={commentsSectionScroll}>
          <CommentDisplay 
          commentProp={userCommentList}
          deleteComment={deleteComment}
          />
        </div>

        <footer>
          <p>Created by Sara Amiri, at <a href="https://junocollege.com/">Juno College of Technology</a></p> 
          </footer>
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
