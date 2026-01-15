import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { seminarAPI } from '@/lib/api';

export function SeminarsSection() {
  const [seminars, setSeminars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSeminars();
  }, []);

  const loadSeminars = async () => {
    try {
      const response = await seminarAPI.getAll();
      // Show only first 3 seminars
      setSeminars((response.seminars || []).slice(0, 3));
    } catch (error) {
      console.error('Failed to load seminars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  // Don't show section if no seminars
  if (seminars.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upcoming Seminars
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg">
              Stay updated with our latest conferences, workshops, and CME programs.
            </p>
          </div>
          <Link to="/seminars">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seminars.map((seminar, index) => (
            <div
              key={seminar.id}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-300"
            >
              {/* Status Badge */}
              {seminar.is_active && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="gradient-gold text-secondary-foreground border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-foreground mr-1.5 animate-pulse" />
                    Active
                  </Badge>
                </div>
              )}

              {/* Image Placeholder */}
              <div className="h-40 relative overflow-hidden">
                {seminar.image_url ? (
                  <>
                    <img 
                      src={seminar.image_url} 
                      alt={seminar.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 gradient-primary flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-primary-foreground/30" />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 gradient-primary flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-primary-foreground/30" />
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
                        month: 'short', 
                        year: 'numeric' 
                      })} - {new Date(seminar.end_date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {seminar.description}
                </p>

                <Link to={seminar.is_active ? `/seminar/${seminar.id}/register` : `/seminar/${seminar.id}`}>
                  <Button 
                    className={`w-full ${seminar.is_active ? 'gradient-primary text-primary-foreground' : ''}`}
                    variant={seminar.is_active ? 'default' : 'outline'}
                  >
                    {seminar.is_active ? 'Register Now' : 'View Details'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
