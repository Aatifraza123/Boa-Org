import { useState, useEffect } from 'react';
import { Image, Video, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '@/lib/utils';

export function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery?limit=6`);
      const data = await response.json();
      if (data.success) {
        setGalleryItems(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <section className="gov-section">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="gov-section-title p-2 bg-[#0B3C5D] text-white">Gallery</h2>
          <p className="gov-section-subtitle">
            Moments from our seminars, conferences, and community outreach programs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {galleryItems.map((item, index) => (
            item.type === 'image' ? (
              <img 
                key={index}
                src={item.url} 
                alt=""
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300 rounded border-4 border-gray-300 shadow-sm"
              />
            ) : (
              <div key={index} className="relative aspect-square overflow-hidden rounded border-4 border-gray-300 shadow-sm" style={{background: '#F9FAFB'}}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" style={{borderLeft: '6px solid #0B3C5D'}}></div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/gallery">
            <button className="bg-white border-2 px-5 py-2.5 rounded font-medium hover:bg-gray-50 transition-colors" style={{color: '#0B3C5D', borderColor: '#0B3C5D'}}>
              View Full Gallery
              <ExternalLink className="ml-2 h-4 w-4 inline" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
