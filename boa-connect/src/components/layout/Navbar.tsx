import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Eye, LogOut, LayoutDashboard, Settings, ChevronDown, Globe, Type, Contrast, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { API_BASE_URL } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { notificationAPI } from '@/lib/api';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useFavicon } from '@/hooks/useFavicon';

export function Navbar() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { config } = useSiteConfig();

  // Update favicon with logo
  useFavicon(config.logo_url);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadNotifications();
    loadContactInfo();
    
    // Load user immediately on mount
    const token = localStorage.getItem('token');
    const cachedUserData = localStorage.getItem('user');
    
    
    if (cachedUserData && token) {
      try {
        const userData = JSON.parse(cachedUserData);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    // Then load fresh data
    loadUser();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadContactInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact-info`);
      const data = await response.json();
      if (data.success && data.contactInfo) {
        setContactInfo(data.contactInfo);
      }
    } catch (error) {
      console.error('Failed to load contact info:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await notificationAPI.getAll();
      setNotifications(response.notifications || []);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const loadUser = () => {
    const token = localStorage.getItem('token');
    const cachedUserData = localStorage.getItem('user');
    
    // Immediately set loading to false and load from cache if available
    if (cachedUserData && token) {
      try {
        const userData = JSON.parse(cachedUserData);
        setUser(userData);
        setIsAuthLoading(false);
      } catch (error) {
        console.error('Failed to parse cached user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsAuthLoading(false);
        return;
      }
    } else {
      // No cached data, stop loading immediately
      setIsAuthLoading(false);
      if (!token) {
        console.log('No token found in localStorage');
        return;
      }
    }
    
    // Then fetch fresh data in background if token exists
    if (token) {
      fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          // If token is invalid, clear localStorage
          if (response.status === 401) {
            console.log('Token expired or invalid - clearing auth data');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            return null;
          }
          if (response.status === 404) {
            // Profile endpoint not found - user account doesn't exist
            // Clear invalid auth data
            console.log('User account not found - clearing invalid auth data');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            return null;
          }
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        })
        .then(userData => {
          if (userData && userData.user) {
            setUser(userData.user);
            localStorage.setItem('user', JSON.stringify(userData.user));
            console.log('Profile refreshed from server');
          }
        })
        .catch(error => {
          // Clear invalid auth data on any error
          console.log('Profile fetch failed - clearing auth data');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const activeNotifications = notifications.filter(n => n.is_active);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadNotifications = activeNotifications.length;

  const isActive = (path: string) => location.pathname === path;

  const getUserInitials = () => {
    if (!user) return 'U';
    const firstName = user.first_name || user.name || '';
    const lastName = user.last_name || user.surname || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  const getUserName = () => {
    if (!user) return 'User';
    const titleMap: any = {
      'dr': 'Dr.',
      'mr': 'Mr.',
      'mrs': 'Mrs.',
      'ms': 'Ms.',
      'prof': 'Prof.'
    };
    const displayTitle = titleMap[user.title?.toLowerCase()] || user.title || '';
    return `${displayTitle} ${user.first_name || user.name || ''} ${user.last_name || user.surname || ''}`.trim();
  };

  // Simple navigation menu items
  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/seminars', label: 'Events' },
    { path: '/news', label: 'News' },
    { path: '/membership', label: 'Member Zone' },
    { path: '/notifications', label: 'Notifications' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' }
  ];

  return (
    <div className="flex flex-col w-full z-50 sticky top-0">
      {/* Top Contact Bar */}
      <div className={`bg-slate-800 text-white hidden sm:block overflow-hidden transition-all duration-300 ease-in-out ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 py-1.5 sm:py-2 opacity-100'}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2 group">
                <Mail className="h-3.5 w-3.5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <a
                  href={`mailto:${contactInfo?.email || 'info@boabihar.org'}`}
                  className="hover:text-gray-200 transition-colors"
                >
                  {contactInfo?.email || 'info@boabihar.org'}
                </a>
              </div>
              <div className="flex items-center gap-2 group">
                <Phone className="h-3.5 w-3.5 text-green-400 group-hover:text-green-300 transition-colors" />
                <a
                  href={`tel:${contactInfo?.mobile || '+91-9771019937'}`}
                  className="hover:text-gray-200 transition-colors"
                >
                  {contactInfo?.mobile || '+91 9771019937'}
                </a>
              </div>
            </div>
            <div className="text-gray-200 hidden lg:flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-white border-white/30 bg-white/10 px-2 py-0.5 font-bold">Est. 1976</Badge>
              Government Recognized Medical Association
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="w-full bg-[#09637E] border-b border-[#088395] shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
              {config.logo_url ? (
                <img
                  src={config.logo_url}
                  alt="BOA Logo"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-105">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-[#09637E]" />
                </div>
              )}
              <div className="hidden sm:flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-white leading-tight tracking-tight">
                  Ophthalmic Association
                </span>
                <span className="text-sm font-medium text-teal-100">
                  Of Bihar
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navigationItems.filter(item => item.path !== '/notifications').map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 xl:px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-white/10 ${isActive(item.path)
                      ? 'text-white'
                      : 'text-teal-50 hover:text-white'
                    }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3 sm:gap-5">

              {/* Notifications - Minimalist Bell */}
              <Link to="/notifications" className="relative group p-2 hover:bg-white/10 rounded-full transition-colors">
                <svg
                  className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${isActive('/notifications') ? 'text-white' : 'text-teal-50 group-hover:text-white'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                {/* Notification Badge */}
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-[#09637E]">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </Link>

              {/* User Menu or Login Buttons */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 bg-white/5 transition-all">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                        <AvatarImage src={user.avatar} alt={getUserName()} />
                        <AvatarFallback className="text-xs font-semibold bg-white text-[#09637E]">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-bold text-white">
                        {getUserName().split(' ')[0]}
                      </span>
                      <ChevronDown className="h-4 w-4 text-teal-200" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 mt-2 rounded-xl shadow-xl border-gray-100" align="end">
                    <DropdownMenuLabel>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-bold text-gray-900">{getUserName()}</p>
                        <p className="text-xs text-gray-500 font-medium">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-100" />

                    {user.membership_no && user.has_active_membership && (
                      <>
                        <DropdownMenuItem className="cursor-default">
                          <div className="flex items-center justify-center w-full">
                            <Badge variant="outline" className="text-xs border-[#09637E]/20 bg-[#09637E]/5 text-[#09637E] font-bold py-1">
                              Membership: {user.membership_no}
                            </Badge>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-100" />
                      </>
                    )}

                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer py-2 focus:bg-gray-50">
                      <LayoutDashboard className="mr-3 h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-700">Dashboard</span>
                    </DropdownMenuItem>

                    {user.role === 'admin' && (
                      <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer py-2 focus:bg-gray-50">
                        <Settings className="mr-3 h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-700">Admin Panel</span>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="bg-gray-100" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer py-2 focus:bg-red-50">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="hidden sm:block">
                    <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 text-sm font-semibold">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/admin/login">
                    <Button className="bg-white hover:bg-gray-100 text-[#09637E] text-sm font-bold rounded-full px-5 shadow-sm transition-all hover:-translate-y-0.5">
                      Admin Portal
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="lg:hidden ml-1">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[320px] bg-white">
                  <div className="flex flex-col gap-2 mt-6">

                    {/* Mobile User Info */}
                    {user && (
                      <div className="mb-6">
                        <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                          <Avatar className="h-12 w-12 shadow-sm">
                            <AvatarImage src={user.avatar} alt={getUserName()} />
                            <AvatarFallback className="bg-[#09637E] text-white font-bold">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 truncate">{getUserName()}</p>
                            <p className="text-xs text-gray-500 font-medium truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mobile Notifications */}
                    <Link
                      to="/notifications"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 mb-4 text-sm font-bold rounded-xl border transition-colors ${isActive('/notifications')
                          ? 'bg-[#09637E]/5 text-[#09637E] border-[#09637E]/20'
                          : 'text-gray-700 hover:bg-gray-50 border-gray-100'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                          {unreadNotifications > 0 && (
                            <div className="absolute -top-1 -right-1">
                              <span className="flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                              </span>
                            </div>
                          )}
                        </div>
                        <span>Notifications</span>
                      </div>
                      {unreadNotifications > 0 && (
                        <Badge className="bg-red-500 text-white font-bold rounded-full px-2">
                          {unreadNotifications > 9 ? '9+' : unreadNotifications}
                        </Badge>
                      )}
                    </Link>

                    {/* Mobile Navigation */}
                    <div className="space-y-1">
                      {navigationItems.filter(item => item.path !== '/notifications').map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${isActive(item.path)
                              ? 'bg-gray-50 text-[#09637E]'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Mobile User Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      {user ? (
                        <div className="space-y-3">
                          {user.membership_no && user.has_active_membership && (
                            <div className="flex items-center justify-center mb-4">
                              <Badge variant="outline" className="text-xs border-[#09637E]/20 bg-[#09637E]/5 text-[#09637E] font-bold py-1">
                                Membership: {user.membership_no}
                              </Badge>
                            </div>
                          )}
                          <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                            <Button variant="outline" className="w-full justify-start text-sm font-semibold rounded-xl h-11 border-gray-200">
                              <LayoutDashboard className="mr-3 h-4 w-4" />
                              Dashboard
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold rounded-xl h-11"
                            onClick={() => {
                              handleLogout();
                              setMobileOpen(false);
                            }}
                          >
                            <LogOut className="mr-3 h-4 w-4" />
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Link to="/login" onClick={() => setMobileOpen(false)}>
                            <Button variant="outline" className="w-full text-sm font-semibold rounded-xl h-11 border-gray-200">
                              Log in
                            </Button>
                          </Link>
                          <Link to="/admin/login" onClick={() => setMobileOpen(false)}>
                            <Button className="w-full bg-[#09637E] text-white hover:bg-[#088395] text-sm font-semibold rounded-xl h-11 shadow-md shadow-[#09637E]/20">
                              Admin Portal
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

