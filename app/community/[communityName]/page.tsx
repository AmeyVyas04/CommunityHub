'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/navbar';

type CommunityData = {
  communityName: string;
  category: string;
  eligibility: string;
  description: string;
};

type Comment = {
  username: string;
  text: string;
  date: string;
};

const CommunityPage = () => {
  const { communityName } = useParams();
  const [communityData, setCommunityData] = useState<CommunityData | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  // Dummy data for Upcoming Events
  const upcomingEvents = [
    { title: 'River Cleanup Drive - Week 1', date: '2025-05-10', description: 'Join us for the first week of the cleaning drive along the river.' },
    { title: 'River Cleanup Drive - Week 2', date: '2025-05-17', description: 'Help us keep the momentum going for the second week.' },
    { title: 'Waste Sorting Workshop', date: '2025-05-24', description: 'Learn about effective waste management and sorting techniques.' },
    { title: 'Closing Event - River Cleanup', date: '2025-05-31', description: 'Celebrate the successful cleanup of the river with a small event!' },
  ];

  // Fetch community details
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const res = await fetch(`/api/joinedcommunity?communityName=${communityName}`);
        const data = await res.json();
        setCommunityData(data);
      } catch (error) {
        console.error('Failed to fetch community data:', error);
      }
    };

    const fetchMembers = async () => {
      try {
        const res = await fetch(`/api/community-members?communityName=${communityName}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMembers(data.map((m) => m.fullName));
        }
      } catch (error) {
        console.error('Failed to fetch community members:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/${communityName}`);
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          // Sort by most recent date
          const sortedComments = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setComments(sortedComments);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    if (communityName) {
      Promise.all([fetchCommunityData(), fetchMembers(), fetchComments()]).finally(() =>
        setLoading(false)
      );
    }
  }, [communityName]);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.trim() === '' || username.trim() === '') return;
  
    const commentData = {
      communityName,
      fullName: username,
      comment: newComment,
    };
  
    try {
      const res = await fetch(`/api/comments/${communityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Add the new comment directly to the state
        const newCommentWithDate = { 
          username: username,  // Add the username from the input
          text: newComment,    // Add the comment text from the input
          date: new Date().toISOString()  // Add the current date
        };
  
        // Add the new comment to the state without needing to reload
        setComments((prevComments) => [newCommentWithDate, ...prevComments]);
  
        setNewComment(''); // Clear the comment input field
        setUsername('');   // Clear the username input field
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex items-start justify-center bg-gradient-to-br from-indigo-50 to-white px-4 py-8 mt-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="w-full max-w-2xl p-8 bg-white rounded-3xl shadow-2xl border border-indigo-100"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
        >
          {/* Title */}
          <motion.h1
            className="text-4xl font-extrabold text-indigo-700 text-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {communityData ? communityData.communityName : 'Loading...'}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            className="text-sm text-gray-600 text-center mb-4 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p><span className="font-medium text-gray-700">Category:</span> {communityData ? communityData.category : 'Loading...'}</p>
            <p><span className="font-medium text-gray-700">Eligibility:</span> {communityData ? communityData.eligibility : 'Loading...'}</p>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-md text-gray-700 text-center leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {communityData ? communityData.description : 'Loading...'}
          </motion.p>

          {/* Members Section */}
          {members.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-indigo-50 p-4 rounded-xl mb-8"
            >
              <h2 className="text-xl font-semibold text-indigo-700 text-center mb-3">
                Members of this Community
              </h2>
              <ul className="space-y-2 text-center">
                {members.map((name, index) => (
                  <li key={index} className="text-gray-700">
                    {name}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Upcoming Events Section */}
          <motion.div
            className="bg-indigo-50 p-6 rounded-xl mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-semibold text-indigo-700 text-center mb-4">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="text-gray-700">
                  <h3 className="text-lg font-semibold text-indigo-700">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="mt-2">{event.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comment Section */}
          <motion.div
            className="mt-8 bg-indigo-50 p-6 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-xl font-semibold text-indigo-700 text-center mb-4">Comments</h2>

            {/* Comment Form */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-md text-black"
              />
              <textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border rounded-md text-black"
                rows={4}
              />
              <button
                onClick={handleCommentSubmit}
                className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit Comment
              </button>
            </div>

            {/* Display Comments */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 bg-white rounded-md shadow-sm">
                  <p className="text-sm text-black">{comment.date}</p>
                  <p className="text-lg font-semibold text-indigo-700">{comment.username}</p>
                  <p className="mt-2 text-black">{comment.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CommunityPage;
