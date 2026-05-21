import { useState, useEffect } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  designation: string;
  organization: string;
  image_url: string;
  testimonial: string;
  rating: number;
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/testimonials`);
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
      }
    } catch (error) {
      console.error('Failed to load testimonials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="gov-section-gray">
        <div className="container">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <section className="py-12 lg:py-20 bg-gray-50/50">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-8 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
            <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
              <MessageSquare className="h-4 w-4" />
              Community
            </div>
            <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] tracking-tight leading-[1.15]">
            What Our <span className="text-blue-600">Members Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <p className="mb-6 text-gray-600 leading-relaxed text-sm sm:text-base flex-grow">
                "{testimonial.testimonial}"
              </p>
              
              <div className="mt-auto">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} 
                    />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {testimonial.image_url ? (
                    <img 
                      src={testimonial.image_url} 
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-full object-cover border-[3px] border-gray-50 shadow-sm"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 bg-blue-50 border-[3px] border-white shadow-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <h4 className="font-extrabold text-[#0B1B3D] group-hover:text-blue-600 transition-colors">{testimonial.name}</h4>
                    <p className="text-sm font-medium text-gray-500">
                      {testimonial.designation}
                      {testimonial.organization && <span className="block text-xs mt-0.5">{testimonial.organization}</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

