import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_BASE_URL } from '@/lib/utils';

export function AboutSection() {
  const [galleryImage, setGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/gallery-images`);
        const data = await response.json();
        if (data.success && data.images && data.images.length > 0) {
          setGalleryImage(data.images[0].image_url);
        }
      } catch (error) {
        console.error('Failed to fetch gallery images', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <section className="py-12 lg:py-20 bg-gray-50/50">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-8 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
            <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
              <Star className="h-4 w-4" />
              Established 1976
            </div>
            <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-3 lg:mb-4 tracking-tight leading-[1.15]">
            About Ophthalmic Association <span className="text-blue-600">of Bihar</span>
          </h2>
          <p className="text-base text-gray-500 leading-relaxed max-w-3xl mx-auto">
            The Ophthalmic Association of Bihar (OAB) is a registered ophthalmic association under the Societies Registration Act - 1860 of India. Its members work as qualified primary eye care professionals since 1976 in all over India.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          
          {/* Content */}
          <div className="lg:w-1/2 space-y-4 lg:space-y-6">

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-6 w-6 text-[#09637E]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Create a zero defect vision where ophthalmic professionals provide high-quality visual health and eye care, which are accessible and affordable to all peoples living in India.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-6 w-6 text-[#088395]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Community</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Impart a cumulative effort to achieve their fundamental right as first-line eye care providers as ophthalmic professionals in Ophthalmic Science Council of India under National Commission of Allied Health Professional Act - 2020 of Government of India. Their strong advocacy for primary eye care practitioners.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button className="bg-[#09637E] hover:bg-[#088395] text-white px-6 py-6 text-base font-medium rounded-lg shadow-sm transition-all">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Simple Clean Image */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-gray-100 max-w-md w-full">
              <img 
                src={galleryImage || "https://img.freepik.com/premium-photo/slit-lamp-examination-biomicroscopy-anterior-eye-segment_926199-2157852.jpg"} 
                alt="About Ophthalmic Association" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
