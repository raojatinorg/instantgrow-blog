import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Rocket, Target, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - InstantGrow.shop',
  description: 'Learn about InstantGrow.shop and founder Rao Jatin. Professional web development and SEO services.',
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
              At InstantGrow.shop, we help businesses grow through professional website 
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
              digital presence through clear, actionable insights and professional services.
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
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                RJ
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Rao Jatin</h3>
              <p className="text-primary font-semibold mb-4">Founder & Lead Developer</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Rao Jatin is a professional freelance web developer based in Rewari, Haryana, with expertise 
                in modern web technologies, SEO optimization, and digital marketing.
              </p>
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
          href="/contact" 
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}
