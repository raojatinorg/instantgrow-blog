import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Rocket, Target, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - InstantGrow.shop | Professional Web Development & SEO Services',
  description: 'Learn about InstantGrow.shop and founder Rao Jatin. Professional freelance web developer offering custom website development, SEO optimization, and digital marketing services in Rewari, Haryana.',
  keywords: 'about instantgrow, rao jatin, web developer rewari, freelance web developer india, seo services haryana',
  openGraph: {
    title: 'About InstantGrow.shop - Professional Web Development Services',
    description: 'Meet Rao Jatin, founder of InstantGrow.shop. Expert in web development, SEO, and digital marketing.',
    type: 'website',
    url: 'https://instantgrow.shop/en/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About InstantGrow.shop',
    description: 'Professional web development and SEO services by Rao Jatin',
  },
  alternates: {
    canonical: 'https://instantgrow.shop/en/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-playfair font-bold mb-4 text-foreground">About InstantGrow.shop</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering businesses with professional web development and digital growth strategies
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="border shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              At InstantGrow.shop, we believe every business deserves a powerful online presence. 
              Our mission is to help entrepreneurs and businesses grow through professional website 
              development, SEO optimization, and proven digital marketing strategies.
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-lg">
          <CardHeader className="bg-secondary text-secondary-foreground">
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-6 w-6" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              To become the go-to resource for businesses seeking to establish and grow their 
              digital presence. We aim to bridge the gap between technical complexity and business 
              success through clear, actionable insights and professional services.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-lg mb-16">
        <CardHeader className="bg-muted">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Meet the Founder
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img 
                src="https://i.ibb.co/4wmNZcYP/RAO-JATIN.jpg" 
                alt="Rao Jatin" 
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Rao Jatin</h3>
              <p className="text-primary font-semibold mb-4">Founder & Lead Developer</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Rao Jatin is a professional freelance web developer based in Rewari, Haryana, with a 
                passion for creating high-performance websites that drive business growth. With expertise 
                in modern web technologies, SEO optimization, and digital marketing, Rao helps businesses 
                establish a strong online presence and achieve their digital goals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through InstantGrow.shop, Rao shares valuable insights on website development, SEO strategies, 
                and business growth techniques while offering professional web development services to clients 
                worldwide.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-lg mb-16">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            What We Offer
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-primary">Educational Content</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Website Development Tutorials</li>
                <li>✓ SEO Best Practices & Strategies</li>
                <li>✓ Digital Marketing Insights</li>
                <li>✓ Business Growth Techniques</li>
                <li>✓ Technology Trends & Updates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-secondary">Professional Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Custom Website Development</li>
                <li>✓ E-commerce Solutions</li>
                <li>✓ SEO Optimization Services</li>
                <li>✓ Website Maintenance & Support</li>
                <li>✓ Digital Marketing Consultation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center bg-muted p-12 rounded-lg">
        <h2 className="text-3xl font-playfair font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Whether you need a professional website, SEO optimization, or digital marketing guidance, 
          we're here to help you succeed.
        </p>
        <a 
          href="/en/contact" 
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
