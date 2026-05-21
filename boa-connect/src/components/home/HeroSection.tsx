import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Heart, Stethoscope } from "lucide-react";
import { seminarAPI } from "@/lib/api";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { HeroStatsSection } from "./HeroStatsSection";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { API_BASE_URL } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

export function HeroSection() {
  const [activeSeminar, setActiveSeminar] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const { config } = useSiteConfig();

  useEffect(() => {
    loadActiveSeminar();
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery-images?limit=10`);
      const data = await response.json();
      if (data.success && data.images) {
        const images = data.images.map((image: any) => ({
          url: image.image_url,
          type: 'image',
          title: image.title
        }));
        setGalleryImages(images);
      }
    } catch (error) {
      console.error('Failed to load gallery images:', error);
    }
  };

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
      <section className="min-h-[50vh] flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#09637E]"></div>
      </section>
    );
  }

  const defaultImage = config.hero_circle_image_url || "https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80";

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden">
      {/* Full Width Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={defaultImage} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Light overlay with blur to keep the layout simple, clean, and readable */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 flex justify-center lg:justify-start">
              {activeSeminar && activeSeminar.online_registration_enabled === 1 ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                  Registration Open: {activeSeminar.name}
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-[#09637E] text-sm font-semibold">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Leading Eye Care Association
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
              <span className="block text-gray-900">Ophthalmic Association</span>
              <span className="block text-[#09637E] mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold">Of Bihar</span>
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 lg:mb-6 max-w-xl mx-auto lg:mx-0">
              Advancing eye care excellence through education, research, and collaboration since 2021. Join our mission to preserve vision.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-4 lg:mb-6">
              {activeSeminar && activeSeminar.online_registration_enabled === 1 ? (
                <>
                  <Link to={`/seminar/${activeSeminar.id}/register`} className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 bg-[#09637E] hover:bg-[#088395] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/seminars" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 bg-white border border-gray-300 hover:border-[#09637E] text-gray-700 hover:text-[#09637E] font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>View Seminars</span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/seminars" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 bg-[#09637E] hover:bg-[#088395] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                      <span>Explore Seminars</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/membership" className="w-full sm:w-auto">
                    <button className="w-full px-6 py-3 bg-white border border-gray-300 hover:border-[#09637E] text-gray-700 hover:text-[#09637E] font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>Join Community</span>
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-gray-200">
              <HeroStatsSection />
            </div>
          </div>

          {/* Right Column: Clean Carousel */}
          <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[Autoplay({ delay: 3500 })]}
              className="w-full"
            >
              <CarouselContent className="ml-0">
                {galleryImages.length > 0 ? (
                  galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-0 basis-full">
                      <div className="aspect-[4/3] w-full">
                        <img
                          src={image.url}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = defaultImage;
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem className="pl-0 basis-full">
                    <div className="aspect-[4/3] w-full">
                      <img
                        src={defaultImage}
                        alt="Hero Default"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          </div>

        </div>
      </div>
    </section>
  );
}
