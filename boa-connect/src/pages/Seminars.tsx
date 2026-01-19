import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Users, History } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { seminarAPI } from '@/lib/api';

export default function Seminars() {
  const [seminars, setSeminars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingSeminars, setUpcomingSeminars] = useState<any[]>([]);
  const [previousSeminars, setPreviousSeminars] = useState<any[]>([]);

  useEffect(() => {
    loadSeminars();
  }, []);

  const loadSeminars = async () => {
    try {
      const response = await seminarAPI.getAll();
      const allSeminars = response.seminars || [];
      setSeminars(allSeminars);
      
      // Separate based on status field
      const upcoming: any[] = [];
      const previous: any[] = [];
      
      allSeminars.forEach((seminar: any) => {
        if (seminar.status === 'previous') {
          previous.push(seminar);
        } else {
          upcoming.push(seminar);
        }
      });
      
      setUpcomingSeminars(upcoming);
      setPreviousSeminars(previous);
    } catch (error) {
      console.error('Failed to load seminars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Seminars & Conferences
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our upcoming events and register for conferences that advance your ophthalmology practice.
            </p>
          </div>

          {/* Upcoming Seminars Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-blue-600"></div>
              <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
              {upcomingSeminars.length > 0 && (
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  {upcomingSeminars.length}
                </Badge>
              )}
            </div>

            {upcomingSeminars.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground">
                  There are no upcoming events at the moment. Check back soon for new conferences and seminars.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingSeminars.map((seminar) => (
                  <div
                    key={seminar.id}
                    className="relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
                  >
                    {/* Status Badge */}
                    {seminar.is_active && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5 animate-pulse" />
                          Registration Open
                        </Badge>
                      </div>
                    )}

                    {/* Image Header */}
                    <div className="h-48 relative overflow-hidden">
                      {seminar.image_url ? (
                        <>
                          <img 
                            src={seminar.image_url} 
                            alt={seminar.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden absolute inset-0 gradient-primary flex items-center justify-center">
                            <Calendar className="h-20 w-20 text-primary-foreground/20" />
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 gradient-primary flex items-center justify-center">
                          <Calendar className="h-20 w-20 text-primary-foreground/20" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        {seminar.name}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{seminar.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>
                            {new Date(seminar.start_date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })} - {new Date(seminar.end_date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {seminar.description}
                      </p>

                      <div className="pt-4 border-t border-border flex gap-2">
                        {seminar.is_active && (
                          <Link to={`/seminar/${seminar.id}/register`} className="flex-1">
                            <Button className="w-full gradient-primary text-primary-foreground">
                              Register Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        <Link to={`/seminar/${seminar.id}`} className={seminar.is_active ? 'flex-1' : 'w-full'}>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
<hr />
          {/* Previous Seminars Section */}
          {previousSeminars.length > 0 && (
            <div className="mb-16 mt-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-gray-600"></div>
                <h2 className="text-3xl font-bold text-foreground">Previous Events</h2>
                <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                  {previousSeminars.length}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previousSeminars.map((seminar) => (
                  <div
                    key={seminar.id}
                    className="relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm opacity-75"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                        Completed
                      </Badge>
                    </div>

                    {/* Image Header */}
                    <div className="h-48 relative overflow-hidden">
                      {seminar.image_url ? (
                        <>
                          <img 
                            src={seminar.image_url} 
                            alt={seminar.name}
                            className="w-full h-full object-cover grayscale"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden absolute inset-0 bg-gray-600 flex items-center justify-center">
                            <History className="h-20 w-20 text-white/20" />
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
                          <History className="h-20 w-20 text-white/20" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        {seminar.name}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <span>{seminar.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span>
                            {new Date(seminar.start_date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })} - {new Date(seminar.end_date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {seminar.description}
                      </p>

                      <div className="pt-4 border-t border-border">
                        <Link to={`/seminar/${seminar.id}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-accent-foreground">
              <Users className="h-5 w-5" />
              <span className="font-medium">Want to host an event with BOA?</span>
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
