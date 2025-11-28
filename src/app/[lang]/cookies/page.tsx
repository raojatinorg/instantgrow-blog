import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-playfair font-bold mb-4 text-foreground">Cookie Policy</h1>
      <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use our site.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>How We Use Cookies</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <h3 className="font-bold text-lg mb-3">Essential Cookies</h3>
            <p className="mb-4">
              These cookies are necessary for the website to function properly. They enable basic 
              functions like page navigation, language preferences, and access to secure areas.
            </p>

            <h3 className="font-bold text-lg mb-3">Analytics Cookies</h3>
            <p className="mb-4">
              We use analytics cookies to understand how visitors interact with our website. This 
              helps us improve our content and user experience. We may use Google Analytics or 
              similar services for this purpose.
            </p>

            <h3 className="font-bold text-lg mb-3">Advertising Cookies</h3>
            <p className="mb-4">
              These cookies are used to deliver advertisements that are relevant to you. They may 
              be set by our advertising partners (like Google AdSense) and help measure the 
              effectiveness of advertising campaigns.
            </p>

            <h3 className="font-bold text-lg mb-3">Functionality Cookies</h3>
            <p>
              These cookies allow the website to remember choices you make (such as your language 
              preference) and provide enhanced, personalized features.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Third-Party Cookies</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              We may use third-party services that set cookies on your device:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
              <li><strong>Google AdSense:</strong> To display relevant advertisements</li>
              <li><strong>Social Media Platforms:</strong> For social sharing features</li>
            </ul>
            <p className="mt-4">
              These third parties have their own privacy policies and cookie policies. We recommend 
              reviewing their policies to understand how they use cookies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Managing Cookies</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              You have the right to decide whether to accept or reject cookies. You can manage your 
              cookie preferences through your browser settings:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
            </ul>
            <p>
              Please note that blocking or deleting cookies may impact your experience on our website 
              and limit certain features.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Cookie Duration</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <h3 className="font-bold mb-2">Session Cookies</h3>
            <p className="mb-4">
              These are temporary cookies that expire when you close your browser.
            </p>

            <h3 className="font-bold mb-2">Persistent Cookies</h3>
            <p>
              These cookies remain on your device for a set period or until you delete them. They 
              help us recognize you when you return to our website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Updates to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for legal reasons. We encourage you to review this page periodically for the latest 
              information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <p className="font-semibold mt-4">
              Email: info.raojatin@gmail.com<br />
              Website: InstantGrow.shop<br />
              Location: Rewari, Haryana 123401, India
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
