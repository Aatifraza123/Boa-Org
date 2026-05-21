import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Award,
  Users,
  BookOpen,
  Calendar,
  Network,
  FileText,
  ArrowRight,
  Download,
  CreditCard,
  Lock,
  LogIn,
  Star,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';

export default function Membership() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
    checkAuthentication();
    loadHeroImage();
    
    // Also reload when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadCategories();
        checkAuthentication();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!(token && user));
  };

  const loadHeroImage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery-images?limit=1`);
      const data = await response.json();
      if (data.success && data.images && data.images.length > 0) {
        setHeroImage(data.images[0].image_url);
      }
    } catch (error) {
      console.error('Failed to load hero image:', error);
    }
  };

  const handleMembershipFormClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for membership');
      navigate('/login', { state: { from: '/membership-form' } });
      return;
    }
    navigate('/membership-form');
    
    // Trigger form to open automatically
    setTimeout(() => {
      const event = new CustomEvent('openMembershipForm');
      window.dispatchEvent(event);
    }, 100);
  };

  const loadCategories = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/api/membership-categories?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store'
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to load membership categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadOfflineForm = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to download the membership form');
      navigate('/login', { state: { from: '/membership' } });
      return;
    }

    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`${API_BASE_URL}/api/generate-membership-pdf?t=${timestamp}`, {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const pdfBlob = await response.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `BOA_Membership_Application_Form_${timestamp}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      setTimeout(() => {
        toast.success('Offline form downloaded successfully!');
      }, 200);
      
    } catch (error) {
      setTimeout(() => {
        toast.error('Failed to download form. Please try again.');
      }, 100);
    }
  };

  const benefits = [
    {
      icon: BookOpen,
      title: 'CME Programs',
      description: 'Access to all Continuing Medical Education programs and workshops',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Calendar,
      title: 'Conference Access',
      description: 'Discounted registration for annual conferences and seminars',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Network,
      title: 'Professional Network',
      description: 'Connect with ophthalmologists across Bihar and India',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FileText,
      title: 'Publications',
      description: 'Free access to newsletters, journals, and research papers',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Eligibility for BOA awards and recognition programs',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Professional guidance and peer support network',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Choose Membership',
      description: 'Select the membership category that suits you best'
    },
    {
      number: '2',
      title: 'Fill Application',
      description: 'Complete the online membership application form'
    },
    {
      number: '3',
      title: 'Make Payment',
      description: 'Pay membership fee via online payment or bank transfer'
    },
    {
      number: '4',
      title: 'Get Verified',
      description: 'Your application will be reviewed and approved'
    },
    {
      number: '5',
      title: 'Start Enjoying',
      description: 'Access all member benefits and join the BOA family'
    }
  ];

  const faqs = [
    {
      question: 'Who can become a member of BOA?',
      answer: 'A person holding certificate of Diploma in Para-Ophthalmology/Diploma in Ophthalmic Assistant/Bachelor of Ophthalmic Technology or any higher degree course in Ophthalmic science from government, Semi government or non government college/institute recognized by the law of government and fit for recruitment at post of ophthalmic Assistant. To get membership of Association, they have to submit a full filled form.'
    },
    {
      question: 'How long does the approval process take?',
      answer: 'Membership applications are typically reviewed and approved within 7-10 working days after payment verification.'
    },
    {
      question: 'Can I upgrade from Annual to Life Membership?',
      answer: 'Yes, you can upgrade anytime by paying the difference amount. Your previous payments will be adjusted.'
    },
    {
      question: 'What documents are required?',
      answer: 'You need to submit your original certificate photocopy, qualification certificates, and a recent passport-size photograph'
    }
  ];

  return (
    <Layout>
      <div className="page-enter">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-20 overflow-hidden">
          {/* Full Width Background Image similar to Home Page */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage || "https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80"} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10" />
          </div>

          <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              
              {/* Left Column: Text Content */}
              <div className="flex flex-col text-center lg:text-left">
                <div className="mb-6 flex justify-center lg:justify-start">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-[#09637E] text-sm font-semibold">
                    <Users className="w-4 h-4 mr-2" />
                    Join The Community
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
                  Become a
                  <span className="block text-[#09637E] mt-2">Life Member</span>
                </h1>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 lg:mb-6 max-w-xl mx-auto lg:mx-0">
                  Join Bihar's premier ophthalmic association and advance your career while serving the community. Gain access to exclusive resources and networks.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-4 lg:mb-6">
                  <Button
                    className="w-full sm:w-auto px-6 py-3 bg-[#09637E] hover:bg-[#088395] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 h-12"
                    onClick={handleMembershipFormClick}
                  >
                    {!isAuthenticated && <LogIn className="w-4 h-4" />}
                    <span>{isAuthenticated ? 'Apply Online' : 'Login to Apply'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 hover:border-[#09637E] text-gray-700 hover:text-[#09637E] font-medium rounded-lg transition-colors flex items-center justify-center gap-2 h-12"
                    onClick={handleDownloadOfflineForm}
                  >
                    {!isAuthenticated && <Lock className="w-4 h-4" />}
                    <Download className="w-4 h-4" />
                    <span>{isAuthenticated ? 'Download Form' : 'Login to Download'}</span>
                  </Button>
                </div>
              </div>
              
              {/* Right Image matching the carousel sizing of Home Page */}
              <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={heroImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80"} 
                    alt="Medical Professionals" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="py-12 lg:py-20 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <Award className="h-4 w-4" />
                  Exclusive Perks
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                Membership Benefits
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base">
                Unlock a world of opportunities, from continuing education to building lifelong professional connections.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-5`}>
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Membership Categories */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <CreditCard className="h-4 w-4" />
                  Plans & Pricing
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                Membership Details
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base">
                Choose the membership plan that best fits your professional journey
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09637E]"></div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                          <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider">Type</th>
                          <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">Passout Fee</th>
                          <th className="px-6 py-4 font-semibold text-sm uppercase tracking-wider whitespace-nowrap">Student Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {categories.map((category, index) => (
                          <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-4 text-gray-900 font-medium">
                              {category.title}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-md font-semibold text-gray-900 text-sm">
                                ₹{category.price.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                              {category.student_price && parseFloat(category.student_price) > 0 ? (
                                <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-md font-semibold text-sm">
                                  ₹{parseFloat(category.student_price).toLocaleString()}
                                </span>
                              ) : (
                                <span className="text-gray-400 font-medium px-3 py-1 text-sm">N/A</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 text-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-800 font-medium">
                    <Star className="inline-block w-4 h-4 mr-2 mb-0.5" />
                    Offer: Pay membership fees with conference registration or before the conference
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* How to Apply */}
        <section className="py-12 lg:py-20 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <ShieldCheck className="h-4 w-4" />
                  Process
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                How to Apply
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base">
                Simple 5-step process to become a BOA member
              </p>
            </div>

            <div className="max-w-3xl mx-auto relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-[31px] md:left-[39px] top-4 bottom-4 w-0.5 bg-blue-100 hidden sm:block"></div>

              <div className="space-y-6 md:space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-start group">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-[#09637E] text-xl sm:text-2xl font-bold shadow-sm z-10 group-hover:bg-blue-50 transition-colors mx-auto sm:mx-0">
                      {step.number}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100 group-hover:border-blue-200 transition-colors text-center sm:text-left w-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-[#09637E] hover:bg-[#088395] text-white px-8 py-6 rounded-lg text-base font-medium transition-colors"
                onClick={handleMembershipFormClick}
              >
                {!isAuthenticated && <LogIn className="mr-2 h-5 w-5" />}
                {isAuthenticated ? 'Start Your Application' : 'Login to Apply'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <HelpCircle className="h-4 w-4" />
                  Support
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-base">
                Common questions about BOA membership
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4 text-sm font-medium">Still have questions?</p>
              <Link to="/contact">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
