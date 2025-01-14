import React, { useState, useEffect } from 'react';

function Profile({ onLogout }) {
  // State to hold the profile data and loading/error states
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Retrieve username from localStorage
  const username = window.localStorage.getItem('username');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!username) {
        setError('No username found in localStorage');
        setLoading(false);
        return;
      }

      try {
        // Fetch profile data from the backend
        const response = await fetch(`http://localhost:8000/profile/${username}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfile(data); // Save profile data to state
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchProfileData();
  }, [username]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the profile page
  return (
    <div>
      <div>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Profile Page</h1>

        {/* Displaying the profile data */}
        <div className="mt-6 text-center">
          <img
            src={`http://localhost:8000${profile.avatar}`}
            alt={`${profile.username}'s avatar`}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{profile.username}</h2>
          <p className="text-lg text-gray-700 mb-4">{profile.bio}</p>
          <div className="flex justify-center items-center">
            <span className="text-lg font-medium text-gray-700">Reputation:</span>
            <span className="ml-2 text-lg font-semibold text-blue-500">{profile.reputation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
