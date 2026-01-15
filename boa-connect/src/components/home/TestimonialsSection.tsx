import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Rajesh Kumar",
    rating: 5,
    content:
      "BOA conferences have been instrumental in advancing my knowledge in ophthalmology. The networking opportunities are unparalleled.",
  },
  {
    name: "Dr. Priya Sharma",
    rating: 5,
    content: "Excellent organization and world-class speakers. I look forward to attending every year.",
  },
  {
    name: "Dr. Amit Verma",
    rating: 4,
    content: "The hands-on workshops provided practical insights that I immediately applied in my practice.",
  },
  {
    name: "Dr. Sunita Patel",
    rating: 5,
    content: "A perfect platform for learning about the latest advancements in eye care. Highly recommended!",
  },
  {
    name: "Dr. Vikram Singh",
    rating: 5,
    content: "The seminars are well-structured and the faculty is top-notch. Great experience every time.",
  },
  {
    name: "Dr. Meera Gupta",
    rating: 4,
    content: "Wonderful opportunity to connect with peers and learn from experts in the field.",
  },
  {
    name: "Dr. Arun Joshi",
    rating: 5,
    content: "BOA has helped me stay updated with cutting-edge techniques and research in ophthalmology.",
  },
  {
    name: "Dr. Kavita Reddy",
    rating: 5,
    content: "The conference venue and arrangements are always excellent. A must-attend for all ophthalmologists.",
  },
  {
    name: "Dr. Sanjay Mehta",
    rating: 4,
    content: "Great mix of theoretical knowledge and practical demonstrations. Very enriching experience.",
  },
  {
    name: "Dr. Anita Rao",
    rating: 5,
    content: "I've attended multiple BOA seminars and each one has exceeded my expectations. Truly world-class!",
  },
];

export const TestimonialsSection = () => {
  // Double the testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl font-bold text-center text-foreground mb-2">What Our Members Say</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Hear from healthcare professionals who have attended our seminars and conferences
        </p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        <div className="flex animate-scroll gap-6 hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-80 bg-card rounded-xl p-6 shadow-md border border-border">
              {/* Rating - Top Right */}
              <div className="flex justify-end mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content - Middle */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[80px]">"{testimonial.content}"</p>

              {/* Name with Circle Icon - Bottom */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                </div>
                <span className="font-medium text-foreground text-sm">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
