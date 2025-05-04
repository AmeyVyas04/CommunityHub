// app/pages/about.tsx
import { motion } from 'framer-motion';
import Navbar from '@/app/components/navbar';  // Adjust this import if needed

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <Navbar />
      <motion.div
        className="max-w-3xl mx-auto p-8 mt-20 bg-white rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl font-extrabold text-indigo-700 text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          About Us
        </motion.h1>

        {/* Section 1: Introduction */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="leading-relaxed">
            Welcome to our community platform! We are dedicated to bringing people together to work on environmental and social causes. Our platform serves as a hub for individuals, communities, and organizations to share, collaborate, and take action towards making the world a better place.
          </p>
        </motion.section>

        {/* Section 2: Our Mission */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            Our mission is to create a collaborative environment where individuals can engage with their communities, take part in impactful projects, and inspire positive change. Whether its participating in a local cleanup or attending a workshop, we aim to make it easy for people to get involved and make a difference.
          </p>
        </motion.section>

        {/* Section 3: Our Values */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Our Values</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <span className="font-semibold text-indigo-700">Collaboration:</span> We believe in the power of working together to achieve greater impact.
            </li>
            <li className="flex items-center">
              <span className="font-semibold text-indigo-700">Community:</span> Building strong, supportive communities is at the core of our efforts.
            </li>
            <li className="flex items-center">
              <span className="font-semibold text-indigo-700">Impact:</span> Every action counts, and we are committed to making a meaningful difference.
            </li>
            <li className="flex items-center">
              <span className="font-semibold text-indigo-700">Sustainability:</span> We are dedicated to promoting long-lasting environmental and social solutions.
            </li>
          </ul>
        </motion.section>

        {/* Section 4: Join Us */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Join Us</h2>
          <p className="leading-relaxed">
            Ready to make an impact? Join our community today and start contributing to meaningful projects. Together, we can achieve incredible things!
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default AboutUs;
