import { Award, Scale, Building, Eye, Users, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { API_BASE_URL } from '@/lib/utils';

export default function About() {
  const [certification, setCertification] = useState<any>(null);
  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    loadCertification();
    loadCommitteeMembers();
    loadHeroImage();
  }, []);

  const loadHeroImage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery-images?limit=1`);
      const data = await response.json();
      if (data.success && data.images && data.images.length > 0) {
        setHeroImage(data.images[0].image_url);
      }
    } catch (error) {
      console.error('Failed to load hero image:', error);
    }
  };

  const loadCertification = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/certification`);
      
      if (!response.ok) {
        console.error('Certification API error:', response.status, response.statusText);
        return;
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        if (responseText.includes('<!doctype') || responseText.includes('<html')) {
          console.error('Certification API returned HTML instead of JSON');
          return;
        }
      }
      
      const data = await response.json();
      if (data.success && data.certification) {
        setCertification(data.certification);
      }
    } catch (error) {
      console.error('Failed to load certification:', error);
    }
  };

  const loadCommitteeMembers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/committee-members?page_type=about`);
      
      if (!response.ok) {
        console.error('Committee members API error:', response.status, response.statusText);
        return;
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        if (responseText.includes('<!doctype') || responseText.includes('<html')) {
          console.error('Committee members API returned HTML instead of JSON');
          return;
        }
      }
      
      const data = await response.json();
      if (data.success) {
        setCommitteeMembers(data.members || []);
      }
    } catch (error) {
      console.error('Failed to load committee members:', error);
    }
  };

  const defaultHeroImage = "https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?auto=format&fit=crop&q=80";

  return (
    <Layout>
      <div className="page-enter">
        {/* Modern Hero Section with Image */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage || defaultHeroImage} 
              alt="About BOA Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/90 to-[#09637E]/80" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[2px] w-12 bg-blue-300"></div>
                  <span className="text-blue-200 font-semibold tracking-wider uppercase text-sm">
                    Established 2021
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  About Ophthalmic
                  <span className="block text-blue-200">Association</span>
                  <span className="block">Of Bihar</span>
                </h1>
                
                <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
                  A Government-recognized medical association serving the ophthalmic community of Bihar since 2021
                </p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-300" />
                    <span>Professional Excellence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-300" />
                    <span>38 Districts Coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-300" />
                    <span>Government Recognized</span>
                  </div>
                </div>
              </div>

              {/* Right Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white border border-white/20">
                  <div className="text-3xl font-bold mb-2">2021</div>
                  <div className="text-blue-200 text-sm">Established</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white border border-white/20">
                  <div className="text-3xl font-bold mb-2">38</div>
                  <div className="text-blue-200 text-sm">Districts Served</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white border border-white/20">
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-blue-200 text-sm">Members</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white border border-white/20">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-200 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern BOA Details Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-12 bg-blue-200"></div>
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
                  Our Story
                </span>
                <div className="h-[2px] w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3C5D] mb-6">
                About <span className="text-blue-600">BOA</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-blue-600 p-3 rounded-xl">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Establishment</h3>
                      <p className="text-gray-700 leading-relaxed">
                        The Ophthalmic Association Of Bihar (BOA) was established in 2021 as a professional medical association
                        to serve the ophthalmic community across the state of Bihar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-green-600 p-3 rounded-xl">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Government Recognition</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Operating under the jurisdiction of the Government of Bihar, BOA functions as the official representative body for ophthalmologists and eye care professionals in the region.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-purple-600 p-3 rounded-xl">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Coverage & Service</h3>
                      <p className="text-gray-700 leading-relaxed">
                        The association serves all 38 districts of Bihar, providing professional development opportunities,
                        continuing medical education, and advocacy for improved eye care services throughout the state.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-orange-600 p-3 rounded-xl">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Standards</h3>
                      <p className="text-gray-700 leading-relaxed">
                        BOA operates in accordance with medical ethics and professional standards as prescribed by the
                        Medical Council of India and relevant regulatory authorities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  As a registered society under the <strong>Societies Registration Act, 1860</strong>, BOA maintains transparency
                  in its operations and adheres to all statutory requirements for professional medical associations
                  in India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Certification Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-12 bg-blue-200"></div>
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
                  Official Recognition
                </span>
                <div className="h-[2px] w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3C5D] mb-6">
                Certification & <span className="text-blue-600">Registration</span>
              </h2>
            </div>

            {certification ? (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-6xl mx-auto">
                {/* Certification Image */}
                {certification.certificate_image_url && (
                  <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="max-w-4xl mx-auto">
                      <img
                        src={certification.certificate_image_url}
                        alt="BOA Certification"
                        className="w-full h-auto rounded-2xl shadow-lg border border-gray-200"
                      />
                    </div>
                  </div>
                )}

                {/* Certification Details */}
                <div className="p-8 lg:p-12">
                  {/* Organization Name */}
                  {certification.organization_name && (
                    <div className="text-center mb-12">
                      <h3 className="text-3xl font-bold text-[#0B3C5D] mb-2">{certification.organization_name}</h3>
                      <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Registration Number */}
                      {certification.registration_number && (
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 p-3 rounded-xl">
                              <Scale className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 text-lg">Registration Number</h4>
                              <p className="text-gray-700 font-semibold">{certification.registration_number}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Certificate Number */}
                      {certification.certificate_number && (
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-600 p-3 rounded-xl">
                              <Award className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 text-lg">Certificate Number</h4>
                              <p className="text-gray-700 font-semibold">{certification.certificate_number}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Registration Act */}
                      {certification.registration_act && (
                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                          <div className="flex items-start gap-4">
                            <div className="bg-green-600 p-3 rounded-xl">
                              <Scale className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 text-lg">Registration Act</h4>
                              <p className="text-gray-700 font-semibold">{certification.registration_act}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Registration Date */}
                      {certification.registration_date && (
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                          <div className="flex items-start gap-4">
                            <div className="bg-orange-600 p-3 rounded-xl">
                              <Award className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 text-lg">Registration Date</h4>
                              <p className="text-gray-700 font-semibold">{new Date(certification.registration_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Registered Office */}
                      {certification.registered_office && (
                        <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-2xl border border-teal-200">
                          <div className="flex items-start gap-4">
                            <div className="bg-teal-600 p-3 rounded-xl">
                              <Building className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2 text-lg">Registered Office</h4>
                              <p className="text-gray-700 font-semibold whitespace-pre-line">{certification.registered_office}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-16 bg-white rounded-3xl border border-gray-200 shadow-lg">
                <div className="max-w-md mx-auto">
                  <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Certification Information</h3>
                  <p>Official certification details will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Modern NPCB-VI Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-12 bg-blue-200"></div>
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
                  National Programme
                </span>
                <div className="h-[2px] w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3C5D] mb-6 leading-tight">
                National Programme for Control of <span className="text-blue-600">Blindness</span> and Visual Impairment
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                (NPCB-VI) - A collaborative initiative with the Government of India and National Ophthalmic Association (NOA)
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Objective Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200 shadow-lg">
                <div className="bg-blue-600 p-4 rounded-2xl w-fit mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B3C5D] mb-4">Objective</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To achieve the goal of the NPCB-VI program, working to curb blindness across India.
                </p>
              </div>
              {/* Vision Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border border-purple-200 shadow-lg">
                <div className="bg-purple-600 p-4 rounded-2xl w-fit mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B3C5D] mb-4">Vision</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "Peoples of India remains free from avoidable blindness and ensure a good quality of life both 
                  irreversible blindness & in society & others."
                </p>
              </div>

              {/* Mission Header Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border border-green-200 shadow-lg">
                <div className="bg-green-600 p-4 rounded-2xl w-fit mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B3C5D] mb-4">Mission</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Comprehensive approach to eye care through quality measures, awareness, and community health initiatives.
                </p>
              </div>
            </div>

            {/* Mission Points */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-lg">
              <h4 className="text-2xl font-bold text-[#0B3C5D] mb-8 text-center">Mission Objectives</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Minimize health care burden on secondary and tertiary levels by providing quality and quantity measures.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Generate awareness at the last level of community for eye & health care.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Provide quality basic eye examination including refraction and diagnosis of vision-threatening diseases.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Identify and manage newly diagnosed vision threatening diseases like Glaucoma at higher level with prompt management.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-600 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Screening of asymptomatic vision disorders with trained non-medical personnel and community health workers.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 p-2 rounded-lg mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Co-ordinating care with primary care physicians for patients with special needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Committee Members Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-12 bg-blue-200"></div>
                <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
                  Leadership Team
                </span>
                <div className="h-[2px] w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B3C5D] mb-6">
                Executive Committee <span className="text-blue-600">Members</span>
              </h2>
            </div>

            {committeeMembers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {committeeMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="relative mb-6">
                        <div className="h-24 w-24 mx-auto rounded-full overflow-hidden border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg group-hover:border-blue-400 transition-colors">
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
                            <span className="text-xl font-bold">
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
      </div>
    </Layout>
  );
}