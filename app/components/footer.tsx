import { Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link'; // Import Next.js Link component
import BackToTopButton from './BackToTopButton'; // Import the button

const Footer = () => {
  return (
    <footer className="bg-indigo-500 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Footer Column 1: Site Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/aboutus" className="hover:text-indigo-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="https://forms.visme.co/formsPlayer/dm4gp1de-contact-form" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Column 2: Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Footer Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">123 Community Street, City, Country</p>
            <p className="text-sm">email@example.com</p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-indigo-500 pt-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Community Name. All rights reserved.</p>
          <BackToTopButton /> {/* Use the Client Component here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
