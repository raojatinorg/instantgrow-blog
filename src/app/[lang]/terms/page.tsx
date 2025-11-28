import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-playfair font-bold mb-4 text-foreground">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              By accessing and using InstantGrow.shop ("the Website"), you accept and agree to be bound by 
              these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
            <p className="mt-4">
              These terms apply to all visitors, users, and others who access or use the Website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Use License & Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <h3 className="font-bold mb-2">Content License</h3>
            <p className="mb-4">
              Permission is granted to temporarily view, download, and print content from the Website for 
              personal, non-commercial use only. This license does not include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Modifying or copying the materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Removing copyright or proprietary notations</li>
              <li>Transferring materials to another person</li>
              <li>Reproducing, duplicating, or mirroring content</li>
            </ul>
            <p>
              All content, including text, images, graphics, logos, and code, is the property of 
              Rao Jatin Freelancer and protected by copyright laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>User Conduct</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Website</li>
              <li>Interfere with or disrupt the Website or servers</li>
              <li>Transmit viruses, malware, or harmful code</li>
              <li>Collect or harvest personal information of other users</li>
              <li>Impersonate any person or entity</li>
              <li>Post spam, advertisements, or promotional content without permission</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Services & Professional Engagement</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              InstantGrow.shop offers web development and digital marketing services. When you engage our 
              services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service terms will be outlined in a separate agreement</li>
              <li>Payment terms and project scope will be clearly defined</li>
              <li>Deliverables and timelines will be mutually agreed upon</li>
              <li>Intellectual property rights will be specified in the service agreement</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              The Website and its content are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, 
              either express or implied, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the Website will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy or reliability of content</li>
              <li>Warranties that defects will be corrected</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              To the fullest extent permitted by law, Rao Jatin Freelancer and InstantGrow.shop shall not 
              be liable for any:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from use or inability to use the Website</li>
              <li>Damages resulting from unauthorized access to your data</li>
              <li>Damages from errors, mistakes, or inaccuracies in content</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Third-Party Links & Content</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              The Website may contain links to third-party websites or services. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The content, privacy policies, or practices of third-party sites</li>
              <li>Any damages or losses caused by third-party services</li>
              <li>The accuracy or reliability of third-party information</li>
            </ul>
            <p className="mt-4">
              We recommend reviewing the terms and privacy policies of any third-party sites you visit.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>User-Generated Content</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              If you submit comments, feedback, or other content to the Website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You grant us a non-exclusive, royalty-free license to use, modify, and display the content</li>
              <li>You represent that you own or have rights to the content</li>
              <li>You agree that the content does not violate any laws or third-party rights</li>
              <li>We reserve the right to remove any content at our discretion</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              You agree to indemnify and hold harmless Rao Jatin Freelancer, InstantGrow.shop, and its 
              affiliates from any claims, damages, losses, liabilities, and expenses arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Your use of the Website</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your user-generated content</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              We reserve the right to terminate or suspend your access to the Website immediately, without 
              prior notice, for any reason, including breach of these Terms. Upon termination, your right 
              to use the Website will cease immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any 
              disputes arising from these Terms or use of the Website shall be subject to the exclusive 
              jurisdiction of the courts in Rewari, Haryana, India.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately 
              upon posting to the Website. Your continued use of the Website after changes constitutes 
              acceptance of the modified Terms.
            </p>
            <p>
              We encourage you to review these Terms periodically for updates.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <p className="font-semibold">
              <strong>Rao Jatin Freelancer</strong><br />
              Email: info.raojatin@gmail.com<br />
              Website: InstantGrow.shop<br />
              Address: Rewari, Haryana 123401, India
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
