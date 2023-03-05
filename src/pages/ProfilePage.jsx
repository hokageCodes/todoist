import React, { useState } from "react";
import "firebase/compat/auth";

const ProfilePage = ({ user }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await user.updatePassword(password);
      setPassword("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <form onSubmit={handlePasswordChange}>
        <label>
          Change Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ProfilePage;
