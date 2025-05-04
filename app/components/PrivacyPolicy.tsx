// app/pages/privacy.tsx
import { motion } from 'framer-motion';
import Navbar from './navbar';  // Adjust this import if needed

const PrivacyPolicy = () => {
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
          Privacy Policy
        </motion.h1>

        {/* Introduction */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="leading-relaxed">
            At [Your Platform Name], we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to ensure its security. By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.section>

        {/* Information We Collect */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Information We Collect</h2>
          <p className="leading-relaxed">
            We collect the following types of information:
          </p>
          <ul className="list-disc pl-8">
            <li className="leading-relaxed">Personal Information: This includes your name, email address, and other details you provide when creating an account or submitting a comment.</li>
            <li className="leading-relaxed">Usage Data: We may collect information on how you access and use our services, such as your IP address, browser type, and device information.</li>
            <li className="leading-relaxed">Cookies: We use cookies to improve your experience and to collect data on how our site is used. You can control the use of cookies in your browser settings.</li>
          </ul>
        </motion.section>

        {/* How We Use Your Information */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc pl-8">
            <li className="leading-relaxed">To provide and improve our services, including responding to your comments and inquiries.</li>
            <li className="leading-relaxed">To personalize your experience on our platform and provide you with content and services that may be of interest to you.</li>
            <li className="leading-relaxed">To send you promotional emails or updates if you've opted-in to receive them.</li>
            <li className="leading-relaxed">To monitor usage trends and improve our website's performance and functionality.</li>
          </ul>
        </motion.section>

        {/* Data Security */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Data Security</h2>
          <p className="leading-relaxed">
            We take reasonable precautions to protect your personal data from unauthorized access, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </motion.section>

        {/* Sharing Your Information */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Sharing Your Information</h2>
          <p className="leading-relaxed">
            We will not sell or rent your personal information to third parties. However, we may share your data with trusted service providers who help us operate our website and provide our services, but only to the extent necessary for them to perform these services. We may also share information if required by law or in response to a valid legal request.
          </p>
        </motion.section>

        {/* Your Rights */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Your Rights</h2>
          <p className="leading-relaxed">
            Depending on your location, you may have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us through our support channels.
          </p>
        </motion.section>

        {/* Changes to This Privacy Policy */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Changes to This Privacy Policy</h2>
          <p className="leading-relaxed">
            We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will be effective immediately upon posting. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
          </p>
        </motion.section>

        {/* Contact Us */}
        <motion.section
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions or concerns about this Privacy Policy, please contact us at [Your Contact Information].
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
