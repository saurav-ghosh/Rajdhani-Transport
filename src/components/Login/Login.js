import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {userContext} from '../../App';
import { useHistory, useLocation } from 'react-router';
import google from '../../images/google.png';
import './Login.css';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        error: '',
        success: ''
    });
    const [newUser, setNewUser] = useState(false);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }

    //--------google sign in--------
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser);
            history.replace(from);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorMessage);
        });
    }

    // ---------checking from field validation--------
    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value); 
        }
        if(e.target.name === 'password'){
            isFieldValid = e.target.value.length > 4; 
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
        }
    };

    const handleEmailPasswordAccount = (e) => {
        if( newUser && loggedInUser.email && loggedInUser.password){
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((res) => {
                    const newUserInfo = {...user};
                    newUserInfo.success = 'user created successfully';
                    updateUserName(newUserInfo.name);
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    const newUserInfo = {...user};
                    newUserInfo.error = errorMessage;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                });
        }

        if(!newUser && loggedInUser.email && loggedInUser.password){
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then((res) => {
                const newUserInfo = {...user};
                newUserInfo.success = 'user logged in successfully';
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                var errorMessage = error.message;
                const newUserInfo = {...user};
                newUserInfo.error = errorMessage;
                setUser(newUserInfo);
            });
        }
        e.preventDefault();
    };

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name 
        }).then(function(res) {
            //successfully updated
        }).catch(function(error) {
        console.log('error');
        });
    }
    
    return (
        <div>
            <Header></Header>
            <>
                <form className="form-field" onSubmit={handleEmailPasswordAccount}>
                    {newUser ? <h2>Create an account</h2> : <h2>Login</h2>}
                    { newUser && <input type="text" onBlur={handleBlur} name="name" id="" placeholder="Enter your name" required/>}<br/>
                    <input type="text" onBlur={handleBlur} name="email" id="" placeholder="Enter your email" required/><br/>
                    <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter your password" required/><br/>
                    <p style={{color: 'green'}}>{user.success}</p>
                    <p style={{color: 'red'}}>{user.error}</p>
                    <input type="submit" className="button" value={newUser ? "Create an account" : "Login"}/>
                    {newUser ?
                     <p>Already have an account? <button className="signInUp-btn"  onClick={() => setNewUser(!newUser)}>Login</button></p>
                     : <p>Don't have an account? <button className="signInUp-btn" onClick={() => setNewUser(!newUser)}>Create an account</button></p>
                    }
                </form>
                <div className="others-sign-in">
                    <p>Or</p>
                    <button onClick={handleGoogleSignIn} className="signIn-button"><img src={google} alt=""/> <p>Continue with Google</p></button>
                </div>
            </>
        </div>
    );
};

export default Login;