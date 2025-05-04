'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from './components/navbar';
import Hero from './components/Hero';
import Footer from './components/footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleAnimationComplete = () => {
    setLoading(false); // Hide loader after animation ends
  };

  return (
    <>
      <Navbar />
      <AnimatePresence>
        {loading ? (
          <div style={loaderStyle}>
            <motion.div
              key="logo-animation"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1.5, 1, 1],
                rotate: [0, 0, 180, 360, 360],
                borderRadius: ['0%', '0%', '50%', '50%', '0%'],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8, 1],
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              <Image
                src="/logo (2).png" // Make sure this file is in /public
                alt="Loading..."
                width={200}
                height={200}
              />
            </motion.div>
          </div>
        ) : (
          <>
            <Hero />
            <Footer />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  backgroundColor: '#f5f5f5',
  position: 'fixed' as const,
  top: 0,
  left: 0,
  zIndex: 9999,
};
