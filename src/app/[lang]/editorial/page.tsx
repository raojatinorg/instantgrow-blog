import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-playfair font-bold mb-4 text-foreground">Editorial Policy</h1>
      <p className="text-muted-foreground mb-8">Our commitment to quality, accuracy, and transparency</p>

      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Our Editorial Mission</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              At InstantGrow.shop, we are committed to providing high-quality, accurate, and valuable 
              content that helps businesses grow their online presence. Our editorial policy ensures 
              that all content meets the highest standards of quality, accuracy, and integrity.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Content Standards</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <h3 className="font-bold text-lg mb-3">Accuracy & Research</h3>
            <p className="mb-4">
              All content published on InstantGrow.shop is thoroughly researched and fact-checked. 
              We cite credible sources and ensure that technical information is accurate and up-to-date.
            </p>

            <h3 className="font-bold text-lg mb-3">Originality</h3>
            <p className="mb-4">
              We create original content based on our expertise and experience. While we may reference 
              industry best practices and standards, all articles are written in our own words and 
              provide unique insights.
            </p>

            <h3 className="font-bold text-lg mb-3">Practical Value</h3>
            <p className="mb-4">
              Our content focuses on providing actionable advice and practical solutions that readers 
              can implement immediately. We prioritize real-world applications over theoretical concepts.
            </p>

            <h3 className="font-bold text-lg mb-3">Clarity & Accessibility</h3>
            <p>
              We write in clear, accessible language that both technical and non-technical audiences 
              can understand. Complex concepts are explained with examples and step-by-step guidance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Content Creation Process</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Topic Selection:</strong> We choose topics based on industry trends, reader 
                requests, and our expertise in web development and digital marketing.
              </li>
              <li>
                <strong>Research:</strong> Thorough research is conducted using credible sources, 
                industry documentation, and our practical experience.
              </li>
              <li>
                <strong>Writing:</strong> Content is written by experienced professionals with 
                expertise in the subject matter.
              </li>
              <li>
                <strong>Review:</strong> All content undergoes editorial review for accuracy, 
                clarity, and quality before publication.
              </li>
              <li>
                <strong>Updates:</strong> We regularly review and update published content to 
                ensure it remains current and accurate.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Transparency & Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <h3 className="font-bold text-lg mb-3">Affiliate Relationships</h3>
            <p className="mb-4">
              When we recommend products or services, we may include affiliate links. These 
              relationships are always disclosed, and they do not influence our editorial decisions 
              or recommendations.
            </p>

            <h3 className="font-bold text-lg mb-3">Sponsored Content</h3>
            <p className="mb-4">
              Any sponsored or paid content is clearly labeled as such. Sponsored content meets 
              the same quality standards as our regular content and provides genuine value to readers.
            </p>

            <h3 className="font-bold text-lg mb-3">Professional Services</h3>
            <p>
              InstantGrow.shop is operated by Rao Jatin, a professional freelance web developer. 
              While we offer web development services, our editorial content is created to provide 
              value regardless of whether readers become clients.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Corrections & Updates</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              We are committed to accuracy and transparency. If we discover an error in our content:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We correct it promptly</li>
              <li>We note significant corrections at the top or bottom of the article</li>
              <li>We update the "Last Updated" date to reflect changes</li>
              <li>We maintain the integrity of the original content while ensuring accuracy</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle>Reader Feedback</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              We value reader feedback and encourage you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Report errors or inaccuracies</li>
              <li>Suggest topics for future content</li>
              <li>Share your experiences and insights</li>
              <li>Ask questions about our content</li>
            </ul>
            <p>
              Contact us at <strong>info.raojatin@gmail.com</strong> with any feedback or concerns.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle>Ethical Standards</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p className="mb-4">
              We adhere to the following ethical principles:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not plagiarize or misrepresent others' work</li>
              <li>We respect intellectual property rights</li>
              <li>We provide proper attribution when referencing external sources</li>
              <li>We maintain editorial independence from commercial interests</li>
              <li>We prioritize reader interests over commercial gain</li>
              <li>We comply with all applicable laws and regulations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle>Contact Our Editorial Team</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 prose max-w-none">
            <p>
              For questions about our editorial policy, content suggestions, or to report issues:
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
