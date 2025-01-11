import React, { useState, useEffect } from 'react';

function Profile() {
  // State to hold the profile data
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = window.location.pathname.split('/')[2];

  useEffect(() => {
    const fetchProfileData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/profile/${username}/`);
            const data = await response.json();
            setProfile(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile data: ', error);
            setLoading(false);
        }
    };

    fetchProfileData();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
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
  );
}

export default Profile;
