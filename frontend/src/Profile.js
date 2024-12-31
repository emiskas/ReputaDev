import React, { useState } from 'react';

function Profile() {
  // State to hold the profile data
  const [username] = useState('Emilis Paulauskas');
  const [bio] = useState('A passionate backend developer, Python fanatic. New to the game, but eager to learn.');
  const [reputation] = useState(120);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-4">Profile Page</h1>

      {/* Displaying the profile data */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">{username}</h2>
        <p className="text-lg text-gray-700 mb-4">{bio}</p>
        <div className="flex justify-center items-center">
          <span className="text-lg font-medium text-gray-700">Reputation:</span>
          <span className="ml-2 text-lg font-semibold text-blue-500">{reputation}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
