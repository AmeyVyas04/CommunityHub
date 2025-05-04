'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const JoinCommunity = () => {
  const [communityName, setCommunityName] = useState('');
  const [fullName, setFullName] = useState('');
  const [eligibility, setEligibility] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (eligibility === 'no') {
      alert('You are not eligible to join this community.');
      return;
    }
  
    const response = await fetch('/api/join-community', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ communityName, fullName, eligibility }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      if (data.redirect) {
        alert('You are already a member!');
        router.push(data.redirect);
      } else {
        alert('Successfully joined the community!');
        router.push(`/community/${communityName}`);
      }
    } else if (response.status === 404) {
      alert(data.error || 'Community does not exist.');
    } else {
      alert(data.error || 'Failed to join the community. Please try again.');
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Join a Community
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="communityName" className="block text-sm font-medium text-gray-700">
              Community Name
            </label>
            <input
              type="text"
              id="communityName"
              name="communityName"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter the community name"
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you eligible to join this community?
            </label>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="eligibility"
                  value="yes"
                  checked={eligibility === 'yes'}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-black">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="eligibility"
                  value="no"
                  checked={eligibility === 'no'}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-black">No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinCommunity;
