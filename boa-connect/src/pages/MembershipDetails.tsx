import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { userAPI } from '@/lib/api';
import { Download, Calendar, CreditCard, User, Mail, Phone, MapPin, Award, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

// Helper function to format title consistently
const formatTitle = (title: string) => {
  const titleMap: { [key: string]: string } = {
    'dr': 'Dr.',
    'mr': 'Mr.',
    'mrs': 'Mrs.',
    'ms': 'Ms.',
    'prof': 'Prof.'
  };
  return titleMap[title?.toLowerCase()] || title || '';
};

export default function MembershipDetails() {
  const { toast } = useToast();
  const [membershipData, setMembershipData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMembershipDetails();
  }, []);

  const loadMembershipDetails = async () => {
    try {
      const response = await userAPI.getMembershipDetails();
      setMembershipData(response.membership);
    } catch (error: any) {
      console.error('Failed to load membership details:', error);
      toast({
        title: 'Error',
        description: 'Failed to load membership details',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMembershipCard = () => {
    if (!membershipData) return;

    const doc = new jsPDF();
    
    // Header with BOA branding
    doc.setFillColor(11, 60, 93); // #0B3C5D
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Ophthalmic Association Of Bihar', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Membership Certificate', 105, 25, { align: 'center' });
    doc.text('Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad, Patna - 800002', 105, 32, { align: 'center' });
    
    // Membership Card Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('MEMBERSHIP CARD', 105, 55, { align: 'center' });
    
    // Member Details
    let y = 75;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const memberDetails = [
      ['Membership Number:', membershipData.membership_no || 'Not Assigned'],
      ['Name:', `${formatTitle(membershipData.title)} ${membershipData.first_name} ${membershipData.surname}`],
      ['Email:', membershipData.email],
      ['Mobile:', membershipData.mobile],
      ['Membership Type:', membershipData.membership_type || 'Standard'],
      ['Status:', membershipData.status || 'Active'],
      ['Valid From:', membershipData.valid_from ? new Date(membershipData.valid_from).toLocaleDateString() : 'N/A'],
      ['Valid Until:', membershipData.valid_until ? new Date(membershipData.valid_until).toLocaleDateString() : 'Lifetime'],
      ['Registration Date:', new Date(membershipData.created_at).toLocaleDateString()]
    ];

    // Add payment information if available
    if (membershipData.payment_status) {
      memberDetails.push(['Payment Status:', membershipData.payment_status]);
      if (membershipData.amount) {
        memberDetails.push(['Amount Paid:', `₹${parseFloat(membershipData.amount).toLocaleString()}`]);
      }
      if (membershipData.transaction_id) {
        memberDetails.push(['Transaction ID:', membershipData.transaction_id]);
      }
      if (membershipData.payment_date) {
        memberDetails.push(['Payment Date:', new Date(membershipData.payment_date).toLocaleDateString()]);
      }
    }

    // Add qualification information if available
    if (membershipData.qualification) {
      memberDetails.push(['Qualification:', membershipData.qualification]);
    }
    if (membershipData.year_passing) {
      memberDetails.push(['Year of Passing:', membershipData.year_passing]);
    }
    if (membershipData.institution) {
      memberDetails.push(['Institution:', membershipData.institution]);
    }
    if (membershipData.working_place) {
      memberDetails.push(['Working Place:', membershipData.working_place]);
    }
    
    memberDetails.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(value), 70, y);
      y += 8;
    });
    
    // Benefits Section
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Membership Benefits:', 20, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const benefits = [
      '• Access to all BOA seminars and conferences',
      '• Discounted registration fees for events',
      '• CME credit points for professional development',
      '• Access to BOA digital library and resources',
      '• Networking opportunities with fellow ophthalmologists',
      '• Priority booking for workshops and training programs'
    ];
    
    benefits.forEach(benefit => {
      doc.text(benefit, 25, y);
      y += 6;
    });
    
    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(128, 128, 128);
    doc.text('This is a computer-generated membership card. No signature required.', 105, pageHeight - 15, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, pageHeight - 10, { align: 'center' });
    
    // Save PDF
    doc.save(`BOA_Membership_Card_${membershipData.membership_no || 'Pending'}.pdf`);
    
    toast({
      title: 'Membership Card Downloaded',
      description: 'Your membership card has been saved as PDF',
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!membershipData) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No Membership Found</h2>
            <p className="text-muted-foreground mb-4">
              You don't have an active membership yet. Apply for membership to access exclusive benefits.
            </p>
            <Button onClick={() => window.location.href = '/membership'}>
              Apply for Membership
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] py-12 px-4 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <Badge className="gradient-gold text-secondary-foreground border-0 px-4 py-2 text-sm font-medium">
                <Award className="mr-2 h-4 w-4" />
                BOA Member
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              My Membership
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              View your BOA membership details and benefits
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Membership Card */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-primary shadow-xl">
                <CardHeader className="gradient-primary text-white">
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="flex items-center text-white">
                      <Award className="mr-3 h-6 w-6 text-white" />
                      <span className="text-white font-semibold">Membership Card</span>
                    </span>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={generateMembershipCard}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Membership Number */}
                    <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20 shadow-sm">
                      <div className="text-sm font-medium text-muted-foreground mb-2">Membership Number</div>
                      <div className="text-3xl font-bold text-primary mb-1">
                        {membershipData.membership_no || (
                          <span className="text-orange-600">Pending Assignment</span>
                        )}
                      </div>
                      {membershipData.membership_no && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Official BOA Member ID
                        </div>
                      )}
                    </div>

                    {/* Personal Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Full Name</div>
                            <div className="font-semibold text-foreground">
                              {formatTitle(membershipData.title)} {membershipData.first_name} {membershipData.surname}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Email</div>
                            <div className="font-semibold text-foreground break-all">{membershipData.email}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Mobile</div>
                            <div className="font-semibold text-foreground">{membershipData.mobile}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Membership Type</div>
                            <div className="font-semibold text-foreground capitalize">{membershipData.membership_type || 'Standard'}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Member Since</div>
                            <div className="font-semibold text-foreground">
                              {new Date(membershipData.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                            <Badge className={`${
                              membershipData.status === 'active' ? 'bg-green-100 text-green-800' :
                              membershipData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {membershipData.status || 'Active'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    {membershipData.payment_status && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-semibold mb-3 text-green-900">Payment Information</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-4 w-4 text-green-600" />
                            <div>
                              <div className="text-green-700 font-medium">Payment Status</div>
                              <Badge className={`${
                                membershipData.payment_status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' :
                                membershipData.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                'bg-gray-100 text-gray-800 border-gray-200'
                              }`}>
                                {membershipData.payment_status}
                              </Badge>
                            </div>
                          </div>
                          
                          {membershipData.amount && (
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-4 w-4 text-green-600" />
                              <div>
                                <div className="text-green-700 font-medium">Amount Paid</div>
                                <div className="text-green-900 font-semibold">₹{parseFloat(membershipData.amount).toLocaleString()}</div>
                              </div>
                            </div>
                          )}
                          
                          {membershipData.payment_method && (
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-4 w-4 text-green-600" />
                              <div>
                                <div className="text-green-700 font-medium">Payment Method</div>
                                <div className="text-green-900 capitalize">{membershipData.payment_method}</div>
                              </div>
                            </div>
                          )}
                          
                          {membershipData.transaction_id && (
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-4 w-4 text-green-600" />
                              <div>
                                <div className="text-green-700 font-medium">Transaction ID</div>
                                <div className="text-green-900 font-mono text-xs">{membershipData.transaction_id}</div>
                              </div>
                            </div>
                          )}
                          
                          {membershipData.payment_date && (
                            <div className="flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-green-600" />
                              <div>
                                <div className="text-green-700 font-medium">Payment Date</div>
                                <div className="text-green-900">{new Date(membershipData.payment_date).toLocaleDateString()}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Qualification Information */}
                    {(membershipData.qualification || membershipData.year_passing || membershipData.institution || membershipData.working_place) && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold mb-3 text-blue-900">Professional Information</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          {membershipData.qualification && (
                            <div>
                              <div className="text-blue-700 font-medium">Qualification</div>
                              <div className="text-blue-900">{membershipData.qualification}</div>
                            </div>
                          )}
                          
                          {membershipData.year_passing && (
                            <div>
                              <div className="text-blue-700 font-medium">Year of Passing</div>
                              <div className="text-blue-900">{membershipData.year_passing}</div>
                            </div>
                          )}
                          
                          {membershipData.institution && (
                            <div>
                              <div className="text-blue-700 font-medium">Institution</div>
                              <div className="text-blue-900">{membershipData.institution}</div>
                            </div>
                          )}
                          
                          {membershipData.working_place && (
                            <div>
                              <div className="text-blue-700 font-medium">Working Place</div>
                              <div className="text-blue-900">{membershipData.working_place}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Validity */}
                    {(membershipData.valid_from || membershipData.valid_until) && (
                      <div className="p-4 bg-accent/30 rounded-lg">
                        <h3 className="font-semibold mb-2">Membership Validity</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Valid From:</span>
                            <span className="ml-2 font-medium">
                              {membershipData.valid_from ? new Date(membershipData.valid_from).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Valid Until:</span>
                            <span className="ml-2 font-medium">
                              {membershipData.valid_until ? new Date(membershipData.valid_until).toLocaleDateString() : 'Lifetime'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Admin Notice */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Membership Information</h4>
                          <p className="text-sm text-blue-700">
                            Your membership number, type, and status are managed by BOA administrators. 
                            For any changes or queries regarding your membership, please contact the BOA office.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Benefits & Actions */}
            <div className="space-y-8">
              {/* Membership Benefits */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Membership Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Event Access</div>
                      <div className="text-muted-foreground">Priority access to all BOA seminars and conferences</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Discounted Fees</div>
                      <div className="text-muted-foreground">Special member rates for all events</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">CME Credits</div>
                      <div className="text-muted-foreground">Earn continuing medical education points</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Digital Resources</div>
                      <div className="text-muted-foreground">Access to BOA digital library and materials</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Networking</div>
                      <div className="text-muted-foreground">Connect with fellow ophthalmologists</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full gradient-primary h-12 text-base font-medium" 
                    onClick={generateMembershipCard}
                  >
                    <Download className="mr-3 h-5 w-5" />
                    Download Membership Card
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium"
                    onClick={() => window.location.href = '/seminars'}
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    View Upcoming Events
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    <User className="mr-3 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center mx-auto mb-3">
                      <Phone className="h-6 w-6 text-orange-700" />
                    </div>
                    <div className="text-base font-semibold text-orange-800 mb-2">Need Help?</div>
                    <div className="text-sm text-orange-600 mb-4">
                      Contact BOA support for membership queries
                    </div>
                    <Button size="default" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-200 font-medium">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}