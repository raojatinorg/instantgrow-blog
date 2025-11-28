import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-playfair font-bold mb-4 text-foreground">Disclaimer</h1>
      <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>General Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              The information provided by InstantGrow.shop ("we," "us," or "our") on this website is for 
              general informational and educational purposes only. All information is provided in good faith; 
              however, we make no representation or warranty of any kind, express or implied, regarding the 
              accuracy, adequacy, validity, reliability, availability, or completeness of any information on 
              the Website.
            </p>
            <p className="mt-4">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind 
              incurred as a result of the use of the Website or reliance on any information provided. Your 
              use of the Website and reliance on any information is solely at your own risk.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Professional Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              The Website provides general information about web development, SEO, digital marketing, and 
              business growth strategies. This information is not professional advice and should not be 
              treated as such.
            </p>
            <p className="mb-4">
              The content is provided for informational and educational purposes only and is not a substitute 
              for professional consultation. Before making any business decisions or implementing strategies 
              discussed on this Website, we strongly encourage you to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consult with qualified professionals in the relevant field</li>
              <li>Conduct your own research and due diligence</li>
              <li>Consider your specific circumstances and requirements</li>
              <li>Seek legal, financial, or technical advice as appropriate</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>No Guarantees or Results</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              While we strive to provide accurate and helpful information, we make no guarantees about:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The results you may achieve by following our advice or strategies</li>
              <li>The success of any web development or marketing techniques discussed</li>
              <li>Specific outcomes from implementing our recommendations</li>
              <li>Rankings, traffic, or revenue improvements</li>
            </ul>
            <p className="mt-4">
              Results vary based on numerous factors including effort, resources, market conditions, and 
              individual circumstances. Past performance or examples do not guarantee future results.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Affiliate & Advertising Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              InstantGrow.shop may contain affiliate links and advertisements. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>We may earn a commission if you click on affiliate links and make a purchase</li>
              <li>Commissions are earned at no additional cost to you</li>
              <li>We only recommend products and services we believe provide value</li>
              <li>Affiliate relationships do not influence our editorial content</li>
              <li>All affiliate relationships are disclosed where applicable</li>
            </ul>
            <p>
              We participate in the Google AdSense program, which may display third-party advertisements. 
              We are not responsible for the content of these advertisements or the practices of advertisers.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Testimonials & Case Studies</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              The Website may contain testimonials, case studies, or examples of work. Please note:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Testimonials reflect real experiences but individual results may vary</li>
              <li>Results shown are not typical and should not be expected by all users</li>
              <li>Success depends on many factors beyond our control</li>
              <li>We cannot guarantee you will achieve similar results</li>
              <li>Examples are provided for illustrative purposes only</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Technical Information Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              Technical information, code snippets, and implementation guides are provided as-is. We are 
              not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Errors or bugs in code examples</li>
              <li>Compatibility issues with your specific environment</li>
              <li>Security vulnerabilities in suggested implementations</li>
              <li>Data loss or system damage from following our guides</li>
              <li>Changes in third-party platforms or technologies</li>
            </ul>
            <p className="mt-4">
              Always test code in a safe environment and maintain backups before implementing changes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>External Links Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              The Website may contain links to external websites. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The content, accuracy, or opinions expressed on external sites</li>
              <li>Privacy practices of third-party websites</li>
              <li>Products or services offered by external sites</li>
              <li>Any damages or losses from using external websites</li>
            </ul>
            <p className="mt-4">
              Links are provided for convenience only and do not constitute endorsement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Errors & Omissions</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              While we make every effort to ensure information accuracy, the Website may contain technical, 
              typographical, or factual errors. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Correct errors or inaccuracies at any time</li>
              <li>Update or modify content without notice</li>
              <li>Remove content at our discretion</li>
            </ul>
            <p className="mt-4">
              We are not liable for any errors, omissions, or outdated information on the Website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>SEO & Rankings Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              Information about SEO strategies and search engine optimization is based on current best 
              practices and our experience. However:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Search engine algorithms change frequently</li>
              <li>We cannot guarantee specific rankings or traffic increases</li>
              <li>SEO results take time and vary by industry and competition</li>
              <li>Strategies that work today may not work in the future</li>
              <li>We are not affiliated with Google or other search engines</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Fair Use & Copyright</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              This Website may contain copyrighted material, trademarks, or intellectual property of third 
              parties. Such use is intended for educational, commentary, or illustrative purposes and may 
              constitute fair use under applicable copyright laws.
            </p>
            <p className="mt-4">
              If you believe any content infringes your copyright, please contact us immediately at 
              <strong> info.raojatin@gmail.com</strong> with details of the alleged infringement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Changes to This Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              We reserve the right to modify this Disclaimer at any time. Changes will be effective 
              immediately upon posting. Your continued use of the Website after changes constitutes 
              acceptance of the modified Disclaimer.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              If you have questions or concerns about this Disclaimer, please contact us:
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
