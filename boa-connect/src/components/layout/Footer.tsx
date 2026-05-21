import { Link } from 'react-router-dom';
import { Eye, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export function Footer() {
  const [contactInfo, setContactInfo] = useState<any>(null);
  const { config } = useSiteConfig();

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      const response = await api.get('/contact-info');
      if (response.data.success && response.data.contactInfo) {
        setContactInfo(response.data.contactInfo);
      }
    } catch (error) {
      console.error('Failed to load contact info:', error);
    }
  };

  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 - Reach Us */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Reach Us</h3>
            
            {/* Logo */}
            <div className="flex justify-start mb-6">
              {config.logo_url ? (
                <img 
                  src={config.logo_url} 
                  alt="BOA Logo" 
                  className="h-20 w-auto object-contain"
                />
              ) : (
                <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <Eye className="h-10 w-10 text-white" />
                </div>
              )}
            </div>

            {/* Organization Info */}
            <div className="space-y-2 text-sm">
              <div className="mb-4">
                <div className="text-lg font-bold text-gray-800">BOA</div>
                <div className="text-sm text-gray-600">Ophthalmic Association Of Bihar</div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                A Government-recognized medical association dedicated to advancing ophthalmic excellence and eye care services across Bihar state.
              </p>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link 
                to="/about"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors block"
              >
                About Us
              </Link>
              <Link 
                to="/membership"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors block"
              >
                Membership
              </Link>
              <Link 
                to="/seminars"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors block"
              >
                Events
              </Link>
              <Link 
                to="/notifications"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors block"
              >
                Notifications
              </Link>
              <Link 
                to="/gallery"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors block"
              >
                Gallery
              </Link>
              <Link 
                to="/contact"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors block"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Column 3 - More Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">More Information</h3>
            
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>Ved Vani, East Shivpuri, Chitkohra Bypass Road, Po Anishabadi</p>
                  <p>Patna, Bihar 800002</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a 
                  href="mailto:info@boabihar.org"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  info@boabihar.org
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <a 
                  href="tel:+919876543210"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  +91-9876543210
                </a>
              </div>

              {/* Legal Links */}
              <div className="flex flex-col gap-2 pt-4">
                <Link 
                  to="/terms-of-service"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Term and Condition
                </Link>
                <Link 
                  to="/privacy-policy"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-300">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2021 Ophthalmic Association Of Bihar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}