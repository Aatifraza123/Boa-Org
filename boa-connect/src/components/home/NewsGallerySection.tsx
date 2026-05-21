import { useState, useEffect } from 'react';
import { Calendar, Clock, Eye, ArrowRight, Newspaper, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  status: 'active' | 'inactive';
}

interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  created_at: string;
}

export function NewsGallerySection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load news and gallery data in parallel - ONLY 3 items each
      const [newsResponse, galleryResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/news?limit=3`),
        fetch(`${API_BASE_URL}/api/gallery-images?limit=3`)
      ]);

      const newsData = await newsResponse.json();
      const galleryData = await galleryResponse.json();

      if (newsData.success) {
        // Ensure only 3 news items maximum
        const limitedNews = (newsData.news || []).slice(0, 3);
        setNews(limitedNews);
      }

      if (galleryData.success) {
        // Ensure only 3 gallery images maximum
        const limitedImages = (galleryData.images || []).slice(0, 3);
        setGalleryImages(limitedImages);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
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

  return (
    <>
      {/* News Section */}
      {news.length > 0 && (
        <section className="py-12 lg:py-20 bg-gray-50/50">
          <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
            <div className="text-center mb-8 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <Newspaper className="h-4 w-4" />
                  Latest Updates
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] tracking-tight leading-[1.15]">
                Media <span className="text-blue-600">Coverage</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {news.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {item.image_url ? (
                      <>
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/api/placeholder/400/250';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <Eye className="h-12 w-12 text-blue-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-3 lg:p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600">
                        News
                      </span>
                      <div className="flex items-center text-xs font-semibold text-gray-400 gap-1.5 uppercase tracking-wider">
                        <Clock className="h-3.5 w-3.5" />
                        {getTimeAgo(item.created_at)}
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-xl text-[#0B1B3D] mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {truncateContent(item.content)}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(item.created_at)}
                      </div>
                      
                      <Link to="/news" className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 transition-colors group/link">
                        Read More <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/news">
                <Button className="bg-[#09637E] hover:bg-[#088395] text-white px-6 py-6 text-base font-medium rounded-lg shadow-sm transition-all">
                  View All News
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-12 lg:py-20 bg-white">
          <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
            <div className="text-center mb-8 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <ImageIcon className="h-4 w-4" />
                  Memories
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] tracking-tight leading-[1.15]">
                Gallery <span className="text-blue-600">Highlights</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
              {galleryImages.slice(0, 3).map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                  <img
                    src={image.image_url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/400/400';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/gallery">
                <Button className="bg-[#09637E] hover:bg-[#088395] text-white px-6 py-6 text-base font-medium rounded-lg shadow-sm transition-all">
                  View Full Gallery
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}