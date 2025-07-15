import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
        <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-mint-300">Seva</span>
              <span>Daan</span>
            </h3>
            <p className="text-mint-100/80 mb-6">
              Connecting NGOs, volunteers, and communities to create positive social impact across India.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/company/sevadaan"
                target="_blank"
                rel="noopener noreferrer"
                title="SevaDaan on LinkedIn"
                className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center hover:bg-mint-600 hover:text-primary-900 transition-colors"
              >
                <Icons.externalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com/sevadaan"
                target="_blank"
                rel="noopener noreferrer"
                title="SevaDaan on Twitter"
                className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center hover:bg-mint-600 hover:text-primary-900 transition-colors"
              >
                <Icons.externalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/sevadaan"
                target="_blank"
                rel="noopener noreferrer"
                title="SevaDaan on Instagram"
                className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center hover:bg-mint-600 hover:text-primary-900 transition-colors"
              >
                <Icons.externalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ngos" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  NGOs
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/grants" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Grants
                </Link>
              </li>
              <li>
                <Link to="/emergency-help" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Emergency Help
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Who We Are
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icons.location className="w-5 h-5 text-mint-300 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-mint-100/80">
                  123 NGO Street, Sector 15<br />
                  New Delhi, 110001<br />
                  India
                </span>
              </li>
              <li className="flex items-center">
                <Icons.phone className="w-5 h-5 text-mint-300 mr-3 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Icons.email className="w-5 h-5 text-mint-300 mr-3 flex-shrink-0" />
                <a href="mailto:info@sevadaan.org" className="text-mint-100/80 hover:text-mint-200 transition-colors">
                  info@sevadaan.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-800 text-center text-mint-100/80 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} SevaDaan. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center justify-center">
              Made with 
              <Icons.favorite className="w-4 h-4 text-coral-500 mx-1" /> 
              for a better world
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;