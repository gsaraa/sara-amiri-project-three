// Create a module and store firebase config object

// Import getDatabase function
import { getDatabase } from 'firebase/database';

// Import initializeApp function to configure and initialize firebase app
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMofGSRSeoVRvTtd2BDGRyyLSIGSZ1_D0",
    authDomain: "bootcampprojectthree.firebaseapp.com",
    databaseURL: "https://bootcampprojectthree-default-rtdb.firebaseio.com",
    projectId: "bootcampprojectthree",
    storageBucket: "bootcampprojectthree.appspot.com",
    messagingSenderId: "190557870969",
    appId: "1:190557870969:web:880db6dcce9749ea6aeda8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Storing firebase database in a variable for easier access
const realtime = getDatabase(app);

// Exporting realtime function to access in App.js
export default realtime;