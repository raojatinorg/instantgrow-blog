import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - InstantGrow.shop | Data Protection & User Privacy',
  description: 'Read InstantGrow.shop privacy policy. Learn how we collect, use, and protect your personal information. GDPR compliant. Contact: info.raojatin@gmail.com',
  keywords: 'privacy policy, data protection, gdpr compliance, user privacy, cookie policy',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://instantgrow.shop/en/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-playfair font-bold mb-4 text-foreground">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              InstantGrow.shop ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p className="mt-4">
              <strong>Website Owner:</strong> Rao Jatin Freelancer<br />
              <strong>Contact:</strong> info.raojatin@gmail.com<br />
              <strong>Location:</strong> Rewari, Haryana 123401, India
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <h3 className="font-bold text-lg mb-3">Personal Information</h3>
            <p className="mb-4">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Fill out contact forms (name, email address, message)</li>
              <li>Subscribe to our newsletter</li>
              <li>Comment on blog posts</li>
              <li>Interact with our website features</li>
            </ul>

            <h3 className="font-bold text-lg mb-3">Automatically Collected Information</h3>
            <p className="mb-4">
              When you visit our website, we automatically collect certain information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Click patterns and navigation paths</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Delivery:</strong> To provide and maintain our website and services</li>
              <li><strong>Communication:</strong> To respond to your inquiries and send updates</li>
              <li><strong>Improvement:</strong> To analyze usage patterns and improve user experience</li>
              <li><strong>Marketing:</strong> To send newsletters and promotional content (with your consent)</li>
              <li><strong>Security:</strong> To detect and prevent fraud and security issues</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Cookies and Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your experience. For detailed 
              information about our cookie usage, please see our <a href="/en/cookies" className="text-primary font-semibold hover:underline">Cookie Policy</a>.
            </p>
            <p>
              You can control cookies through your browser settings. However, disabling cookies may affect 
              website functionality.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">We use the following third-party services:</p>
            
            <h3 className="font-bold mb-2">Google Analytics</h3>
            <p className="mb-4">
              We use Google Analytics to analyze website traffic and user behavior. Google Analytics uses 
              cookies to collect anonymous information. Learn more at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a>.
            </p>

            <h3 className="font-bold mb-2">Google AdSense</h3>
            <p className="mb-4">
              We display advertisements through Google AdSense. Google may use cookies to show relevant ads 
              based on your browsing history. You can opt out at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ad Settings</a>.
            </p>

            <h3 className="font-bold mb-2">Firebase</h3>
            <p>
              We use Firebase for hosting, authentication, and data storage. Firebase is a Google service 
              and follows Google's privacy practices.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. 
              While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at <strong>info.raojatin@gmail.com</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children. If you believe we have collected information from a child, 
              please contact us immediately.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              Your information may be transferred to and processed in countries other than India. We ensure 
              appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes 
              outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              by posting the new policy on this page with an updated "Last Updated" date. We encourage you 
              to review this policy periodically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
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
