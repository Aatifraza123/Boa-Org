import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/utils';
import { Users } from 'lucide-react';

export function CommitteeSection() {
  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCommitteeMembers();
  }, []);

  const loadCommitteeMembers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/committee-members?page_type=home`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText.substring(0, 500));
        
        if (errorText.includes('<!doctype') || errorText.includes('<html')) {
          console.error('API server returned HTML instead of JSON - server might be down or misconfigured');
          setCommitteeMembers([]);
          return;
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON response received:', responseText.substring(0, 200));
        
        if (responseText.includes('<!doctype') || responseText.includes('<html')) {
          console.error('API server returned HTML - using empty fallback');
          setCommitteeMembers([]);
          return;
        }
        
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      if (data.success) {
        setCommitteeMembers(data.members || []);
      } else {
        console.error('API returned success: false');
        setCommitteeMembers([]);
      }
    } catch (error) {
      console.error('Failed to load committee members:', error);
      setCommitteeMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#09637E]"></div>
        </div>
      </section>
    );
  }

  if (committeeMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-8 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-blue-200"></div>
            <div className="flex items-center gap-2 text-blue-600 font-bold tracking-wider uppercase text-sm">
              <Users className="h-4 w-4" />
              Leadership Team
            </div>
            <div className="h-[2px] w-12 bg-blue-200"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B3C5D] mb-4 lg:mb-6">
            Our <span className="text-blue-600">Committee</span>
          </h2>
        </div>

        {committeeMembers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {committeeMembers.map((member, index) => (
              <div
                key={member.id}
                className="group bg-white rounded-3xl p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="relative mb-4 lg:mb-6">
                    <div className="h-20 w-20 lg:h-24 lg:w-24 mx-auto rounded-full overflow-hidden border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg group-hover:border-blue-400 transition-colors">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-avatar');
                            if (fallback) (fallback as HTMLElement).style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`fallback-avatar h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 ${member.image_url ? 'hidden' : ''}`}>
                        <span className="text-lg lg:text-xl font-bold">
                          {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"></div>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 text-sm mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                    {member.profession}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto bg-white rounded-3xl p-12 shadow-lg border border-gray-200">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Committee Members</h3>
              <p className="text-gray-500">Executive committee information will be displayed here</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
