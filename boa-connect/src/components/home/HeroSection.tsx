import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seminarAPI } from "@/lib/api";

export function HeroSection() {
  const [activeSeminar, setActiveSeminar] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActiveSeminar();
  }, []);

  const loadActiveSeminar = async () => {
    try {
      const response = await seminarAPI.getActive();
      setActiveSeminar(response.seminar);
    } catch (error) {
      console.error('Failed to load active seminar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (!activeSeminar) {
    return (
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Bihar Ophthalmic Association</h1>
          <p className="text-muted-foreground">No active seminar at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  const seminarStartDate = new Date(activeSeminar.start_date);
  const seminarEndDate = new Date(activeSeminar.end_date);
  const dateRange = `${seminarStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${seminarEndDate.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative py-5 md:py-30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-soft" />
              {activeSeminar.name} - Registration Open
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Bihar Ophthalmic <span className="text-black">Association</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Advancing eye care excellence through education, research, and collaboration since 1975.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to={`/seminar/${activeSeminar.id}/register`}>
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-lg shadow-primary/25">
                  Register for {activeSeminar.name}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/seminars">
                <Button size="lg" variant="outline">
                  View All Seminars
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Main Circle */}
              <div className="absolute inset-8 rounded-full gradient-primary opacity-10" />
              <div className="absolute inset-16 rounded-full bg-accent" />

              {/* Floating Cards */}
              <div
                className="absolute top-12 left-0 glass-card rounded-xl p-4 shadow-elevated animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Next Conference</p>
                    <p className="text-sm text-muted-foreground">{dateRange}</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-20 right-0 glass-card rounded-xl p-4 shadow-elevated animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg gradient-gold flex items-center justify-center">
                    <Award className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">CME Points</p>
                    <p className="text-sm text-muted-foreground">Certified Programs</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-8 left-12 glass-card rounded-xl p-4 shadow-elevated animate-slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Register Now</p>
                    <p className="text-sm text-muted-foreground">Limited Seats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
