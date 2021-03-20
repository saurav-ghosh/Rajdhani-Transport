import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css';
import google from '../../images/google.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';

const Login = () => {

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    };

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: ''
    });

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    //google sign in
    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
    };

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
    }

    const handleEmailPassAccount = (e) => {
        if(newUser && loggedInUser.email && loggedInUser.password){
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then((res) => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
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
                newUserInfo.error = '';
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
        e.preventDefault();
    }

    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        }).then(function() {
        // Update successful.
        }).catch(function(error) {
        // An error happened.
        });
    }

    return (
        <div>
            <Header></Header>
            <div>
                <div className="form-field" style={{display: newUser ? 'block' : 'none'}}>
                    <h2>Create an account</h2>
                    <form onSubmit={handleEmailPassAccount}>
                        <input type="text" onBlur={handleBlur} name="name" id="" placeholder="Enter your name" required/><br/>
                        <input type="email" onBlur={handleBlur} name="email" id="" placeholder="Enter your email" required/><br/>
                        <input type="password" name="password" id="" placeholder="Enter your password" required/><br/>
                        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Confirm password" required/><br/><br/>
                        <p style={{color: 'red'}}>{user.error}</p>
                        <input className="button" type="submit" value="Create an account"/>
                    </form>
                    <p>Already have an account? <Link onClick={() => setNewUser(false)}>Login</Link></p>
                </div>
                <div className="form-field" style={{display: newUser ? 'none' : 'block'}}>
                    <h2>Login</h2>
                    <form onSubmit={handleEmailPassAccount}>
                        <input type="email" onBlur={handleBlur} name="email" id="" placeholder="Enter your email" required/><br/>
                        <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter your password" required/><br/>
                        <p style={{color: 'red'}}>{user.error}</p>
                        <input className="button" type="submit" value="Login"/>
                    </form>
                    <p>Don't have an account? <Link onClick={() => setNewUser(true)}>Create an account</Link></p>
                </div>
                <div className="others-sign-in">
                    <p>Or</p>
                    <button onClick={handleGoogleSignIn} className="signIn-button"><img src={google} alt=""/> <p>Continue with Google</p></button>
                </div>
            </div>
        </div>
    );
};

export default Login;