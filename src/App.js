import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Homepage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import firebaseConfig from "./FirebaseConfig";
import OnboardingScreen from "./components/Onboarding";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <OnboardingScreen />} />
        <Route path="/home" element={<Homepage onLogout={handleLogout} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
