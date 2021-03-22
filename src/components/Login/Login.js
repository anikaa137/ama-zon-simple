import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
function Login() {
    // const [fbUser, setFbUser] = useState({});
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
    });
            //context api
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // Google
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((res) => {
                const { displayName, photoURL, email } = res.user;
                // console.log( displayName,photoURL,email )
                // console.log(res)
                const signedInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setUser(signedInUser);
                setLoggedInUser(signedInUser)
                history.replace(from)
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    };

    //facebook
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var user = result.user;
                // console.log("fb user", user);
                setUser(user);
                setLoggedInUser(user)
                history.replace(from)
                var accessToken = credential.accessToken;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    };

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const userNewInfo = { ...user };
            userNewInfo[e.target.name] = e.target.value;
            setUser(userNewInfo);
        }
        // console.log(e.target.name,e.target.value)
    };
    const handleSubmit = (e) => {
        // console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    // Signed in
                    // var user = userCredential.user;
                    const userNewInfo = { ...user };
                    userNewInfo.error = "";
                    userNewInfo.success = true;
                    setUser(userNewInfo);
                    // ...
                })
                .catch((error) => {
                    const userNewInfo = { ...user };
                    userNewInfo.error = error.message;
                    userNewInfo.success = false;
                    setUser(userNewInfo);
                    // ..
                });
        }
        e.preventDefault();
    };
    if (!newUser && user.email && user.password) {
        firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                const userNewInfo = { ...user };
                userNewInfo.error = "";
                userNewInfo.success = true;
                setUser(userNewInfo);
                setLoggedInUser(userNewInfo);
                history.replace(from);
                // ...
            })
            .catch((error) => {
                const userNewInfo = { ...user };
                userNewInfo.error = error.message;
                userNewInfo.success = false;
                setUser(userNewInfo);
            });
    }

    //signOut
    const handleSignOut = () => {
      firebase
          .auth()
          .signOut()
          .then(() => {
              const signedOutUser = {
                  isSignIn: false,
                  name: "",
                  email: "",
                  photo: "",
                  error: "",
                  success: false,
              };
              setUser(signedOutUser);
          })
          .catch((error) => {
              // An error happened.
          });
  };
    return (
        <div style={{ textAlign: "center" }}>
            {user.isSignIn ? (
                <button onClick={handleSignOut}>Sign out</button>
            ) : (
                <button onClick={handleSignIn}>Sign in with Google</button>
            )}
            <br />
            <br />
            <button onClick={handleFbSignIn}>Sign in with Facedook</button>
            {user.isSignIn && (
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            )}

            <h2>Our own Authenticaion</h2>
            <input
                type="checkbox"
                name="newUsr"
                onChange={() => setNewUser(!newUser)}
                id=""
            />
            <label htmlFor="newUser">New user Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && (
                    <input
                        type="text"
                        placeholder="your name"
                        name="name"
                        onBlur={handleBlur}
                        required
                    />
                )}
                <br />
                <input
                    type="text"
                    placeholder="email address"
                    name="email"
                    onBlur={handleBlur}
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    id=""
                    onBlur={handleBlur}
                    placeholder="password"
                    required
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && (
                <p style={{ color: "green" }}>
                    User {newUser ? "created" : "Logged In"} successfully !
                </p>
            )}
            <h3>name: {user.displayName}</h3>
            <img src={user.photoURL} alt="" />
        </div>
    );
}

export default Login;
