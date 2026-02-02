import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">Terms of Service</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Welcome to BOA Connect, the official platform of Ophthalmic Association Of Bihar ("BOA", "we", "us", or "our"). 
              By accessing or using our platform, you agree to be bound by these Terms of Service ("Terms"). 
              If you do not agree to these Terms, please do not use our platform.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last Updated: January 12, 2026
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Use of Platform</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Eligibility</h3>
              <p className="text-sm text-muted-foreground">
                You must be at least 18 years old and a medical professional or authorized representative 
                to use this platform. By using BOA Connect, you represent and warrant that you meet these requirements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Account Registration</h3>
              <p className="text-sm text-muted-foreground mb-2">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as necessary</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Prohibited Activities</h3>
              <p className="text-sm text-muted-foreground mb-2">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Use the platform for any illegal purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the platform's operation</li>
                <li>Attempt to gain unauthorized access to any part of the platform</li>
                <li>Upload viruses or malicious code</li>
                <li>Collect or harvest information about other users</li>
                <li>Use automated systems to access the platform without permission</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Seminar Registration and Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Registration</h3>
              <p className="text-sm text-muted-foreground">
                When you register for a seminar or conference through our platform, you agree to provide 
                accurate information and pay all applicable fees. Registration is subject to availability 
                and acceptance by BOA.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Payment Terms</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>All fees are in Indian Rupees (INR) unless otherwise stated</li>
                <li>Payment must be made at the time of registration</li>
                <li>We accept payment through authorized payment gateways</li>
                <li>You are responsible for any bank charges or transaction fees</li>
                <li>Prices are subject to change without notice</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cancellation and Refund Policy</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Cancellations made 30+ days before the event: 80% refund</li>
                <li>Cancellations made 15-29 days before: 50% refund</li>
                <li>Cancellations made less than 15 days before: No refund</li>
                <li>BOA reserves the right to cancel or postpone events</li>
                <li>In case of event cancellation by BOA, full refund will be provided</li>
                <li>Refunds will be processed within 14-21 business days</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              All content on the BOA Connect platform, including text, graphics, logos, images, and software, 
              is the property of Ophthalmic Association Of Bihar or its licensors and is protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
            <p className="text-sm text-muted-foreground">
              You may not reproduce, distribute, modify, or create derivative works from any content without 
              our express written permission.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              If you submit any content to the platform (reviews, comments, feedback), you grant BOA a 
              non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content.
            </p>
            <p className="text-sm text-muted-foreground">
              You represent that you own or have the necessary rights to any content you submit and that 
              such content does not violate any third-party rights.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the platform will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy or reliability of information</li>
              <li>Warranties that defects will be corrected</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BOA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>Your use or inability to use the platform</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any interruption or cessation of transmission</li>
              <li>Any bugs, viruses, or malicious code transmitted through the platform</li>
              <li>Any errors or omissions in content</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Indemnification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You agree to indemnify, defend, and hold harmless BOA, its officers, directors, employees, and 
              agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorney's 
              fees, arising out of or in any way connected with your access to or use of the platform, your 
              violation of these Terms, or your violation of any rights of another.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Governing Law and Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of India, 
              without regard to its conflict of law provisions.
            </p>
            <p className="text-sm text-muted-foreground">
              Any disputes arising out of or relating to these Terms or the platform shall be subject 
              to the exclusive jurisdiction of the courts in Patna, Bihar, India.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify you of any changes 
              by posting the new Terms on this page and updating the "Last Updated" date. Your continued 
              use of the platform after changes constitutes acceptance of the modified Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may terminate or suspend your account and access to the platform immediately, without 
              prior notice or liability, for any reason, including if you breach these Terms. Upon 
              termination, your right to use the platform will immediately cease.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Ophthalmic Association Of Bihar</strong></p>
              <p>Email: info@boabihar.org</p>
              <p>Phone: +91 612 2234567</p>
              <p>Address: Patna, Bihar, India</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TermsOfService;
