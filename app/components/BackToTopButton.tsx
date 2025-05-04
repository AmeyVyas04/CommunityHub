// 'use client' tells Next.js to treat this as a Client Component
'use client';

import React from 'react';

const BackToTopButton = () => {
  // Scroll back to top functionality
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="mt-4 py-2 px-6 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
    >
      Back to Top
    </button>
  );
};

export default BackToTopButton;
