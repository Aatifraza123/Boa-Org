import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { seminarAPI } from '@/lib/api';

export default function Seminars() {
  const [seminars, setSeminars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSeminars();
  }, []);

  const loadSeminars = async () => {
    try {
      const response = await seminarAPI.getAll();
      setSeminars(response.seminars || []);
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

          {/* Seminars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seminars.map((seminar) => (
              <div
                key={seminar.id}
                className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-300"
              >
                {/* Status Badge */}
                {seminar.is_active && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="gradient-gold text-secondary-foreground border-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-foreground mr-1.5 animate-pulse" />
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
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
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
