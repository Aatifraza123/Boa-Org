import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Calendar, Bell, Download, ArrowRight, Clock, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/utils';

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [heroImage, setHeroImage] = useState<string>("https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80");
  const [thumbImage, setThumbImage] = useState<string>("https://images.unsplash.com/photo-1551076805-e18690c5e561?auto=format&fit=crop&q=80");

  useEffect(() => {
    loadNotifications();
    checkAuthentication();
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery-images`);
      const data = await response.json();
      if (data.success && data.images && data.images.length > 0) {
        const randomImg = data.images[Math.floor(Math.random() * Math.min(data.images.length, 10))];
        setHeroImage(`${API_BASE_URL}${randomImg.image_path}?t=${new Date().getTime()}`);
        
        if (data.images.length > 1) {
            const randomThumb = data.images[Math.floor(Math.random() * data.images.length)];
            setThumbImage(`${API_BASE_URL}${randomThumb.image_path}?t=${new Date().getTime()}`);
        } else {
            setThumbImage(`${API_BASE_URL}${randomImg.image_path}?t=${new Date().getTime()}`);
        }
      }
    } catch (error) {
      console.error('Failed to load hero image:', error);
    }
  };

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!(token && user));
  };

  const loadNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications`);
      const data = await response.json();
      if (data.success) {
        // Filter only active notifications
        const activeNotifs = (data.notifications || []).filter((n: any) => n.is_active);
        
        // Debug logging for election notifications
        activeNotifs.forEach((n: any) => {
          if (n.type === 'election') {
            console.log('Election notification:', {
              id: n.id,
              title: n.title,
              election_title: n.election_title,
              election_id: n.election_id,
              display_title: n.election_title || n.title
            });
          }
        });
        
        setNotifications(activeNotifs);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadForm = async (seminarId: number, seminarName: string) => {
    // Strict authentication check
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user || !isAuthenticated) {
      toast.error('Please login to download seminar forms');
      navigate('/login', { state: { from: '/notifications' } });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/generate-seminar-pdf/${seminarId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          toast.error('Authentication expired. Please login again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login', { state: { from: '/notifications' } });
          return;
        }
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Check if response is actually a PDF or HTML fallback
      const contentType = response.headers.get('content-type');
      const isHtml = contentType && contentType.includes('text/html');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      if (isHtml) {
        // If HTML fallback, download as HTML file
        link.download = `${seminarName.replace(/[^a-zA-Z0-9]/g, '_')}_Registration_Form.html`;
        setTimeout(() => {
          toast.info('PDF generation issue. Downloaded as HTML file. Please print from browser.');
        }, 200);
      } else {
        // Normal PDF download
        link.download = `${seminarName.replace(/[^a-zA-Z0-9]/g, '_')}_Registration_Form.pdf`;
        setTimeout(() => {
          toast.success('Form downloaded successfully!');
        }, 200);
      }
      
      document.body.appendChild(link);
      link.click();
      
      // Clean up with a small delay
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
      
    } catch (error) {
      setTimeout(() => {
        toast.error(`Failed to download form. Please try again.`);
      }, 100);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    if (!startDate) return 'Date TBD';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const startFormatted = start.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    // If no end date or same as start date, show only start date
    if (!end || startDate === endDate) {
      return startFormatted;
    }
    
    const endFormatted = end.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    return `${startFormatted} - ${endFormatted}`;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-enter bg-gray-50/50 min-h-screen">
        {/* Hero Header Section */}
        <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-20 border-b border-gray-200 bg-white overflow-hidden">
          {/* Decorative background blurs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-8 md:w-12 bg-[#09637E]"></div>
                  <span className="text-[#09637E] font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                    Updates & Alerts
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1B3D] tracking-tight mb-6 leading-tight">
                  Official <span className="text-[#09637E] block mt-2">Notifications</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-xl">
                  Stay informed with the latest announcements, seminars, and election updates from the BOA community.
                </p>
                
                {notifications.length > 0 && (
                  <div className="inline-flex items-center px-5 py-3 bg-white rounded-xl shadow-sm border border-gray-200 text-[#0B1B3D] font-semibold text-sm">
                    <span className="relative flex h-3 w-3 mr-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    {notifications.length} Active {notifications.length === 1 ? 'Notice' : 'Notices'}
                  </div>
                )}
              </div>

              {/* Decorative Image Column */}
              <div className="relative w-full lg:h-[400px] flex justify-center lg:justify-end mt-8 lg:mt-0">
                {/* Decorative background shape */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-emerald-50 rounded-[3rem] transform rotate-3 scale-105 -z-10 w-full max-w-[500px] lg:ml-auto"></div>
                
                <div className="relative w-full max-w-[500px] h-[300px] lg:h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white lg:ml-auto">
                  <img 
                    src={heroImage} 
                    alt="Medical Updates" 
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent"></div>
                  
                  {/* Floating glassmorphism card on image */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-4">
                    <img src={thumbImage} alt="Thumbnail" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                    <div className="text-white">
                      <p className="font-bold text-sm md:text-base mb-0.5">Never miss an update</p>
                      <p className="text-blue-50 text-xs line-clamp-2">Check back regularly for new seminars and news.</p>
                    </div>
                  </div>
                </div>

                {/* Floating decorative badge */}
                <div className="absolute -top-6 -left-6 lg:left-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden sm:flex animate-bounce-slow z-20">
                  <div className="bg-blue-50 p-3 rounded-xl text-[#09637E]">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Live</p>
                    <p className="text-gray-900 font-bold">Announcements</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {notifications.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1B3D] mb-3">No Notifications</h3>
                <p className="text-gray-500 text-lg">You're all caught up. Check back later for new updates.</p>
              </div>
            ) : (
              /* Notifications List */
              <div className="space-y-6">
                {notifications.map((notification, index) => {
                  const isElection = notification.type === 'election';
                  const isSeminar = !!notification.seminar_id;
                  
                  // Neat, unified badges
                  let badge = { label: 'Announcement', color: 'bg-blue-50 text-blue-700 border-blue-100' };
                  if (isElection) {
                    badge = { label: 'Election', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
                  } else if (isSeminar) {
                    badge = { label: 'Seminar', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' };
                  }

                  return (
                    <div 
                      key={notification.id} 
                      className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 hover:shadow-md transition-shadow duration-300 relative group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
                        {/* Clean Date Block instead of random colored icons */}
                        <div className="hidden sm:flex flex-col items-center justify-center flex-shrink-0 w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 text-center shadow-sm">
                           <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                             {new Date(notification.created_at).toLocaleDateString('en-US', { month: 'short' })}
                           </span>
                           <span className="text-2xl font-black text-[#0B1B3D] leading-none">
                             {new Date(notification.created_at).toLocaleDateString('en-US', { day: '2-digit' })}
                           </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md border ${badge.color}`}>
                              {badge.label}
                            </span>
                            <div className="flex items-center text-sm text-gray-500 font-medium">
                              <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                              <span>
                                {isElection 
                                  ? (notification.election_voting_date 
                                      ? `Voting: ${formatDate(notification.election_voting_date)}` 
                                      : `Deadline: ${formatDate(notification.election_deadline)}`)
                                  : (notification.start_date 
                                      ? formatDateRange(notification.start_date, notification.end_date)
                                      : 'Recently Added')
                                }
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl lg:text-2xl font-bold text-[#0B1B3D] mb-3 group-hover:text-[#09637E] transition-colors leading-snug">
                            {notification.seminar_name || notification.election_title || notification.title}
                          </h3>
                          
                          <p className="text-gray-600 leading-relaxed text-base mb-6">
                            {notification.message}
                          </p>

                          {/* Actions - Very Clean and Professional */}
                          {(isSeminar || isElection) && (
                            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                              {isSeminar && (
                                <>
                                  {notification.online_registration_enabled === 1 && (
                                    <Link to={`/seminar/${notification.seminar_id}/register`}>
                                      <Button 
                                        className="h-11 text-sm font-semibold px-6 bg-[#09637E] hover:bg-[#088395] text-white transition-all shadow-sm rounded-lg"
                                      >
                                        Register Online
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                      </Button>
                                    </Link>
                                  )}
                                  
                                  <Button 
                                    variant="outline"
                                    className="h-11 text-sm font-semibold px-6 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all rounded-lg"
                                    onClick={() => handleDownloadForm(notification.seminar_id, notification.seminar_name || notification.title)}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF Form
                                  </Button>
                                </>
                              )}
                              
                              {/* Election Actions */}
                              {isElection && (
                                <>
                                  <Link to={`/elections/${notification.election_id || notification.link?.split('/').pop()}/submit`}>
                                    <Button 
                                      className="h-11 text-sm font-semibold px-6 bg-[#09637E] hover:bg-[#088395] text-white transition-all shadow-sm rounded-lg"
                                    >
                                      Submit Nomination
                                      <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                  </Link>
                                  <Button 
                                    variant="outline"
                                    className="h-11 text-sm font-semibold px-6 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all rounded-lg"
                                    onClick={async () => {
                                      if (!notification.election_id) {
                                        toast.error('Election information not available');
                                        return;
                                      }

                                      try {
                                        const response = await fetch(`${API_BASE_URL}/api/elections/generate-pdf/${notification.election_id}`);
                                        if (!response.ok) {
                                          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                                          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
                                        }

                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = `${notification.title.replace(/[^a-zA-Z0-9]/g, '_')}_Nomination_Form.pdf`;
                                        document.body.appendChild(link);
                                        link.click();
                                        
                                        setTimeout(() => {
                                          document.body.removeChild(link);
                                          window.URL.revokeObjectURL(url);
                                        }, 100);
                                        
                                        setTimeout(() => {
                                          toast.success('Form downloaded successfully!');
                                        }, 200);
                                      } catch (error) {
                                        console.error('Failed to download form:', error);
                                        setTimeout(() => {
                                          toast.error('Failed to download form. Please try again.');
                                        }, 100);
                                      }
                                    }}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF Form
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
