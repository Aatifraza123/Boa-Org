import { Award, Scale, Building } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { API_BASE_URL } from '@/lib/utils';

export default function About() {
  const [certification, setCertification] = useState<any>(null);
  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);

  useEffect(() => {
    loadCertification();
    loadCommitteeMembers();
  }, []);

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

  return (
    <Layout>
      <div style={{ opacity: 1, visibility: 'visible' }}>
        {/* Hero Section */}
        <section className="bg-white py-20 border-b border-gray-200" style={{ opacity: 1, visibility: 'visible' }}>
          <div className="container mx-auto px-4 max-w-4xl" style={{ opacity: 1, visibility: 'visible' }}>
            <div className="text-center" style={{ opacity: 1, visibility: 'visible' }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Noto Sans, sans-serif', opacity: 1, visibility: 'visible' }}>
                About Ophthalmic Association Of Bihar
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto" style={{ opacity: 1, visibility: 'visible' }}>
                A Government-recognized medical association serving the ophthalmic community of Bihar since 2021
              </p>
            </div>
          </div>
        </section>

        {/* BOA Details Section */}
        <section className="py-16 bg-white">
          <div className="section-enter">
            <h2 className="p-4 mx-4 bg-[#0B3C5D] text-white text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              About BOA
            </h2>
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  The Ophthalmic Association Of Bihar (BOA) was established in 2021 as a professional medical association
                  to serve the ophthalmic community across the state of Bihar. Operating under the jurisdiction of
                  the Government of Bihar, BOA functions as the official representative body for ophthalmologists and
                  eye care professionals in the region.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  The association serves all 38 districts of Bihar, providing professional development opportunities,
                  continuing medical education, and advocacy for improved eye care services throughout the state.
                  BOA operates in accordance with medical ethics and professional standards as prescribed by the
                  Medical Council of India and relevant regulatory authorities.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  As a registered society under the Societies Registration Act, 1860, BOA maintains transparency
                  in its operations and adheres to all statutory requirements for professional medical associations
                  in India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section className="py-16 bg-gray-50">
          <div className="section-enter">
            <h2 className="p-4 mx-4 bg-[#0B3C5D] text-white text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              Certification & Registration
            </h2>
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-12"></div>

            {certification ? (
              <div className="bg-white rounded-xl shadow-lg  border border-gray-200 overflow-hidden">
                {/* Certification Image */}
                {certification.certificate_image_url && (
                  <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <img
                      src={certification.certificate_image_url}
                      alt="BOA Certification"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}

                {/* Certification Details */}
                <div className="p-8">
                  {/* Organization Name */}
                  {certification.organization_name && (
                    <div className="mb-6 text-center">
                      <h3 className="text-2xl font-bold text-gray-900">{certification.organization_name}</h3>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Registration Number */}
                      {certification.registration_number && (
                        <div className="flex items-start gap-3">
                          <Scale className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Registration Number</h4>
                            <p className="text-gray-600">{certification.registration_number}</p>
                          </div>
                        </div>
                      )}

                      {/* Certificate Number */}
                      {certification.certificate_number && (
                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Certificate Number</h4>
                            <p className="text-gray-600">{certification.certificate_number}</p>
                          </div>
                        </div>
                      )}

                      {/* Registration Act */}
                      {certification.registration_act && (
                        <div className="flex items-start gap-3">
                          <Scale className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Registration Act</h4>
                            <p className="text-gray-600">{certification.registration_act}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Registration Date */}
                      {certification.registration_date && (
                        <div className="flex items-start gap-3">
                          <Award className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Registration Date</h4>
                            <p className="text-gray-600">{new Date(certification.registration_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          </div>
                        </div>
                      )}

                      {/* Registered Office */}
                      {certification.registered_office && (
                        <div className="flex items-start gap-3">
                          <Building className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Registered Office</h4>
                            <p className="text-gray-600 whitespace-pre-line">{certification.registered_office}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-200">
                <p>Certification information will be displayed here</p>
              </div>
            )}
          </div>
        </div>
        </section>

        {/* NPCB-VI Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="section-enter">
            <h2 className="p-4 mx-4 bg-[#0B3C5D] text-white text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              National Programme for Control of Blindness and Visual Impairment (NPCB-VI)
            </h2>
            
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  The National Programme for Control of Blindness and Visual Impairment (NPCB-VI) is run by the Government of India, 
                  in association with the National Ophthalmic Association (NOA).
                </p>

                {/* Objective */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0B3C5D] mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Objective
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg pl-7">
                    To achieve the goal of the NPCB-VI program, working to curb blindness across India.
                  </p>
                </div>

                {/* Vision */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#0B3C5D] mb-3 flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg pl-7">
                    "Peoples of India remains free from avoidable blindness and ensure a good quality of life both 
                    irreversible blindness & in society & others."
                  </p>
                </div>

                {/* Mission */}
                <div>
                  <h3 className="text-xl font-bold text-[#0B3C5D] mb-3 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Mission
                  </h3>
                  <ul className="space-y-3 pl-7">
                    <li className="text-gray-700 leading-relaxed text-lg flex items-start gap-2">
                      <span className="text-[#0B3C5D] font-bold mt-1">•</span>
                      <span>Minimize health care burden on secondary and tertiary levels by providing quality and quantity measures.</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed text-lg flex items-start gap-2">
                      <span className="text-[#0B3C5D] font-bold mt-1">•</span>
                      <span>Generate awareness at the last level of community for eye & health care.</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed text-lg flex items-start gap-2">
                      <span className="text-[#0B3C5D] font-bold mt-1">•</span>
                      <span>Provide quality basic eye examination including refraction and diagnosis of vision-threatening diseases.</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed text-lg flex items-start gap-2">
                      <span className="text-[#0B3C5D] font-bold mt-1">•</span>
                      <span>Identify and manage newly diagnosed vision threatening diseases like Glaucoma at higher level with prompt management.</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed text-lg flex items-start gap-2">
                      <span className="text-[#0B3C5D] font-bold mt-1">•</span>
                      <span>Screening of asymptomatic vision disorders with trained non-medical personnel and community health workers.</span>
                    </li>
                    <li className="text-gray-700 leading-relaxed text-lg flex items-start gap-2">
                      <span className="text-[#0B3C5D] font-bold mt-1">•</span>
                      <span>Co-ordinating care with primary care physicians for patients with special needs.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Committee Members Section */}
        <section className="py-16 bg-white">
          <div className="section-enter">
            <h2 className="p-4 mx-4 bg-[#0B3C5D] text-white text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
              Executive Committee Members
            </h2>
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-12"></div>

              {committeeMembers.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {committeeMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow section-enter"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative mb-4">
                        <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-blue-300 bg-white shadow-md">
                          {member.image_url ? (
                            <img
                              src={member.image_url}
                              alt={member.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fallback = e.currentTarget.parentElement?.querySelector('.fallback-avatar');
                                if (fallback) (fallback as HTMLElement).style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`fallback-avatar h-full w-full flex items-center justify-center bg-blue-50 text-blue-600 ${member.image_url ? 'hidden' : ''}`}>
                            <span className="text-xl font-bold">
                              {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2 leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-xs text-blue-600 font-semibold">
                        {member.profession}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p>No committee members found</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
