import { Award, Target, Eye, Users, FileText, Building, Scale, BookOpen, Activity, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';

export default function About() {
  const [certification, setCertification] = useState<any>(null);
  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);

  useEffect(() => {
    loadCertification();
    loadCommitteeMembers();
  }, []);

  const loadCertification = async () => {
    try {
      const response = await fetch('/api/certification');
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
      const response = await fetch('/api/committee-members?page_type=about');
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
      <div className="page-enter">
        {/* Header Section */}
        <section className="bg-white border-b border-gray-200 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center gov-fade-in">
              <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                About Bihar Ophthalmic Association
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                A Government-recognized medical association serving the ophthalmology community of Bihar since 1975
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="section-enter">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Introduction
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Bihar Ophthalmic Association (BOA) was established in 1975 as a professional medical association 
                  to serve the ophthalmology community across the state of Bihar. Operating under the jurisdiction of 
                  the Government of Bihar, BOA functions as the official representative body for ophthalmologists and 
                  eye care professionals in the region.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The association serves all 38 districts of Bihar, providing professional development opportunities, 
                  continuing medical education, and advocacy for improved eye care services throughout the state. 
                  BOA operates in accordance with medical ethics and professional standards as prescribed by the 
                  Medical Council of India and relevant regulatory authorities.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  As a registered society under the Societies Registration Act, 1860, BOA maintains transparency 
                  in its operations and adheres to all statutory requirements for professional medical associations 
                  in India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="section-enter">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                      Vision
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    To establish Bihar as a leading state in comprehensive eye care services through professional 
                    excellence, continuous education, and evidence-based medical practice, ensuring accessible 
                    and quality ophthalmological care for all citizens.
                  </p>
                </div>
              </div>

              <div className="section-enter animate-delay-100">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                      Mission
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    To advance the science and practice of ophthalmology through professional development, 
                    research promotion, ethical practice advocacy, and collaborative efforts to eliminate 
                    preventable blindness in Bihar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="section-enter">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Objectives & Aims
              </h2>
              <div className="grid gap-4">
                {[
                  "Promote professional development and continuing medical education among ophthalmologists",
                  "Facilitate scientific research and evidence-based practice in eye care",
                  "Advocate for improved eye care infrastructure and services across Bihar",
                  "Establish and maintain professional standards and ethical practices",
                  "Organize conferences, seminars, and workshops for knowledge dissemination",
                  "Collaborate with government agencies for public health initiatives",
                  "Support community outreach programs for preventable blindness elimination",
                  "Foster inter-professional cooperation and networking among eye care professionals"
                ].map((objective, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legal Status & Registration */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="section-enter">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                  Legal Status & Registration Details
                </h2>
                <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200 section-enter">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Legal Framework</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <span className="font-semibold text-gray-900 block mb-1">Registration Act:</span>
                      <span className="text-gray-700">Societies Registration Act, 1860</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <span className="font-semibold text-gray-900 block mb-1">Registration Number:</span>
                      <span className="text-gray-700">{certification?.registration_number || 'S000403'}</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <span className="font-semibold text-gray-900 block mb-1">Established:</span>
                      <span className="text-gray-700">1975</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200 section-enter animate-delay-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Registered Office</h3>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-green-200">
                    <div className="text-gray-700 leading-relaxed space-y-2">
                      <p className="font-medium">{certification?.registered_office || 'Ved Vani, East Shivpuri'}</p>
                      <p>Chitkohara Bypass Road</p>
                      <p>Patna, Bihar 800002</p>
                      <p className="font-semibold text-gray-900 pt-2 border-t border-green-200">India</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200 section-enter animate-delay-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Jurisdiction</h3>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-purple-200">
                    <div className="text-gray-700 leading-relaxed space-y-3">
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">Coverage Area:</span>
                        <span>All 38 districts of Bihar</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">Authority:</span>
                        <span>Government of Bihar</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 block mb-1">Recognition:</span>
                        <span>Medical Council of India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organizational Structure */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="section-enter">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Organizational Structure
              </h2>
              
              <div className="grid gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Governing Body</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Executive Committee</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• President</li>
                        <li>• Vice President</li>
                        <li>• Secretary</li>
                        <li>• Treasurer</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Advisory Board</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Senior Consultants</li>
                        <li>• Subject Experts</li>
                        <li>• Regional Representatives</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Committees</h4>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Scientific Committee</li>
                        <li>• Ethics Committee</li>
                        <li>• CME Committee</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Categories</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Regular Members</h4>
                      <p className="text-gray-700">Qualified ophthalmologists practicing in Bihar</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Associate Members</h4>
                      <p className="text-gray-700">Eye care professionals and residents</p>
                    </div>
                  </div>
                </div>

                {/* Executive Committee Members */}
                {committeeMembers.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Executive Committee Members</h3>
                    
                    {/* Desktop Layout - Hierarchical Structure */}
                    <div className="hidden lg:block">
                      {/* Top Row - Key Positions */}
                      <div className="flex justify-center mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
                          {committeeMembers.slice(0, 3).map((member, index) => (
                            <div 
                              key={member.id} 
                              className="flex flex-col items-center text-center section-enter"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <div className="relative mb-4">
                                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-blue-300 bg-white shadow-lg gov-transition hover:shadow-xl">
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
                                    <span className="text-lg font-bold">
                                      {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <h4 className="font-bold text-gray-900 text-base mb-2 leading-tight">
                                {member.name}
                              </h4>
                              <p className="text-sm text-blue-600 font-semibold mb-1">
                                {member.profession}
                              </p>
                              <div className="h-1 w-12 bg-blue-200 rounded-full"></div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Middle Section - Two Columns */}
                      {committeeMembers.length > 3 && (
                        <div className="grid grid-cols-2 gap-12 mb-8">
                          {/* Left Column */}
                          <div className="space-y-4">
                            {committeeMembers.slice(3, Math.ceil((committeeMembers.length - 3) / 2) + 3).map((member, index) => (
                              <div 
                                key={member.id} 
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 section-enter"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                              >
                                <div className="h-16 w-16 rounded-full overflow-hidden border-3 border-blue-200 bg-white shadow-sm flex-shrink-0">
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
                                    <span className="text-sm font-bold">
                                      {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                    {member.name}
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    {member.profession}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4">
                            {committeeMembers.slice(Math.ceil((committeeMembers.length - 3) / 2) + 3).map((member, index) => (
                              <div 
                                key={member.id} 
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 section-enter"
                                style={{ animationDelay: `${(index + Math.ceil((committeeMembers.length - 3) / 2) + 3) * 100}ms` }}
                              >
                                <div className="h-16 w-16 rounded-full overflow-hidden border-3 border-blue-200 bg-white shadow-sm flex-shrink-0">
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
                                    <span className="text-sm font-bold">
                                      {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                    {member.name}
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    {member.profession}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mobile/Tablet Layout - Simple Grid */}
                    <div className="lg:hidden">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {committeeMembers.map((member, index) => (
                          <div 
                            key={member.id} 
                            className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg border border-gray-200 section-enter"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="relative mb-3">
                              <div className="h-16 w-16 rounded-full overflow-hidden border-3 border-blue-200 bg-white shadow-sm">
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
                                  <span className="text-sm font-bold">
                                    {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-xs mb-1 leading-tight">
                              {member.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {member.profession}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Activities & Scope */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="section-enter">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Activities & Scope of Work
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Professional Development</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Continuing Medical Education (CME) programs</li>
                        <li>• Scientific conferences and seminars</li>
                        <li>• Skill development workshops</li>
                        <li>• Research publication support</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Community Service</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Free eye screening camps</li>
                        <li>• Public awareness programs</li>
                        <li>• School eye health initiatives</li>
                        <li>• Rural outreach programs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Activity className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Professional Standards</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Ethics and conduct guidelines</li>
                        <li>• Quality assurance programs</li>
                        <li>• Professional certification</li>
                        <li>• Peer review processes</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Recognition Programs</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Excellence awards</li>
                        <li>• Research grants</li>
                        <li>• Young ophthalmologist programs</li>
                        <li>• Lifetime achievement recognition</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency & Documents */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="section-enter">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                Transparency & Official Documents
              </h2>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  In accordance with transparency requirements for registered societies, BOA maintains 
                  public access to key organizational documents and information.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "Constitution & Bylaws", status: "Available" },
                    { name: "Annual Reports", status: "Available" },
                    { name: "Financial Statements", status: "Available" },
                    { name: "Registration Certificate", status: "Available" },
                    { name: "Committee Structure", status: "Available" },
                    { name: "Membership Guidelines", status: "Available" }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-600 font-medium">{doc.status}</span>
                        <Download className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> For access to official documents or information requests, 
                    please contact the association office during business hours or submit a formal 
                    request through the contact channels provided.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Recognition */}
        {certification && (
          <section className="py-12 bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="section-enter">
                <div className="text-center bg-gray-50 p-8 rounded-lg border border-gray-200">
                  <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Government Recognition
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Officially registered and recognized by the Government of Bihar
                  </p>
                  <div className="inline-block bg-white p-4 rounded border border-gray-200">
                    <p className="text-sm text-gray-700">
                      <strong>Registration Number:</strong> {certification.registration_number}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Under:</strong> Societies Registration Act, 1860
                    </p>
                  </div>
                  {certification.certificate_image_url && (
                    <div className="mt-4">
                      <a 
                        href={certification.certificate_image_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="gov-button inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        View Registration Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
