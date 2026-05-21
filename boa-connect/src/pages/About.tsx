import { Award, Scale, Building, Eye, Users, Target, Star, CheckCircle2 } from 'lucide-react';
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
        {/* Modern Clean Hero Section */}
        <section className="relative py-12 lg:py-20 bg-gray-50 overflow-hidden">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="flex flex-col text-center lg:text-left">
                <div className="mb-6 flex justify-center lg:justify-start">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-[#09637E] text-sm font-semibold">
                    <Star className="w-4 h-4 mr-2" />
                    Established 2021
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
                  About Ophthalmic
                  <span className="block text-[#09637E] mt-2">Association</span>
                  <span className="block text-gray-800 mt-2">Of Bihar</span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  A Government-recognized medical association serving the ophthalmic community of Bihar since 2021.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-4 border-t border-gray-200 pt-8">
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-5 w-5 text-[#09637E]" />
                      <span className="font-bold text-gray-900 text-lg">Professional</span>
                    </div>
                    <span className="text-sm text-gray-500">Excellence</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-5 w-5 text-[#09637E]" />
                      <span className="font-bold text-gray-900 text-lg">38 Districts</span>
                    </div>
                    <span className="text-sm text-gray-500">Coverage</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="h-5 w-5 text-[#09637E]" />
                      <span className="font-bold text-gray-900 text-lg">Government</span>
                    </div>
                    <span className="text-sm text-gray-500">Recognized</span>
                  </div>
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-5 w-5 text-[#09637E]" />
                      <span className="font-bold text-gray-900 text-lg">100+</span>
                    </div>
                    <span className="text-sm text-gray-500">Members</span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={heroImage || defaultHeroImage} 
                    alt="About BOA" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <Building className="h-4 w-4" />
                  Our Story
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                About <span className="text-blue-600">BOA</span>
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-6 w-6 text-[#09637E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Establishment</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The Ophthalmic Association Of Bihar (BOA) was established in 2021 as a professional medical association
                      to serve the ophthalmic community across the state of Bihar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-6 w-6 text-[#09637E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Government Recognition</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Operating under the jurisdiction of the Government of Bihar, BOA functions as the official representative body for ophthalmologists and eye care professionals in the region.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-6 w-6 text-[#09637E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Coverage & Service</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The association serves all 38 districts of Bihar, providing professional development opportunities,
                      continuing medical education, and advocacy for improved eye care services throughout the state.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-6 w-6 text-[#09637E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Standards</h3>
                    <p className="text-gray-600 leading-relaxed">
                      BOA operates in accordance with medical ethics and professional standards as prescribed by the
                      Medical Council of India and relevant regulatory authorities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="bg-blue-50/50 p-6 lg:p-8 rounded-2xl border border-blue-100 max-w-4xl mx-auto text-center">
                <p className="text-gray-700 leading-relaxed">
                  As a registered society under the <strong className="text-[#09637E]">Societies Registration Act, 1860</strong>, BOA maintains transparency
                  in its operations and adheres to all statutory requirements for professional medical associations
                  in India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <Award className="h-4 w-4" />
                  Official Recognition
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                Certification & <span className="text-blue-600">Registration</span>
              </h2>
            </div>

            {certification ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto">
                {certification.certificate_image_url && (
                  <div className="p-6 lg:p-10 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-3xl mx-auto">
                      <img
                        src={certification.certificate_image_url}
                        alt="BOA Certification"
                        className="w-full h-auto rounded-xl shadow-sm border border-gray-200"
                      />
                    </div>
                  </div>
                )}
                
                <div className="p-8 lg:p-12">
                  {certification.organization_name && (
                    <div className="text-center mb-10">
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{certification.organization_name}</h3>
                      <div className="h-1 w-16 bg-[#09637E] mx-auto rounded-full"></div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {certification.registration_number && (
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Scale className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Registration Number</h4>
                            <p className="text-gray-600">{certification.registration_number}</p>
                          </div>
                        </div>
                      )}
                      {certification.certificate_number && (
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Certificate Number</h4>
                            <p className="text-gray-600">{certification.certificate_number}</p>
                          </div>
                        </div>
                      )}
                      {certification.registration_act && (
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Building className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Registration Act</h4>
                            <p className="text-gray-600">{certification.registration_act}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-6">
                      {certification.registration_date && (
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Star className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Registration Date</h4>
                            <p className="text-gray-600">{new Date(certification.registration_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          </div>
                        </div>
                      )}
                      {certification.registered_office && (
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Target className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1">Registered Office</h4>
                            <p className="text-gray-600 whitespace-pre-line">{certification.registered_office}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                <Award className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-600">Certification Information</h3>
                <p className="text-sm">Official certification details will be displayed here</p>
              </div>
            )}
          </div>
        </section>

        {/* NPCB-VI Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <Eye className="h-4 w-4" />
                  National Programme
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight leading-tight">
                National Programme for Control of <span className="text-blue-600">Blindness</span>
              </h2>
              <p className="text-base lg:text-lg text-gray-500 max-w-3xl mx-auto">
                (NPCB-VI) - A collaborative initiative with the Government of India and National Ophthalmic Association (NOA)
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#09637E]" /> Objective
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  To achieve the goal of the NPCB-VI program, working to curb blindness across India.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-[#09637E]" /> Vision
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  "Peoples of India remains free from avoidable blindness and ensure a good quality of life both irreversible blindness & in society & others."
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#09637E]" /> Mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  Comprehensive approach to eye care through quality measures, awareness, and community health initiatives.
                </p>
              </div>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-8 lg:p-12 border border-gray-100">
              <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-8 text-center">Mission Objectives</h4>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#09637E] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm lg:text-base">
                    Minimize health care burden on secondary and tertiary levels by providing quality and quantity measures.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#09637E] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm lg:text-base">
                    Identify and manage newly diagnosed vision threatening diseases like Glaucoma at higher level with prompt management.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#09637E] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm lg:text-base">
                    Generate awareness at the last level of community for eye & health care.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#09637E] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm lg:text-base">
                    Screening of asymptomatic vision disorders with trained non-medical personnel and community health workers.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#09637E] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm lg:text-base">
                    Provide quality basic eye examination including refraction and diagnosis of vision-threatening diseases.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#09637E] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 text-sm lg:text-base">
                    Co-ordinating care with primary care physicians for patients with special needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Committee Members Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
                <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                  <Users className="h-4 w-4" />
                  Leadership
                </div>
                <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#0B1B3D] mb-4 tracking-tight">
                Executive Committee <span className="text-blue-600">Members</span>
              </h2>
            </div>

            {committeeMembers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {committeeMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className="relative mb-4 w-20 h-20">
                      <div className="h-full w-full rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.parentElement?.querySelector('.fallback-avatar');
                              if (fallback) (fallback as HTMLElement).style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`fallback-avatar h-full w-full flex items-center justify-center bg-blue-50 text-[#09637E] ${member.image_url ? 'hidden' : ''}`}>
                          <span className="text-xl font-bold">
                            {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h4>
                    <p className="text-xs text-blue-600 font-medium bg-blue-50/50 px-2 py-1 rounded-full">{member.profession}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-600">Committee Members</h3>
                  <p className="text-sm text-gray-500">Executive committee information will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}