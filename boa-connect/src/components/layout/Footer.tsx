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
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 - Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              {config.logo_url ? (
                <img 
                  src={config.logo_url} 
                  alt="BOA Logo" 
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              )}
              <div>
                <div className="text-lg font-bold text-white">BOA</div>
                <div className="text-xs text-gray-300">Ophthalmic Association Of Bihar</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 leading-relaxed">
              A Government-recognized medical association dedicated to advancing ophthalmic
              excellence and eye care services across Bihar state.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/membership', label: 'Membership' },
                { to: '/seminars', label: 'Events' },
                { to: '/notifications', label: 'Notifications' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/contact', label: 'Contact Us' }
              ].map((item, idx) => (
                <div key={idx}>
                  <Link 
                    to={item.to}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Column 3 - Contact Details */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white mb-4">
              Contact Details
            </h4>
            
            <div className="space-y-3">
              {/* Office Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  {contactInfo ? (
                    <>
                      {contactInfo.address && <p>{contactInfo.address}</p>}
                      <p>{contactInfo.city}, {contactInfo.state} {contactInfo.pin_code}</p>
                    </>
                  ) : (
                    <>
                      <p>Ved Vani, East Shivpuri</p>
                      <p>Patna, Bihar 800002</p>
                    </>
                  )}
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo?.email || 'info@boa.org.in'}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {contactInfo?.email || 'info@boa.org.in'}
                </a>
              </div>

              {/* Phone Number */}
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo?.mobile || '+916121234567'}`}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {contactInfo?.mobile || '+91 612 123 4567'}
                </a>
              </div>
              <div className='flex items-center justify-start py-5 gap-6'>
                <Link to="/terms-of-service">
                      <p>Term and Condition</p>
                      </Link>
                      <Link to="/privacy-policy">
                      <p>Privacy Policy</p>
                      </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <p>
              © 2021 Ophthalmic Association Of Bihar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}