// app/hero/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type Community = {
  fullName: string;
  email: string;
  communityName: string;
  phone: string;
  category: string;
  description: string;
  eligibility: string;
  rules: string;
  privacy: 'public' | 'restricted' | 'private';
  tags: string[];
};

const HeroPage = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch('/api/getCommunities');  // Create this endpoint to fetch all communities
        const data = await response.json();
        if (response.ok) {
          setCommunities(data);
        } else {
          throw new Error(data.error || 'Failed to load communities');
        }
      } catch (err) {
        setError('Failed to fetch communities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="hero-page">
        <div className='mt-30'>
        <h1>Explore Communities</h1>

        </div>
      
      <div className="communities-list mt-10">
        {communities.length === 0 ? (
          <p>No communities created yet.</p>
        ) : (
          communities.map((community, index) => (
            <div key={index} className="community-card">
              {/* Logo */}
              <div className="community-logo">
                {community.communityName[0].toUpperCase()}
              </div>

              {/* Community Name */}
              <h3>{community.communityName}</h3>

              {/* Category */}
              <p className="category">
                <strong>Category:</strong> {community.category}
              </p>

              {/* Eligibility */}
              <p className="eligibility" style={{ color: 'red' }}>
                <strong>Eligibility:</strong> {community.eligibility}
              </p>

              {/* Description */}
              <p className="description">
                <strong>Description:</strong> {community.description}
              </p>

              {/* Join Button */}
              <Link href={`/joinform`} className="join-button">
                Join Community
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeroPage;
