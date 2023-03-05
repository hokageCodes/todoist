import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/auth";


const OnboardingScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        navigate("/");
        } catch (error) {
        setError(error.message);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.auth().currentUser.updateProfile({
            displayName: name,
        });
        navigate("/");
        } catch (error) {
        setError(error.message);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
        await firebase.auth().signInWithPopup(provider);
        navigate("/");
        } catch (error) {
        setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
        setName(value);
        } else if (name === "email") {
        setEmail(value);
        } else if (name === "password") {
        setPassword(value);
        }
    };

    return (
        <div className="onboarding">
        <h1 className="title">{isLogin ? "Welcome Back!" : "Get Started With Task Tracker"}</h1>
        <form className="onboardingForm" onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleInputChange}
                required
            />
            )}
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
            />
            <button className="button" type="submit">
            {isLogin ? "Login" : "Sign Up"}
            </button>
            <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
                className="link"
                onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
            >
                {isLogin ? "Sign up" : "Login"}
            </span>
            </p>
            {error && <div className="error">{error}</div>}
        </form>
        <button className="google-button" onClick={signInWithGoogle}>
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
            {isLogin ? "Sign in" : "Sign up"} with Google
        </button>
        </div>
    );
};

export default OnboardingScreen;
