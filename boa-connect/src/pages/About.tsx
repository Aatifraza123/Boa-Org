import { Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';

export default function About() {
  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);
  const [certification, setCertification] = useState<any>(null);

  useEffect(() => {
    loadCommitteeMembers();
    loadCertification();
  }, []);

  const loadCommitteeMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/committee-members?page_type=about');
      const data = await response.json();
      if (data.success) {
        setCommitteeMembers(data.members || []);
      }
    } catch (error) {
      console.error('Failed to load committee members:', error);
    }
  };

  const loadCertification = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/certification');
      const data = await response.json();
      if (data.success && data.certification) {
        setCertification(data.certification);
      }
    } catch (error) {
      console.error('Failed to load certification:', error);
    }
  };

  return (
    <Layout>

      {/* Hero - Reduced Height */}
      <section className="gradient-hero py-12">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Ophthalmic Association of Bihar
          </h1>
          <p className="text-lg text-muted-foreground">
            Dedicated to advancing eye care excellence in Bihar
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                The <strong className="text-foreground">Ophthalmic Association of Bihar (BOA)</strong> stands as a premier professional organization dedicated to advancing the field of ophthalmology and eye care across Bihar state. Established with a vision to promote excellence in ophthalmic practice, education, and research, BOA has been serving the ophthalmology community and the people of Bihar for decades.
              </p>

              <p className="leading-relaxed">
                As a registered society under the <strong className="text-foreground">Societies Registration Act 21, 1860</strong> (Registration No: S000403, Certificate No: S22104), BOA operates with full legal recognition and governmental approval. Our registered office is located at Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad, Patna - 800002, Bihar.
              </p>


              <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">What We Do?</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Professional Development & Education</h4>
                  <p className="leading-relaxed">
                    BOA organizes regular Continuing Medical Education (CME) programs, workshops, conferences, and seminars featuring renowned national and international faculty. These programs keep our members updated with the latest advancements in ophthalmic science, surgical techniques, and patient care protocols.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Community Outreach & Public Health</h4>
                  <p className="leading-relaxed">
                    We actively conduct free eye screening camps, awareness programs, and preventive eye care initiatives across Bihar, particularly in underserved rural areas. Our members volunteer their expertise to identify and treat preventable blindness, making quality eye care accessible to all socio-economic sections of society.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Research & Innovation</h4>
                  <p className="leading-relaxed">
                    BOA encourages and supports clinical research, case studies, and innovative practices in ophthalmology. We provide a platform for members to present their research findings, share clinical experiences, and contribute to the advancement of ophthalmic knowledge in Eastern India.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Professional Networking</h4>
                  <p className="leading-relaxed">
                    Our association serves as a vital networking platform connecting ophthalmologists, optometrists, and eye care professionals across Bihar. This network facilitates knowledge sharing, collaborative patient care, referrals, and professional support among members.
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 my-8">
                <h3 className="text-xl font-bold text-foreground mb-3">Our Commitment</h3>
                <p className="leading-relaxed mb-0">
                  BOA is committed to maintaining the highest standards of professional ethics, promoting evidence-based ophthalmic practice, and working towards the elimination of preventable blindness in Bihar. We strive to be the voice of ophthalmologists in the state, advocating for better eye care infrastructure, policies, and resources.
                </p>
              </div>

              <p className="leading-relaxed">
                Through our collective efforts, BOA continues to play a pivotal role in shaping the future of eye care in Bihar, ensuring that every citizen has access to quality ophthalmic services and that our members remain at the forefront of their profession.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Recognition */}
      {certification && (
        <section className="py-20 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-6">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Official Government Recognition
                </h2>
                <p className="text-lg text-muted-foreground">
                  {certification.registration_act}
                </p>
              </div>

{certification.certificate_image_url && (
                  <div className="border-t border-border pt-8">
                    <p className="text-sm text-muted-foreground mb-4 text-center">Official Government Certificate</p>
                    <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30 p-4 max-w-2xl mx-auto">
                      <img 
                        src={certification.certificate_image_url} 
                        alt="Government Registration Certificate"
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      This certificate validates our legal status as a registered society under the Government of Bihar
                    </p>
                  </div>
                )}
              <div className="bg-background rounded-2xl border-2 border-primary/20 p-8 shadow-elevated">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Organization Name</p>
                      <p className="font-semibold text-foreground">{certification.organization_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Registration Number</p>
                      <p className="font-semibold text-primary">{certification.registration_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Certificate Number</p>
                      <p className="font-semibold text-primary">{certification.certificate_number}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Registration Act</p>
                      <p className="font-semibold text-foreground">{certification.registration_act}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Registration Date</p>
                      <p className="font-semibold text-foreground">
                        {new Date(certification.registration_date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Registered Office</p>
                      <p className="font-semibold text-foreground">{certification.registered_office}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Committee Members */}
      {committeeMembers.length > 0 && (
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              Committee Members
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Meet our dedicated executive committee
            </p>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center max-w-6xl">
                {committeeMembers.map((member) => (
                  <div key={member.id} className="text-center">
                    {member.image_url ? (
                      <img 
                        src={member.image_url} 
                        alt={member.name}
                        className="h-24 w-24 rounded-full mx-auto mb-3 object-cover border-2 border-primary/20 shadow-md"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`h-24 w-24 rounded-full gradient-primary mx-auto mb-3 flex items-center justify-center text-xl font-bold text-primary-foreground shadow-md ${member.image_url ? 'hidden' : ''}`}>
                      {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 px-2">{member.name}</h3>
                    <p className="text-primary font-medium text-xs">{member.profession}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      
    </Layout>
  );
}
