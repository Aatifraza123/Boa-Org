import { Eye, Target, Heart, BookOpen, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Vision Excellence',
    description: 'Promoting the highest standards in ophthalmology practice across Bihar since 1975.'
  },
  {
    icon: Target,
    title: 'Research & Innovation',
    description: 'Supporting cutting-edge research in eye care and advancing vision science in Eastern India.'
  },
  {
    icon: Heart,
    title: 'Community Outreach',
    description: 'Organizing free eye camps and awareness programs for underserved communities across Bihar.'
  },
  {
    icon: BookOpen,
    title: 'Medical Education',
    description: 'Providing CME programs, workshops, and conferences for continuous professional development.'
  },
  {
    icon: Award,
    title: 'Government Recognized',
    description: 'Registered under Societies Registration Act 21, 1860. Registration No: S000403, Certificate No: S22104.'
  },
  {
    icon: Users,
    title: 'Professional Network',
    description: 'Connecting ophthalmologists across Bihar for knowledge sharing and collaborative patient care.'
  }
];

export function AboutSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Ophthalmic Association of Bihar
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            The Ophthalmic Association of Bihar (BOA) is a premier professional organization dedicated to 
            advancing eye care and ophthalmology practice across Bihar state.
          </p>
          <p className="text-base text-muted-foreground">
            <strong>Registered Office:</strong> Ved Vani, East Shivpuri, Chitkohara Bypass Road, 
            Po-Anishabad, Patna - 800002, Bihar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-card transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-accent/30 rounded-2xl p-8 border border-border">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary mb-2">50+</p>
              <p className="text-sm text-muted-foreground">Years of Service</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">500+</p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary mb-2">100+</p>
              <p className="text-sm text-muted-foreground">Annual Events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
